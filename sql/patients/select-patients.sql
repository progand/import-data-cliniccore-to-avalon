SELECT 
    p.date_add date_joined,
    p.name first_name,
    p.last_name,
    u.email,
    p.language,
    p.birthday birthdate,
    CASE p.gender WHEN 'male' THEN 'M' WHEN 'female' THEN 'F' ELSE 'O' END gender,
    a.weight
FROM
    cliniccore.personal p
        LEFT JOIN
    (SELECT 
        MAX(data_record) data_record,
            id_anpatient,
            MAX(weight) weight,
            MAX(growth) growth
    FROM
        cliniccore.anthropometry
    GROUP BY id_anpatient) a ON p.id = a.id_anpatient
        LEFT JOIN
    (SELECT 
        *
    FROM
        cliniccore.user
    WHERE
        ban_user = 'no') u ON p.id = u.id_personal