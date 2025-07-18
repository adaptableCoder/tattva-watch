import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true
    }

    const { connection } = await mongoose.connect(process.env.MONGODB_URI)
    
    if (connection.readyState === 1) {
      console.log('MongoDB connected successfully')
      return true
    }
  } catch (error) {
    console.error('MongoDB connection error:', error)
    return false
  }
}

export default connectDB