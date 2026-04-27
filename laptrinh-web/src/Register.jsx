import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineArrowLeft,
} from "react-icons/hi";

function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost/shop-api/api.php?action=register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, action: "register" }),
      },
    );

    const data = await response.json();
    if (data.status === "success") {
      alert("Đăng ký thành công.");
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-4xl shadow-xl p-10 border border-gray-100 relative">
        <Link
          to="/"
          className="absolute top-8 left-8 text-gray-400 hover:text-black transition"
        >
          <HiOutlineArrowLeft size={24} />
        </Link>
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black tracking-widest uppercase mb-2">
            FASHION
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Tạo tài khoản để bắt đầu mua sắm
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <HiOutlineUser className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Họ và tên"
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <HiOutlinePhone className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Số điện thoại"
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <HiOutlineMail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Địa chỉ Email"
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <HiOutlineLockClosed className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Mật khẩu"
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all mt-4">
            ĐĂNG KÝ
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
