import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://bhavishyahchauhan322:${process.env.MONGODB_PASSWORD}@cluster0.hgqmc.mongodb.net/`
    );
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
