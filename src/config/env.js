export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const BASE_URL = process.env.BASE_URL ?? 'localhost:3000';
export const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
export const SUPABASE_KEY = process.env.SUPABASE_KEY ?? '';
export const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME ?? '';
export const MYSQL_USERNAME = process.env.MYSQL_USERNAME ?? '';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD ?? '';
export const MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME ?? '';
export const MYSQL_PORT = process.env.MYSQL_PORT ?? '3306';

export let API_URL = `http://${BASE_URL}/api`;

if (NODE_ENV === 'production' && process.env.VERCEL_URL)
    API_URL = `https://${BASE_URL}/api`;
