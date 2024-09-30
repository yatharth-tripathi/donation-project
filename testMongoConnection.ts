const dbConnect = require("./lib/dbConnect");

async function testMongoConnection() {
  console.log('Attempting to connect to MongoDB...');
  try {
    await dbConnect();
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  } finally {
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

testMongoConnection();
