import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  testAuth: publicProcedure.query(({ ctx }) => {
    if (ctx.user) {
      // return { greeting: `hello ${ctx.user?.username}` };
      return ctx.user;
    }

    return "not signed in";
  }),

  testProtected: protectedProcedure.query(({ ctx }) => {
    if (ctx.user) {
      return { greeting: `hello ${ctx.user?.username}` };
    }

    return "not signed in";
  }),
});
