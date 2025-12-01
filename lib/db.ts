import {neon} from '@neondatabase/serverless';

 export async function getDbConnection() {
    if(!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT version()`;
  return response[0].version;
}