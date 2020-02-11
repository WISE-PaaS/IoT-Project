const mqtt = require('mqtt');
const { Pool } = require('pg');
const { mqttUri, pgConnOpt } = require('./keys');
const { sqlCreatTable, sqlWriteValue } = require('./sql-cmds');

/**
 * Connects to the Postgresql server.
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
 * Connects to IotHub and Subcribes to the topic when the connection is made.
 */
const client = mqtt.connect(mqttUri);
const topic = 'livingroom/temperature';

client.on('connect', (connack) => {
  logger('Connected to IoTHub');

  client.subscribe(topic, (err, granted) => {
    if (!err) logger(`Subscribed to ${topic}`);
  });
});

/**
 * Connects to IotHub and Subcribes to the topic when the connection is made.
 */
client.on('message', async (topic, message, packet) => {
  const temperature = message.toString();
  logger(`Received data from ${topic}: ${temperature}`);

  try {
    const result = await pool.query(sqlWriteValue, [temperature]);
    console.log('Added a new row:', JSON.stringify(result['rows'][0]));
  } catch (err) {
    console.error('Error adding data...', err.stack);
  }
});

/**
 * Helper function
 */
function logger(s) {
  console.log(Date() + ' -- ' + s);
}