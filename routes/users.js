const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user.model');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/add', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ usernam: req.body.username });
  if (user) return res.status(400).send('User already registered')

  user = new User({
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
  });

  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: user.id,
    name: user.name,
    username: user.username,
  });
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
      if (req.body.likeId) user.likeIds = [...user.likeIds, req.body.likeId];
      if (req.body.matchId) user.matchIds = [...user.matchIds, req.body.matchId];
      user.save()
        .then(() => res.json('User Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    });
});


module.exports = router;
