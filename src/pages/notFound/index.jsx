import React from "react";
import styles from "./notFound.module.css";

const NotFound = () => {
  return (
    <main className={styles.main}>
      <div className={styles.errorBox}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.message}>Page Not Found</h2>
        <p className={styles.subMessage}>
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <a href="/" className={styles.homeBtn}>
          Go Home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
