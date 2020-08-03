const express = require('express');
const utils = require('../utils');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const global = await utils.getData('global')
  const home = await utils.getData('home')
  console.log(home)
  res.render('index', {
    global,
    ...home
  });
});

module.exports = router;  
