const express = require("express");
const router = express.Router();

const db = require("../database/db");

alteredVal = 0;

router.get('', async (req, res, next) => {
  // Get overview from DB
  try {
    const queryRes = await db.query('SELECT COUNT(*) AS ItemCount FROM Iems');

    // Hardcoded counts, changed later when respective tables introduced.
    queryRes[0]["WeaponCount"] = 0;
    queryRes[0]["BuildCount"] = 0;
    queryRes[0]["ArmorCount"] = 0;
    queryRes[0]["SkillCount"] = 0;

    res.json(queryRes[0]);
  } catch(err) {
    next(err);
  }
});

router.get('/error', async (req, res , next) => {
  res.status(400).send("error");
});

router.get('/test', (req, res) => {
  alteredVal++;
  if(alteredVal < 10) {
    res.json(alteredVal);
  } else {
    res.status(400).send("Request over limit.");
  }    
});

module.exports = router;
