const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.send('invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.send('invalid email or password');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);

  res.send(token);
});

module.exports = router;

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}
