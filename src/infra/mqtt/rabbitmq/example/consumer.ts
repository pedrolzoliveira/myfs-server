import { Channel } from 'amqplib'
import { ExampleMessage } from '../../interfaces/example-queue'
import { transformMessage } from '../transformers/transform-message'

export class ExampleConsumer {
  constructor(
    private readonly channel: Channel
  ) {}

  listen() {
    this.channel.consume('example-queue', (message) => {
      try {
        if (!message) return
        const data = transformMessage<ExampleMessage>(message)
        console.log({ data })
        this.channel.ack(message)
      } catch (e) {
        if (message) this.channel.reject(message, true)
        throw e
      }
    })
  }
}
