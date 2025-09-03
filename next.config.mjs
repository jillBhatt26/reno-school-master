/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.VERCEL_URL || 'localhost:3000',
        SUPABASE_URL: process.env.SUPABASE_URL || '',
        SUPABASE_KEY: process.env.SUPABASE_KEY || '',
        MYSQL_DB_NAME: process.env.MYSQL_DB_NAME || '',
        MYSQL_USERNAME: process.env.MYSQL_USERNAME || '',
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
        MYSQL_HOSTNAME: process.env.MYSQL_HOSTNAME || '',
        MYSQL_PORT: process.env.MYSQL_PORT || 3306
    }
};

export default nextConfig;
