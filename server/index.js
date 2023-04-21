const express = require("express");
const cors = require("cors");
const SavedBlog = require("./Db/savedBlogModel");
const PublishBlog = require("./Db/publishBlogModel");
const User = require("./Db/userModel");
// require('./Db/connectDb')
const connectDb = require("./Db/connectDb");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "hello this is our first api end point" });
});
app.get("/api/blog/", async (req, res) => {
  try {
    const blogData = await PublishBlog.find({});
    res.status(200).send({ success: true, data: blogData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error });
  }
});

app.get("/api/blog/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const blogData = await PublishBlog.findById({ _id });
    res.status(200).send({ success: true, data: blogData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error });
  }
});

app.post("/api/user/signin", async (req, res) => {
  const { name, email, picture, sub } = req.body;

  try {
    const isnewuser = await User.findOne({ email });
    if (!isnewuser) {
      const newUser = new User({
        name,
        email,
        picture,
        sub,
      });

      const savedUser = await newUser.save();
      res
        .status(200)
        .json({ success: true, message: "user signup successfully" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "user login successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
});

app.post("/api/blog/", async (req, res) => {
  // console.log("👉 ~ file: index.js:29 ~ app.post ~ req", req.body)

  try {
    const {
      heading,
      fImage,
      desc,
      category,
      content,
      email,
      name,
      picture,
      isSavedBlog,
    } = req.body;

    if (isSavedBlog) {
      const newBlog = new SavedBlog({
        category,
        heading,
        fImage,
        desc,
        content,
        email,
        picture,
        name,
      });

      const response = await newBlog.save();

      res
        .status(201)
        .json({ success: true, message: "Blog Saved !", data: response });
    } else {
      const newBlog = new PublishBlog({
        category,
        heading,
        fImage,
        desc,
        content,
        email,
        picture,
        name,
      });

      const response = await newBlog.save();

      res
        .status(201)
        .json({ success: true, message: "Blog Published !", data: response });
    }
  } catch (error) {
    console.log(error);
  }
});

/** liking the blog */
app.patch("/api/like/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;
  try {
    const post = await PublishBlog.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post unliked");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/user-blog", async (req, res) => {
  const { email } = req.body;
  try {
    const blogs = await PublishBlog.find({ email }).select("-content");
    if (blogs.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Blogs not  found" });
    }
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => {
  console.log("server is running at http://localhost:4000");
  connectDb();
});
