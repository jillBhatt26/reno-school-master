import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { supabase } from '@/config/supabase';

export async function GET(_, { params }) {
    try {
        const filename = (await params).name;

        const { data, error } = await supabase.storage
            .from('images')
            .createSignedUrl(filename, 3600);

        if (error) throw error;

        return NextResponse.json(data.signedUrl, { status: 200 });
    } catch (error) {
        if (error instanceof ZodError)
            return NextResponse.json(
                error.issues.map(issue => issue.message).join(', '),
                { status: 400 }
            );

        return NextResponse.json(
            error.message ?? 'Failed to fetch school image!',
            { status: 500 }
        );
    }
}
