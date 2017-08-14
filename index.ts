const mysql = require('promise-mysql');
import { connect, disconnect } from './app/connection';
import { removePatients, importPatients } from './app/patients';
import { removeEMRTypes, importEMRTypes } from './app/emrTypes';
import { removeInjectionSites, importInjectionSites } from './app/injectionSites';

connect()
    .then(removeAllData)
    .then(importPatients)
    .then(importEMRTypes)
    .then(importInjectionSites)
    .then(disconnect)
    .then(() => process.exit());

export async function removeAllData(conn: any): Promise<void> {
    await removePatients(conn);
    await removeEMRTypes(conn);
    await removeInjectionSites(conn);
    return conn;
}