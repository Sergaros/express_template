'use strict'

const express = require('express');
const router = express.Router();

module.exports = ()=>{
    return router.get('/', function(req, res) {
        throw new Error('Some test error!');
    });
};
