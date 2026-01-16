const express = require("express");
const articleRoutes = require("./routes/article.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

// API routes
app.use("/api/articles", articleRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
