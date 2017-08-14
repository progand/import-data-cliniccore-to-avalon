
export async function removeInjectionSites(conn: any): Promise<void> {
    console.log(`Deleting all data injection sites...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_injectionsite`);
    console.log(`injection sites - all records deleted.`);
    return conn;
}

export async function importInjectionSites(conn: any): Promise<void> {
    console.log(`Importing injection sites...`);
   
    const query = `INSERT INTO avalon.general_injectionsite (id, create_date, update_date, title) select id, now(), now(), injection_name from cliniccore.injection_site`;
    console.log(query);
    await conn.query(query);

    console.log(`injection sites import finished.`);
    return conn;
}