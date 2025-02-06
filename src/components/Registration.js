
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./forgetPassword.css";

// ✅ Validation Schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, "eg. abc123@gmail.com/in")
    .email("Invalid email format")
    .required("Email is required"),
  number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[!@#$%^&*]/, "Must contain at least one special character (!@#$%^&*)")
    .required("Password is required"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});

// ✅ Custom Button Component to Trigger Validation & Submission
const ValidateAndSubmitButton = ({ formik }) => {
  return (
    <button
      type="button"
      onClick={() => {
        formik.validateForm().then((errors) => {
          console.log("🔥 Validation Errors:", errors);
          if (Object.keys(errors).length > 0) {
            toast.error("⚠️ Please fill out all fields correctly!");
            formik.setTouched({
              name: true,
              email: true,
              number: true,
              password: true,
              confirmPass: true,
            });
          } else {
            formik.handleSubmit(); // ✅ If no errors, trigger form submission
          }
        });
      }}
    >
      Sign Up
    </button>
  );
};
const Registration = () => {
  const navigate = useNavigate();

  // ✅ Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    try {
      // ✅ Retrieve existing users from localStorage
      let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
      if (!Array.isArray(existingUsers)) {
        //console.error("❌ Data in localStorage is corrupted. Resetting...");
        existingUsers = [];
      }
  
    
      //localStorage.setItem("users", JSON.stringify(existingUsers));

      const same_email_number = existingUsers.find(
        (users) => users.email === values.email || users.number === values.number
        );
        if (same_email_number){
          toast.error("ops email or number are all ready register");
        } else{
          // ✅ Add the new user to the array
          existingUsers.push(values);
          localStorage.setItem("users", JSON.stringify(existingUsers));
          toast.success("🎉 Signed Up Successfully!", { autoClose: 2000 }) 
          setTimeout(() => {
            resetForm();
            navigate("/login"); 
          }, 2000);
        } 
      } 
        catch (error) {
          // console.error("❌ Error saving to localStorage:", error);
          toast.error("⚠️ An error occurred. Please try again.");
        }
  };
  
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          number: "",
          password: "",
          confirmPass: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <p className="heading">Sign Up</p>

            {/* Name Field */}
            <div>
              <p className="fieldName">Name</p>
              <Field type="text" name="name" placeholder='enter your name' />
              <ErrorMessage name="name" component="p" className="error" />
            </div>

            {/* Email Field */}
            <div>
              <p className="fieldName">Email</p>
              <Field type="email" name="email" placeholder='enter your email' />
              <ErrorMessage name="email" component="p" className="error" />
            </div>

            {/* Phone Number Field */}
            <div>
              <p className="fieldName">Phone Number</p>
              <Field type="tel" name="number" maxLength="10" // ✅ Prevents more than 10 digits
                pattern="[0-9]*" // ✅ Prevents letters
                inputMode="numeric" // ✅ Shows numeric keyboard on mobile
                placeholder='enter your phone number' 
                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))} // ✅ Auto-removes non-numeric characters
                 />
              <ErrorMessage name="number" component="p" className="error" />
            </div>

            {/* Password Field */}
            <div>
              <p className="fieldName">Password</p>
              <Field type="password" name="password" placeholder='enter your password' />
              <ErrorMessage name="password" component="p" className="error" />
            </div>

            {/* Confirm Password Field */}
            <div>
              <p className="fieldName">Confirm Password</p>
              <Field type="password" name="confirmPass" placeholder='enter your confirm password' />
              <ErrorMessage name="confirmPass" component="p" className="error" />
            </div>

            {/* Validation and Submit Button */}
            <ValidateAndSubmitButton formik={formik} />

            <br />

            {/* Forgot Password & Login Links */}
            <NavLink to="/forgot-password" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Forgot Password?
            </NavLink>
            <Link to="/login">Login</Link>
          </Form>
        )}
      </Formik>

      {/* ✅ ToastContainer to render the toast notifications */}
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default Registration;




































// import React, { useState } from 'react';
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import './forgetPassword.css';
// import { toast, ToastContainer } from 'react-toastify'; // Importing Toastify
// import "react-toastify/dist/ReactToastify.css"; // Import styles
// import PasswordChecklist from "react-password-checklist";


// const Registration = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [number, setNumber] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPass, setConfirmPass] = useState("");
//     const [touched, setTouched] = useState({
//         name: false,email: false,number: false, password: false,confirmPass: false
//     });

//     const navigate = useNavigate(); 

//     // Email validation
//     const [emailError, setEmailError] = useState(""); // To store email validation error
//     const validateEmail = (email) => {
//         const passwordRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
//         return passwordRegEx.test(email);
//     };

//     // Phone number validation
//     const [numberError, setNumberError]= useState("");
//     const validateNumber = (number) => {
//         const numberRegEx = /^\d{10}$/;
//         return numberRegEx.test(number);
//     }

