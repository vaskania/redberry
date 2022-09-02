import styles from './ReversedButton.module.css'

const ReversedButton = ({ children, ...props }) => {

    return (
        <div className={styles.button} style={{ ...props }} onClick={props.onClick}>
            {children}
        </div>
    );
};

export default ReversedButton;