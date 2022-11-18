import amqplib from 'amqplib'
import { DeleteFileConsumer } from '../../infra/mqtt/rabbitmq/delete-file/consumer'
import { DeleteFileFactory } from '../application/use-cases/delete-file-factory'
import { Factory } from '../factory'

export const DeleteFileConsumerFactory: Factory<DeleteFileConsumer> = {
  async create() {
    const conn = await amqplib.connect('amqp://localhost')
    const channel = await conn.createChannel()
    channel.assertQueue('delete-file')
    return new DeleteFileConsumer(
      channel,
      await DeleteFileFactory.create()
    )
  }
}
