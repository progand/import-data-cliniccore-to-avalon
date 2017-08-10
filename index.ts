const mysql = require('promise-mysql');
import { connect, disconnect } from './app/connection';
import { clearPatients, importPatients } from './app/patients';

connect()
    .then(clear)
    .then(importPatients)
    .then(disconnect)
    .then(() => process.exit());

export async function clear(conn: any): Promise<void> {
    await clearPatients(conn);
    return conn;
}