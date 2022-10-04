import { t } from "../trpc";
import { z } from "zod";

export const userRouter = t.router({
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  getOne: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }
  ),
});
