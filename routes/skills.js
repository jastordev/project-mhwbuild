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
    const queryRes = await db.query('SELECT * FROM Skills, SkillLevels WHERE Skills.SkillId = SkillLevels.SkillId');  
    res.json(resToSkillList(queryRes));

  } catch(err) {
    next(err);
  }
})

var resToSkillList = function(queryRes) {
  let skillList = [];
  for (let skill of queryRes){
    let existingSkill = skillList.filter((s) => { return s.skillId === skill["SkillId"][0] });

    if (existingSkill.length == 0){
      let newSkill = {
        skillId : skill["SkillId"][0],
        name : skill["Name"],
        desc : skill["Description"],
        iconPath : skill["IconPath"],
        skillLvls : [{
          skillLvl : skill["SkillLvl"],
          lvlDesc : skill["LvlDesc"]
        }]
      }
      skillList.push(newSkill);
    } else {
       let newSkillLvl = {
         skillLvl : skill["SkillLvl"],
         lvlDesc : skill["LvlDesc"]
       }
       existingSkill[0].skillLvls.push(newSkillLvl);
    }
  }
  console.log(skillList[0].skillLvls);
  return skillList;
}

module.exports = router;
