import * as z from 'zod';

export const logSchema = z.object({
  spotifyId: z.string(),
  user_id: z.string(),
  action: z.string(),
});

export const getLogSchema = z.object({
  spotifyId: z.string(),
  user_id: z.string(),
});

export const getLogUserSchema = z.object({
  username: z.string(),
});

export type ILogSchema = z.infer<typeof logSchema>;
