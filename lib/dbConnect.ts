import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside your .env file');
}

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  
  if (global.mongoose.conn) {
    console.log('🟢 Using existing database connection');
    return global.mongoose.conn;
  }

  // If there isn't a connection promise, create one
  if (!global.mongoose.promise) {
    console.log('🟡 Creating a new database connection...');
    const options = {
      bufferCommands: false, // Disable buffering commands for Mongoose
    };

    // Establish the connection and save the promise to the global object
    global.mongoose.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log('✅ Database connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('❌ Database connection error:', error);
      throw error; // Rethrow the error to handle it outside
    });
  }

  // Wait for the connection promise to resolve
  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default dbConnect;
