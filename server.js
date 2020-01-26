const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
app.use(express.static(path.join(__dirname, 'dist', 'angular-dev1')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// app.use('/api', require('./server/api.js'))
app.use('/api/warehouse', require('./server/warehouse'))
app.use('/api/location', require('./server/location'))
app.use('/api/category', require('./server/category'))
app.use('/api/unit', require('./server/unit'))
app.use('/api/supplier', require('./server/supplier'))
app.use('/api/customer', require('./server/customer'))

app.use('*', function (req, res) {
    res.end(`Hi, I am Chanchai`)
    //res.sendFile(path.join(__dirname, 'index.html'))
})

const server = app.listen(8888, function () {
    const port = server.address().port
    console.log(`server is running at port: ${port}`)
})