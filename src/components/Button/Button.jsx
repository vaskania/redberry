import styles from './Button.module.css'

const Button = ({ children, ...props }) => {

  return (
     <button className={styles.button} style={{ ...props }} onClick={props.onClick}>
       <span className={styles.text} style={{ ...props }}>{children}</span>
     </button>
  );
};

export default Button;