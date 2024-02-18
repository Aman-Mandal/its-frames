const express = require('express');
const app = express();
const dotenv = require('dotenv');
const axelarPage2Route = require('./routes/axelar');

const cors = require('cors');

app.use(cors());
dotenv.config();
app.use(express.json());

app.use('/', axelarPage2Route);

app.listen(8080, () => {
  console.log('frames server is running...');
});
