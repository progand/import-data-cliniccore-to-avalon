DELETE FROM avalon.text_emrtext;

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
    IF(r.id_study_description<11, 2, 1) modality_id
FROM
    cliniccore.research r
        LEFT JOIN
    avalon.general_emrgeneral g ON r.id = g.import_id
        LEFT JOIN
    cliniccore.research_conclusion c ON r.id = c.idresearch;