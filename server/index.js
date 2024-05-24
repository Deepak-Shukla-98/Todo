import express from "express";
import cors from "cors";
import tasks from "./routes.js";

const port = "8080";
const app = express();

app.use(cors());
app.use(express.json());
//routes
app.use("/", tasks);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
