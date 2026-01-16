const { LambdaClient, AddPermissionCommand } = require('@aws-sdk/client-lambda');

const lambda = new LambdaClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const addLambdaPermissionForEventBridge = async (tenant, company, eventBridgeRuleArns) => {
  try {
    await lambda.send(new AddPermissionCommand({
      FunctionName: process.env.AWS_LAMBDA_REBUILD_HOME_PAGE_ARN,
      StatementId: `${tenant}-${Date.now()}`,
      Action: 'lambda:InvokeFunction',
      Principal: 'events.amazonaws.com',
      SourceArn: eventBridgeRuleArns.dailyRebuildHomePageArn
    }));

    if (company.siteMode === 'both' || company.siteMode === 'buy') {
      await lambda.send(new AddPermissionCommand({
        FunctionName: process.env.AWS_LAMBDA_REBUILD_SALE_PAGE_ARN,
        StatementId: `${tenant}-${Date.now()}`,
        Action: 'lambda:InvokeFunction',
        Principal: 'events.amazonaws.com',
        SourceArn: eventBridgeRuleArns.dailyRebuildSalePageArn
      }));
    };

    if (company.siteMode === 'both' || company.siteMode === 'rent') {
      await lambda.send(new AddPermissionCommand({
        FunctionName: process.env.AWS_LAMBDA_REBUILD_RENT_PAGE_ARN,
        StatementId: `${tenant}-${Date.now()}`,
        Action: 'lambda:InvokeFunction',
        Principal: 'events.amazonaws.com',
        SourceArn: eventBridgeRuleArns.dailyRebuildRentPageArn
      }));
    };
  } catch (err) {
    if (err.name === 'ResourceConflictException') {
      return;
    } else {
      throw err;
    }
  }
};

module.exports = { addLambdaPermissionForEventBridge };
