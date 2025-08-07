require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./router/routes');
const cors = require('cors');
const sequelize = require('./app/utilsFunction/dbFunctions');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', routes);

sequelize.authenticate().then(() => {
  console.log('SQL db authenticated successfully');
}).catch(err => console.log('authentication failed ', err));

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});