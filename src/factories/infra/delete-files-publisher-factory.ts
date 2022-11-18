import amqplib from 'amqplib'
import { DeleteFilesPublisher } from '../../infra/mqtt/rabbitmq/delete-files/publisher'
import { Factory } from '../factory'

export const DeleteFilesPublisherFactory: Factory<DeleteFilesPublisher> = {
  async create() {
    const conn = await amqplib.connect('amqp://localhost')
    const channel = await conn.createChannel()
    return new DeleteFilesPublisher(channel)
  }
}
