import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.120.0',
  typescriptVersion: '5.5.x',
  jsiiVersion: '5.5.x',
  defaultReleaseBranch: 'main',
  name: '@gammarers/aws-log-stream-event-notification-stack',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-log-stream-event-notification-stack.git',
  deps: [
    '@gammarers/aws-log-stream-event-trigger@^0.3.6',
    '@gammarers/aws-log-stream-event-notifier@^0.1.5',
  ],
  releaseToNpm: false, // tmp
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