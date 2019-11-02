const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });

  newUser.save()
    .then(() => res.json('User Added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').patch((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.bio = req.body.bio;
      user.additional = req.body.additional;
      user.preferences = req.body.preferences;
      user.likeIds = [...user.likeIds, req.body.likeId];
      user.matchIds = [...user.matchIds, req.body.matchId];
      user.save()
        .then(() => res.json('User Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    });
});


module.exports = router;
