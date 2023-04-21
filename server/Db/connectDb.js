const mongoose = require("mongoose");
// // mongoose.set('strictQuery', false);
// mongoose
//   .connect("mongodb://localhost:27017/BlogData")
//   .then(() => console.log("mongoDb connected successfully ...."))
//   .catch((err) => console.log(err));

const connectDb = async () => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/BlogData");
    console.log("mongoDb connected successfully ....");
  } catch (error) {
    console.log(error);
    console.log("Database not connected !!!");
  }
};

module.exports = connectDb;
