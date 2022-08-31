import { UserForm } from "../components/UserForm";
import { LaptopForm } from "../components/LaptopForm";
import { useContext, useState } from "react";
import { AppContext } from "../context/app.context";

const CreateNewProduct = () => {
  const { isActive, data } = useContext(AppContext)
  return (
     <>
       {/*    Employee info*/}
       {/*    Laptop info*/}
       {!isActive && <UserForm/>}
       {isActive && <LaptopForm/>}
     </>
  )
}

export default CreateNewProduct
