import React from "react";
import styles from "../assets/Dropdown.module.css";

function Dropdown({ itemlist }) {
  return (
    <div className={styles.dropdown}>
        <button className={styles.dropdown_btn}>Choose Menu</button>
        <div className={styles.dropdown_submenu}>
        {itemlist.map((info, index) => (
            <p>{info}</p>
        ))}
        </div>
    </div>
  );
}
export default Dropdown;
