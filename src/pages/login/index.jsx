import React, { useState } from "react";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("uid", response.user.uid);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h2 className={styles.heading}>Welcome Back 👋</h2>
          <p className={styles.subHeading}>Login to your account</p>

          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                required
                className={styles.input}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                required
                className={styles.input}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button className={styles.loginBtn} onClick={loginHandler}>
              Login
            </button>
          </div>

          <p className={styles.footerText}>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
