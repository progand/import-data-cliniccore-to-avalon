const mysql = require('promise-mysql');
import dbSettings from '../../config/db';

export async function connect(): Promise<void> {
    console.log(`Connecting to ${dbSettings.host} as ${dbSettings.user} using password *****`);
    const conn = await mysql.createConnection(dbSettings);
    console.log(`Yay! Connected!`);
    await conn.query(`SET SQL_SAFE_UPDATES=0`);
    return conn;
}

export async function disconnect(conn: any): Promise<void> {
    await conn.query(`SET SQL_SAFE_UPDATES=1`);
    console.log(`Disconnecting from ${dbSettings.host} as ${dbSettings.user} using password ****`);
    await conn.end();
    console.log(`Disconnected`);
    return conn;
}