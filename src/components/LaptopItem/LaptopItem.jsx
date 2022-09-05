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
       <p className={styles.name}>{user.name} {user.surname}</p>
       <p className={styles.laptopName}>{laptop.name}</p>
       <img src={laptop.image} alt={laptop.name} className={styles.img}/>
       <ReversedButton
          onClick={getDetails}
       >მეტის ნახვა</ReversedButton>
     </div>
  );
};

export default LaptopItem;