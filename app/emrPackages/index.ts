const fs = require('fs');

export async function removeEMRPackages(conn: any): Promise<void> {
    console.log(`Deleting all data emrPackages...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_emrpackage`);
    try {
        await conn.query('alter table avalon.general_emrpackage drop column import_id');
    } catch (e) { }
    console.log(`emrPackages - all records deleted.`);
    return conn;
}

export async function importEMRPackages(conn: any): Promise<void> {
    console.log(`Importing emrPackages...`);

    await conn.query('alter table avalon.general_emrpackage add column import_id int;');
    const query = fs.readFileSync('./app/emrPackages/importEMRPackages.sql', 'utf-8');
    await conn.query(query);

    console.log(`emrPackages import finished.`);
    return conn;
}