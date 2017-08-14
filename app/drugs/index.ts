
export async function removeDrugs(conn: any): Promise<void> {
    console.log(`Deleting all data drugs...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_drug`);
    console.log(`drugs - all records deleted.`);
    return conn;
}

export async function importDrugs(conn: any): Promise<void> {
    console.log(`Importing drugs...`);

    const query = `INSERT INTO avalon.general_drug (id, create_date, update_date, title, international_title)
        SELECT 
            id, NOW(), NOW(), oral_contrast_name, oral_contrast_name
        FROM
            cliniccore.oral_contrast_type 
        UNION SELECT 
            10 + id AS id,
            NOW(),
            NOW(),
            i_v_contrast_type_name,
            i_v_contrast_type_name
        FROM
            cliniccore.i_v_contrast_type;`;
    await conn.query(query);

    console.log(`drugs import finished.`);
    return conn;
}