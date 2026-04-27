import { useCart } from "./CartContext";
import { HiOutlineTrash } from "react-icons/hi";
// icon
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";
function Cart() {
  const { cartItems, updateQty, removeItem, subtotal } = useCart();
  const shipping = 0;
  return (
    <>
      {/* navbar */}
      <div className="flex items-center justify-between py-5 px-50 fixed top-0 left-0 right-0 bg-white z-10">
        {/* logo */}
        <div>
          <h1 className="text-2xl font-black tracking-widest uppercase mb-2">
            FASHION
          </h1>
        </div>
        {/* items */}
        <div>
          <ul className="flex gap-4 cursor-pointer">
            <li>
              {" "}
              <Link to="/Home">Trang chủ</Link>
            </li>
            <li>
              <Link to="/Product">Sản phẩm</Link>
            </li>
            <li>
              <Link to="/Product">Nam</Link>
            </li>
            <li>
              <Link to="/Product">Nữ</Link>
            </li>
            <li>
              <Link to="/Product">Phụ kiện</Link>
            </li>
            <li>
              <Link to="/Product">Sale</Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="flex gap-4 cursor-pointer">
          <Link to="/Cart">
            <FaCartShopping size={22} />
          </Link>
          <IoMdPerson size={22} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-8 mt-20">
        <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* CỘT TRÁI: DANH SÁCH */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-xl relative"
              >
                <img
                  src={item.image}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="border px-2 rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="border px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {(parseFloat(item.price) * 1000).toLocaleString()} đ
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 mt-4"
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CỘT PHẢI: TỔNG TIỀN */}
          <div className="w-80 bg-gray-50 p-6 rounded-2xl h-fit">
            <h2 className="font-bold mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-2 text-sm border-b pb-4">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{subtotal.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>{shipping.toLocaleString()} đ</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Tổng cộng:</span>
              <span>{(subtotal + shipping).toLocaleString()} đ</span>
            </div>
            <button className="w-full bg-black text-white py-3 rounded-full mt-6 font-bold">
              <Link to="/Payment">Thanh toán</Link>
            </button>
            <button className="w-full border py-3 rounded-full mt-2 text-sm font-medium">
              <Link to="/Home">Tiếp tục mua sắm</Link>
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-black text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
                FASHION
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Shop thời trang uy tín hàng đầu Việt Nam. Chất lượng - Phong
                cách - Giá tốt.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
                Liên kết
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
                Chính sách
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Chính sách đổi trả
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Điều khoản dịch vụ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
                Liên hệ
              </h4>
              <div className="text-gray-400 text-sm space-y-3 mb-6">
                <p>Email: contact@fashion.vn</p>
                <p>Hotline: 1900 xxxx</p>
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaFacebook size={30} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaInstagram size={30} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaTwitter size={30} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-500 text-xs">
              &copy; 2026 FASHION. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Cart;
