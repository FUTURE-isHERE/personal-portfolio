import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://user1:${process.env.MONGODB_PASSWORD}@cluster0.hgqmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
