import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandle = () => {
    navigate("./register");
  };
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(email, password);
    try {
      console.log();
      const response = await fetch("http://localhost:4000/api/user/LogIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or server error");
      }

      const data = await response.json();
      console.log("Login success:", data);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-purple-400 p-4">
      <div className="bg-white  shadow-lg rounded-xl p-5 w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          TenantHub
        </h2>
        <p className="text-lg text-center text-gray-500 mb-6">
          SaaS Tenant Management Platform
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
          >
            Sign in
          </button>
          <div className=" flex justify-center items-center">
            <p
              onClick={registerHandle}
              className="text-blue-400 text-sm  hover:underline transition cursor-pointer"
            >
              Registration
            </p>
          </div>
          <p className="text-xs text-center text-gray-400 mt-4">
            Demo: Use any email/password
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
