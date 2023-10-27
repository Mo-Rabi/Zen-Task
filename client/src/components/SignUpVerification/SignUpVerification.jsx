import React from "react";
import styles from "./SignUpVerification.module.css";
import { Link } from "react-router-dom";

export default function SignUpVerification() {
  
  return (
    <>
      <div>Your accuont is now verified</div>
      <Link to={"/login"} className="link-dark fw-bold">
        Login
      </Link>
    </>
  );
}
