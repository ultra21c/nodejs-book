const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    await user.addFollowing(parseInt(req.params.id, 10));
    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/break/:id', isLoggedIn, async (req, res, next) =>{
  try {
    var fid = req.params.id;
    var userid = req.user.id;
    const user = await User.findOne({ where: { id: userid } });
    await user.removeFollowing(parseInt(fid,10));
    res.send('break success!!');
    next
  } catch(error) {
    console.error(error);
    next(error);
}
});

module.exports = router;
