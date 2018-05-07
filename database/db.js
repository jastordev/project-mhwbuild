const config = require("./config");
const sql = require("mssql");

var exports = module.exports = {};

// Perform query provided as parameter. NOTE: Maybe change this, not sure how
// safe it is...
exports.query = async function(queryStr){

  try{
    let pool = await new sql.ConnectionPool(config.conStr).connect();
    let result = await pool.request().query(queryStr);

    pool.close();
    return result.recordset;
  } catch (err) {
    console.log(err);
    pool.close();
  }

  sql.on('error', err => {
    if(err) console.log(err);
  });

}
