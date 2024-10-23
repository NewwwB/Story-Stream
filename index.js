const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user');
const genre = require('./routes/genre');
const auth = require('./routes/auth');
require('dotenv').config();

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log(`Connected to ${process.env.URL}...`);
  })
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/api/genre', genre);
app.use('/api/user', user);
app.use('/api/auth', auth);

app.listen(4000, () => {
  console.log('listening on port 4000');
});
