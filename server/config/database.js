import pg from 'pg'
import 'dotenv/config'

// Render Postgres requires SSL. Set PGSSL=false in server/.env to connect
// to a plain local Postgres while developing.
const useSSL = process.env.PGSSL !== 'false'

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: useSSL ? { rejectUnauthorized: false } : false
}

export const pool = new pg.Pool(config)
