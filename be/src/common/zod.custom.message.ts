import { Injectable } from '@nestjs/common';
import { ZodType, z } from 'zod';

@Injectable()
export class ZodCustomMessage {
  static numberRequired(field): ZodType {
    return z
      .number({
        invalid_type_error: `${field} must number`,
        required_error: `${field} required`,
      })
      .nonnegative({
        message: `${field} must equal or more than 0`,
      });
  }
  static stringOptional(field): ZodType {
    return z.string({ invalid_type_error: `${field} must text` }).optional();
  }
  static stringRequired(field): ZodType {
    return z
      .string({
        invalid_type_error: `${field} must text`,
        required_error: `${field} required`,
      })
      .min(1, { message: `${field} required` });
  }
  static emailRequired(field): ZodType {
    return z
      .string({
        invalid_type_error: `${field} must text`,
        required_error: `${field} required`,
      })
      .email({ message: `Format ${field.toLowerCase()} tidak sesuai` })
      .min(1, { message: `${field} required` });
  }
  static arrayStringOptional(field): ZodType {
    return z
      .array(z.string({ invalid_type_error: `${field} harus berupa teks` }), {
        invalid_type_error: `${field} harus berupa list`,
      })
      .optional();
  }
  static arrayObjectOptional(field, object): ZodType {
    return this.arrayObjectRequired(field, object).optional();
  }
  static arrayObjectRequired(field, object): ZodType {
    return z.array(
      z.object(object, {
        invalid_type_error: `${field} harus berupa object`,
        required_error: `${field} required`,
      }),
      {
        invalid_type_error: `${field} harus berupa list`,
        required_error: `${field} required`,
      },
    );
  }
  static booleanRequired(field): ZodType {
    return z.boolean({
      invalid_type_error: `${field} harus ada atau tidak ada`,
      required_error: `${field} required`,
    });
  }
  static booleanOptional(field): ZodType {
    return z
      .boolean({ invalid_type_error: `${field} harus ada atau tidak ada` })
      .optional();
  }
  static dateRequired(field): ZodType {
    return z.date({
      invalid_type_error: `Format ${field.toLowerCase()} tidak sesuai`,
      required_error: `${field} required`,
    });
  }
  static dateOptional(field): ZodType {
    return z
      .date({
        message: `Format ${field} tidak sesuai`,
      })
      .optional();
  }
  static enumRequired(label, field, value): ZodType {
    return z.enum(value, {
      invalid_type_error: `${label} harus salah satu dari ${field}`,
      required_error: `${label} required`,
    });
  }
  static enumOptional(label, field, value): ZodType {
    return z
      .enum(value, {
        invalid_type_error: `${label} harus salah satu dari ${field}`,
      })
      .optional();
  }
}
