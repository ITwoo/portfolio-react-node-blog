const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Post } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, async(req, res, next) => {
  const fullUserWithoutPassword = await User.findOne({
    where: { id: req.user.id },
    attributes: {
      exclude: ['password']
    },
    include: [{
      model: Post,
      attributes: ['id'],
    },]
  })
  return res.status(200).json(fullUserWithoutPassword);
});

module.exports = router;