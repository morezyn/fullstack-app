const express = require('express');
const cors = require('cors');
const healthRouter = require('./routes/health');
const dataRouter = require('./routes/data');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', healthRouter);
app.use('/api', dataRouter);

module.exports = app;
