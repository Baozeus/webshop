import { createContext, useState, useEffect } from "react";
// 1. Tạo Context
export const ProductContext = createContext();

// 2. Tạo Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Hàm lấy dữ liệu từ PHP khi trang vừa load
  const fetchProducts = async () => {
    const response = await fetch("http://localhost/shop-api/api.php");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const addProduct = async (newProduct) => {
    await fetch("http://localhost/shop-api/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProduct,
        action: "add_product",
      }),
    });
    fetchProducts();
  };
  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
