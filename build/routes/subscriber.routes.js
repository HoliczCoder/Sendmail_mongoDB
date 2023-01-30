"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var subscriber_controller_1 = require("../controllers/subscriber.controller");
var router = (0, express_1.Router)();
router.post("/", subscriber_controller_1.createSubscriber);
router.get("/", subscriber_controller_1.getSubscriber);
router.delete("/", subscriber_controller_1.deleteSubscriber);
exports.default = router;
//# sourceMappingURL=subscriber.routes.js.map