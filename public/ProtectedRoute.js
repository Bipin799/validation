// import React from "react";
// import { Navigate, Route } from "react-router-dom";

// // ProtectedRoute component to check if the user is authenticated
// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const isAuthenticated = localStorage.getItem("user");

//   return (
//     <Route
//       {...rest}
//       element={
//         isAuthenticated ? (
//           <Component />
//         ) : (
//           <Navigate to="/login" />  // Redirect to login if not authenticated
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
