'use strict'

const express = require('express');
const router = express.Router();

const content = [
    {name: 'Alex', age: 25},
    {name: 'Bob', age: 21},
    {name: 'Alice', age: 24}
];

module.exports = ()=>{
    return router.get('/', function(req, res) {
        res.send(content);
    })
    .post('/', function(req, res) {
        console.log(`Add content: ${JSON.stringify(req.body)}`);
        content.push(req.body);

        res.send('OK');
    })
    .delete('/', function(req, res) {
        console.log(`Delete content: ${JSON.stringify(req.body)}`);
        res.send('OK');
    });
};
