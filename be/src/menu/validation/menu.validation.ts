import { ZodCustomMessage } from '../../common/zod.custom.message';
// import { FILTER_COMMON } from '../../../../common/common.validation';
import { z } from 'zod';

// export const FILTER = FILTER_COMMON.extend({});

export const ADD = z.object({
  name: ZodCustomMessage.stringRequired('Name'),
  depth: ZodCustomMessage.numberRequired('Depth'),
  idParent: ZodCustomMessage.stringOptional('Parent'),
});
