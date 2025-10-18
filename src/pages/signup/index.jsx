import React, { useState } from "react";
import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem("uid", response.user.uid);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.signupBox}>
        <h2 className={styles.heading}>Create Account ✨</h2>
        <p className={styles.subHeading}>Sign up to get started</p>

        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="First Name"
              required
              className={styles.input}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Last Name"
              required
              className={styles.input}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              required
              className={styles.input}
              value={email}
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button className={styles.signupBtn} onClick={submitHandler}>
            Sign Up
          </button>
        </div>

        <p className={styles.footerText}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
