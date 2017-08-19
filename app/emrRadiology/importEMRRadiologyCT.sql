DELETE FROM avalon.radiology_emrradiology;

INSERT INTO avalon.radiology_emrradiology 
(create_date, update_date, study_number, dose, study_date, emr_general_id, localization_id, modality_id, unit_id)
SELECT 
    COALESCE(r.study_date_time, NOW()) create_date,
    COALESCE(r.study_date_time, NOW()) update_date,
    r.study_id study_number,
    ct.ct_dose,
    COALESCE(r.study_date_time, NOW()) study_date,
    g.id emr_general_id,
    null localization_id,
    1 modality_id,
    1 unit_id
FROM
    cliniccore.research r
        LEFT JOIN
    avalon.general_emrgeneral g ON r.id = g.import_id
        LEFT JOIN
    cliniccore.ct ct ON r.id_ct = ct.id
WHERE
    r.check_del != 'yes'
        AND g.procedure_id = 1;