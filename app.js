const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const songRoutes = require('./routes/song.route');
const userRoutes = require('./routes/user.route');
const sessionRoutes = require('./routes/session.route');

const auth = require('./middleware/auth');

const app = express();

// Load .env file
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
let port = process.env.PORT || 6699;

let mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', sessionRoutes);
app.use('/users', userRoutes);
app.use(auth);
app.use('/songs', songRoutes);

// Testing Routes
app.get('/', (_, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});

