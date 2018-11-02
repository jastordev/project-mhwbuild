const express = require("express");
const fs = require('fs');
const router = express.Router();

const multer = require("multer");
const db = require("../database/db");
const uuidv1 = require('uuid/v1');

const imageDestUrl = "/images/items/";
const defaultIconUrl = imageDestUrl + "default_icon.png";

const getAllItemsQuery = 'SELECT * FROM Items';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public" + imageDestUrl)
    },
    filename: function (req, file, cb) {
      cb(null, `${uuidv1()}${file.mimetype.replace("image/", ".")}`);
    }
  })

const upload = multer({storage: storage});

// ROUTES HERE

// Get all items.
router.get('/', async (req, res) => {
  const dbRes = await db.query(getAllItemsQuery);
  res.json(dbRes);
});

// Receive new item and add to DB. Send back icon file path + id.
router.post('/', upload.single('imageFile'), async (req, res, next) => {
  let itemIconPath; 
  if(req.file){
    itemIconPath = imageDestUrl + req.file.filename;    
  } else {
    itemIconPath = defaultIconUrl;
  } 
  // Convert item sent in req to db-ready item. Then send to DB
  let item = makeItemDBReady(JSON.parse(req.body.item));
  item.IconPath = itemIconPath;
  const dbRes = await db.addEntry(item, 'Items');
  res.json({iconUrl: itemIconPath, itemID: dbRes[0].id});
});

// Delete item where ids match.
router.delete('/:item_ids', async (req, res) => {
  let ids = req.params.item_ids.split(',');
  try {
    const dbRes = await db.removeEntry(ids, 'Items');
    for (let item of dbRes) {
      if(fs.existsSync(`./public${item.IconPath}`) 
        && item.IconPath != defaultIconUrl) {
          fs.unlink(`./public${item.IconPath}`, err => console.log(err));
      }
    }
    res.json("Item deleted.");
  } catch (err) {
    res.status(400).send("Could not delete item.");
  }  
});

// Update item where id matches.
router.put('/:item_id', upload.single('imageFile'), async (req, res) => {  
  let item = makeItemDBReady(JSON.parse(req.body.item));
  if(req.file) { item.IconPath = imageDestUrl + req.file.originalname; }
  const dbRes = await db.updateEntry(req.params.item_id, 'ID', item, 'Items');
  res.json({iconUrl: item.IconPath}); 
});

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
