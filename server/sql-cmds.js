const NUMBER_OF_TEMPS_RETURNED = 30;

module.exports.sqlQueryTemps = `
SELECT * 
  FROM (SELECT * FROM livingroom.temperature ORDER BY timestamp DESC LIMIT ${NUMBER_OF_TEMPS_RETURNED})
  AS lastRows
  ORDER BY timestamp ASC;
`;

module.exports.sqlCreatTable = `
CREATE SCHEMA IF NOT EXISTS "livingroom";
ALTER SCHEMA "livingroom" OWNER TO "groupFamily";
CREATE TABLE IF NOT EXISTS "livingroom"."temperature"(
  id serial,
  timestamp timestamp (2) default current_timestamp,
  temperature integer,
  PRIMARY KEY (id)
);
ALTER TABLE "livingroom"."temperature" OWNER to "groupFamily";
GRANT ALL ON ALL TABLES IN SCHEMA "livingroom" TO "groupFamily";
GRANT ALL ON ALL SEQUENCES IN SCHEMA "livingroom" TO "groupFamily";
`;
