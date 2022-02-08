import Sidebar from "./components/sidebar/Sidebar";
import TopBar from "./components/topbar/Topbar"
import "./app.css"
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import ListList from "./pages/listList/ListList";
import List from "./pages/List/List";
import NewList from "./pages/newList/NewList";


function App() {
  const { user } = useContext(AuthContext)
  return (

    <Router>
      {user && <TopBar />}
      <div className="container">
        {user && <Sidebar />}
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          {user &&
            (<>
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/movies" element={<ProductList />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="/newMovie" element={<NewProduct />} />
              <Route path="/newList" element={<NewList />} />
              <Route path="/lists" element={<ListList />} />
              <Route path="/list/:listId" element={<List />} />


            </>)
          }
        </Routes>
      </div>

    </Router >

  );
}

export default App;
