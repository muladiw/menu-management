import * as z from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  depth: z.number().min(1),
  depth2: z.string().optional(),
  parent: z.string().optional(),
  nameParent: z.string().optional(),
});
