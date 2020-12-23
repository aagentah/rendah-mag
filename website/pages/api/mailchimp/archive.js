// import fetch from 'isomorphic-unfetch';
//
// export default async (req, res) => {
//   try {
//     const { email } = req.body;
//     const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];
//
//     const data = {
//       email_address: email,
//     };
//
//     const response = await fetch(
//       `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
//       {
//         body: JSON.stringify(data),
//         headers: {
//           Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         method: 'DELETE',
//       }
//     );
//
//     const json = await response.json();
//
//     // Error
//     if (!response.ok) {
//       throw new Error('There was an issue archiving.');
//     }
//
//     // Success
//     if (res) return res.status(200).json({ error: '' });
//     return true;
//   } catch (error) {
//     // Handle catch
//     console.error(
//       `Error in api/mailchimp/archive: ${error.message || error.toString()}`
//     );
//
//     if (res) return res.status(500).json({ error: error.message });
//     return false;
//   }
// };
