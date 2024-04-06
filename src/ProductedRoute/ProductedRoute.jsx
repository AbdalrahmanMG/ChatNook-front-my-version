/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
export default function ProductedRoute({ children }) {
  if (localStorage.getItem("token")) {
    return children; // Render the protected component
  } else {
    return <Navigate to="/login" />; // Redirect to the login page
  }
}
