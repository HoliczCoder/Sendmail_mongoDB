"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var subscriber_routes_1 = __importDefault(require("./subscriber.routes"));
var message_routes_1 = __importDefault(require("./message.routes"));
var routes = (0, express_1.Router)();
// routes.get("/", (req: Request, res: Response) => {
//   console.log("res",res);
//   res.json({
//     hello: "hello world",
//   });
// });
routes.use("/message", message_routes_1.default);
routes.use("/subscriber", subscriber_routes_1.default);
exports.default = routes;
//# sourceMappingURL=routes.index.js.map