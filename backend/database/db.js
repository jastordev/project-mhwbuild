const config = require("./config");
const sql = require("mssql");

var exports = module.exports = {};

// Perform query provided as parameter. NOTE: Maybe change this, not sure how
// safe it is...
exports.query = async function(queryStr){

  try{
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
exports.addItem = async function(item){
  try{
    let pool = await new sql.ConnectionPool(config).connect();
    let result = await pool.request()
      .input("Type", item.Type)
      .input("Name", item.Name)
      .input("Desc", item.Description)
      .input("Rare", item.Rarity)
      .input("BuyP", item.BuyPrice)
      .input("SellP", item.SellPrice)
      .input("Carry", item.Carry)
      .input("Obtn", item.ObtainedFrom)
      .input("SkillID", item.SkillID)
      .input("JwlLvl", item.JewelLevel)
      .input("IconUrl", item.IconPath)
      .query("INSERT INTO Items (Type, Name, Description, Rarity, BuyPrice,"
        +" SellPrice, Carry, ObtainedFrom, SkillID, JewelLevel, IconPath) " +
        "VALUES (@Type, @Name, @Desc, @Rare, @BuyP, @SellP, @Carry, @Obtn,"
        +"@SkillId, @JwlLvl, @IconUrl); SELECT SCOPE_IDENTITY() AS id;"); 

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

// Query to remove an item with a particular id
exports.removeItem = async function(ids) {
  try{
    let idArray = ids.split(',');
    let pool = await new sql.ConnectionPool(config).connect();
    let req = pool.request();
    let query = 'DELETE FROM Items WHERE ' + parameteriseQueryForIn(req, 'ID', 'id', sql.Int, idArray);
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


let parameteriseQueryForIn = function(req, columnName, parameterNamePrefix, type, values) {
  var parameterNames = [];
  for (var i = 0; i < values.length; i++) {
    var parameterName = parameterNamePrefix + i;
    req.input(parameterName, type, values[i]);
    parameterNames.push(`@${parameterName}`);
  }
  return `${columnName} IN (${parameterNames.join(',')})`
}
