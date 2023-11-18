// config.js
require('dotenv').config();

const config = {
  REACT_APP_ENCRYPTION_KEY: process.env.REACT_APP_ENCRYPTION_KEY,
  REACT_APP_SERVER_ADDRESS: process.env.REACT_APP_SERVER_ADDRESS,
};

export default config;
