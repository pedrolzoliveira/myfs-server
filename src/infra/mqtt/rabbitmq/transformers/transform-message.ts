import { ConsumeMessage } from 'amqplib'

export function transformMessage<T>(message: ConsumeMessage | null): T {
  if (!message) throw new Error('Empty message')

  return JSON.parse(
    message.content.toString()
  )
}
