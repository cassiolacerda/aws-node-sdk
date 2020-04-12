/**
 * Import SDK
 */
var AWS = require("./sdk");

/**
 * Dependencies
 */
var uuid = require("uuid");

/** ----------------------------------------
 * Create S3 Bucket
 */
var bucketName = "node-sdk-sample-" + uuid.v4();
var keyName = "hello_world.txt";

var bucketPromise = new AWS.S3({
  apiVersion: "2006-03-01",
})
  .createBucket({
    Bucket: bucketName,
  })
  .promise();

bucketPromise
  .then(function (data) {
    var uploadPromise = new AWS.S3({
      apiVersion: "2006-03-01",
    })
      .putObject({
        Bucket: bucketName,
        Key: keyName,
        Body: "Hello World!",
      })
      .promise();

    uploadPromise.then(function (data) {
      console.log(
        "Successfully uploaded data to " + bucketName + "/" + keyName
      );
    });
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });
