import './app.scss'
import Home from "./pages/home/Home"
import Watch from "./pages/watch/Watch"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate
} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from './authContext/AuthContext'


function App() {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          user ? <Home /> : <Navigate to="/register" />
        } />
        <Route path="/register" element={
          !user ? <Register /> : <Navigate to="/" />
        } />
        <Route path="/login" element={
          !user ? <Login /> : <Navigate to="/" />
        } />
        {user &&
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route exact path="/watch/:id" element={<Watch />} />
          </>
        }
      </Routes>
    </Router >
  )
}

export default App;
