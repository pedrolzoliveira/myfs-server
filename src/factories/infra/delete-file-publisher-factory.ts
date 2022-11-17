import { DeleteFilePublisher } from '../../infra/mqtt/rabbitmq/delete-file-publisher'
import amqplib from 'amqplib'
import { Factory } from '../factory'

export const DeleteFilePublisherFactory: Factory<DeleteFilePublisher> = {
  async create() {
    const conn = await amqplib.connect('amqp://localhost')
    const channel = await conn.createChannel()
    return new DeleteFilePublisher(channel)
  }
}
