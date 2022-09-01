import { useNavigate } from "react-router-dom";

const UserComponent = ({ data }) => {
  const { user, laptop } = data
  const navigate = useNavigate()
  return (
     <div>
       <p>{user.name} {user.surname}</p>
       <p>{laptop.name}</p>
       <img src={laptop.image} alt={laptop.name}/>

       <button onClick={(id) => navigate(`/laptop/${laptop.id}`)}>მეტის ნახვა</button>
     </div>
  );
};

export default UserComponent;