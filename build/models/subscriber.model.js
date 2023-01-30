"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var subscriber = new mongoose_1.default.Schema({
    subscriberName: String,
    email: String,
    category: [],
});
exports.Subscriber = mongoose_1.default.model('Subscriber', subscriber);
//# sourceMappingURL=subscriber.model.js.map