import types from './emrTypes';

export async function removeEMRTypes(conn: any): Promise<void> {
    console.log(`Deleting all data emrtypes...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_emrtype`);
    console.log(`emrtypes - all records deleted.`);
    return conn;
}

export async function importEMRTypes(conn: any): Promise<void> {
    console.log(`Importing emrtypes...`);

    const values = types
        .map(({ id, title, related_name }) => `(${id}, now(), now(), '${title}', '${related_name}')`)
        .join();
    const query = `INSERT INTO avalon.general_emrtype (id, create_date, update_date, title, related_name) VALUES ${values}`;
    console.log(query);
    await conn.query(query);

    console.log(`emrtypes import finished.`);
    return conn;
}