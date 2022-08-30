import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { ContextProvider } from "./context/app.context";

const App = () => {
  return (
     <ContextProvider>
       <BrowserRouter>
         <Router/>
       </BrowserRouter>
     </ContextProvider>

  );
}

export default App;
