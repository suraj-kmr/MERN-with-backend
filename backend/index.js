const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/sage-baba', { useNewUrlParser: true }).
catch(error => handleError(error));
// Routers
const login = require('./routers/authRouter');
const setting = require('./routers/settingRouter');

// Route Lists
app.get('/', (req, res) => res.send('Backend!'))
app.use('/admin', login);
app.use('/admin/setting', setting);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
