const express = require('express');
const moment = require('moment');
const { Pool } = require('pg');
const { sqlCreatTable, sqlQueryTemps } = require('./sql-cmds');
const { pgConnOpt } = require('./keys');

const app = express();

/**
 * Connecting to the Postgresql DB server
 */
const pool = new Pool(pgConnOpt);
pool.on('error', () => logger('Lost PG connection'));

/** 
 * Creates the schema and table and sets the permission base on 'group'
 */
pool.query(sqlCreatTable)
  .then(() => logger('Schema and table have been created if not existed'))
  .catch(err => console.error('Error creating the table...', err.stack));

/** 
 * Server
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger(`Server started on port ${port}`);
});

/** 
 * /:
 * For testing server health
 */
app.get('/', (req, res) => {
  res.sendStatus(200);
});

/** 
 * /temps: 
 * Retrieves the latest data from DB and returns it to the client
 */
app.get('/temps', async (req, res) => {
  try {
    const result = await pool.query(sqlQueryTemps);

    result.rows.map(row => {
      row.timestamp = moment(row.timestamp).format('MM-DD HH:mm:ss');
    });

    res.send({ temperatures: result.rows });
  } catch (err) {
    console.error('Error executing query...', err.stack);
  }
});


/** 
 * Helper function
 */
function logger(s) {
  console.log(Date() + ' -- ' + s);
}