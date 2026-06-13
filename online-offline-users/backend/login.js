import jwt from "jsonwebtoken";

export const login = async (req, res) => {
 try {
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
     accessToken
 });
 } catch (error) {
  console.log(error.message)
  res.status(401).send({message:"Internal Server Error",error})
 }
};

export const logout = async(req,res) => {
  res.clearCookie("accessToken");
  res.status(200).send({message:"Logout SuccessFully!"});
}