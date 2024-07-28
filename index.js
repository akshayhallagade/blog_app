//Libraries
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const blogRoute = require("./routes/blog");
const { checkForAuthentication } = require("./middleware/auth");

mongoose
  .connect(
    "mongodb+srv://akshayhallagade2612:TMfzj05UOWw6OkSq@cluster0.knqho51.mongodb.net/blog_app?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connect"))
  .catch((err) => console.log("Error Connecting MongoDB", err));

const app = express();
const PORT = 8000;

// middlewares
app.use(express.json());
app.use(checkForAuthentication);

// All Routers
app.get("/", (req, res) => {
  res.json({ message: "OKkkkkkk" });
});

app.use("/auth", authRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server started on Port No ${PORT}`);
});
