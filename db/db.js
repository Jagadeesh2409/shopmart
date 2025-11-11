const knex = require('knex');
require('dotenv').config();
const knexConfig = require('../knexfile');

const environment = process.env.APP_ENV || 'development';
const db = knex(knexConfig[environment]);

module.exports = db;
