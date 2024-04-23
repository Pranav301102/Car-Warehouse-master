const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../.env` });

module.exports = {
  database: {
    host: "localhost",
    name: "car_warehouse",
    username: "username",
    password: "password",
  },
};
