const express = require("express");
const router = express.Router();
const multer = require("multer");

const db = require("../database/db");

const imageDestUrl = "/images/skills/";
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

// POST Skill to Server endpoint.
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

// GET Skills from Server Endpoint.
router.get("/", async (req, res, next) => {
  try{
    const queryRes = db.query('SELECT * FROM Skill');
    res.json(queryRes);

  } catch(err) {
    next(err);
  }
})

module.exports = router;
