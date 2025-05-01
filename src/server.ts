import express from "express";
import { db } from "./db";
import { Users } from "./models";
import router from "./routes";

const PORT = 5001;
const app = express();
app.use(express.json());

app.use("/api", router);

app.get("/test", async (req, res) => {
  const users = await db.select().from(Users);
  res.json(users);
});

app.get("/", async (req, res) => {
  res.status(200).json({
    code: 200,
    success: true,
    message: "Hello 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
