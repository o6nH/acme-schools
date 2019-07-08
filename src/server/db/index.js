const Sequelize = require('sequelize');

const dialect = 'postgres';
const username = 'postgres';
const password = '';
const userInfo = `${username}:${password}`;
const host = 'localhost';
const port = process.env.DB_PORT || 5432;
const dbName = 'schools';

const dbUrl = process.env.DATABASE_URL || `${dialect}://${Boolean(username && password) ? `${userInfo}@`: ''}${host}:${port}/${dbName}`;

const db = new Sequelize(dbUrl, {logging: false});
/* Alternative:  
const db = new Sequelize(dbName, username, password, {
  dialect: 'postgres',
  host: 'localhost',
  port: process.env.DB_PORT||5432,
  logging: false
});
 */

db.authenticate()
  .then(()=>{
    console.log(`Sequelize successfully connected to: ${dbUrl}.`);
  })
  .catch(err => {
    console.error('Sequelize failed to connect to the DB: ', err);
  });

module.exports = db;