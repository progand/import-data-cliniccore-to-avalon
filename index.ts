const mysql = require('promise-mysql');
import { connect, disconnect } from './app/connection';
import { removePatients, importPatients } from './app/patients';
import { removeEMRTypes, importEMRTypes } from './app/emrTypes';

connect()
    .then(removeAllData)
    .then(importPatients)
    .then(importEMRTypes)
    .then(disconnect)
    .then(() => process.exit());

export async function removeAllData(conn: any): Promise<void> {
    await removePatients(conn);
    await removeEMRTypes(conn);
    return conn;
}