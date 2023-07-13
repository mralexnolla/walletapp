import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import "./stylesheets/alignments.css"
import "./stylesheets/custome-components.css"
import "./stylesheets/form-elements.css"
import "./stylesheets/text-elements.css"
import "./stylesheets/theme.css"
import {Routes, Route} from "react-router-dom"

function App() {
 

  return (
    <div>
     <Routes>
       <Route path="/login" element={<Login />}/>
       <Route path="/register" element={<Register />}/>
     </Routes>
      
    </div>
  );
}

export default App
