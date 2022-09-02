import { useNavigate } from "react-router-dom";
import styles from './LapotpItem.module.css'
import Button from "../Button/Button";

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
       <Button
          top="125px"
          width="94px"
          height="21px"
          left="248px"
          font-weight="400"
          font-size="16px"
          line-height="21px"
          text-decoration-line="underline"
          color="#4386A9"
          border="none"
          background-color="transparent"
          display="flex"
          onClick={getDetails}
       >მეტის ნახვა</Button>
     </div>
  );
};

export default LaptopItem;