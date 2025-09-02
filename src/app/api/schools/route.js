import { NextResponse } from 'next/server';
import { addSchoolData } from '@/lib/schemas/schools';
import { ZodError } from 'zod';

export async function GET() {
    return NextResponse.json([], { status: 200 });
}

export async function POST(request) {
    try {
        const body = await request.json();

        const validatedBody = addSchoolData.parse(body);

        // TODO: Save data in MySQL DB

        return NextResponse.json(true);
    } catch (error) {
        if (error instanceof ZodError)
            return NextResponse.json(
                error.issues.map(issue => issue.message).join(', '),
                { status: 400 }
            );

        return NextResponse.json('Failed to create new post!', { status: 500 });
    }
}
