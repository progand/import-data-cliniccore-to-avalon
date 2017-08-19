import { textEMRTypeId } from '../emrTypes/emrTypes';
import { textProcedureId } from '../templateEMRText/templateEMRText';
import { ctMotalityId, ptMotalityId } from '../modalities/modalities';

export async function removeEMRText(conn: any): Promise<void> {
    console.log(`Deleting all data emrText...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.text_emrtext`);
    await conn.query(`DELETE FROM avalon.general_emrgeneral 
        WHERE procedure_id in (select id from avalon.general_procedure where emr_type_id=${textEMRTypeId})`);
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
    const insertGeneralQuery = `
    INSERT INTO avalon.general_emrgeneral 
    (id, create_date, update_date, patient_id, creator_id, procedure_id, emr_package_id, import_id)
    SELECT 
        REPLACE(UUID(),'-',''),
        coalesce(r.study_date_time, now()),
        coalesce(r.study_date_time, now()),
        u.id,
       (select id from avalon.account_userprofile where username='admin' limit 1),
        ${textProcedureId},    
       p.id,
       r.id
    FROM
        cliniccore.research r
            LEFT JOIN
        avalon.account_userprofile u ON r.id_patient = u.import_id
        LEFT JOIN 
        avalon.general_emrpackage p on r.id=p.import_id
        WHERE r.check_del != 'yes';
    `;
    console.log(` --- general EMR...`);
    await conn.query(insertGeneralQuery);

    const insertTextQuery = `
    INSERT INTO avalon.text_emrtext 
    (id, create_date, update_date, preliminary_data, report, conclusion, emr_general_id, modality_id)
    SELECT 
        r.id,
        COALESCE(r.study_date_time, NOW()) create_date,
        COALESCE(r.study_date_time, NOW()) update_date,
        r.referring_description preliminary_data,
        c.report,
        c.conclusion,
        g.id,   
        IF(r.id_study_description<11, ${ptMotalityId}, ${ctMotalityId}) modality_id
    FROM
        cliniccore.research r
            LEFT JOIN
        avalon.general_emrgeneral g ON r.id = g.import_id
            LEFT JOIN
        cliniccore.research_conclusion c ON r.id = c.idresearch
        where r.check_del != 'yes' and g.procedure_id=${textProcedureId}
    `;
    console.log(` --- text EMR...`);
    await conn.query(insertTextQuery);

    console.log(`emrText import finished.`);
    return conn;
}