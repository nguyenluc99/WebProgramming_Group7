/**
 * Some global constant use for configuration, we might move this file into 
 * frontend/ and backend/ separately later on.
 */

 module.exports = {
  CONST: {},
  DB_USERNAME: process.env.USER,
  DB_NAME: 'webprogramming',
  DB_LOCAL_HOST: 'localhost',
  DB_PORT: 5432, 
  DB_PASSWORD: null,
  DOMAIN: 'http://localhost:8001',
  TOKEN_KEY: 'abcd1234'
};
