require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');

const categories = [
  { name: 'Construction', image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=600' },
  { name: 'Games', image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600' },
  { name: 'Pretend Play', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600' },
  { name: 'Learning & Education', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600' },
  { name: 'Vehicles', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600' },
  { name: 'Active Play', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600' },
  { name: 'Wooden Toys', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600' },
  { name: 'Dolls', image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b6a9ec?w=600' },
  { name: 'Action Figures', image: 'https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=600' },
  { name: 'Ride Ons', image: 'https://images.unsplash.com/photo-1597007051304-15387f9e0a18?w=600' },
  { name: 'Outdoor Toys', image: 'https://images.unsplash.com/photo-1560859251-d563a49c5e4a?w=600' },
  { name: 'Novelty Toys', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600' },
  { name: 'Books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600' },
  { name: 'Baby & Toddler', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600' },
];

const brands = [
  { name: 'LEGO', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg' },
  { name: 'Hot Wheels', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Hot_Wheels_logo.svg' },
  { name: 'Barbie', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Barbie_Logo.svg' },
  { name: 'Nerf', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Nerf_Logo.svg' },
  { name: 'Magna-Tiles', logo: '' },
  { name: 'Funskool', logo: '' },
  { name: 'Kinderkraft', logo: '' },
  { name: 'Skillmatics', logo: '' },
  { name: 'Crayola', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Crayola.svg' },
  { name: 'Marvel', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg' },
  { name: 'Transformers', logo: '' },
  { name: 'Bburago', logo: '' },
  { name: 'Majorette', logo: '' },
  { name: 'Maisto', logo: '' },
  { name: 'Jada', logo: '' },
  { name: 'Mattel', logo: '' },
  { name: 'Hasbro', logo: '' },
  { name: 'Fisher-Price', logo: '' },
  { name: 'Disney', logo: '' },
  { name: 'Funko', logo: '' },
];

const products = [
  {
    name: 'LEGO Classic Creative Bricks Box 11717',
    description: 'A treasure trove of creative possibilities with 1500 colorful LEGO bricks for unlimited building.',
    brand: 'LEGO', category: 'Construction', ageGroup: '4-6 Years',
    price: 89.99, discount: 15, stock: 25,
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800',
    images: ['https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800'],
    featured: true, bestSeller: true, rating: 4.8, numReviews: 124,
  },
  {
    name: 'Hot Wheels 20-Car Gift Pack',
    description: 'A great selection of 20 die-cast vehicles in 1:64 scale. Perfect for collectors and racers.',
    brand: 'Hot Wheels', category: 'Vehicles', ageGroup: '4-6 Years',
    price: 24.99, discount: 20, stock: 50,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800',
    images: ['https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800'],
    featured: true, bestSeller: true, rating: 4.7, numReviews: 89,
  },
  {
    name: 'Barbie Dreamhouse Adventures Doll',
    description: 'Barbie doll with fashion accessories, ready for endless adventures and storytelling.',
    brand: 'Barbie', category: 'Dolls', ageGroup: '4-6 Years',
    price: 49.99, discount: 10, stock: 30,
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b6a9ec?w=800',
    images: ['https://images.unsplash.com/photo-1606503153255-59d8b8b6a9ec?w=800'],
    featured: true, newArrival: true, rating: 4.6, numReviews: 67,
  },
  {
    name: 'Nerf Elite 2.0 Commander Blaster',
    description: 'Nerf blaster with 6-dart rotating drum, includes 12 Nerf Elite darts.',
    brand: 'Nerf', category: 'Action Figures', ageGroup: '8 Years+',
    price: 34.99, discount: 25, stock: 40,
    image: 'https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=800',
    images: ['https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=800'],
    bestSeller: true, rating: 4.5, numReviews: 102,
  },
  {
    name: 'Magna-Tiles Clear Colors 100 Piece Set',
    description: 'Magnetic 3D building tiles in vibrant colors. STEM learning through play.',
    brand: 'Magna-Tiles', category: 'Construction', ageGroup: '2-4 Years',
    price: 119.99, discount: 0, stock: 20,
    image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=800',
    images: ['https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=800'],
    featured: true, newArrival: true, rating: 4.9, numReviews: 215,
  },
  {
    name: 'Crayola Inspiration Art Case 140 Pieces',
    description: 'Complete art set with crayons, markers, colored pencils and paper.',
    brand: 'Crayola', category: 'Learning & Education', ageGroup: '4-6 Years',
    price: 39.99, discount: 30, stock: 60,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'],
    bestSeller: true, rating: 4.7, numReviews: 156,
  },
  {
    name: 'Wooden Educational Shape Sorter',
    description: 'Classic wooden shape sorting toy that develops fine motor skills and shape recognition.',
    brand: 'Funskool', category: 'Wooden Toys', ageGroup: '0-2 Years',
    price: 19.99, discount: 0, stock: 80,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800',
    images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800'],
    rating: 4.4, numReviews: 45,
  },
  {
    name: 'Kinderkraft Moov 3-in-1 Stroller',
    description: 'Modern, stylish baby stroller convertible to pram and car seat.',
    brand: 'Kinderkraft', category: 'Baby & Toddler', ageGroup: '0-2 Years',
    price: 399.99, discount: 15, stock: 12,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800',
    images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800'],
    featured: true, rating: 4.8, numReviews: 38,
  },
  {
    name: 'Marvel Spider-Man Action Figure 12-Inch',
    description: 'Highly detailed Spider-Man figure with multiple points of articulation.',
    brand: 'Marvel', category: 'Action Figures', ageGroup: '4-6 Years',
    price: 29.99, discount: 0, stock: 45,
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800',
    images: ['https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800'],
    newArrival: true, rating: 4.6, numReviews: 73,
  },
  {
    name: 'Skillmatics Guess in 10 Card Game',
    description: 'Trivia card game that develops critical thinking. Perfect for family game night.',
    brand: 'Skillmatics', category: 'Games', ageGroup: '6-8 Years',
    price: 14.99, discount: 0, stock: 100,
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800',
    images: ['https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800'],
    bestSeller: true, rating: 4.7, numReviews: 198,
  },
  {
    name: 'Bburago Ferrari 1:18 Die-Cast Model',
    description: 'Authentic Ferrari scale model with opening doors, hood and detailed interior.',
    brand: 'Bburago', category: 'Vehicles', ageGroup: '8 Years+',
    price: 49.99, discount: 10, stock: 18,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'],
    rating: 4.5, numReviews: 32,
  },
  {
    name: 'Pretend Play Kitchen Set Deluxe',
    description: 'Realistic play kitchen with sounds, lights, and 30+ accessories.',
    brand: 'Funskool', category: 'Pretend Play', ageGroup: '2-4 Years',
    price: 149.99, discount: 20, stock: 15,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800',
    images: ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800'],
    featured: true, rating: 4.6, numReviews: 54,
  },
  {
    name: 'Outdoor Trampoline 8FT with Safety Net',
    description: 'Premium outdoor trampoline with full safety enclosure for hours of fun.',
    brand: 'Funskool', category: 'Outdoor Toys', ageGroup: '6-8 Years',
    price: 299.99, discount: 25, stock: 8,
    image: 'https://images.unsplash.com/photo-1560859251-d563a49c5e4a?w=800',
    images: ['https://images.unsplash.com/photo-1560859251-d563a49c5e4a?w=800'],
    rating: 4.4, numReviews: 27,
  },
  {
    name: 'Electric Ride-On Car Mercedes',
    description: '12V battery powered ride-on car with remote control, lights and music.',
    brand: 'Kinderkraft', category: 'Ride Ons', ageGroup: '2-4 Years',
    price: 249.99, discount: 15, stock: 10,
    image: 'https://images.unsplash.com/photo-1597007051304-15387f9e0a18?w=800',
    images: ['https://images.unsplash.com/photo-1597007051304-15387f9e0a18?w=800'],
    featured: true, newArrival: true, rating: 4.7, numReviews: 41,
  },
  {
    name: 'My First Encyclopedia Animal Atlas',
    description: 'Beautifully illustrated children\'s encyclopedia covering animals around the world.',
    brand: 'Funskool', category: 'Books', ageGroup: '6-8 Years',
    price: 19.99, discount: 0, stock: 70,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
    rating: 4.8, numReviews: 89,
  },
  {
    name: 'Transformers Optimus Prime Figure',
    description: 'Convertible Optimus Prime figure that transforms from robot to truck.',
    brand: 'Transformers', category: 'Action Figures', ageGroup: '6-8 Years',
    price: 39.99, discount: 0, stock: 35,
    image: 'https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=800',
    images: ['https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=800'],
    newArrival: true, rating: 4.6, numReviews: 64,
  },
];

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

    console.log('Seeding admin user...');
    await User.create({
      name: 'Admin',
      email: 'admin@toymall.com',
      password: 'admin123',
      isAdmin: true,
    });
    await User.create({
      name: 'Demo Customer',
      email: 'customer@toymall.com',
      password: 'customer123',
    });

    console.log('Seeding categories...');
    for (const c of categories) await Category.create(c);

    console.log('Seeding brands...');
    for (const b of brands) await Brand.create(b);

    console.log('Seeding products...');
    for (const p of products) await Product.create(p);

    console.log('\n✅ Seed complete!');
    console.log('Admin login -> admin@toymall.com / admin123');
    console.log('Customer login -> customer@toymall.com / customer123\n');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
