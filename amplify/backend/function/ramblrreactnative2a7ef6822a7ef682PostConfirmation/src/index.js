const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  console.log(">>>", event, "<< invoking Lambda with event");
  
  let date = new Date();
  const tableName = process.env.USERTABLE;
  const region = process.env.REGION;
  
  console.log(`table=${tableName} -- region=${region}`);
  
  aws.config.update({ region });

  if (!event.request.userAttributes.sub) {
    // Nothing to do, the user's email ID is unknown
    console.log("Error: Nothing was written to DDB");
    return context.done(null, event);
  }
  // -- Write data to DDB
  // If the required parameters are present, proceed
  const ddbParams = {
    TableName: tableName,
    Item: {
    'id': {S: event.request.userAttributes.sub},
    'username':{S: event.userName},
    'email': {S: event.request.userAttributes.email},
    'createdDate': {S: date.toISOString()},
    
    }
  };
  // Call DynamoDB
  try {
    const ddbResult = await ddb.putItem(ddbParams).promise();
    console.log(ddbResult, "Success");
  } catch (err) { 
    console.log("Error", err);
  }
  console.log("Success: Everything executed correctly");
  context.done(null, event);
};
