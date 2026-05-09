// const axios = require("axios");

// const sendSMS = async (to, message) => {

//   try {
// // 
//     const res = await axios.post(
//       "https://sms.arkesel.com/api/v2/sms/send",
//       {
//         sender: "GH Marketplace",
//         message,
//         recipients: [to],
//       },
//       {
//         headers: {
//           "api-key": process.env.ARKESEL_API_KEY,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     return res.data;

//   } catch (err) {
//     console.error("SMS Error:", err.response?.data || err.message);
//   }

// };

// module.exports = sendSMS;