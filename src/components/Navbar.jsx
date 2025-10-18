import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <Link to="/dashboard">PitchCraft</Link>
      </div>
      <button
        className={styles.burger}
        onClick={() => setOpen((s) => !s)}
        aria-label="Toggle menu"
      >
        <span className={open ? styles.burgerOpen : ""} />
      </button>

      <div className={`${styles.links} ${open ? styles.open : ""}`}>
        <Link to="/dashboard" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link to="/" onClick={() => setOpen(false)}>
          Login
        </Link>
        <Link to="/signup" onClick={() => setOpen(false)}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
