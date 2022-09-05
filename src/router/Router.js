import { Route, Routes } from 'react-router-dom'
import { Landing } from "../pages/LandingPage/LandingPage";
import { LaptopsList } from "../pages/LaptopList/LaptopsList";
import { LaptopDetail } from "../pages/LaptopDetail/LaptopDetail";
import { SuccessPage } from "../pages/SuccessPage/SuccessPage";
import { LaptopForm } from "../pages/LaptopForm/LaptopForm";
import { UserForm } from "../pages/UserForm/UserForm";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

export const Router = () => (
   <Routes>
     <Route path='/' index element={<Landing/>}/>
     <Route path='user/create' element={<UserForm/>}/>
     <Route path='laptop/create' element={<LaptopForm/>}/>
     <Route path='/laptops' element={<LaptopsList/>}/>
     <Route path='/laptop/:id' element={<LaptopDetail/>}/>
     <Route path='/success' element={<SuccessPage/>}/>
     <Route path="*" element={<PageNotFound />} />
   </Routes>
)

