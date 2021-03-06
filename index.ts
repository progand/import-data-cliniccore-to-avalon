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
import { removeTemplateEMRRadiology, importTemplateEMRRadiology } from './app/templateEMRRadiology';
import { removeTemplateEMRDrugs, importTemplateEMRDrugs } from './app/templateEMRDrugs';
import { removeTemplateEMRText, importTemplateEMRText } from './app/templateEMRText';
import { removePackages, importPackages} from './app/packages';
import { removeEMRPackages, importEMRPackages} from './app/emrPackages';
import { removeEMRRadiology, importEMRRadiology} from './app/emrRadiology';
import { removeEMRText, importEMRText} from './app/emrText';

connect()
    .then(removeAllData)
    .then(importEMRTypes)
    .then(importInjectionSites)
    .then(importInjectionWays)
    .then(importDrugs)
    .then(importUnits)
    .then(importLocalizations)
    .then(importModalities)
    .then(importTemplateEMRRadiology)
    .then(importTemplateEMRDrugs)
    .then(importTemplateEMRText)
    .then(importPackages)
    .then(importPatients)
    .then(importEMRPackages) 
    .then(importEMRRadiology)      
    .then(importEMRText)      
    .then(disconnect)
    .then(() => process.exit());

export async function removeAllData(conn: any): Promise<void> {
    await removeEMRText(conn);
    await removeEMRRadiology(conn);
    await removeEMRPackages(conn);
    await removePatients(conn);
    await removePackages(conn);
    await removeTemplateEMRText(conn);
    await removeTemplateEMRDrugs(conn);
    await removeTemplateEMRRadiology(conn);
    await removeEMRTypes(conn);
    await removeInjectionSites(conn);
    await removeInjectionWays(conn);
    await removeDrugs(conn);
    await removeUnits(conn);
    await removeLocalizations(conn);
    await removeModalities(conn);
    return conn;
}