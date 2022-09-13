import React from "react";
import styles from "../assets/Input.module.css";

function Input({ placeholder, onChange }) {
  return (
    <input className={styles.Input} placeholder={placeholder} onChange={onChange}/>
  );
}
export default Input;
