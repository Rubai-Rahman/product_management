import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999, 'Price must be less than 999,999'),
  categoryId: z.string().min(1, 'Category is required'),
  images: z
    .array(
      z.string().min(1, 'Image URL is required').url('Please enter a valid URL')
    )
    .min(1, 'At least one image is required')
    .max(5, 'Maximum 5 images allowed'),
});

export type ProductFormData = z.infer<typeof productSchema>;
