import { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

function Admin() {
  const { addProduct, products } = useContext(ProductContext);
  
  // State để lưu thông tin từ Form
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    image: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return alert("Vui lòng nhập đủ tên và giá!");
    addProduct(formData);
    setFormData({ name: "", price: "", discount: "", image: "" });
    alert("Thêm sản phẩm thành công!");
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Trang Quản Trị</h1>
      
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-2xl space-y-4 mb-10">
        <h2 className="text-xl font-bold">Thêm sản phẩm mới</h2>
        <input 
          type="text" placeholder="Tên sản phẩm" className="w-full p-3 rounded-lg border"
          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="text" placeholder="Giá (VD: 300.000đ)" className="w-full p-3 rounded-lg border"
          value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
        />
        <input 
          type="text" placeholder="Giảm giá (nếu có, VD: -10%)" className="w-full p-3 rounded-lg border"
          value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})}
        />
        <input 
          type="text" placeholder="Link ảnh (URL)" className="w-full p-3 rounded-lg border"
          value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
        />
        <button className="bg-black text-white w-full py-3 rounded-lg font-bold hover:bg-gray-800">
          THÊM SẢN PHẨM
        </button>
      </form>

      {/* Hiển thị danh sách hiện có */}
      <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm hiện tại ({products.length})</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm">
            <span>{product.name} - <b>{product.price}</b></span>
            <span className="text-gray-400 text-sm">ID: {product.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;