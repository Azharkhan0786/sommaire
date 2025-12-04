import { neon } from "@neondatabase/serverless";

export function getDbConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  // return the database client function
  return neon(process.env.DATABASE_URL);
}
