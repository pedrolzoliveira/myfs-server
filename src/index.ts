import { DeleteFileConsumerFactory } from './factories/infra/delete-file-consumer-factory'
import { DeleteFilesConsumerFactory } from './factories/infra/delete-files-consumer-factory'
import { ServerFactory } from './factories/infra/server-factory'

async function main() {
  const server = await ServerFactory.create()
  const deleteFileConsumer = await DeleteFileConsumerFactory.create()
  const deleteFilesConsumer = await DeleteFilesConsumerFactory.create()
  server.listen(3000)
  deleteFileConsumer.listen()
  deleteFilesConsumer.listen()
}

main()
