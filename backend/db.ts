import * as dotenv from 'dotenv';
import PG from 'pg';
const Pool = PG.Pool;

dotenv.config();

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    database: process.env.DATABASE,
});

export default pool;
