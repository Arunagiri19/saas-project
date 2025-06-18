import mongoose from "mongoose"; // ES Module import

const EmployeeSchema = new mongoose.Schema({
   Name: {
    type: String,
    required: [true, "Name is required"],
  },
  EmailID: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  Password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// Pre-save hook
EmployeeSchema.pre("save", function (next) {
  if (!this.EmailID || this.EmailID.trim() === "") {
    this.EmailID = undefined;
  }
  if (!this.Password || this.Password.trim() === "") {
    this.Password = undefined;
  }
  next();
});

// Export ES Module style
const EmployeeModel = mongoose.model("EmployeeData", EmployeeSchema);
export default EmployeeModel;
