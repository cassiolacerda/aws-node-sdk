/** ----------------------------------------
 * Environment
 */
require('dotenv').config();

/** ----------------------------------------
 * Dependencies
 */
var AWS = require('aws-sdk');
var uuid = require('uuid');

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

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});

/** ----------------------------------------
 * Create S3 Bucket
 */

// Create unique bucket name
var bucketName = 'node-sdk-sample-' + uuid.v4();

// Create name for uploaded object key
var keyName = 'hello_world.txt';

// Create a promise on S3 service object
var bucketPromise = new AWS.S3({
  apiVersion: '2006-03-01'
}).createBucket({
  Bucket: bucketName
}).promise();

// Handle promise fulfilled/rejected states
bucketPromise.then(function(data) {
  // Create params for putObject call
  var objectParams = {
    Bucket: bucketName,
    Key: keyName,
    Body: 'Hello World!'
  };
  // Create object upload promise
  var uploadPromise = new AWS.S3({
    apiVersion: '2006-03-01'
  }).putObject(objectParams).promise();

  uploadPromise.then(function(data) {
    console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  });

}).catch(function(err) {
  console.error(err, err.stack);
});
