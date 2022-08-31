import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/app.context";

export const SuccessPage = () => {
  const navigate = useNavigate()
  // const { data } = useContext(AppContext)
  //
  // console.log(data)
  return (
     <>
       <p>item added successful</p>
       <button onClick={() => navigate('/laptops')}>go to list</button>
       <button onClick={() => navigate('/')}>go to home</button>
     </>
  )
}