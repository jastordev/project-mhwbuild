const express = require("express");
const router = express.Router();

const multer = require("multer");


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

router.post('/', upload.single('imageFile'), async (req, res, next) => {
  let apple = 1;
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
