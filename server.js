const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error')

//load database config
const connectDB = require('./config/db');


// Route files
// const bootcamps = require('./routes/bootcamps.js.template');

// Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
// app.use('/api/v1/bootcamps', bootcamps);

//use error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


// Handle unhandled promise rejections
process.on('unHandledRejection', (err, promise)=> {

    console.log(`Error: ${erra.message}`.red);

    //close server and exit
    // server.close(()=> process.exit(1));
});