import { radiologyEMRTypeId } from '../emrTypes/emrTypes';
import { textProcedureId } from '../templateEMRText/templateEMRText';
import { ctMotalityId, ptMotalityId } from '../modalities/modalities';
import {ctTemplateEMRRadiologyId, ptTemplateEMRRadiologyId} from '../templateEMRRadiology/templateEMRRadiology';
import {mZvUnitId} from '../units/units';

export async function removeEMRRadiology(conn: any): Promise<void> {
    console.log(`Deleting all data emrRadiology...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.radiology_emrradiology`);
    await conn.query(`DELETE FROM avalon.general_emrgeneral 
        WHERE procedure_id in (select id from avalon.general_procedure where emr_type_id=${radiologyEMRTypeId})`);
    try {
        await conn.query('alter table avalon.general_emrgeneral drop column import_id');
    } catch (e) { }
    console.log(`emrRadiology - all records deleted.`);
    return conn;
}

export async function importEMRRadiology(conn: any): Promise<void> {
    let query = '';
    console.log(`Importing emrRadiology...`);

    try {
        await conn.query('alter table avalon.general_emrgeneral add column import_id int;');
    } catch (e) { }
    //import CT records
    query = `INSERT INTO avalon.general_emrgeneral 
        (id, create_date, update_date, patient_id, creator_id, procedure_id, emr_package_id, import_id)
        SELECT 
            REPLACE(UUID(),'-',''),
            coalesce(r.study_date_time, now()),
            coalesce(r.study_date_time, now()),
            u.id,
            (select id from avalon.account_userprofile where username='admin' limit 1),
            ${ctTemplateEMRRadiologyId},    
            p.id,
            r.id
        FROM
            cliniccore.research r
                LEFT JOIN
            avalon.account_userprofile u ON r.id_patient = u.import_id
                LEFT JOIN 
            avalon.general_emrpackage p on r.id=p.import_id
        WHERE
            r.check_del != 'yes' and r.r_ct='так'`;
    console.log(` --- general EMR CT...`);
    await conn.query(query);

    query = `INSERT INTO avalon.radiology_emrradiology 
    (create_date, update_date, study_number, dose, study_date, emr_general_id, localization_id, modality_id, unit_id)
    SELECT 
        COALESCE(r.study_date_time, NOW()) create_date,
        COALESCE(r.study_date_time, NOW()) update_date,
        r.study_id study_number,
        ct.ct_dose,
        COALESCE(r.study_date_time, NOW()) study_date,
        g.id emr_general_id,
        null localization_id,
        ${ctMotalityId} modality_id,
        ${mZvUnitId} unit_id
    FROM
        cliniccore.research r
            LEFT JOIN
        avalon.general_emrgeneral g ON r.id = g.import_id
            LEFT JOIN
        cliniccore.ct ct ON r.id_ct = ct.id
    WHERE
        r.check_del != 'yes'
            AND g.procedure_id = ${ctTemplateEMRRadiologyId}`;
    console.log(` --- radiology EMR CT...`);
    console.log(await conn.query(query));

    console.log(`emrRadiology import finished.`);
    return conn;
}