import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppContext } from "../context/app.context";
import { ReactComponent as Success } from "../assets/success.svg";


export const SuccessPage = () => {
  const navigate = useNavigate()
  const { data } = useState(AppContext)

  console.log(data)
  return (
     <>
       <Success/>
       <h3>ჩანაწერი დამატებულია!</h3>
       <button onClick={() => navigate('/laptops')}>go to list</button>
       <button onClick={() => navigate('/')}>go to home</button>
     </>
  )
}