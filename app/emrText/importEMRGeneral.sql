DELETE FROM avalon.general_emrgeneral;

INSERT INTO avalon.general_emrgeneral 
(id, create_date, update_date, patient_id, creator_id, procedure_id, emr_package_id, import_id)
SELECT 
    REPLACE(UUID(),'-',''),
    coalesce(r.study_date_time, now()),
    coalesce(r.study_date_time, now()),
    u.id,
    (select id from avalon.account_userprofile where username='admin' limit 1),
    201,    
    p.id,
    r.id
FROM
    cliniccore.research r
        LEFT JOIN
    avalon.account_userprofile u ON r.id_patient = u.import_id
        LEFT JOIN 
    avalon.general_emrpackage p on r.id=p.import_id;
