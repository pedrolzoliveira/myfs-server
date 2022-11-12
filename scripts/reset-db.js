const { PrismaClient } = require('@prisma/client')

async function main () {
  console.log('\nchanging envs...')
  process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
  process.env.MULTER_DEST = process.env.MULTER_DEST_TEST

  console.log('deleting db...')
  const prismaClient = new PrismaClient()
  await prismaClient.file.deleteMany()
  await prismaClient.folder.deleteMany()
  await prismaClient.user.deleteMany()
}

module.exports = main
