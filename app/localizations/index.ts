
export async function removeLocalizations(conn: any): Promise<void> {
    console.log(`Deleting all data localizations...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_localization`);
    console.log(`localizations - all records deleted.`);
    return conn;
}

export async function importLocalizations(conn: any): Promise<void> {
    console.log(`Importing localizations...`);
   
    const query = `INSERT INTO avalon.general_localization (id, create_date, update_date, title) select id, now(), now(), localization_name from cliniccore.referring_localization`;
    await conn.query(query);

    console.log(`localizations import finished.`);
    return conn;
}