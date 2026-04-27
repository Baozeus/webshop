import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";
import "./App.css";
import Home from "./Home";
import Product from "./Product";
import Cart from "./Cart";
import Admin from "./Admin";
import Login from "./Login";
import Payment from "./Payment";
import Register from "./Register";
function App() {
  return (
    <>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route path="/Product" element={<Product />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/" element={<Login />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;
