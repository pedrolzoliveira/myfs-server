import { createServer } from './factories/server-factory'

function main() {
  const server = createServer()
  server.listen(3000)
}

main()
