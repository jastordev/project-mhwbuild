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

exports.queryWithVar = async function( item){

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
