import styles from './Radio.module.css'

const Radio = ({...props}) => {
    const handleChange = () => {
        console.log('changed')
    }

    return (
        <div className={styles.container} style={{...props}}>
            <label className={styles.conditionLabel}>{props.title}</label>
            <input className={styles.new} type="radio" name={props.name} id={props.value} value={props.value} checked={props.name === 'new'} onChange={handleChange}/>
        </div>
    );
};

export default Radio;