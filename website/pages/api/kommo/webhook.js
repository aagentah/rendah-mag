import fetch from 'isomorphic-unfetch';
import md5 from 'js-md5';

import formatHttpError from '~/functions/formatHttpError';

// Function to extract emails from text using regex
const extractEmails = (text) => {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  return text.match(emailRegex) || [];
};

// Function to add member to Mailchimp with a tag
const addToMailchimp = async (email) => {
  try {
    const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];

    // Add member to list
    const data = {
      email_address: email,
      status: 'subscribed',
    };

    // Add the member
    const addResponse = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    // If member already exists or was added successfully, add the tag
    const addResult = await addResponse.json();
    if (addResponse.ok || addResult.title === 'Member Exists') {
      const emailHashed = md5(email.toLowerCase());

      // Add the "Added Via CRM" tag
      const tags = [
        {
          name: 'Added Via CRM',
          status: 'active',
        },
      ];

      await fetch(
        `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHashed}/tags`,
        {
          body: JSON.stringify({ tags }),
          headers: {
            Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      );
    }

    return true;
  } catch (error) {
    console.error('Error adding to Mailchimp:', error);
    return false;
  }
};

export default async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;

    // Extract messages from the Kommo webhook payload
    let email = null;

    // First check if email is directly available in the client object
    if (payload?.client?.email) {
      email = payload.client.email;
    }
    // Otherwise, try to extract it from the message text
    else if (payload?.message?.text) {
      const emails = extractEmails(payload.message.text);
      if (emails.length > 0) {
        email = emails[0]; // Use the first email found
      }
    }

    // If we found an email, add it to Mailchimp
    if (email) {
      await addToMailchimp(email);
      return res.status(200).json({
        success: true,
        message: 'Email added to Mailchimp newsletter',
      });
    } else {
      return res.status(200).json({
        success: false,
        message: 'No email found in the webhook payload',
      });
    }
  } catch (error) {
    // Log error but still return 200 as Kommo expects a quick 200 response
    console.error('Error in api/kommo/webhook:', error);
    return res.status(200).json({ success: false, error: error.message });
  }
};
