import emrTypes from '../emrTypes/emrTypes';
import injectionWays from '../injectionWays/injectionWays';
const _ = require('lodash');

const drugEMRTypeId = _.find(emrTypes, { title: 'emr_drug' }).id;
if (_.isUndefined(drugEMRTypeId))
    throw new Error('Cant find emr_drug in /app/emrTypes/emrTypes');

const enteralInjectionWayId = _.find(injectionWays, { title: 'ентеральний' }).id;
const parenteralInjectionWayId = _.find(injectionWays, { title: 'парентеральний' }).id;
if (_.isUndefined(enteralInjectionWayId) || _.isUndefined(parenteralInjectionWayId))
    throw new Error('Cant find injection ways in /app/injectionWays/injectionWays');

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
    await conn.query(`INSERT INTO avalon.general_procedure (id, create_date, update_date, title, emr_type_id)
        SELECT 
            100+id, NOW(), NOW(), CONCAT('Контраст ентеральний - ', oral_contrast_name), ${drugEMRTypeId}
        FROM
            cliniccore.oral_contrast_type
    `);
    //and then we add templateemrdrug records
    await conn.query(`INSERT INTO avalon.drug_templateemrdrug 
        (id, create_date, update_date, drug_id, injection_way_id, procedure_id, unit_dose_id, unit_feed_rate_id, unit_volume_id)
        SELECT 
            id, NOW(), NOW(), id, ${enteralInjectionWayId}, 100+id, null, null, null
        FROM
            cliniccore.oral_contrast_type`);

    //parenteral contrast
    //procedures with id=100+drug_id
    await conn.query(`INSERT INTO avalon.general_procedure (id, create_date, update_date, title, emr_type_id)
        SELECT 
            110+id, NOW(), NOW(), CONCAT('Контраст парентеральний - ', i_v_contrast_type_name), ${drugEMRTypeId}
        FROM
            cliniccore.i_v_contrast_type
    `);
    await conn.query(`INSERT INTO avalon.drug_templateemrdrug 
        (id, create_date, update_date, drug_id, injection_way_id, procedure_id, unit_dose_id, unit_feed_rate_id, unit_volume_id)
        SELECT 
            10 + id,  NOW(), NOW(), 10 + id, ${parenteralInjectionWayId}, 110+id, null, null, null
        FROM
            cliniccore.i_v_contrast_type;`);

    console.log(`templateEMRDrugs import finished.`);
    return conn;
}