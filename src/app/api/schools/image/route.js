import path from 'path';
import { NextResponse } from 'next/server';
import { supabase } from '@/config/supabase';
import { schoolImageSchema } from '@/lib/schemas/schools';
import { NODE_ENV } from '@/config/env';
import { nanoid } from 'nanoid';

export async function POST(request) {
    try {
        const formData = await request.formData();

        const validatedFormData = await schoolImageSchema.parse(formData);

        const filepath = `${nanoid()}${path.extname(fileObject.name)}`;

        const { data, error } = await supabase.storage
            .from(NODE_ENV === 'production' ? 'images-prod' : 'images-dev')
            .upload(filepath, validatedFormData.get('image'));

        if (error) return NextResponse.json(error.message);

        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof ZodError)
            return NextResponse.json(
                error.issues.map(issue => issue.message).join(', ')
            );

        return NextResponse.json('Failed to save school image!');
    }
}
