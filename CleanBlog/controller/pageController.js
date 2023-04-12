const Blog = require("../models/Blog");


exports.getEditPage =  async (req, res) => {
    const blog = await Blog.findById({ _id: req.params.id });
    res.render("edit-post", {
      blog,
    })
  }

  exports.getIndexPage = async (req, res) => {
    const blogs = await Blog.find({}).sort("-creationDate");
    res.render("index", {
      blogs,
    });
  }
  exports.getAddBlogPage =  (req, res) => {
    res.render("add_post");
  }

  exports.getPostPage = (req, res) => {
    res.render("post");
  }

  exports.getAboutPage = (req, res) => {
    res.render("about");
  }

  exports.get404Page =  (req, res) => {
    res.send("404 not found");
  }