import mongoose from 'mongoose'

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables')
    return
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: Successfully`);
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

export default connectDB
