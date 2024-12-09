import { LogStreamEventNotifier } from '@gammarers/aws-log-stream-event-notifier';
import { LogStreamEventTrigger } from '@gammarers/aws-log-stream-event-trigger';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as destinations from 'aws-cdk-lib/aws-logs-destinations';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

export interface TargetNotification {
  readonly emails?: string[];
}

export interface LogStreamEventNotificationStackProps extends StackProps {
  readonly notification?: TargetNotification;
  readonly logGroupNames: string[];
}

export class LogStreamEventNotificationStack extends Stack {
  constructor(scope: Construct, id: string, props?: LogStreamEventNotificationStackProps) {
    super(scope, id, props);

    // 👇 SNS Topic for notifications
    const topic: sns.Topic = new sns.Topic(this, 'NotificationTopic');

    // 👇 Subscribe an email endpoint to the topic
    const emails = props?.notification?.emails ?? [];
    for (const email of emails) {
      topic.addSubscription(new subscriptions.EmailSubscription(email));
    }

    const trigger = new LogStreamEventTrigger(this, 'LogStreamEventTrigger');

    new LogStreamEventNotifier(this, 'LogStreamEventNotifier', {
      notificationTopic: topic,
      requestFunction: trigger.logStreamSubscriptionFilterDestinationFunction,
    });

    const logGroupNames = props?.logGroupNames ?? [];
    for (const logGroupName of logGroupNames) {

      const prefix = logGroupName
        .split('/')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase())
        .join('');

      const logGroup = logs.LogGroup.fromLogGroupName(this, `${prefix}LogGroup`, logGroupName);

      new logs.SubscriptionFilter(this, `${prefix}LogGroupSubscription`, {
        logGroup,
        destination: new destinations.LambdaDestination(trigger.logStreamSubscriptionFilterDestinationFunction),
        filterPattern: logs.FilterPattern.any(
          logs.FilterPattern.stringValue('$.level', '=', 'ERROR'),
          logs.FilterPattern.stringValue('$.level', '=', 'WARN'),
        ),
      });
    }

  }
}