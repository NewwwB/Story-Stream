const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');


router.get('/', async (req, res) => {
  const genre = await Genre.find().select('-__v').sort('name');

  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = joi.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.param.id,
    { name: req.body.name },
    {
      new: true,
    },
  );
  if (!genre) {
    res.status(400).send('The genre with given id was not found.');
  }
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id).select('-__v');

  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;
