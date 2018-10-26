const express = require("express");
const router = express.Router();

const multer = require("multer");
const db = require("../database/db");


const imageDestUrl = "/images/items/";
const defaultIconUrl = imageDestUrl + "default_icon.png";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public" + imageDestUrl)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.toLowerCase());
    }
  })

const upload = multer({storage: storage});

router.get('/', async (req, res) => {
  const queryRes = await db.query(getAllItemsQueryStr);
  res.json(queryRes);
});

router.post('/', upload.single('imageFile'), async (req, res, next) => {
  let itemIconPath; 
  if(req.file){
    itemIconPath = imageDestUrl + req.file.originalname;    
  } else {
    itemIconPath = defaultIconUrl;
  } 
  // Convert item sent in req to db-ready item. Then send to DB
  let item = makeItemDBReady(JSON.parse(req.body.item));
  item.IconPath = itemIconPath;
  const queryRes = await db.queryWithVar(item);
  res.json({iconUrl: itemIconPath, itemID: queryRes[0].id});
});

let getAllItemsQueryStr = 'SELECT * FROM Items';

let insertItemQueryStr = function(item) {
  let finalQueryStr = "INSERT INTO Items (Type, Name, Description,"
  " Rarity, BuyPrice, SellPrice, Carry, ObtainedFrom, SkillID, JewelLevel, IconPath)";
  
}

// Change this function if either front-end Item model or DB Item Table schema changes.
let makeItemDBReady = function(reqItem) {
  let dbItem = {};
  dbItem.Type = reqItem.type;
  dbItem.Name = reqItem.name;
  dbItem.Description = reqItem.desc;
  dbItem.Rarity = reqItem.rarity;
  dbItem.BuyPrice = reqItem.buyPrice || null;
  dbItem.SellPrice = reqItem.sellPrice || null;
  dbItem.Carry = reqItem.carry;
  dbItem.ObtainedFrom = reqItem.obtainedFrom;
  dbItem.SkillID = reqItem.skillID || null;
  dbItem.JewelLevel = reqItem.jwlLvl || null;
  dbItem.IconPath = reqItem.iconUrl || null;
  return dbItem;
}



module.exports = router;
