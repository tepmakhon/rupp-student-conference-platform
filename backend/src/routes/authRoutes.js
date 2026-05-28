import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  if (
    email === "student@rupp.edu.kh" &&
    password === "123456"
  ) {

    return res.json({
      token: "example-jwt-token",
      user: {
        id: 1,
        name: "MakHon",
        role: "STUDENT",
      },
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

export default router;