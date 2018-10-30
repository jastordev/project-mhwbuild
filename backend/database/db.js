const config = require("./config");
const sql = require("mssql");

var exports = module.exports = {};

// Perform query provided as parameter. NOTE: Maybe change this, not sure how
// safe it is...
exports.query = async function(queryStr){
  try {
    let pool = await new sql.ConnectionPool(config).connect();
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

// Query to add a particular item to the db
exports.addEntry = async function(item, tableName){
  try {
    let pool = await new sql.ConnectionPool(config).connect();
    let req = pool.request();
    let query = `INSERT INTO ${tableName} ${paramaterizeQueryForValues(req, item)}; SELECT SCOPE_IDENTITY() AS id;`
    req = await req.query(query);
    pool.close();
    return req.recordset;   
  } catch (err) {
    console.log(err);
    pool.close();
  }

  sql.on('error', err => {
    if(err) console.log(err);
  });
}

// Query to remove an item with a particular id
exports.removeEntry = async function(ids, tableName) {
  try {
    let pool = await new sql.ConnectionPool(config).connect();
    let req = pool.request();
    let query = `DELETE FROM ${tableName} WHERE ${parameterizeQueryForIn(req, 'ID', 'id', sql.Int, ids)}`;
    req = await req.query(query);
    pool.close();
    return req.recordset;   
  } catch (err) {
    console.log(err);
    pool.close();
  }

  sql.on('error', err => {
    if(err) console.log(err);
  });
}

// HELPER FUNCTIONS BELOW
// ===========================================
let parameterizeQueryForIn = function(req, columnName, parameterNamePrefix, type, values) {
  var parameterNames = [];
  for (var i = 0; i < values.length; i++) {
    var parameterName = parameterNamePrefix + i;
    req.input(parameterName, type, values[i]);
    parameterNames.push(`@${parameterName}`);
  }
  return `${columnName} IN (${parameterNames.join(',')})`;
}

// Generates a dynamic query according to the key-value pairs in the provided object.
// obj's keys MUST be the columns for the associated table.
let paramaterizeQueryForValues = function(req, obj) {
  var parameterNames = [];
  let columns = Object.keys(obj);
  for (let column of columns) {
    req.input(column, obj[column]);
    parameterNames.push(`@${column}`);
  }
  return `(${columns.join(',')}) VALUES (${parameterNames.join(',')})`;
}
