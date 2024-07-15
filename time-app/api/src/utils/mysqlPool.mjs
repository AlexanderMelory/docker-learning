import mysql from 'mysql2'

const MYSQL_HOST = process.env.MY_SQL_HOST || 'mysql'
const MYSQL_USER = process.env.MY_SQL_USER || 'root'
const MYSQL_PORT = process.env.MY_SQL_PORT || '3306'
const MYSQL_PASSWORD = process.env.MY_SQL_PASSWORD || 'password'
const MYSQL_DB = process.env.MY_SQL_DB || 'admin'

console.log(process.env)

const pool = mysql.createPool({
    connectionLimit: 100,
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB,
})

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

pool.getConnection((err, connection) => {
    if (!err) {
        console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
        const createTimeTable = CREATE_TIMES_TABLE_SQL
        connection.query(createTimeTable, (err) => {
            if (!err) {
                console.log('Times table was created')
            }
        })
        connection.release()
    }
})

export default pool
