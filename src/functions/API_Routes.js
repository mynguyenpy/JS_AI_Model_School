import Express from 'express'
import dbClient from './dataBase_Client.js';
const API_router = Express.Router();

/*
  year = the target year
*/
API_router.get('/getAllSchool', (req, res) => {
  let { year = "0" } = req.query;
  let year_Int = parseInt(year);

  if (year_Int === 0) {
    res.status(404).send("404 Error no data.");
    return;
  }

  const query = `
    SELECT 
      "校系代碼" as id,
      "學校" as name
    FROM public."Data_${year_Int}"
  `;

  dbClient.query(query)
    .then(_res => {
      res.status(200).json({
        data: _res.rows
      });
    })
    .catch(err => {
      res.status(404).send("404 Error no data.");
    });
});

/*
  id = school id
*/
API_router.get('/getSchoolDeparts', (req, res) => {
  let { id } = req.query;
  let id_Int = parseInt(id);
  console.log(id);
  res.status(200);
  res.send(id_Int);
});

export default API_router;