import { useNavigate } from "react-router-dom";

export const SuccessPage = () => {
  const navigate = useNavigate()
  return (
     <>
       <p>item added successful</p>
       <button onClick={() => navigate('/laptops')}>go to list</button>
       <button onClick={() => navigate('/')}>go to home</button>
     </>
  )
}