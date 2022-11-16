import { Channel } from 'amqplib'
import { TestMessage } from '../interfaces/test-queue'
import { transformMessage } from './transformers/transform-message'

export class TestConsumer {
  constructor(
    private readonly channel: Channel
  ) {}

  listen() {
    this.channel.consume('test-queue', (message) => {
      try {
        if (!message) return
        const data = transformMessage<TestMessage>(message)
        console.log({ data })
        this.channel.ack(message)
      } catch (e) {
        if (message) this.channel.reject(message, true)
        throw e
      }
    })
  }
}
