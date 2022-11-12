const { PrismaClient } = require('@prisma/client')

async function main () {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
  console.log('\ndeleting db...\n')
  const prismaClient = new PrismaClient()
  await prismaClient.file.deleteMany()
  await prismaClient.folder.deleteMany()
  await prismaClient.user.deleteMany()
}

module.exports = main
