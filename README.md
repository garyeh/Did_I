# Verify

## Background & Overview

Verify is an Amazon Echo application that utilizes voice driven technology to log a date and time, allowing users to verify their last log time. The app is designed to work as a reminder for daily tasks which may be easily forgotten.

![Amazon Echo](./docs/echo.jpg)

## Features

- Verbally set a time stamp with verify
- Verbally request your last time to be read back to you
- Allow data to persist between instances
- Include Amazon Key Event Instances

![Utterances](./docs/utterances.png)

## Project Design

A [proposal readme](./docs/README.md) was created to outline the scope and goals of the project.

While the team originally anticipated Python would be used to manage the back-end of the project, each member quickly pivoted to Node.js when realizing advantages of better integration with the DynamoDB ecosystem.

## Technology

Verify was built on the AWS platform.

- [Amazon Skill Kit](https://developer.amazon.com/alexa-skills-kit) was utilized for voice management and user interaction.  
- [AWS Lambda](https://aws.amazon.com/lambda/) handled user interaction logic and tired interaction with the database
- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) created a NoSQL database allowing persistence of information for users between interactions
- [Node.js](https://nodejs.org/en/) was the language of choice to manage the AWS Lamdba functionality and user flow.

![Technologies](./docs/technologies.png)

## Future Implementation

- Allow users to define multiple types and recall each by name
- Establish automated text reminders if a user determined check-in is not met