//     // Password validation
//     const [passwordError, setPasswordError] = useState(""); 
//     const validatePassword = (password) => {
//         // const passwordRegEx= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
//         // return passwordRegEx.test(password);
//         return password;
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Reset password validation error
//         setPasswordError("");

//         // Validation checks
//         if (!name || !email || !password || !confirmPass) {
//             toast.error("⚠️ All fields are mandatory!");
//             // alert("All fields are mandatory");
//             return;
//         }

//         if (!validateEmail(email)){
//             setEmailError("Please Enter a Invalid email Format");
//             return;
//         }

//         if (!validateNumber(number)){
//             setNumberError("Please Enter 10 digit valid number");
//             return;
//         }

//         if (!validatePassword(password)) {
//             setPasswordError("Password must be at least 8 characters, with 1 uppercase, 1 lowercase, and 1 special character.");
//             return;
//         }

//         if (password !== confirmPass) {
//             toast.info("Error: Passwords do not match. Please check.");
//             return; 
//         }

//         const userData = {
//             name,
//             email,
//             number,
//             password, 
//         };

//         const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

//         // Add new user data to the array
//         existingUsers.push(userData);

//         // Save updated array back to localStorage
//         localStorage.setItem("users", JSON.stringify(existingUsers));

//         // Show success toast notification
//         toast.success("🎉 Signed Up Successfully!", { autoClose: 2000 });

//         // Redirect after 2 seconds
//         setTimeout(() => {
//             navigate("/login");
//         }, 2000);
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <p className='heading'>Sign Up</p>

//                 <div>
//                     <p className='fieldName'>Name</p>
//                     <input
//                         type='text'
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         onBlur={() => setTouched({ ...touched, name: true })}
//                     />
//                     <p className={!name && touched.name ? "error" : ""}>
//                         {!name && touched.name ? "Name is required" : ""}
//                     </p>
//                 </div>

//                 <div>
//                     <p className='fieldName'>Email</p>
//                     <input
//                         type='email'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onBlur={() => setTouched({ ...touched, email: true })}
//                     />
//                     <p className={!email && touched.email ? "error" : ""}>
//                         {!email && touched.email ? "Email is required" : ""}
//                     </p>
//                     <p className={emailError ? "error" : ""}>
//                         {emailError}
//                     </p>
//                 </div>

//                 <div>
//                     <p className='fieldName'>Phone Number</p>
//                     <input
//                     type='tel'
//                     value={number}
//                     onChange={(e) => {
//                         const input = e.target.value;
//                         if (/^\d*$/.test(input)) { // Allow only numbers
//                             setNumber(input);
//                         }
//                     }}
//                     onBlur={() => setTouched({ ...touched, number: true })} 
//                     minLength={10} 
//                     maxLength={10}
//                 />
//                     <p className={!number && touched.number ? "error" : ""}>
//                         {!number && touched.number ? "Phone number is required" : ""}
//                     </p>
//                     <p className={numberError ? "error" : ""}>
//                         {numberError}
//                     </p>
//                 </div>

//                 <div>
//                     <p className='fieldName'>Password</p>
//                     <input
//                         type='password'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         onBlur={() => setTouched({ ...touched, password: true })}
//                     />
//                     <p className={!password && touched.password ? "error" : ""}>
//                         {!password && touched.password ? "Password is required" : ""}
//                     </p>
//                     <p className={passwordError ? "error" : ""}>
//                         {passwordError}
//                     </p>
//                 </div>

//                 <div>
//                     <p className='fieldName'>Confirm Password</p>
//                     <input
//                         type='password'
//                         value={confirmPass}
//                         onChange={(e) => setConfirmPass(e.target.value)}
//                         onBlur={() => setTouched({ ...touched, confirmPass: true })}
//                     />
//                     <p className={!confirmPass && touched.confirmPass ? "error" : ""}>
//                         {!confirmPass && touched.confirmPass ? "Confirm Password is required" : ""}
//                     </p>

//                     <p className={password && confirmPass && password !== confirmPass ? "error" : ""}>
//                         {password && confirmPass && password !== confirmPass ? "Passwords do not match!" : ""}
//                     </p>
//                 </div>

//                 {/* Password Validation Checklist */}
//                  <PasswordChecklist
//                     rules={["minLength", "specialChar", "number", "capital", "match"]}
//                     minLength={8}
//                     value={password}
//                     valueAgain={confirmPass}
//                     onChange={(isValid) => console.log("Password valid:", isValid)}
//                 />


//                 <button type="submit">Sign Up</button> <br/>

//                 <NavLink to="/forgot-password" className={({ isActive }) => (isActive ? "active-link" : "")}>
//                     Forgot Password?
//                 </NavLink>

//                 <Link to="/login">Login</Link>
//             </form>

//             {/* ToastContainer to render the toast notifications */}
//             <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
//         </div>
//     );
// };

// export default Registration;





