export async function removeEMRPackages(conn: any): Promise<void> {
    console.log(`Deleting all data emrPackages...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_emrpackage`);
    console.log(`emrPackages - all records deleted.`);
    return conn;
}

export async function importEMRPackages(conn: any): Promise<void> {
    console.log(`Importing emrPackages...`);
   
    const query = `INSERT INTO avalon.general_modality (id, create_date, update_date, title) select id, now(), now(), modality_name from cliniccore.modality`;
    await conn.query(query);

    console.log(`emrPackages import finished.`);
    return conn;
}