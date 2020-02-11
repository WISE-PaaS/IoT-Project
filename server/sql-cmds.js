const NUMBER_OF_TEMPS_RETURNED = 30;

module.exports.sqlQueryTemps = `
SELECT * 
  FROM (SELECT * FROM livingroom.temperature ORDER BY timestamp DESC LIMIT ${NUMBER_OF_TEMPS_RETURNED})
  AS lastRows
  ORDER BY timestamp ASC;
`;