import types from './injectionWays';

export async function removeInjectionWays(conn: any): Promise<void> {
    console.log(`Deleting all data injection ways...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_injectionway`);
    console.log(`injection ways - all records deleted.`);
    return conn;
}

export async function importInjectionWays(conn: any): Promise<void> {
    console.log(`Importing injection ways...`);

    const values = types
        .map(({ id, title }) => `(${id}, now(), now(), '${title}')`)
        .join();
    const query = `INSERT INTO avalon.general_injectionway (id, create_date, update_date, title) VALUES ${values}`;
    await conn.query(query);

    console.log(`injection ways import finished.`);
    return conn;
}