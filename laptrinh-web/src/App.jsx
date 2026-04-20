import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";
import "./App.css";
import Home from "./Home";
import Product from "./Product";
import Cart from "./Cart";
import Admin from "./Admin";
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
            </Routes>
          </Router>
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;
