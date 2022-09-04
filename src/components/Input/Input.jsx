import styles from './Input.module.css'

const Input = ({ ...props }) => {
    const { error } = props
    const onChange = (e) => {
        return props.onHandleChange({ name: props.name, value: e.target.value })
    }
    return (
        <div className={styles.container} style={{ ...props }}>
            <label className={styles.inputTitle} style={error ? { color: "red" } : {}}>{props.title}</label>
            <div className={error ? styles.error : styles.inputContainer}>
                <input className={styles.input} type={props.type} value={props.value} onChange={onChange}/>
            </div>
            <label className={styles.inputHint} style={error ? { color: "red" } : {}}>{props.hint}</label>
        </div>
    );
};

export default Input;


