"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var message_controller_1 = require("../controllers/message.controller");
var router = (0, express_1.Router)();
router.post("/", message_controller_1.createMessage);
exports.default = router;
//# sourceMappingURL=message.routes.js.map