import mysql from 'mysql'
import keys from './keys'

const pool = mysql.createPool(keys.database);

pool.getConnection((err:any, connection:any) => {
    if (err) throw err;
    connection.release();
    console.log('Database is online');
})

export default pool;