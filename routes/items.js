const express = require("express");
const router = express.Router();

const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images/items')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })

const upload = multer({storage: storage});

router.post('/', upload.single('imageFile'), async (req, res, next) => {
    res.send("Success!");
});

module.exports = router;
