const fs = require('fs');

export async function removePatients(conn: any): Promise<void> {
    console.log(`Deleting all data from all tables except admin account...`);
    // perform deleting here
    try {
        await conn.query('alter table avalon.account_userprofile drop column import_id');
    } catch (e) { }
    await conn.query(`DELETE FROM avalon.account_userprofile where is_superuser!=1`);
    console.log(`All records deleted.`);
    return conn;
}

export async function importPatients(conn: any): Promise<void> {
    console.log(`Importing patients...`);
    await conn.query('alter table avalon.account_userprofile add column import_id int;');
    const copyPatientsQueryText = fs.readFileSync('./app/patients/sql/copy-patients.sql', 'utf-8');
    await conn.query(copyPatientsQueryText);
    console.log('Patients have been imported successfully.');
    return conn;
}