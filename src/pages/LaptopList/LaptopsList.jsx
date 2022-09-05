import axios from "axios";
import { useEffect, useState } from "react";
import LaptopItem from "../../components/LaptopItem/LaptopItem";
import styles from './LaptopList.module.css'
import BackButton from "../../components/BackButton/BackButton";
import { useNavigate } from "react-router-dom";

export const LaptopsList = () => {
  const token = process.env.REACT_APP_TOKEN
  const url = `https://pcfy.redberryinternship.ge/api/laptops?token=${token}`
  const [products, setProducts] = useState([])

  const navigate = useNavigate()
  const back = () => navigate('/')

  const getData = async () => {
    const { data } = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
    setProducts(data)
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  if (!products.data) return
  if(!products ) return   (
      <div className={styles.container}>
          <BackButton onClick={back} />
          <h3 className={styles.title} >ჩანაწერების სია</h3>
          <h3 className={styles.dataNotFound}>ჩანაწერი არ მოიძებნა</h3>
      </div>
  )


  return (
     <div className={styles.container}>
       <BackButton onClick={back} />
       <h3 className={styles.title} >ჩანაწერების სია</h3>
       <div className={styles.list}>
         {products?.data.map(product => <LaptopItem key={product?.laptop.id} data={product}/>)}
       </div>
     </div>
  )
}