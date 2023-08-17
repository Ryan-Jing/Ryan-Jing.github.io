const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const FormData = require('/formData'); // Import your Mongoose model

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ryanjing23:RyanJing23@portfoliocontactform.ry4rea2.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define routes for handling API requests
app.post('/api/saveFormData', async (req, res) => {
    const formData = req.body; // Data from frontend

    try {
      const newFormData = new FormData(formData);
      await newFormData.save();
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving data' });
    }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
