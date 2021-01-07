const express = require('express')
var router = express.Router();
const app = express()
const port = 3001
const { Sequelize, Model } = require('sequelize');
const sequelize = new Sequelize('blogs', 'postgres', 'yash1234', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});
var blogs = sequelize.define('blogs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    body: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });




app.use(express.json());
app.post('/blog', (req, res) => {
    const data = req.body;
    blogs.create(data)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating blogs"
            });
        });
});