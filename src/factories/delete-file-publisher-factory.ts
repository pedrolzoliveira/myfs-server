import { DeleteFilePublisher } from '../infra/mqtt/rabbitmq/delete-file-publisher'
import amqplib from 'amqplib'

export async function createDeleteFilePublisher() {
  const conn = await amqplib.connect('amqp://localhost')
  const channel = await conn.createChannel()
  return new DeleteFilePublisher(channel)
}
