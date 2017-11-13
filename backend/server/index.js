import express from 'express';
import bodyParser from 'body-parser';

import { port } from '../config/config.json';

import * as db from './utils/dbUtils';

db.dbConnection();

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res)=>{
    db.listMessages().then(data => res.send(data));
});

app.post('/', (req, res)=>{
    db.createMessage(req.body).then(data => res.send(data));
});

app.delete('/:id', (req, res)=>{
    db.deleteMessage(req.params.id).then(data => res.send(data))
});

app.put('/', (req, res)=>{
    db.editMessage(req.body).then(data => res.send(data));
});

app.get('/message/:id', (req,res) => {
    db.getMessageById(req.body).then(data => res.send(data));
})

const server = app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
})