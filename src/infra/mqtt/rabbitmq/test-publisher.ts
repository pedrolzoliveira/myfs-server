import { Channel } from 'amqplib'

import { TestMessage } from '../interfaces/test-queue'

export class TestPublisher {
  constructor(
    private readonly channel: Channel
  ) {}

  publish(message: TestMessage) {
    this.channel.sendToQueue('test-queue', Buffer.from(
      JSON.stringify(message)
    ))
  }
}
