import packages from './packages';

export async function removePackages(conn: any): Promise<void> {
    console.log(`Deleting all data packages...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_package_procedures`);
    await conn.query(`DELETE FROM avalon.general_package`);
    console.log(`packages - all records deleted.`);
    return conn;
}

export async function importPackages(conn: any): Promise<void> {
    console.log(`Importing packages...`);
    //first we import packages
    const packageValues = packages
        .map(({ id, title }) => `(${id}, now(), now(), '${title}')`)
        .join();
    await conn.query(`INSERT INTO avalon.general_package (id, create_date, update_date, title) VALUES ${packageValues}`);
    //and then we add packages procedures
    const packageProceduresValues = packages
        .map(({ id, procedures }) => procedures.map(procedureId => `(${id}, ${procedureId})`))
        .join();
    await conn.query(`INSERT INTO avalon.general_package_procedures (package_id, procedure_id) VALUES ${packageProceduresValues}`);

    console.log(`packages import finished.`);
    return conn;
}