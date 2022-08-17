import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 8080; // default port to listen

// declare a route with a response
app.get("/", (req, res) => {
  res.send("What's up doc ?!");
});

// start the server
app.listen(PORT, () => {
  console.log(`server running : http://localhost:${PORT}`);
});
