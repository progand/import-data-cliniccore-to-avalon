import { radiologyEMRTypeId } from '../emrTypes/emrTypes';
import { textProcedureId } from '../templateEMRText/templateEMRText';
import { ctMotalityId, ptMotalityId } from '../modalities/modalities';

export async function removeEMRText(conn: any): Promise<void> {
    console.log(`Deleting all data emrText...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.radiology_emrradiology`);
    await conn.query(`DELETE FROM avalon.general_emrgeneral 
        WHERE procedure_id in (select id from avalon.general_procedure where emr_type_id=${radiologyEMRTypeId})`);
    try {
        await conn.query('alter table avalon.general_emrgeneral drop column import_id');
    } catch (e) { }
    console.log(`emrText - all records deleted.`);
    return conn;
}

export async function importEMRText(conn: any): Promise<void> {
    console.log(`Importing emrText...`);

    try {
        await conn.query('alter table avalon.general_emrgeneral add column import_id int;');
    } catch (e) { }
    const insertGeneralQuery = ``;
    console.log(` --- general EMR...`);
    await conn.query(insertGeneralQuery);

    const insertTextQuery = ``;
    console.log(` --- radiology EMR...`);
    await conn.query(insertTextQuery);

    console.log(`emrText import finished.`);
    return conn;
}