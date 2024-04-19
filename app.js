const express = require('express')
const path = require('path')
const methodOverride =require('method-override')
const { getIndex, postData, deleteData, showriwayat } = require('./controller/mhsController.js');

const app = express()
const port = 8000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', getIndex);

app.post('/', postData);

app.delete('/:nim', deleteData);

app.get('/riwayat', showriwayat);

app.listen(port, ()=> {
    console.log(`server running in http://localhost:${port}`);
})