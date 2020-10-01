const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const auth = require('./routes/auth');
const user = require('./routes/user');
require('./utils/db');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/api',(req, res)=>{
    res.send("API Works");
});
app.use('/auth', auth);
app.use('/user', user);

module.exports = app;