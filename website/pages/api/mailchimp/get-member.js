// import fetch from 'isomorphic-unfetch';
// import md5 from 'js-md5';
//
// export default async (req, res) => {
//   try {
//     const { email } = req.body;
//     const emailHashed = md5(email.toLowerCase());
//     const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];
//
//     // Fetch mailchimp member
//     const response = await fetch(
//       `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHashed}`,
//       {
//         headers: {
//           Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         method: 'GET',
//       }
//     );
//
//     // Error
//     if (!response.ok) {
//       throw new Error(await response.json());
//     }
//
//     // Success
//     return res.status(200).json(await response.json());
//   } catch (error) {
//     // Handle catch
//     console.error(
//       `Error in api/mailchimp/get-member: ${error.message || error.toString()}`
//     );
//
//     return res.status(500).json({ error: 'Error fetching mailchimp member.' });
//   }
// };
