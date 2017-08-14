
export async function removeModalities(conn: any): Promise<void> {
    console.log(`Deleting all data modalities...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_modality`);
    console.log(`modalities - all records deleted.`);
    return conn;
}

export async function importModalities(conn: any): Promise<void> {
    console.log(`Importing modalities...`);
   
    const query = `INSERT INTO avalon.general_modality (id, create_date, update_date, title) select id, now(), now(), modality_name from cliniccore.modality`;
    await conn.query(query);

    console.log(`modalities import finished.`);
    return conn;
}