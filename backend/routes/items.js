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
  const queryRes = await db.query('SELECT * FROM Items');
  res.json(queryRes);
});

router.post('/', upload.single('imageFile'), async (req, res, next) => {
  if(req.file){
    res.json({
      iconUrl:
        imageDestUrl + req.file.originalname
    });
  } else {
    res.json({ iconUrl: defaultIconUrl });
  }  
});

module.exports = router;
