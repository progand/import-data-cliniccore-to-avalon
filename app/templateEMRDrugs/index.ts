import { drugEMRTypeId } from '../emrTypes/emrTypes';
import { enteralInjectionWayId, parenteralInjectionWayId } from '../injectionWays/injectionWays';
import templateEMRDrugs from './templateEMRDrugs';

export async function removeTemplateEMRDrugs(conn: any): Promise<void> {
    console.log(`Deleting all data templateEMRDrugs...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.drug_templateemrdrug`);
    await conn.query(`DELETE FROM avalon.general_procedure where emr_type_id=${drugEMRTypeId}`);
    console.log(`templateEMRDrugs - all records deleted.`);
    return conn;
}

export async function importTemplateEMRDrugs(conn: any): Promise<void> {
    console.log(`Importing templateEMRDrugs...`);
    //enteral contrast
    //first we create procedure records with id=100+drug_id
    const procedureValues = templateEMRDrugs
        .map(({ id, title }) => `(${id}, now(), now(), '${title}', ${drugEMRTypeId})`)
        .join();
    await conn.query(`INSERT INTO avalon.general_procedure (id, create_date, update_date, title, emr_type_id)
        VALUES ${procedureValues}
    `);
    //and then we add templateemrdrug records
    const templateValues = templateEMRDrugs
        .map(({ id, title, injection_way_id }) => `(${id%100}, now(), now(), null, ${injection_way_id}, ${id}, null, null, null)`)
        .join();
    await conn.query(`INSERT INTO avalon.drug_templateemrdrug 
        (id, create_date, update_date, drug_id, injection_way_id, procedure_id, unit_dose_id, unit_feed_rate_id, unit_volume_id)
        VALUES ${templateValues}`);

    console.log(`templateEMRDrugs import finished.`);
    return conn;
}