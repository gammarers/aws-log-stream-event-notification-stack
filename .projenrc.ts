import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.189.1',
  typescriptVersion: '5.8.x',
  jsiiVersion: '5.8.x',
  defaultReleaseBranch: 'main',
  name: '@gammarers/aws-log-stream-event-notification-stack',
  keywords: ['aws', 'cdk', 'aws-cdk', 'log', 'notification', 'lambda', 'subscription', 'stepfuncstions'],
  description: 'This AWS CDK construct stack subscribes to a CloudWatch Logs log stream, and when a target log level is detected, it sends the log information to a Step Functions state machine via a Lambda function. The state machine processes and formats the log information, then publishes a message to the target SNS topic. But CloudWatch Logs by a Node.js-based Lambda function only.',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-log-stream-event-notification-stack.git',
  deps: [
    '@gammarers/aws-log-stream-event-trigger@^1.0.0',
    '@gammarers/aws-log-stream-event-notifier@^1.0.0',
  ],
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '22.4.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['02 16 * * 4']),
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
});
project.synth();