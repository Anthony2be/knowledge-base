import { t, protectedProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = t.router({
  getAll: t.procedure
    .query(({ ctx }) => {
      return ctx.prisma.post.findMany({
        include: {
          author: true,
        },
      });
    }),
  getOne: t.procedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.post.findUnique({
        where: {
          id: input.id,
        },
        include: {
          author: true,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          description: input.description,
          author: {
            connect: {
              id: ctx.session.user?.id,
            }
          }
        }
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.post.delete({
        where: {
          id: input.id
        }
      })
    })
});