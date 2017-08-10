SELECT 
    id_cpatient,
    MAX(email) email,
    MAX(LEFT(phone, 15)) phone,
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
        type = 'telephone'
            AND REPLACE(REPLACE(REPLACE(REPLACE(value, ' ', ''), '-', ''), '(', ''), ')', '') NOT IN (SELECT 
                phone
            FROM
                (SELECT 
                COUNT(id_cpatient) total,
                    type,
                    REPLACE(REPLACE(REPLACE(REPLACE(value, ' ', ''), '-', ''), '(', ''), ')', '') phone
            FROM
                cliniccore.contact
            GROUP BY type , phone
            HAVING total > 1
            ORDER BY total DESC) c01) UNION SELECT 
        id_cpatient, NULL email, NULL phone, value address
    FROM
        cliniccore.contact
    WHERE
        type = 'address') c_computed
GROUP BY id_cpatient