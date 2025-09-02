import path from 'path';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { ZodError } from 'zod';
import { supabase } from '@/config/supabase';
import { schoolImageSchema } from '@/lib/schemas/schools';

export async function POST(request) {
    try {
        const formData = await request.formData();

        const imageFile = formData.get('image');

        await schoolImageSchema.parse([imageFile]);

        const filepath = `${nanoid()}${path.extname(imageFile.name)}`;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(filepath, imageFile);

        if (error) throw error;

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError)
            return NextResponse.json(
                error.issues.map(issue => issue.message).join(', '),
                { status: 400 }
            );

        return NextResponse.json(
            error.message ?? 'Failed to save school image!',
            { status: 500 }
        );
    }
}
