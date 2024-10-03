import mongoose from "mongoose";
// MONGO_URI=mongodb+srv://saiadithya:sujatha@cluster0.fzzkocu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://saiadithya:sujatha@cluster0.fzzkocu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
