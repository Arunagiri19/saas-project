import EmployeeModel from "../models/EmployeeSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const EmployeeController = {
  Login: async (req, res) => {
    console.log(req.body); 

    try {
     
      const EmailID = req.body.email;
      const Password = req.body.password;

      
      const ExistingEmail = await EmployeeModel.findOne({ EmailID });
      if (!ExistingEmail) {
        return res.status(400).json({ message: "User Not Found" });
      }

      
      const ComparePassword = await bcrypt.compare(
        Password,
        ExistingEmail.Password
      );

      if (ComparePassword) {
        const token = jwt.sign(
          { email: ExistingEmail.EmailID },
          "credo_secret",
          { expiresIn: "1h" }
        );
        console.log(token);
        return res
          .status(200)
          .header("Authorization", "Bearer " + token)
          .json({ message: "Successfully logged in", token });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      console.error("Login error:", err);
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  },

EmployeeRegistration: async (req, res) => {
  console.log(req.body);

  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const EmployeeData = new EmployeeModel({
      Name: username,
      EmailID: email,
      Password: hashedPassword,
  });

    await EmployeeData.save();
    return res.status(200).json({ message: "Successfully Registered" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
};

export default EmployeeController;
