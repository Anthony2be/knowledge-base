import { t } from '../trpc'
import { z } from 'zod'

export const commentRouter = t.router({
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.comment.findMany()
  }),
  getOne: t.procedure.input(z.object({ id: z.string().cuid() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.comment.findUnique({
      where: {
        id: input.id,
      },
      include: {
        author: true,
      },
    })
  }),
})
