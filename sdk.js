/** ----------------------------------------
 * Environment
 */
require("dotenv").config();

/** ----------------------------------------
 * Dependencies
 */
var AWS = require("aws-sdk");

/** ----------------------------------------
 * AWS Setup
 */

/**
 * Set Region (AWS_REGION)
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html
 */
// AWS.config.update({
//   region: 'us-east-2'
// });

console.log("Region: ", AWS.config.region);

/**
 * Set Profile (AWS_PROFILE)
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html#getting-started-nodejs-credentials
 */
// var credentials = new AWS.SharedIniFileCredentials({
//   profile: 'default'
// });
//
// AWS.config.credentials = credentials;

AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});

/** ----------------------------------------
 * Export AWS
 */
module.exports = AWS;
