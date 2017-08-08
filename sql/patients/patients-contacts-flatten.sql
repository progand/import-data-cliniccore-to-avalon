SELECT 
    id_cpatient,
    MAX(email) email,
    MAX(phone) phone,
    MAX(address) address
FROM
    (SELECT 
        id_cpatient, value email, NULL phone, NULL address
    FROM
        cliniccore.contact
    WHERE
        type = 'email' UNION SELECT 
        id_cpatient,
            NULL email,
            REPLACE(REPLACE(REPLACE(REPLACE(value, ' ', ''), '-', ''), '(', ''), ')', '') phone,
            NULL address
    FROM
        cliniccore.contact
    WHERE
        type = 'telephone' AND LENGTH(value) > 0 UNION SELECT 
        id_cpatient, NULL email, NULL phone, value address
    FROM
        cliniccore.contact
    WHERE
        type = 'address') c_computed
GROUP BY id_cpatient