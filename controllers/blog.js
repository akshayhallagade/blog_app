const Blog = require("../models/blog");

//Getting All Blogs
exports.handleGetAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  return res.json({ data: blogs });
};

//Getting Blogs by ID
exports.handleGetBlogById = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findOne({ _id: id });
  return res.json({ data: blog });
};

//Creating Blog
exports.handleCreateBlog = async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user._id;
  const blog = await Blog.create({ title, body, createdBy: userId });
  return res.json({ status: "success", data: { id: blog._id } });
};

//Upgrading Blog
exports.handleUpgradeBlog = async (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body;
  const blog = await Blog.findByIdAndUpdate(
    id,
    { title, body },
    { new: true, runValidators: true }
  );
  return res.json({ status: "Updated Successfully", data: { id: id } });
};

//Deleting Blog
exports.handleDeleteBlog = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.deleteOne({ _id: id });
  return res.json({ status: "Deleted Successfully", data: { id: id } });
};
