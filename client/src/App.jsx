import "./stylesheets/text-elements.css"
import "./stylesheets/form-elements.css"
import "./stylesheets/custome-components.css"
import "./stylesheets/alignments.css"
import "./stylesheets/theme.css"
import "./stylesheets/layout.css"
import {Routes, Route} from "react-router-dom"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Home from "./pages/Home/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import Loader from "./components/Loader"
import {useSelector} from 'react-redux'
import Transactions from "./pages/transactions/Transactions"


function App() {
  
  const loading = useSelector((store) => store.loading.loading);
   
  return (
    <div>
      {loading && <Loader />}

      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/transactions"
          element = {
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App
