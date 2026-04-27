import { useContext, useState, useEffect } from "react";
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

const ProductSection = ({ products }) => (
  <div>
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h2>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 shadow-md transition">
        <FiPlus size={18} />
        <span className="font-semibold">Thêm sản phẩm</span>
      </button>
    </div>

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
                <span className="font-semibold text-gray-700">{item.name}</span>
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

// QUẢN LÝ ĐƠN HÀNG
const OrderSection = ({ orders = [] }) => {
  const renderStatus = (status) => {
    const styles = {
      "Chờ xác nhận": "bg-yellow-100 text-yellow-700",
      "Đang xử lý": "bg-blue-100 text-blue-700",
      "Đang giao": "bg-purple-100 text-purple-700",
      "Đã giao": "bg-green-100 text-green-700",
      "Đã hủy": "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-lg text-xs font-bold ${styles[status] || "bg-gray-100 text-gray-600"}`}
      >
        {status}
      </span>
    );
  };

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
                  {order.id.toString().padStart(4, "0")}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                  {order.fullname}
                </td>
                <td className="px-6 py-4 text-center font-bold text-gray-900">
                  {Number(order.total_amount).toLocaleString("vi-VN")}đ
                </td>
                <td className="px-6 py-4 text-center">
                  {renderStatus(order.status)}
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

  useEffect(() => {
    fetch("http://localhost/shop-api/api.php?action=get_orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log("Lỗi lấy đơn hàng:", err));
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col">
        <div className="p-6 mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <h1 className="text-2xl font-black tracking-widest uppercase mb-2">
              FASHION
            </h1>
          </div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
            Admin Control Panel
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
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
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center space-x-3 text-gray-400 p-3 w-full hover:text-red-500 transition-colors">
            <FiLogOut size={20} />
            <span className="font-semibold">Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
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
