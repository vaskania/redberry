import { UserForm } from "../components/UserForm";
import { LaptopForm } from "../components/LaptopForm";
import { useContext } from "react";
import { AppContext } from "../context/app.context";

const CreateNewProduct = () => {
  const { isActive } = useContext(AppContext)
  return (
     <>
       {!isActive && <UserForm/>}
       {isActive && <LaptopForm/>}
     </>
  )
}

export default CreateNewProduct
