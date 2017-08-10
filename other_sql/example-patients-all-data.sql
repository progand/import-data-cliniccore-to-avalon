SELECT 
    research.*,
    personal.*,
    study_description.*,
    referring_localization.*,
    referring_pathology.*,
    contrast.*,
    oral_contrast_type.*,
    i_v_contrast_type.*,
    injection_site.*,
    ct.*,
    pet.*,
    radiopharmaceutcals.*,
    research_conclusion.*
FROM
    cliniccore.research research
        LEFT JOIN
    cliniccore.personal personal ON research.id_patient = personal.id
        LEFT JOIN
    cliniccore.study_description study_description ON research.id_study_description = study_description.id
    LEFT JOIN
    cliniccore.referring_localization referring_localization ON research.id_referring_localization = referring_localization.id
        LEFT JOIN
    cliniccore.referring_pathology referring_pathology ON research.id_referring_pathologi = referring_pathology.id
    
    
        LEFT JOIN
    cliniccore.contrast contrast ON research.id_contrast = contrast.id
    LEFT JOIN
    cliniccore.`oral_contrast_type` `oral_contrast_type` ON contrast.id_oral_contrast_type = oral_contrast_type.id
    LEFT JOIN
    cliniccore.`i_v_contrast_type` `i_v_contrast_type` ON contrast.id_i_v_contrast_type = i_v_contrast_type.id
    LEFT JOIN
    cliniccore.`injection_site` `injection_site` ON contrast.id_injection_site = injection_site.id
    
     LEFT JOIN
    cliniccore.ct ct ON research.id_ct = ct.id
     LEFT JOIN
    cliniccore.pet pet ON research.id_pet = pet.id
    LEFT JOIN
    cliniccore.`radiopharmaceutcals` `radiopharmaceutcals` ON pet.id_radiopharmaceuticals = radiopharmaceutcals.id
     LEFT JOIN
    cliniccore.research_conclusion research_conclusion ON research.id = research_conclusion.idresearch
WHERE
    research.id IN (2 , 30, 1568, 1860, 1861);