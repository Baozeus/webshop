import { useCart } from "./CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";
// icons
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

function Payment() {
  const { cartItems, subtotal, clearCart } = useCart();
  const shipping = 0;

  const [customerInfo, setCustomerInfo] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    total_amount: 0,
    payment_method: "Thanh toán khi nhận hàng",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hoàn thành đơn hàng
  const handleCompleteOrder = async () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (savedCart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    if (
      !customerInfo.fullname ||
      !customerInfo.phone ||
      !customerInfo.address
    ) {
      alert("Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ!");
      return;
    }

    const response = await fetch("http://localhost/shop-api/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_order",
        fullname: customerInfo.fullname,
        phone: customerInfo.phone,
        email: customerInfo.email,
        address: customerInfo.address,
        note: customerInfo.note,
        payment_method: customerInfo.payment_method,
        total_amount: subtotal + shipping,
        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      }),
    });

    const data = await response.json();
    if (data.status === "success") {
      localStorage.removeItem("cart");
      clearCart();
      window.location.href = "/Home";
      alert("Đặt hàng thành công! Mã đơn hàng: " + data.order_id);
    } else {
      alert("Lỗi: " + data.message);
    }
  };
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
      {/* Thông tin đơn hàng và địa chỉ khách hàng*/}
      <div className="max-w-300 mx-auto my-20 ">
        <div className="grid grid-cols-3">
          {/* customer information */}
          <div className="col-span-2 p-3">
            <fieldset className="border-1  rounded-lg p-5">
              <p className="font-bold text-2xl mb-3">Thông tin giao hàng</p>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Họ và tên</label>
                <input
                  className="border rounded-md w-full p-2"
                  type="text"
                  id="name"
                  name="fullname"
                  checked={customerInfo.fullname}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    className="border rounded-md w-full p-2"
                    type="tel"
                    id="phone"
                    name="phone"
                    checked={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 ml-3">
                  <label htmlFor="email">Email</label>
                  <input
                    className="border rounded-md w-full p-2"
                    type="email"
                    id="email"
                    name="email"
                    checked={customerInfo.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  className="border rounded-md w-full p-2"
                  type="text"
                  id="address"
                  name="address"
                  checked={customerInfo.address}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="note">Ghi chú</label>
                <input
                  className="border rounded-md w-full p-2"
                  type="text"
                  id="note"
                  name="note"
                  checked={customerInfo.note}
                  onChange={handleInputChange}
                  placeholder="Ghi chú thêm cho đơn hàng (nếu có) "
                ></input>
              </div>
            </fieldset>
            {/* Phương thức thanh toán */}
            <div className="border-1 rounded-lg p-5 mt-5">
              <p className="font-bold text-2xl mb-3">Phương thức thanh toán</p>
              <div className="flex border-1 rounded-2xl p-3">
                <input
                  type="radio"
                  id="cash-on-delivery"
                  checked={
                    customerInfo.payment_method === "Thanh toán khi nhận hàng"
                  }
                  onChange={() =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      payment_method: "Thanh toán khi nhận hàng",
                    }))
                  }
                  name="shipping-address"
                />
                <div className="flex flex-col gap-1">
                  <label htmlFor="cash-on-delivery" className="ml-2">
                    Thanh toán khi nhận hàng
                  </label>
                  <label htmlFor="cash-on-delivery" className="ml-2 text-sm">
                    (Thanh toán bằng tiền mặt khi nhận hàng)
                  </label>
                </div>
              </div>
              <div className="flex border-1 rounded-2xl p-3 mt-3">
                <input
                  type="radio"
                  id="bank-transfer"
                  checked={
                    customerInfo.payment_method === "Chuyển khoản ngân hàng"
                  }
                  onChange={() =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      payment_method: "Chuyển khoản ngân hàng",
                    }))
                  }
                  name="shipping-address"
                />
                <div className="flex flex-col gap-1">
                  <label htmlFor="bank-transfer" className="ml-2">
                    Chuyển khoản ngân hàng
                  </label>
                  <label htmlFor="bank-transfer" className="ml-2 text-sm">
                    (Chuyển khoản trước khi nhận hàng)
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-80 bg-gray-50 p-6 rounded-2xl h-fit sticky top-20">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-400">
                      Màu: Trắng | Size: S
                    </p>
                    <p className="font-bold">
                      {(parseFloat(item.price) * 1000).toLocaleString()} đ
                    </p>
                  </div>
                </div>
              ))}
              <div className="space-y-2 text-sm border-b pb-4 mt-4">
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
              <button
                onClick={handleCompleteOrder}
                className="w-full bg-black text-white py-3 rounded-full mt-6 font-bold cursor-pointer"
              >
                Hoàn tất đơn hàng
              </button>
            </div>
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
export default Payment;
