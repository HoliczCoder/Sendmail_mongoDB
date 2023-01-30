"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
var utiles_1 = require("../functions/utiles");
var amqplib_1 = __importDefault(require("amqplib"));
var mongoose_1 = __importDefault(require("mongoose"));
var cateogries = [
    "All",
    "Full-Stack Programming",
    "Front-End Programming",
    "Back-End Programming",
    "Design",
    "Customer Support",
    "Devops and Sysadmin",
    "Sales and Marketing",
    "Management and Finance",
    "Product",
    "Other",
];
var limitNumber = 1; // limit 10 subscriber each send batch
var handleQueue = function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var Subscriber, subscriber, _loop_1, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Subscriber = mongoose_1.default.model("Subscriber");
                return [4 /*yield*/, Subscriber.find({})];
            case 1:
                subscriber = _a.sent();
                _loop_1 = function (i) {
                    var requests;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                requests = subscriber.slice(i, i + limitNumber).map(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                                    var result, error_1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _a.trys.push([0, 3, , 4]);
                                                if (!user.category.includes(msg === null || msg === void 0 ? void 0 : msg.fields.routingKey)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, (0, utiles_1.sendMail)(msg, user.email, user.subscriberName)];
                                            case 1:
                                                result = _a.sent();
                                                console.log(result);
                                                _a.label = 2;
                                            case 2: return [3 /*break*/, 4];
                                            case 3:
                                                error_1 = _a.sent();
                                                console.log("Error send mail to subscriber ".concat(error_1));
                                                return [3 /*break*/, 4];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [4 /*yield*/, Promise.all(requests).catch(function (e) {
                                        console.log("Error in sending email for the batch ".concat(i, " - ").concat(e));
                                        throw e;
                                    })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < subscriber.length)) return [3 /*break*/, 5];
                return [5 /*yield**/, _loop_1(i)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i += limitNumber;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
var createMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var conn, channel_1, nameExchange_1, msg_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, amqplib_1.default.connect(process.env.AMPQ_URL_CLOUD)];
            case 1:
                conn = _a.sent();
                return [4 /*yield*/, conn.createChannel()];
            case 2:
                channel_1 = _a.sent();
                nameExchange_1 = "CATEGORY";
                return [4 /*yield*/, channel_1.assertExchange(nameExchange_1, "topic", { durable: false })];
            case 3:
                _a.sent();
                // binding
                return [4 /*yield*/, Promise.all(cateogries.map(function (key) { return __awaiter(void 0, void 0, void 0, function () {
                        var queue;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, channel_1.assertQueue(key, { exclusive: true })];
                                case 1:
                                    queue = (_a.sent()).queue;
                                    return [4 /*yield*/, channel_1.bindQueue(queue, nameExchange_1, key)];
                                case 2:
                                    _a.sent();
                                    // consume email
                                    //   const result = [];
                                    return [4 /*yield*/, channel_1.consume(queue, function (msg) { return handleQueue(msg); })];
                                case 3:
                                    // consume email
                                    //   const result = [];
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 4:
                // binding
                _a.sent();
                msg_1 = req.body.message;
                // send message
                cateogries.forEach(function (topic) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, channel_1.publish(nameExchange_1, topic, Buffer.from("".concat(msg_1, " from ").concat(topic)))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                res.status(200).json({
                    okie: "okie",
                });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.log("error", error_2);
                res.status(500).json({
                    error: error_2,
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createMessage = createMessage;
//# sourceMappingURL=message.controller.js.map