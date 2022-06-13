import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Server is up & running...");
});

router.post("/create-user-room", (req, res) => {
  try {
    console.log("======================<>====================");
    console.log(req.body.name);
    console.log(req.body.email);
    console.log("======================<>====================");
  } catch (err) {
    console.log(err);
    console.log("======================<>====================");
  }
  return res.send("Ok");
});

export default router;
