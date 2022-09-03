import styles from './Logo.module.css'

const Logo = ({...props}) => {
    return (
        <div className={styles.logo} style={{...props}}/>
    );
};

export default Logo;