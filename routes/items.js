const express = require("express");
const router = express.Router();

const multer = require("multer");

const mainUrl = "http://localhost:4300";
const imageDestUrl = "/images/items/";

const defaultIconUrl = mainUrl + imageDestUrl + "default_icon.png";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public" + imageDestUrl)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.toLowerCase());
    }
  })

const upload = multer({storage: storage});

router.post('/', upload.single('imageFile'), async (req, res, next) => {
  let apple = 1;
  if(req.file){
    res.json({
      iconUrl:
        mainUrl + imageDestUrl + req.file.originalname
    });
  } else {
    res.json({ iconUrl: defaultIconUrl });
  } 
  
});

module.exports = router;
