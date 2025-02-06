

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Store login error messages
  const navigate = useNavigate(); // Used for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Get stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.length === 0) {
      setError("No user found. Please register first.");
      return;
    }

    // ✅ Find user with matching email & password
    const matchedUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      //alert("Login Successful");

      toast.success("Login Successful");

       // ✅ Retrieve the list of previously logged-in users or initialize an empty array
      const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];

      // ✅ Add the new logged-in user to the array
      loggedInUsers.push({ email: matchedUser.email, password: matchedUser.password });

      // ✅ Save the updated array back to localStorage
      localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));

      setTimeout(() => {
        //resetForm();
        navigate("/dashboard");
      }, 2000);

     // navigate("/dashboard"); // ✅ Navigate to dashboard/home page
    } else {
      setError("Invalid email or password. Please try again.");
      toast.error("please check your email and password");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="heading">Login</p>

        <div>
          <p className="fieldName">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <p className="fieldName">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>} {/* Show error message */}

        <button type="submit">Login</button>
      </form>

           <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default Login;
