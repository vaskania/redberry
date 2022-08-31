import { Route, Routes } from 'react-router-dom'
import { Landing } from "../pages/LandingPage";
import CreateNewProduct from "../pages/CreateNewProduct";
import { LaptopsList } from "../pages/LaptopsList";
import { LaptopDetails } from "../pages/LaptopDetails";
import { SuccessPage } from "../pages/SuccessPage";

export const Router = () => (
   <Routes>
     <Route path='/' element={<Landing/>}/>
     <Route path='/laptop/create' element={<CreateNewProduct/>}/>
     <Route path='/laptops' element={<LaptopsList/>}/>
     <Route path='/laptops/:id' element={<LaptopDetails/>}/>
     <Route path='/success' element={<SuccessPage/>}/>
   </Routes>
)