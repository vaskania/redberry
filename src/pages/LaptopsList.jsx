import axios from "axios";
import { useEffect, useState } from "react";
import UserComponent from "../components/UserComponent";

export const LaptopsList = () => {
  const token = process.env.REACT_APP_TOKEN
  const url = `https://pcfy.redberryinternship.ge/api/laptops?token=${token}`
  const [products, setProducts] = useState([])


  const getData = async () => {
    const { data } = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
    setProducts(data)
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  if (!products.data) return <h5>loading</h5>

  return (
     <>
       {products?.data.map(el => <UserComponent key={el.laptop.id} data={el}/>)}
     </>
  )
}