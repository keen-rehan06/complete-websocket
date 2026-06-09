import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== "test@gmail.com" || password !== "123456") {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      id: "123",
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).send({
      message: "Login Success",
    success: true,
});
};

export default login;