const express = require("express");
const router = express.Router();

const db = require("../database/db");

router.get('', async (req, res, next) => {
  // Get overview from DB
  try {
    const queryRes = await db.query('SELECT COUNT(*) AS ItemCount FROM Items');

    // Hardcoded counts, changed later when respective tables introduced.
    queryRes[0]["WeaponCount"] = 0;
    queryRes[0]["BuildCount"] = 0;
    queryRes[0]["ArmorCount"] = 0;
    queryRes[0]["SkillCount"] = 0;

    res.json(queryRes);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
