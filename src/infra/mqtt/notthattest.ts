import amqplib from 'amqplib'
import { TestConsumer } from './rabbitmq/test-consumer'
import { TestPublisher } from './rabbitmq/test-publisher'

async function main() {
  const conn = await amqplib.connect('amqp://localhost')
  const [channel1, channel2] = await Promise.all([
    conn.createChannel(),
    conn.createChannel()
  ])

  await channel1.assertQueue('test-queue')

  const testPublisher = new TestPublisher(channel2)
  const testConsumer = new TestConsumer(channel1)

  setInterval(() => {
    testPublisher.publish({
      cool_string: 'my cool string lmao',
      testing: true
    })
  }, 5000)

  testConsumer.listen()
}

main()
