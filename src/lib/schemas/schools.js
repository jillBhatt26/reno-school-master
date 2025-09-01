import { ACCEPTED_IMG_TYPES, MAX_IMG_SIZE } from '@/constants/schools';
import { z } from 'zod';

const schoolImageSchema = z
    .custom()
    .refine(images => images?.length >= 1, {
        message: 'Image is required.'
    })
    .refine(
        images =>
            !images || (!!images.length && images[0].size <= MAX_IMG_SIZE),
        {
            message: 'The school image must be under 5MB.'
        }
    )
    .refine(
        images =>
            !images ||
            (!!images.length && ACCEPTED_IMG_TYPES.includes(images[0].type)),
        {
            message: 'Only JPEG and PNG images accepted'
        }
    );

const addSchoolData = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'More than 3 characters')
        .max(255, 'Less than 255 characters'),
    address: z
        .string()
        .trim()
        .min(3, 'More than 3 characters')
        .max(255, 'Less than 255 characters'),
    city: z
        .string()
        .trim()
        .min(3, 'More than 3 characters')
        .max(255, 'Less than 255 characters'),
    state: z
        .string()
        .trim()
        .min(3, 'More than 3 characters')
        .max(255, 'Less than 255 characters'),
    email_id: z.email('Invalid email').trim(),
    contact: z
        .string()
        .trim()
        .length(10, 'Must be 10 digits')
        .regex(/^\d+$/, 'Must be only digits'),
    image_url: z.url('Invalid image url').trim()
});

const fullSchoolSchema = addSchoolData.extend({
    image: schoolImageSchema
});

export { addSchoolData, schoolImageSchema, fullSchoolSchema };
