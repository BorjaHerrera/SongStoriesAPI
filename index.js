require('dotenv').config();

const express = require('express');
const { connectDB } = require('./src/confi/db');
/*const Song = require('./src/api/models/songs');
const Story = require('./src/api/models/stories');
const User = require('./src/api/models/users');*/
const mainRouter = require('./src/api/routes/main');
const app = express();

app.use(express.json());

connectDB();

app.use('/api/v1', mainRouter);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});
app.listen(3000, () => 'Servidor levantada en http://localhost:3000');