
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import PrivateRoute from "./utils/PrivateRoute";
import Products from "./page/Products";
import { useAuth } from "./Context/Auth";
import CreateProduct from "./page/Admin/CreateProduct";
import UpdateProduct from "./page/Admin/UpdateProduct";


function App() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/product" element={<Products />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
        </Route>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
      
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
