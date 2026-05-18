// Standalone CLI seeder — wipes the DB then re-seeds via the idempotent
// helpers in seedData.js. Keeps a single source of truth for demo data.
//
// Usage: npm run seed   (from backend/)

require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const { seedIfEmpty } = require('./seedData');

const seed = async () => {
  try {
    await connectDB();
    console.log('Cleaning existing data...');
    await Promise.all([
      Product.deleteMany(),
      Category.deleteMany(),
      Brand.deleteMany(),
      User.deleteMany(),
    ]);

    console.log('Seeding fresh chair-mart data...');
    await seedIfEmpty();

    console.log('\n✅ Seed complete!');
    console.log('Admin login    -> admin@tallefurnituremart.com / admin123');
    console.log('Customer login -> customer@tallefurnituremart.com / customer123\n');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
