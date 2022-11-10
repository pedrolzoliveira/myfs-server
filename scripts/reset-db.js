const { PrismaClient } = require('@prisma/client')

async function main () {
  console.log('deleting db...')
  const prismaClient = new PrismaClient()
  await prismaClient.file.deleteMany()
  await prismaClient.folder.deleteMany()
  await prismaClient.user.deleteMany()
}

module.exports = main
