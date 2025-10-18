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
        <div className={styles.brand}>
          <div className={styles.brandIcon} aria-hidden="true" />
          <div>
            <div className={styles.heading}>PitchCraft</div>
            <div className={styles.subHeading} style={{ margin: 0, fontSize: '0.85rem' }}>AI assistant for building business ideas</div>
          </div>
        </div>

        <h2 className={styles.heading} style={{ marginTop: 12 }}>Create Account ✨</h2>
        <p className={styles.subHeading}>Sign up to get started</p>

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); submitHandler(); }}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              required
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              required
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              required
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter a password"
              required
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.secondaryRow}>
            <div style={{ color: '#bcd', fontSize: '0.9rem' }}>
              By signing up you agree to our <Link to="/terms" className={styles.linkBtn}>Terms</Link>
            </div>
          </div>

          <button type="submit" className={styles.signupBtn}>
            Sign Up
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
