import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://nitesh:4bi7FMYfhTZhILoT@cluster0.uttybej.mongodb.net/hotel_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

export default connectToMongoDB;
