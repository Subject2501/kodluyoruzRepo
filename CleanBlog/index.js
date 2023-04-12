const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const app = express();
const photoController = require("./controllers/blogControllers")
const pageControllers = require("./controllers/pageControllers")

//* Connect Db
mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", false);

//*TEMPLATE ENGINE
app.set("view engine", "ejs");

//*MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride("_method",{
  methods:["POST","GET"]
}))

//*ROUTES
app.get("/",photoController.getAllBlogs );
app.get("/index", pageControllers.getIndexPage);
app.get("/about", pageControllers.getAboutPage);
app.get("/blogs/:id", photoController.getBlogById);
app.get("/add_post",pageControllers.getAddBlogPage);
app.get("/post", pageControllers.getPostPage);
app.get("/blogs/edit/:id", pageControllers.getEditPage);
app.post("/blogs", photoController.createBlog);
app.put("/blogs/:id", photoController.UpdateBlog);
app.delete("/blogs/:id",photoController.DeleteBlog)
app.get("*",pageControllers.get404Page);

const port = 3001;
app.listen(port, () => {
  console.log(`CleanBlog sever port ${port} da baslatildi`);
});