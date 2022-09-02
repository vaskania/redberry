import { ReactComponent as BackButtonSVG } from "../../assets/BackButton.svg";
import styles from './BackButton.module.css'

const BackButton = ({onClick}) => {
  return (
     <div className={styles.container}>
       <BackButtonSVG onClick={onClick}/>
     </div>
  );
};

export default BackButton;