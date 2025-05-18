require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);  
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

app.get('/', (req, res) => {
  res.send('Server is working');
});