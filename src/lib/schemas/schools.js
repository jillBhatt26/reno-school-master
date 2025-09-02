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
        .string('Name is required')
        .trim()
        .min(3, 'More than 3 characters')
        .max(255, 'Less than 255 characters'),
    address: z
        .string('Address is required')
        .trim()
        .min(3, 'More than 3 characters')
        .max(255, 'Less than 255 characters'),
    city: z
        .string('City is required')
        .trim()
        .min(3, 'More than 3 characters')
        .max(255, 'Less than 255 characters'),
    state: z
        .string('State is required')
        .trim()
        .min(3, 'More than 3 characters')
        .max(255, 'Less than 255 characters'),
    email_id: z.email('Invalid email').trim(),
    contact: z
        .string('Contact is required')
        .trim()
        .regex(/^\d+$/, 'Must be only digits')
        .length(10, 'Must be 10 digits'),
    image: schoolImageSchema
});

const imageNameSchema = z
    .string('School image is required')
    .trim()
    .min(3, 'More than 3 characters')
    .max(255, 'Less than 255 characters');

const schoolFormInputsSchema = addSchoolData.extend({
    image: schoolImageSchema
});

const saveSchoolDataSchema = addSchoolData.extend({
    image: imageNameSchema
});

export {
    addSchoolData,
    schoolImageSchema,
    schoolFormInputsSchema,
    saveSchoolDataSchema
};
