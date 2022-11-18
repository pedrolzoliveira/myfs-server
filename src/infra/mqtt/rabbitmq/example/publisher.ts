import { Channel } from 'amqplib'

import { ExampleMessage } from '../../interfaces/example-queue'

export class ExamplePublisher {
  constructor(
    private readonly channel: Channel
  ) {}

  publish(message: ExampleMessage) {
    this.channel.sendToQueue('example-queue', Buffer.from(
      JSON.stringify(message)
    ))
  }
}
