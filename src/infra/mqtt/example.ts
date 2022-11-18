import amqplib from 'amqplib'
import { ExampleConsumer } from './rabbitmq/example/consumer'
import { ExamplePublisher } from './rabbitmq/example/publisher'

async function main() {
  const conn = await amqplib.connect('amqp://localhost')
  const [channel1, channel2] = await Promise.all([
    conn.createChannel(),
    conn.createChannel()
  ])

  await channel1.assertQueue('example-queue')

  const examplePublisher = new ExamplePublisher(channel2)
  const exampleConsumer = new ExampleConsumer(channel1)

  setInterval(() => {
    examplePublisher.publish({
      cool_string: 'my cool string lmao',
      testing: true
    })
  }, 5000)

  exampleConsumer.listen()
}

main()
