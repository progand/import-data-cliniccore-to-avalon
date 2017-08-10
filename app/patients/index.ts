const fs = require('fs');

export async function clearPatients(conn: any): Promise<void> {
    console.log(`Deleting all data from all tables except admin account...`);
    await conn.query(`use avalon;`);

    // perform deleting here
    await conn.query(`DELETE FROM account_userprofile where is_superuser!=1`);

    console.log(`All records deleted.`);
    return conn;
}

export async function importPatients(conn: any): Promise<void> {
    console.log(`Importing patients...`);
    const copyPatientsQueryText = fs.readFileSync('./app/patients/sql/copy-patients.sql', 'utf-8');
    await conn.query(copyPatientsQueryText);
    console.log('Patients have been imported successfully.');
    return conn;
}