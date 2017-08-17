insert into avalon.general_emrpackage
(id, create_date, update_date, preliminary_data, package_id, patient_id, creator_id)
SELECT 
    REPLACE(UUID(),'-',''),
    coalesce(r.study_date_time, now()),
    coalesce(r.study_date_time, now()),
    r.referring_description,
    coalesce(r.id_study_description, 13),
    u.id,
   (select id from avalon.account_userprofile where username='admin' limit 1)
FROM
    cliniccore.research r
        LEFT JOIN
    avalon.account_userprofile u ON r.id_patient = u.import_id;