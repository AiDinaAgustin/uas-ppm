const { Router, Router } = require('express');
const router = Router();

const mysqlConnection = require('../database/database');

router.get('/', (req,res) => {
    res.status(200).json('Server on port 8000 and database is connected');
});

router.get('/:posts', (req,res) => {
    mysqlConnection.query('select * from post;', (error, rows, fields) => {
        if(!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    })
})

router.get('/:posts/:id', (req,res) => {
    const {id} = req.params;
    mysqlConnection.query('select * from post where id = ?;', [id], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.post('/:posts', (req,res) => {
    const {id, user_id, category_id, title, body} = req.body;
    console.log(req.body);
    mysqlConnection.query('insert into post(id, user_id, category_id, title, body) values (?,?,?,?,?);',
    [id, user_id, category_id, title, body], (error, rows, fields) => {
        if (!error) {
            res.json({Status: 'Post saved'});
        } else {
            console.log(error);
        }
    });
});

router.put('/:posts/:id', (req,res) => {
    const {id, user_id, category_id, title, body} = req.body;
    console.log(req.body);
    mysqlConnection.query('update post set user_id = ?, category_id = ?, title = ?, body = ?, where id = ?;', 
    [user_id, category_id, title, body, id], (error, rows, fields) =>{
        if (!error) {
            res.json({Status: 'Post Updated'});
        } else {
            console.log('error')
        }
    });
});

//delete
router.delete('/:posts/:id', (req,res) => {
    const {id} = req.params;
    mysqlConnection.query('delete from post where id= ?;', [id], (error, rows, fields) => {
        if (!error) {
            res.json({Status: 'Post Deleted'});
        } else {
            res.json({Status: error});
        }
    });
});





