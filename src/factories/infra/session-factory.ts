import session from 'express-session'
import { Factory } from '../factory'
import { createClient } from 'redis'
import RedisStoreFunc from 'connect-redis'
import { RequestHandler } from 'express'

export const SessionFactory: Factory<RequestHandler> = {
  async create() {
    const RedisStore = RedisStoreFunc(session)
    const redisClient = createClient({ legacyMode: true })

    await redisClient.connect()

    return session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      resave: false
    })
  }
}
