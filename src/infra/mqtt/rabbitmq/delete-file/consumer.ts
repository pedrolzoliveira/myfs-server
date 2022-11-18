import { Channel } from 'amqplib'
import { DeleteFile } from '../../../../domain/use-cases/delete-file'
import { DeleteFileMessage } from '../../interfaces/delete-file-queue'
import { transformMessage } from '../transformers/transform-message'

export class DeleteFileConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly deleteFile: DeleteFile
  ) {}

  listen() {
    this.channel.consume('delete-file', async (message) => {
      try {
        if (!message) return
        const { location } = transformMessage<DeleteFileMessage>(message)
        const deleted = await this.deleteFile.exec(location)
        if (deleted) {
          this.channel.ack(message)
        } else {
          this.channel.reject(message, true)
        }
      } catch (e) {
        if (message) this.channel.reject(message, true)
        throw e
      }
    })
  }
}
