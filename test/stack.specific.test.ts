import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { LogStreamEventNotificationStack } from '../src';

describe('LogStreamEventNotificationStack default Testing', () => {

  const app = new App();

  const stack = new LogStreamEventNotificationStack(app, 'LogStreamEventNotificationStack', {
    logGroupNames: [
      '/aws/lambda/example-x1a-func',
      '/aws/lambda/example-x2a-func',
      '/aws/lambda/example-x3a-func',
    ],
    notification: {
      emails: [
        'foo@example.com',
        'bar@example.com',
      ],
    },
  });

  const template = Template.fromStack(stack);

  it('Should match snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });
});
