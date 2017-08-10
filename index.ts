const mysql = require('promise-mysql');
import { connect, disconnect } from './app/connection';
import { removePatients, importPatients } from './app/patients';

connect()
    .then(removeAllData)
    .then(importPatients)
    .then(disconnect)
    .then(() => process.exit());

export async function removeAllData(conn: any): Promise<void> {
    await removePatients(conn);
    return conn;
}