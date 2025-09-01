import { NextResponse } from 'next/server';
import { supabase } from '@/config/supabase';
import { NODE_ENV } from '@/config/env';

export async function GET(request) {
    try {
        const filename = request.nextUrl.searchParams.get('name');

        const { data } = supabase.storage
            .from(NODE_ENV === 'production' ? 'images-prod' : 'images-dev')
            .getPublicUrl(filename);

        return NextResponse(data.publicUrl);
    } catch (error) {
        if (error instanceof ZodError)
            return NextResponse.json(
                error.issues.map(issue => issue.message).join(', ')
            );

        return NextResponse.json('Failed to fetch school image!');
    }
}
