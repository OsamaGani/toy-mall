const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

let memServer; // keep ref for clean shutdown

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    if (!uri || uri === 'memory') {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const dbPath = path.resolve(__dirname, '..', 'data', 'db');
      fs.mkdirSync(dbPath, { recursive: true });

      memServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'toymall',
          dbPath,
          storageEngine: 'wiredTiger',
        },
      });
      uri = memServer.getUri();
      console.log(`💾 Using file-backed MongoDB (data persists in ${dbPath})`);
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Graceful shutdown — keep the data files
    const shutdown = async () => {
      try { await mongoose.disconnect(); } catch {}
      if (memServer) await memServer.stop({ doCleanup: false, force: false });
      process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error(`MongoDB error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
