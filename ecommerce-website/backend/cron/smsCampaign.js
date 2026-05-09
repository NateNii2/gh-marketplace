const cron = require("node-cron");
const Subscriber = require("../models/subscriber.model");
const sendSMS = require("../services/sms.service");

/* 
   Runs every 14 days at 10:00 AM
*/
cron.schedule("0 10 */14 * *", async () => {
  console.log("Running SMS campaign...");

  const subscribers = await Subscriber.find();

  for (const sub of subscribers) {
    try {
      await sendSMS(
        sub.phone,
        "🔥 New deals available on GH Marketplace! Visit now."
      );
    } catch (err) {
      console.error("SMS failed:", sub.phone);
    }
  }
});