insert into avalon.account_userprofile 
(
id, username,password, is_superuser,is_staff,is_active,pin_code,service_info, sign_pic,
date_joined, first_name, last_name, email, language, birthdate, gender, weight, phone, current_residence_address, business_address, import_id
)
SELECT 
	REPLACE(UUID(),'-',''), concat('user-', p.id), '', 0, 0, 0, '', '', '',
    p.date_add date_joined,
    p.name first_name,
    p.last_name,
    COALESCE(u.email, c.email, '') email,
    p.language,
    p.birthday birthdate,
    CASE p.gender
        WHEN 'male' THEN 'M'
        WHEN 'female' THEN 'F'
        ELSE 'O'
    END gender,
    a.weight,
    c.phone,
    c.address,
    c.address,
    p.id
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
        LEFT JOIN
    (SELECT 
        id_cpatient,
            MAX(email) email,
            MAX(left(phone, 15)) phone,
            MAX(address) address
    FROM
        (SELECT 
        id_cpatient, value email, NULL phone, NULL address
    FROM
        cliniccore.contact
    WHERE
        type = 'email' UNION SELECT 
        id_cpatient, NULL email, REPLACE(REPLACE(REPLACE(REPLACE(value, ' ', ''), '-', ''), '(', ''), ')', '') phone, NULL address
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
    GROUP BY id_cpatient) c ON p.id = c.id_cpatient