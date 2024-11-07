import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema(
  {
    name: String,
    heading: String,
    summary: String,
  },
  {
    timestamps: true,
  }
);

const Home = mongoose.models.Home || mongoose.model("Home", HomeSchema);

export default Home;
