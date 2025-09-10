import { Client } from 'pg';
import SchoolQueue from '../objects/schoolQueue.js'

export default class SchoolDB_Client {
  dbClient = null;
  SchoolQueue = new SchoolQueue();

  async createClient() {
    const client = new Client({
      host : 'localhost',
      user: 'postgres',
      password: 'aaren007',
      database: 'School_Test',
      port: 5432,
    });
    this.dbClient = client;
    await client.connect().then(() => console.log("CONNECTED"));
  }

  //- Get DB school
  async getDBSchool() {
    const query = `
      SELECT 
        "校系代碼" as ID,
        "學校" as name,
        "正備取有效性" as posvalid
      FROM public."Data_111"
      where "正備取有效性" != 0
      LIMIT 50
    `;
    let _client = this.dbClient;
    let _res = await _client.query(query);

    _res.rows.forEach(obj => {
      //- Add to school
      if (obj) {
        this.SchoolQueue.AddSchool(obj);
      };
    });

    return this.SchoolQueue;
  }
}