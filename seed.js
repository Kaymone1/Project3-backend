require('dotenv').config();
const mongoose = require('mongoose');
const contacts = require('./model/notesTemplate');
const DATABASE_URL = process.env.DATABASE_URL;

const db = mongoose.connection;

// connect to the database 
mongoose.connect(DATABASE_URL);

// Event listener for successful database connection
db.once('open', async () => {
    console.log('Connected to MongoDB');

    console.log('Starting the Seed script');

    const seedData = [
        {
            "name": "Serena Ileip",
            "date": 12/29/2022,
            "comment": "I CANNOT stand doing homework.",
        },{
            "name": "Naruto Uzumaki",
            "date": 12/11/2024,
            "comment": "I love tacos. I have been hungry all day and the only place open is Taco BELL",
        },
    ];

    try {
        // Insert seed data into the database
        await contacts.insertMany(seedData);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the database connection
        mongoose.disconnect();
    }
});

// Event listener for database connection error
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});