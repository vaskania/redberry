import { useNavigate } from "react-router-dom";


export const SuccessPage = () => {
  const navigate = useNavigate()

  return (
     <>
       <h3>item added successful</h3>
       <button onClick={() => navigate('/laptops')}>go to list</button>
       <button onClick={() => navigate('/')}>go to home</button>
     </>
  )
}