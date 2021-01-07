const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blogs', 'postgres', 'yash1234', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;