const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, '..'),
  serviceName: process.env.SERVICE_NAME,
  urlDb: process.env.MONGO_URL,
  jwtKey: process.env.SECRET,
};
