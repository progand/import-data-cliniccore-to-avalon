const mysql = require('promise-mysql');
const fs = require('fs');
import dbSettings from './config/db';

connect()
    .then(clear)
    .then(importPatients)
    .then(disconnect)
    .then(() => process.exit());

async function importPatients(conn: any): Promise<void> {
    console.log(`Importing patients...`);
    const copyPatientsQueryText = fs.readFileSync('./sql/patients/copy-patients.sql', 'utf-8');
    await conn.query(copyPatientsQueryText);    
    console.log('Patients have been imported successfully.');
    return conn;
}

async function clear(conn: any): Promise<void> {
    console.log(`Deleting all data from all tables except admin account...`);
    await conn.query(`use avalon;`);    
    
    // perform deleting here
    await conn.query(`DELETE FROM account_userprofile where is_superuser!=1`);
    
    console.log(`All records deleted.`);
    return conn;
}

async function connect(): Promise<void> {
    console.log(`Connecting to ${dbSettings.host} as ${dbSettings.user} using password ${dbSettings.password}`);
    const conn = await mysql.createConnection(dbSettings);
    console.log(`Yay! Connected!`);
    await conn.query(`SET SQL_SAFE_UPDATES=0`);
    return conn;
}

async function disconnect(conn: any): Promise<void> {
    await conn.query(`SET SQL_SAFE_UPDATES=1`);
    console.log(`Disconnecting from ${dbSettings.host} as ${dbSettings.user} using password ${dbSettings.password}`);
    await conn.end();
    console.log(`Disconnected`);
    return conn;
}