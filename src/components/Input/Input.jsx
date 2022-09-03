import styles from './Input.module.css'
import {useState} from "react";


const Input = ({...props}) => {

    const onChange = (e) => {
       return props.onHandleChange({name:props.name,value: e.target.value})
    }

    return (
        <div className={styles.container} style={{...props}}>
            <label className={styles.inputTitle}>{props.title}</label>
            <div className={props.error ? styles.error : styles.inputContainer}>
                <input className={styles.input} type={props.type} onChange={onChange}/>
            </div>
            <label className={styles.inputHint}>{props.hint}</label>
        </div>
    );
};

export default Input;


