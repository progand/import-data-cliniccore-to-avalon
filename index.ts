const mysql = require('promise-mysql');
import { connect, disconnect } from './app/connection';
import { removePatients, importPatients } from './app/patients';
import { removeEMRTypes, importEMRTypes } from './app/emrTypes';
import { removeInjectionSites, importInjectionSites } from './app/injectionSites';
import { removeInjectionWays, importInjectionWays } from './app/injectionWays';
import { removeDrugs, importDrugs } from './app/drugs';
import { removeUnits, importUnits } from './app/units';
import { removeLocalizations, importLocalizations } from './app/localizations';
import { removeModalities, importModalities } from './app/modalities';
import { removeTemplateEMRDrugs, importTemplateEMRDrugs } from './app/templateEMRDrugs';

connect()
    .then(removeAllData)
    .then(importEMRTypes)
    .then(importInjectionSites)
    .then(importInjectionWays)
    .then(importDrugs)
    .then(importUnits)
    .then(importLocalizations)
    .then(importModalities)
    .then(importTemplateEMRDrugs)
    .then(importPatients)
    .then(disconnect)
    .then(() => process.exit());

export async function removeAllData(conn: any): Promise<void> {
    await removeTemplateEMRDrugs(conn);
    await removePatients(conn);
    await removeEMRTypes(conn);
    await removeInjectionSites(conn);
    await removeInjectionWays(conn);
    await removeDrugs(conn);
    await removeUnits(conn);
    await removeLocalizations(conn);
    await removeModalities(conn);
    return conn;
}