
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

app.use(morgan('dev'));
app.use(cors());
require('./db/mongodb');

const path = require('path'); 
app.use(express.static(path.join(__dirname,'/build')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

const PORT = 4000;
const api = require('./routes/blogRoute');
app.use('/api', api);

const userRouter = require('./routes/userRoute');
app.use('/api', userRouter);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname,'/build/index.html'));
});
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});







