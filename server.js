const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewURLParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connection established');
});

app.listen(port, () => {
  console.log('server started');
});
