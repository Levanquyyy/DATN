import * as z from 'zod';

export const searchSchema = z.object({
  province_code: z.string().nullable(),
  district_code: z.string().nullable(),
  ward_code: z.string().nullable(),
  minPrice: z.string().nullable(),
  maxPrice: z.string().nullable(),
  bedroom_id: z.string().nullable(),
});
