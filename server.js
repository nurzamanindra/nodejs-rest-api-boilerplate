const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//loading middleware function
const logger = require('./middleware/logger')

// Route files
const bootcamps = require('./routes/bootcamps');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(logger)
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
