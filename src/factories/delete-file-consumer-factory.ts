import { DeleteFileConsumer } from '../infra/mqtt/rabbitmq/delete-file-consumer'
import { createDeleteFile } from './use-cases/delete-file-factory'
import amqplib from 'amqplib'
export async function createDeleteFileConsumer() {
  const conn = await amqplib.connect('amqp://localhost')
  const channel = await conn.createChannel()
  channel.assertQueue('delete-file')
  const deleteFile = createDeleteFile()
  return new DeleteFileConsumer(channel, deleteFile)
}
