const { Router, Router } = require('express');
const router = Router();

const mysqlConnection = require('../database/database');

router.get('/', (req,res) => {
    res.status(200).json('Server on port 8000 and database is connected');
});

router.get('/:users', (req,res) => {
    mysqlConnection.query('select * from user;', (error, rows, fields) => {
        if(!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    })
})



