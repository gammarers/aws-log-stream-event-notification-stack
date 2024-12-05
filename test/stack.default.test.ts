import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { LogStreamEventNotificationStack } from '../src';

describe('LogStreamEventNotificationStack default Testing', () => {

  const app = new App();

  const stack = new LogStreamEventNotificationStack(app, 'LogStreamEventNotificationStack');

  const template = Template.fromStack(stack);

  it('Should match snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });
});
