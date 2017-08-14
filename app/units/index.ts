import types from './units';

export async function removeUnits(conn: any): Promise<void> {
    console.log(`Deleting all data units...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_unit`);
    console.log(`units - all records deleted.`);
    return conn;
}

export async function importUnits(conn: any): Promise<void> {
    console.log(`Importing units...`);

    const values = types
        .map(({ id, title, internationalTitle }) => `(${id}, now(), now(), '${title}', '${internationalTitle}')`)
        .join();
    const query = `INSERT INTO avalon.general_unit (id, create_date, update_date, title, international_title) VALUES ${values}`;
    await conn.query(query);

    console.log(`units import finished.`);
    return conn;
}