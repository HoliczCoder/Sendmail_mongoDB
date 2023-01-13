const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

// IN PROGRESS
const categorySubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "Email is already signed up, login or confirm your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    maxlength: [320, "Email must have less or equal then 320 characters"],
    minlength: [3, "Email must have more or equal then 3 characters"],
  },
  categories: {
    type: [String],
    enum: [
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
    ],
  },

  recentJobs: {
    type: Boolean,
    default: false,
  },
  recentJobsSignUpDate: Date,
  recentJobsConfirmExpires: Date,
  recentJobsLastSendDate: Date,
  recentJobsConfirmToken: String,

  fullStackJobs: {
    type: Boolean,
    default: false,
  },
  fullStackJobsSignUpDate: Date,
  fullStackJobsConfirmExpires: Date,
  fullStackJobsLastSendDate: Date,
  fullStackJobsConfirmToken: String,

  frontEndJobs: {
    type: Boolean,
    default: false,
  },
  frontEndJobsSignUpDate: Date,
  frontEndJobsConfirmExpires: Date,
  frontEndJobsLastSendDate: Date,
  frontEndobsConfirmToken: String,

  backEndJobs: {
    type: Boolean,
    default: false,
  },
  backEndJobsSignUpDate: Date,
  backEndJobsConfirmExpires: Date,
  backEndJobsLastSendDate: Date,
  backEndobsConfirmToken: String,

  designJobs: {
    type: Boolean,
    default: false,
  },
  designJobsSignUpDate: Date,
  designJobsConfirmExpires: Date,
  designJobsLastSendDate: Date,
  designJobsConfirmToken: String,

  customerSupportJobs: {
    type: Boolean,
    default: false,
  },
  customerSupportJobsSignUpDate: Date,
  customerSupportJobsConfirmExpires: Date,
  customerSupportJobsLastSendDate: Date,
  customerSupportJobsConfirmToken: String,

  devOpsSysAdminJobs: {
    type: Boolean,
    default: false,
  },
  devOpsSysAdminJobsSignUpDate: Date,
  devOpsSysAdminJobsConfirmExpires: Date,
  devOpsSysAdminJobsLastSendDate: Date,
  devOpsSysAdminJobsConfirmToken: String,

  salesMarketingJobs: {
    type: Boolean,
    default: false,
  },
  salesMarketingJobsSignUpDate: Date,
  salesMarketingJobsConfirmExpires: Date,
  salesMarketingJobsLastSendDate: Date,
  salesMarketingJobsConfirmToken: String,

  managementFinanceJobs: {
    type: Boolean,
    default: false,
  },
  managementFinanceJobsSignUpDate: Date,
  managementFinanceJobsConfirmExpires: Date,
  managementFinanceJobsLastSendDate: Date,
  managementFinanceJobsConfirmToken: String,

  productJobs: {
    type: Boolean,
    default: false,
  },
  productJobsSignUpDate: Date,
  productJobsConfirmExpires: Date,
  productJobsLastSendDate: Date,
  productJobsConfirmToken: String,

  otherJobs: {
    type: Boolean,
    default: false,
  },
  otherJobsSignUpDate: Date,
  otherJobsConfirmExpires: Date,
  otherJobsLastSendDate: Date,
  otherJobsConfirmToken: String,
});

// IN PROGRESS
//Confirm token for subscription email verification
categorySubscriptionSchema.methods.createConfirmToken = function (
  category: string
) {
  //will send this token to the user
  const confirmToken = crypto.randomBytes(32).toString("hex");
  switch (category) {
    case "All":
      this.recentJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.recentJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
    case "Full-Stack Programming":
      this.fullStackJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.fullStackJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
    case "Front-End Programming":
      this.frontEndJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.frontEndJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
    case "Back-End Programming":
      this.backEndJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.backEndJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
    case "Design":
      this.designJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.designJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
    case "Customer Support":
      this.customerSupportJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.customerSupportJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
    case "Devops and Sysadmin":
      this.devOpsSysAdminJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.devOpsSysAdminJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
    case "Sales and Marketing":
      this.salesMarketingJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.salesMarketingJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
    case "Management and Finance":
      this.managementFinanceJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.managementFinanceJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
    case "Product":
      this.productJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.productJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
    case "Other":
      this.otherJobsConfirmToken = crypto
        .createHash("sha256")
        .update(confirmToken)
        .digest("hex");
      this.otherJobsConfirmExpires = Date.now() + 10 * 60 * 1000;
      break;
  }
  // this.createConfirmExpires = Date.now() + 10 * 60 * 1000;
  // console.log({ confirmToken }, this.createConfirmToken);
  return confirmToken;
};

const CategorySubscription = mongoose.model(
  "CategorySubscription",
  categorySubscriptionSchema
);
module.exports = CategorySubscription;
