import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppContext } from "../context/app.context";


export const SuccessPage = () => {
  const navigate = useNavigate()
  const { data } = useState(AppContext)

  console.log(data)
  return (
     <>
       <h3>item added successful</h3>
       <button onClick={() => navigate('/laptops')}>go to list</button>
       <button onClick={() => navigate('/')}>go to home</button>
     </>
  )
}