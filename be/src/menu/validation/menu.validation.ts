import { ZodCustomMessage } from '../../common/zod.custom.message';
import { z } from 'zod';

export const ADD = z.object({
  name: ZodCustomMessage.stringRequired('Name'),
  depth: ZodCustomMessage.numberRequired('Depth'),
  idParent: ZodCustomMessage.stringOptional('Parent'),
});

export const FILTER = z.object({
  idParent: ZodCustomMessage.stringOptional('Parent'),
});
