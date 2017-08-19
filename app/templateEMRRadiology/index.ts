import { radiologyEMRTypeId } from '../emrTypes/emrTypes';
import templateEMRRadiology from './templateEMRRadiology';


export async function removeTemplateEMRRadiology(conn: any): Promise<void> {
    console.log(`Deleting all data templateEMRRadiology...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.radiology_templateemrradiology`);
    await conn.query(`DELETE FROM avalon.general_procedure where emr_type_id=${radiologyEMRTypeId}`);
    console.log(`templateEMRRadiology - all records deleted.`);
    return conn;
}

export async function importTemplateEMRRadiology(conn: any): Promise<void> {
    console.log(`Importing templateEMRRadiology...`);
    //first we create procedure records
    const procedureValues = templateEMRRadiology
        .map(({ id, title }) => `(${id}, now(), now(), '${title}', ${radiologyEMRTypeId})`)
        .join();
    await conn.query(`INSERT INTO avalon.general_procedure (id, create_date, update_date, title, emr_type_id)
    VALUES ${procedureValues}`);
    //and then we add templateemrdrug records
    const templateValues = templateEMRRadiology
        .map(({ id, title, modalityId }) => `(${id}, now(), now(), ${modalityId}, ${id})`)
        .join();
    await conn.query(`INSERT INTO avalon.radiology_templateemrradiology 
        (id, create_date, update_date, modality_id, procedure_id)
        VALUES ${templateValues}`);    

    console.log(`templateEMRRadiology import finished.`);
    return conn;
}