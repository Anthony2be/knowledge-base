// src/server/trpc/router/index.ts
import { t } from '../trpc'
import { userRouter } from './user'
import { postRouter } from './post'
import { authRouter } from './auth'
import { commentRouter } from './comment'

export const appRouter = t.router({
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
  auth: authRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
