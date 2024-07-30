const mongoose = require('mongoose');

module.exports = {
    // Connect to the MongoDB database
    connectToDatabase: async () => {
        try {
            await mongoose.connect(process.env.MONGODB_CONNECTION)
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }
};