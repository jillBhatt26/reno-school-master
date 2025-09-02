import { NextResponse } from 'next/server';
import { saveSchoolDataSchema } from '@/lib/schemas/schools';
import { ZodError } from 'zod';
import { pool } from '@/config/db';
import { supabase } from '@/config/supabase';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM schools');

        const schools = await Promise.all(
            rows.map(async r => {
                const { data, error } = await supabase.storage
                    .from('images')
                    .createSignedUrl(r.image, 3600);

                return {
                    ...r,
                    image: data.signedUrl
                };
            })
        );

        return NextResponse.json(
            {
                schools
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

        const [results] = await pool.execute(
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
