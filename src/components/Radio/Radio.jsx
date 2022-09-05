import styles from './Radio.module.css'

const Radio = ({ ...props }) => {
    const onChange = (e) => {
        return props.handleChange({ name: e.target.name, value: e.target.value })
    }
    return (
        <div className={styles.container} style={{ ...props }}>
            <div className={styles.radioItem}>
                <input
                    type="radio"
                    name={props.name}
                    id={props.value}
                    value={props.value}
                    checked={props.checked === props.value}
                    onChange={onChange}/>
                <label htmlFor={props.value}></label>
            </div>
            <label className={styles.radioLabel} htmlFor={props.value}>{props.title}</label>
        </div>

    );
};

export default Radio;