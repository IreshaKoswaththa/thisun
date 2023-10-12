require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/user');
const path = require('path');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Add an authentication middleware function



// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/user', userRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
