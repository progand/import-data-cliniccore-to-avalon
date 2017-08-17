const fs = require('fs');

export async function removeEMRPackages(conn: any): Promise<void> {
    console.log(`Deleting all data emrPackages...`);
    // perform deleting here    
    await conn.query(`DELETE FROM avalon.general_emrpackage`);
    console.log(`emrPackages - all records deleted.`);
    return conn;
}

export async function importEMRPackages(conn: any): Promise<void> {
    console.log(`Importing emrPackages...`);
   
    const query = fs.readFileSync('./app/emrPackages/importEMRPackages.sql', 'utf-8');
    await conn.query(query);

    console.log(`emrPackages import finished.`);
    return conn;
}