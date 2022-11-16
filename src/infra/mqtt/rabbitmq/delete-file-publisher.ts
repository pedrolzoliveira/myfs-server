import { Channel } from 'amqplib'

import { DeleteFileMessage } from '../interfaces/delete-file-queue'

export class DeleteFilePublisher {
  constructor(
    private readonly channel: Channel
  ) {}

  publish(message: DeleteFileMessage) {
    this.channel.sendToQueue('delete-file', Buffer.from(
      JSON.stringify(message)
    ))
  }
}
