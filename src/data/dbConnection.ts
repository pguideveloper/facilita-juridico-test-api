import { Client } from 'pg';
import { env } from '@/app/config/env';

const client = new Client({
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  database: env.DATABASE_NAME,
});

async function connect() {
  try {
    await client.connect();
    console.log('PostgreSQL connected successfully');
  } catch (error) {
    console.error(`PostgreSQL connection failed: ${error}`);
  }
}

export { client, connect };
