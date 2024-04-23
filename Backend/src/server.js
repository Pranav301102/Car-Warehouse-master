const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const carsRouter = require('./routes/carsRouter');
const sequelize = require('./db');

const app = express();
const PORT = 8080 || process.env.PORT;

dotenv.config({ path: `${__dirname}/.env` });
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use('/api/v1/cars', carsRouter);



sequelize
  .sync()
  .then(console.log('Connected to DB'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
