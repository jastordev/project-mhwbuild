const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/images/items/');
    },
    filename: function(req, file, cb) {
        console.log(file.filename);
        cb(null, file.filename);
    }
});

const upload = multer({storage: storage});

router.post('/', upload.single('imageFile'), async (req, res, next) => {
    console.log(req.file);    
});

module.exports = router;
