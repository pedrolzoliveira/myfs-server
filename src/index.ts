import { createDeleteFileConsumer } from './factories/delete-file-consumer-factory'
import { createServer } from './factories/server-factory'

async function main() {
  const server = await createServer()
  const consumer = await createDeleteFileConsumer()
  server.listen(3000)
  consumer.listen()
}

main()
