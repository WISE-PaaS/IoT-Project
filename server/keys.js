const esServices = JSON.parse(process.env.ENSAAS_SERVICES);
const pgCreds = esServices.postgresql[0].credentials;

module.exports.pgConnOpt = {
  host: pgCreds.host,
  port: pgCreds.port,
  database: pgCreds.database,
  user: pgCreds.username,
  password: pgCreds.password,
  max: 3,
  idleTimeoutMillis: 5000,
  connectionTimeoutMill: 2000
};