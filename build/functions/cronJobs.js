"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executableCron = void 0;
var cron_1 = require("cron");
function executableCron() {
    var job = new cron_1.CronJob("* * * * *", function () { });
    job.start();
}
exports.executableCron = executableCron;
//# sourceMappingURL=cronJobs.js.map