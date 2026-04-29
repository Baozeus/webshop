import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import {
  FiPlus,
  FiEdit2,
  FiEye,
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiLogOut,
} from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

// quản lý sản phẩm
const ProductSection = ({ products }) => {
  const { addProduct } = useContext(ProductContext);
  const [ModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      return alert("Vui lòng nhập đầy đủ thông tin!");
    }

    const response = await fetch("http://localhost/shop-api/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add_product", // Khớp với lệnh 'if' trong PHP của bạn
        name: formData.name,
        category: formData.category,
        price: formData.price,
        discount: formData.discount || 0, // Tránh lỗi nếu bỏ trống
        image: formData.image,
      }),
    });
    const data = await response.json();
    if (data.status === "success") {
      alert("Thêm sản phẩm thành công!");
      setFormData({
        name: "",
        category: "",
        price: "",
        discount: "",
        image: "",
      });
      setModalOpen(false);
    } else {
      alert(data.message);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 shadow-md transition"
        >
          <FiPlus size={18} />
          <span className="font-semibold">Thêm sản phẩm</span>
        </button>
      </div>

      {ModalOpen && (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá bán
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giảm giá
            </label>
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link ảnh
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Xác nhận thêm
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4">Giá</th>
              <th className="px-6 py-4">Tồn kho</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <img
                    src={item.image}
                    className="w-12 h-12 rounded-xl object-cover"
                    alt=""
                  />
                  <span className="font-semibold text-gray-700">
                    {item.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {item.category}
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">
                  {item.price}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-lg text-xs font-bold">
                    62
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                    <AiOutlineDelete size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// quản lý đơn hàng
const OrderSection = ({ orders = [] }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Quản lý đơn hàng
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-gray-400 text-xs uppercase font-semibold">
              <th className="px-6 py-4">Mã đơn</th>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4 text-center">Tổng tiền</th>
              <th className="px-6 py-4 text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4 font-bold text-gray-700 uppercase text-sm">
                  {order.id.toString()}
                </td>
                <td className=" px-5 py-4 text-sm text-gray-800 font-medium">
                    <div className="flex flex-col">
                      <span>{order.fullname}</span>
                      <span className="text-xs text-gray-500">{order.phone}</span>
                    </div>
                </td>
                <td className="px-6 py-4 text-center font-bold text-gray-900">
                  {Number(order.total_amount).toLocaleString("vi-VN")}đ
                </td>
                <td className="px-6 py-4 text-center">
                  {order.status}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-blue-600 font-semibold hover:underline flex items-center justify-center space-x-1 mx-auto text-sm"></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// TRANG QUẢN TRỊ
function Admin() {
  const { products } = useContext(ProductContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const fetchOrders = async () => {
    const response = await fetch(
      "http://localhost/shop-api/api.php?action=get_orders",
    );
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col">
        <div className="p-6 mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <h1 className="text-2xl font-black tracking-widest uppercase mb-2">
              FASHION
            </h1>
          </div>
        </div>

        <div className="flex-1 px-4 space-y-1">
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center space-x-3 p-3.5 rounded-xl transition-all duration-200 ${
              activeTab === "products"
                ? "bg-blue-600 text-white shadow-blue-200 shadow-lg"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FiPackage size={20} />
            <span className="font-semibold">Sản phẩm</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center space-x-3 p-3.5 rounded-xl transition-all duration-200 ${
              activeTab === "orders"
                ? "bg-blue-600 text-white shadow-blue-200 shadow-lg"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FiShoppingBag size={20} />
            <span className="font-semibold">Đơn hàng</span>
          </button>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button className="space-x-3 text-gray-400 p-3 w-full hover:text-red-500 transition-colors">
            <Link to="/" className="flex gap-2 items-center">
              <FiLogOut size={20} />
              <span className="font-semibold">Đăng xuất</span>
            </Link>
          </button>
        </div>
      </div>

      {/* hiển thị nội dung */}
      <main className="ml-64 flex-1 p-10">
        {activeTab === "products" ? (
          <ProductSection products={products} />
        ) : (
          <OrderSection orders={orders} />
        )}
      </main>
    </div>
  );
}

export default Admin;
