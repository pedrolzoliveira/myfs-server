import amqplib from 'amqplib'
import { DeleteFilesConsumer } from '../../infra/mqtt/rabbitmq/delete-files/consumer'
import { Factory } from '../factory'
import { DeleteFilePublisherFactory } from './delete-file-publisher-factory'

export const DeleteFilesConsumerFactory: Factory<DeleteFilesConsumer> = {
  async create() {
    const conn = await amqplib.connect('amqp://localhost')
    const channel = await conn.createChannel()
    channel.assertQueue('delete-files')
    return new DeleteFilesConsumer(
      channel,
      await DeleteFilePublisherFactory.create()
    )
  }
}
