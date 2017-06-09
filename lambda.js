const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


function timeStamp() {
  let now = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  now = new Date(now)
  let date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
  let time = [ now.getHours(), now.getMinutes() ];
  let suffix = ( time[0] < 12 ) ? "AM" : "PM";
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
  time[0] = time[0] || 12;

  for ( let i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
  return date.join("/") + " " + time.join(":") + " " + suffix;
}

exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Welcome, you may set or check your last verify", false),
            {}
          )
        )
        break;

      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`)

        switch(event.request.intent.name) {
          case "CheckVerify":
            var params = {
                TableName: 'Test1',
                Key: {
                    userId: event.session.user.userId
                }
            };
            console.log(event);
            docClient.get(params, function(err, data) {
               if (err) {
                   console.error("Unable to read item. Error JSON: ", JSON.stringify(err, null, 2));
                   shouldEndSession: true;
               } else {
                   context.succeed(
                        generateResponse(
                            buildSpeechletResponse("You last verified at " + data.Item.date, true),
                            {}
                        )
                    )
               }
              })
            break;

          case "SetVerify":
            var params = {
              Item: {
                userId: event.session.user.userId,
                date: timeStamp()
              },
              TableName: 'Test1'
            };
            docClient.put(params, () => {
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse("Your verify has been set", true),
                    {}
                  )
                )
              })

            break;

            case "AMAZON.HelpIntent":
            context.succeed(
              generateResponse(
                buildSpeechletResponse("To check a verify, say, Alexa when was the last time I verified", false),
                {}
              )
            )
            break;

            case "AMAZON.CancelIntent":
            context.succeed(
              generateResponse(
                buildSpeechletResponse("Goodbye", true),
                {}
              )
            )
            break;

            case "AMAZON.StopIntent":
            context.succeed(
              generateResponse(
                buildSpeechletResponse("Goodbye", true),
                {}
              )
            )
            break;

          default:
            throw "Invalid intent"
        }

        break;

      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}
