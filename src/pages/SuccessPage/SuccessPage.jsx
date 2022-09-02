import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppContext } from "../../context/app.context";
import { ReactComponent as Success } from "../../assets/Success.svg";
import styles from './SuccessPage.module.css'
import Button from "../../components/Button/Button";


export const SuccessPage = () => {
  const navigate = useNavigate()
  const { data } = useState(AppContext)
  const goToListPage = () => navigate('/laptops')
  const goToHomePage = () => navigate('/')

  console.log(data)
  return (
     <div className={styles.successContainer}>
       <div className={styles.container}>
         <Success className={styles.image}/>
         <p>ჩანაწერი დამატებულია!</p>
         <Button
            top="381px"
            onClick={goToListPage}
         >სიაში გადაყვანა</Button>
         <Button
            top="459px"
            background="#fff"
            color="#0089A7"
            border="0px solid #fff"
            onClick={goToHomePage}
         >მთავარი</Button>
       </div>
     </div>
  )
}