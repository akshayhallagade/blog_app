const express = require("express");
const {
  handleGetAllBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleDeleteBlog,
  handleUpgradeBlog,
} = require("../controllers/blog");
const { ensureAuthenticated } = require("../middleware/auth");

const router = express.Router();

//Get All the Blogs
//Unprotected : any one have to see blog
router.get("/", handleGetAllBlogs);

//Get Blogs by ID
//Unprotected : any one have to see blog
router.get("/:id", handleGetBlogById);

//Create a Blog
//Protected Route :
router.post("/", ensureAuthenticated, handleCreateBlog);

//Update a Blog
//Protected Route :
router.patch("/:id", handleUpgradeBlog);

//Delete Blog
//Protected Route + Authorization
router.delete("/:id", ensureAuthenticated, handleDeleteBlog);

module.exports = router;
