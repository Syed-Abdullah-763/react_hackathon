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
          <div className={styles.brand}>
            <div className={styles.brandIcon} aria-hidden="true" />
            <div>
              <div className={styles.heading}>PitchCraft</div>
              <div className={styles.subHeading} style={{ margin: 0, fontSize: '0.85rem' }}>AI assistant for building business ideas</div>
            </div>
          </div>

          <h2 className={styles.heading} style={{ marginTop: 12 }}>Welcome Back 👋</h2>
          <p className={styles.subHeading}>Login to your account</p>

          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); loginHandler(); }}>
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
                aria-label="Email address"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
            </div>

            <div className={styles.secondaryRow}>
              <label style={{ color: '#bcd', fontSize: '0.9rem' }}>
                <input type="checkbox" style={{ marginRight: 8 }} /> Remember me
              </label>
              <Link className={styles.linkBtn} to="/forgot">Forgot?</Link>
            </div>

            <button type="submit" className={styles.loginBtn}>
              Login
            </button>
          </form>

          <p className={styles.footerText}>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
