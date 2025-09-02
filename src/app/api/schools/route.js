import { NextResponse } from 'next/server';
import { saveSchoolDataSchema } from '@/lib/schemas/schools';
import { ZodError } from 'zod';
import { connection } from '@/config/db';

export async function GET() {
    try {
        const conn = await connection;

        const [rows] = await conn.query('SELECT * FROM schools');

        // TODO: For each school, get the image signed url from supabase and return the results

        return NextResponse.json(
            {
                schools: rows
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.error(error, { status: error.statusCode ?? 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        const validatedBody = saveSchoolDataSchema.parse(body);

        const { address, city, contact, email_id, image, name, state } =
            validatedBody;

        const conn = await connection;

        const [results] = await conn.execute(
            'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, address, city, state, contact, image, email_id]
        );

        return NextResponse.json(
            {
                schoolID: results.insertId
            },
            {
                status: 201
            }
        );
    } catch (error) {
        if (error instanceof ZodError)
            return NextResponse.json(
                error.issues.map(issue => issue.message).join(', '),
                { status: 400 }
            );

        return NextResponse.json(
            error.message ?? 'Failed to save school data!',
            { status: 500 }
        );
    }
}
