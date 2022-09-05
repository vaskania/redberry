import { useNavigate } from "react-router-dom";
import styles from './LapotpItem.module.css'
import ReversedButton from "../ReversedButton/ReversedButton";

const LaptopItem = ({ data }) => {
  const { user, laptop } = data
  const navigate = useNavigate()
  const getDetails = () => {
    navigate(`/laptop/${laptop.id}`)
  }

  return (
     <div className={styles.container}>
       <div className={styles.img}/>
       <div className={styles.info}>
         <p className={styles.name}>{user.name} {user.surname}</p>
         <p className={styles.laptopName}>{laptop.name}</p>
         <ReversedButton
            onClick={getDetails}
         >მეტის ნახვა</ReversedButton>
       </div>

     </div>
  );
};

export default LaptopItem;