/**
 * Import SDK
 */
var AWS = require("./sdk");

/** ----------------------------------------
 * Lambda Invoke
 */
var lambda = new AWS.Lambda();

lambda.invoke(
  {
    FunctionName: "helloWorld",
    Payload: JSON.stringify({
      username: "Cássio",
    }),
  },
  function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  }
);
