const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

require('dotenv').config();

if (!config.get('myprivatekey')) {
  console.error('FATAL ERROR: my private key is not defined');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connection established');
});

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log('server started');
});
