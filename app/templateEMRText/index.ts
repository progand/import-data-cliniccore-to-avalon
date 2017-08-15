import templateEMRText from './templateEMRText';

export async function removeTemplateEMRText(conn: any): Promise<void> {
    console.log(`Deleting all data templates emr text...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.text_templateemrtext`);
    await conn.query(`DELETE FROM avalon.general_procedure where emr_type_id=${templateEMRText.emrTypeId}`);
    console.log(`templates emr text - all records deleted.`);
    return conn;
}

export async function importTemplateEMRText(conn: any): Promise<void> {
    console.log(`Importing templates emr text...`);

    const { id, title, emrTypeId } = templateEMRText;
    await conn.query(`INSERT INTO avalon.general_procedure 
        (id, create_date, update_date, title, emr_type_id) 
    VALUES 
        (${id}, now(), now(), '${title}', '${emrTypeId}')`);
     await conn.query(`INSERT INTO avalon.text_templateemrtext 
        (id, create_date, update_date, procedure_id)
    VALUES 
        (1,  NOW(), NOW(), ${id})`);

    console.log(`templates emr text import finished.`);
    return conn;
}