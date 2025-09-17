import { Client } from 'pg';
import SchoolQueue from '../objects/schoolQueue.js'

//- Make sure DB is connected
let dbClient = null;
if (!dbClient) {
  console.log("Connecting Database...");

  dbClient = new Client({
    host : 'localhost',
    user: 'postgres',
    password: process.env.DB_PW,
    database: 'School_Test',
    port: 5432,
  });
  dbClient.connect()
    .then(() => console.log("\x1b[42mDatabase Connected.\x1b[0m"))
    .catch(e => { //- The error is "AggregateError"
      console.log(`\x1b[41mCannot connect to Database !!\x1b[0m`);
      e.errors.forEach(x =>{
        console.error(`Database Error - \"\x1b[31m${x.message}\x1b[0m\"`);
      });
    });
}

export default dbClient;
export class SchoolDB_Client {
  SchoolQueue = new SchoolQueue();

  //- Get DB school
  async getDBSchool() {
    const query = `
      SELECT 
        "校系代碼" as id,
        "學校" as name,
        "正備取有效性" as posvalid
      FROM public."Data_111"
      where "正備取有效性" != 0
      LIMIT 50
    `;
    let _res = await dbClient.query(query);

    //- Add to school
    _res.rows.forEach(obj => {
      if (obj) {
        this.SchoolQueue.AddSchool(obj);
      };
    });

    return this.SchoolQueue;
  }
}