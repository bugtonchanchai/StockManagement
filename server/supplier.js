const express = require('express')
const utils = require('./utils')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;

const mongo_string = "mongodb://localhost:27017"
const dbname = "stockdb"
const colname = "msupplier"

router.get('/show', function (req, res) {
    // res.end(`Hi, show api`)
    mongoClient(mongo_string).connect(function (err, client) {
        client.db(dbname).collection(colname)
            .find()
            .toArray()
            .then(item => {
                const output = { result: "ok", message: item }
                res.json(output)
            })
        client.close();
    })
})

router.post('/add', function (req, res) {
    // res.end(`Hi, add api: ${req.body}`)
    mongoClient(mongo_string).connect(function (err, client) {
        const data = {
            name: req.body.name,
            upd_by: req.body.upd_by,
            last_upd_date: utils.getLastupdate()
        }
        client.db(dbname).collection(colname)
            .insertOne(data, (err, result) => {
                if (err) throw err
                const response = { result: 'ok', message: result.result.n + " inserted" }
                res.json(response)
            })
        client.close();
    })
})

router.post('/update', function (req, res) {
    // res.end(`Hi, add api: ${req.body}`)
    mongoClient(mongo_string).connect(function (err, client) {
        const query = { _id: ObjectId(req.body._id) }
        const data = {
            $set: {
                name: req.body.name,
                upd_by: req.body.upd_by,
                last_upd_date: utils.getLastupdate()
            }
        }
        client.db(dbname).collection(colname)
            .update(query, data, (err, result) => {
                if (err) throw err
                const response = { result: 'ok', message: result.result.n + " updated" }
                res.json(response)
            })
        client.close();
    })
})

router.delete('/delete/:_id', function (req, res) {
    //  res.end(`Hi, delete api: ${req.params._id}`)
    const query = { _id: ObjectId(req.params._id) }
    mongoClient(mongo_string).connect(function (err, client) {
        client.db(dbname).collection(colname)
            .deleteMany(query, function (err, result) {
                const response = { result: "ok", message: result.result.n + " delete" }
                res.json(response)
            })
        client.close();
    })
})

module.exports = router