const knex = require('knex');
require('dotenv').config();
const knexConfig = require('../knexfile');

const environment = process.env.APP_ENV || 'development';
const knex = knex(knexConfig[environment]);

module.exports = knex;
