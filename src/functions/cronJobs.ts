import { CronJob } from "cron";

export function executableCron() {
  let job = new CronJob("* * * * *", () => {});
  job.start();
}
