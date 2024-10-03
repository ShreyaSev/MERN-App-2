const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./server/routes/todoRoutes.js');



const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost/mern-stack-db', { useNewUrlParser: true, useUnifiedTopology: true });
// Define routes and middleware
app.use('/api', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});