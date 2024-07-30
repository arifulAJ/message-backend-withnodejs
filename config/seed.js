const mongoose = require("mongoose");
const User = require("./../app/models/User");
require("dotenv").config();

// Sample data
const usersData = [
  {
    name: "Testing Admin",
    email: "admin@gmail.com",
    phone: "01735566789",
    password: "$2a$10$4uB1gL.RfBPhiGSfmZtxf.p5/KY3u9vblxurwA1cbtzr205lLwjx2", // Password should be hashed
    role: "Admin",
    isVerified: true,
    isAdmin: true, // Assuming isAdmin field should be set for admin user
    isDeleted: false, // Assuming isDeleted should be false for new user
  },
];

// Function to drop the entire database
const dropDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log("------------> Database dropped successfully! <------------");
  } catch (err) {
    console.error("Error dropping database:", err);
  }
};

// Function to seed users
const seedUsers = async () => {
  try {
    await User.deleteMany();
    await User.create(usersData); // Use create() instead of insertMany() for better validation and middleware hooks
    console.log("Users seeded successfully!");
  } catch (err) {
    console.error("Error seeding users:", err);
  }
};


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION);

// Call seeding functions
const seedDatabase = async () => {
  try {
    await dropDatabase();
    await seedUsers();
    console.log("--------------> Database seeding completed <--------------");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.disconnect();
  }
};

// Execute seeding
seedDatabase();
