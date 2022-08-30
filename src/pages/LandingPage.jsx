import { useNavigate } from "react-router-dom";
import b1 from './Button1.module.css'
import b2 from './Button2.module.css'

export const Landing = () => {
  const navigate = useNavigate()
  const addNewProduct = () => navigate('/laptop/create')
  const getAllProduct = () => navigate('/laptops')

  return (
     <>
       <button className={b1.button1} onClick={addNewProduct}><span>ჩანაწერის დამატება</span></button>
       <button className={b2.button2} onClick={getAllProduct}><span>ჩანაწერების სია</span></button>
     </>
  )
}
