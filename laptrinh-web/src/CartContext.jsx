import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 1. Thêm sản phẩm vào giỏ
  const addToCart = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // 2. Tăng/Giảm số lượng
  const updateQty = (id, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  };

  // 3. Xóa sản phẩm
  const removeItem = (id) => {
    setCartItems(cartItems.filter((x) => x.id !== id));
  };

  // 4. Tính tổng tiền
  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * 1000 * item.qty,
    0,
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQty, removeItem, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
