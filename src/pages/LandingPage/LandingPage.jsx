import { useNavigate } from "react-router-dom";
import styles from './LandingPage.module.css'
import Logo from "../../components/Logo2/Logo";
import Group from "../../components/Group/Group";
import Button from "../../components/Button/Button";

export const Landing = () => {
  const navigate = useNavigate()
  const addNewProduct = () => navigate('/user/create')
  const getAllProduct = () => navigate('/laptops')

  return (
     <div className={styles.container}>
       <Logo/>
       <Group/>
       <Button top="787px" onClick={addNewProduct}>ჩანაწერის დამატება</Button>
       <Button top="873px" onClick={getAllProduct}>ჩანაწერების სია</Button>
     </div>
  )
}
