import React from "react";
import styles from "../assets/Button.module.css";

function Button({ text, onClick }) {
  return (
    <button className={styles.Btn} onClick={onClick}>
      {text}
    </button>
  );
}
export default Button;
