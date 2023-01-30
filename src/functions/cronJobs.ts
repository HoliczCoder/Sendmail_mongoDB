import { CronJob } from "cron";
import { sendMessageAutomate } from "../controllers/message.controller";

export function executableCron() {
  console.log("start execution");
  // execute in every weekend in 7:30
  var job = new CronJob(
    "30 7 * * 0",
    function () {
      console.log("You will see this message every week");
      const message = "input messsage here";
      sendMessageAutomate(message);
    },
    null,
    true,
    "America/Los_Angeles"
  );
  job.start();
}
