// src/server/router/_app.ts
import { router } from '../trpc';
// import { albumRouter } from './album';
import { albumActionsRouter } from './albumActions';
import { authRouter } from './auth';
import { reviewRouter } from './review';
import { spotifyRouter } from './spotify';
import { userRouter } from './user';

export const appRouter = router({
  auth: authRouter,
  albumAction: albumActionsRouter,
  spotify: spotifyRouter,
  review: reviewRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
