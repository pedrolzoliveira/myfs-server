import { Channel } from 'amqplib'

import { DeleteFilesMessage } from '../../interfaces/delete-files-queue'

export class DeleteFilesPublisher {
  constructor(
    private readonly channel: Channel
  ) {}

  publish(message: DeleteFilesMessage) {
    this.channel.sendToQueue('delete-files', Buffer.from(
      JSON.stringify(message)
    ))
  }
}
