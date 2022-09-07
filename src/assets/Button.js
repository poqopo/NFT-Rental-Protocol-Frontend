import React from "react"
import styles from "./Button.module.css"

function Button({ text, onClick }) {
    return (
        <Button className={styles.btn} onClick={onClick}>
            {text}
        </Button>
    )
}
export default Button;