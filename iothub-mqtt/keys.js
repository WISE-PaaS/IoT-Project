const esServices = JSON.parse(process.env.ENSAAS_SERVICES);
const rabbitmqCreds = esServices['p-rabbitmq'][0].credentials;
const pgCreds = esServices.postgresql[0].credentials;

module.exports.mqttUri = rabbitmqCreds.protocols.mqtt.uri;

module.exports.pgConnOpt = {
  host: pgCreds.host,
  port: pgCreds.port,
  database: pgCreds.database,
  user: pgCreds.username,
  password: pgCreds.password,
  max: 1,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000
};