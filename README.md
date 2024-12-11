# AWS Log Stream Event Notification Stack

[![GitHub](https://img.shields.io/github/license/gammarers/aws-log-stream-event-notification-stack?style=flat-square)](https://github.com/gammarers/aws-log-stream-event-notification-stack/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@gammarers/aws-log-stream-event-notification-stack?style=flat-square)](https://www.npmjs.com/package/@gammarers/aws-log-stream-event-notification-stack)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/gammarers/aws-log-stream-event-notification-stack/release.yml?branch=main&label=release&style=flat-square)](https://github.com/gammarers/aws-log-stream-event-notification-stack/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/gammarers/aws-log-stream-event-notification-stack?sort=semver&style=flat-square)](https://github.com/gammarers/aws-log-stream-event-notification-stack/releases)

This AWS CDK construct stack subscribes to a CloudWatch Logs log stream, and when a target log level is detected, it sends the log information to a Step Functions state machine via a Lambda function. The state machine processes and formats the log information, then publishes a message to the target SNS topic.

## Install

### TypeScript

#### install by npm

```shell
npm install @gammarers/aws-log-stream-event-notification-stack
```

#### install by yarn

```shell
yarn add @gammarers/aws-log-stream-event-notification-stack
```

## Example

```typescript
import { LogStreamEventNotificationStack } from '@gammarers/aws-log-stream-event-notification-stack';

new LogStreamEventNotificationStack(app, 'LogStreamEventNotificationStack');

```

## License

This project is licensed under the Apache-2.0 License.
