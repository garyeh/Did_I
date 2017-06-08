const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

exports.handler = function (e, ctx, callback) {

var message = "yes";
var id = 0

var params = {
    TableName: "Reminders",
    KeyConditionExpression: "#id = :ii",
    ExpressionAttributeNames:{
        "#id": "id"
    },
    ExpressionAttributeValues: {
        ":ii": "2"
    }
}

 docClient.query(params, function(err,data){
     if(err){
         callback(err, null);
     }else{
         callback(null,data);
     }
 });

}
