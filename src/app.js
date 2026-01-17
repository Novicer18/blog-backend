const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/article.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// Use the database connection
// app.listen(3306, () => {
//     console.log("Connected to database");
//     });

app.use("/api/articles", articleRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
