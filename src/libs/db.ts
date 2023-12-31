import { createPool } from 'mysql2/promise'

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lucasbecerra.1',
  port: 3306,
  database: 'twitter_db'
})

export { pool }
