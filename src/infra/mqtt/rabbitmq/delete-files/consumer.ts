import { Channel } from 'amqplib'
import { DeleteFilesMessage } from '../../interfaces/delete-files-queue'
import { DeleteFilePublisher } from '../delete-file/publisher'
import { transformMessage } from '../transformers/transform-message'

export class DeleteFilesConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly deleteFilePublisher: DeleteFilePublisher
  ) {}

  listen() {
    this.channel.consume('delete-files', async (message) => {
      try {
        if (!message) return
        const { locations } = transformMessage<DeleteFilesMessage>(message)
        locations.map(location => this.deleteFilePublisher.publish({ location }))
        this.channel.ack(message)
      } catch (e) {
        if (message) this.channel.reject(message, true)
        throw e
      }
    })
  }
}
