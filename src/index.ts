import { DeleteFileConsumerFactory } from './factories/infra/delete-file-consumer-factory'
import { ServerFactory } from './factories/infra/server-factory'

async function main() {
  const server = await ServerFactory.create()
  const consumer = await DeleteFileConsumerFactory.create()
  server.listen(3000)
  consumer.listen()
}

main()
