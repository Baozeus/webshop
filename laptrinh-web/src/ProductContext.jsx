import { createContext, useState } from "react";
import img from "./assets/avatar.jpg";
// 1. Tạo Context
export const ProductContext = createContext();

// 2. Tạo Provider
export const ProductProvider = ({ children }) => {
  // Kho dữ liệu sản phẩm của bạn (Tạm thời fix cứng, sau này Admin sẽ thêm vào đây)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Áo Thun Trắng",
      price: "200.000đ",
      discount: "-25%",
      image: img,
    },
    {
      id: 2,
      name: "Áo Khoác Đen",
      price: "899.000đ",
      discount: "-10%",
      image: img,
    },
    {
      id: 3,
      name: "Quần Jeans Basic",
      price: "500.000đ",
      discount: "",
      image: img,
    },
    {
      id: 4,
      name: "Quần Jeans Basic",
      price: "500.000đ",
      discount: "",
      image: img,
    },
    {
      id: 5,
      name: "Quần Jeans Basic",
      price: "600.000đ",
      discount: "",
      image: img,
    },
  ]);
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: Date.now() }, // Tạo ID duy nhất bằng thời gian
    ]);
  };
  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
