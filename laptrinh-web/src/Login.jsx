import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost/shop-api/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "login",
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("isLoggedIn", "true");
      if (data.user.role === "admin") {
        navigate("/Admin");
      } else {
        navigate("/Home");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black tracking-widest uppercase mb-2">
            FASHION
          </h1>
          <h2 className="text-3xl font-bold text-gray-900">Đăng nhập</h2>
          <p className="text-gray-500 mt-2">Chào mừng bạn quay trở lại!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <i className="fa-regular fa-envelope"></i>
              </span>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full pl-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="text-center text-gray-500 text-sm mt-6">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transform active:scale-[0.98] transition-all shadow-md"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
