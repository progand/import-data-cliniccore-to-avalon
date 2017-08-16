import {textEMRTypeId} from '../emrTypes/emrTypes';

export async function removeTextEMRs(conn: any): Promise<void> {
    console.log(`Deleting all data textEMRs...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.text_emrtext`);
    await conn.query(`DELETE FROM avalon.general_emrgeneral 
        WHERE procedure_id in (select id from avalon.general_procedure where emr_type_id=${textEMRTypeId})`);
    console.log(`textEMRs - all records deleted.`);
    return conn;
}

export async function importTextEMRs(conn: any): Promise<void> {
    console.log(`Importing textEMRs...`);
   
    const query = `INSERT INTO avalon.general_modality (id, create_date, update_date, title) select id, now(), now(), modality_name from cliniccore.modality`;
    await conn.query(query);

    console.log(`textEMRs import finished.`);
    return conn;
}