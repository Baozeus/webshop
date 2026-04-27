import { useContext, useState } from "react";
import { ProductContext } from "./ProductContext";
import { useCart } from "./CartContext";
// button
import Button from "./Button";
// icon
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";
function Product() {
  const { products } = useContext(ProductContext);
  const { addToCart } = useCart();
  // filter
  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // bỏ chữ đ và dấu chấm
  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/\./g, "").replace("đ", ""));
  };
  const filteredProducts = products.filter((product) => {
    // Lọc theo danh mục
    const categoryMatch =
      filters.category === "all" || product.category === filters.category;

    // Lọc theo khoảng giá
    const price = parsePrice(product.price);
    let priceMatch = false;

    switch (filters.price) {
      case "under500":
        priceMatch = price < 500000;
        break;
      case "500-1000":
        priceMatch = price >= 500000 && price <= 1000000;
        break;
      case "over1000":
        priceMatch = price > 1000000;
        break;
      default:
        priceMatch = true;
    }

    return categoryMatch && priceMatch;
  });
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

      <div className="flex gap-1 mt-20 px-30">
        <aside class="w-64 p-6 bg-white border-r border-gray-100 min-h-screen">
          <div class="mb-8">
            <h3 class="flex items-center gap-2 font-bold text-lg mb-4">
              Danh mục
            </h3>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={filters.category === "all"}
                  onChange={handleFilterChange}
                  class="w-4 h-4 accent-black"
                />
                <span class="text-sm text-gray-700 group-hover:text-black transition">
                  Tất cả
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value="Nam"
                  checked={filters.category === "Nam"}
                  onChange={handleFilterChange}
                  class="w-4 h-4 accent-black"
                />
                <span class="text-sm text-gray-700 group-hover:text-black transition">
                  Nam
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value="Nữ"
                  checked={filters.category === "Nữ"}
                  onChange={handleFilterChange}
                  class="w-4 h-4 accent-black"
                />
                <span class="text-sm text-gray-700 group-hover:text-black transition">
                  Nữ
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value="Phụ kiện"
                  checked={filters.category === "Phụ kiện"}
                  onChange={handleFilterChange}
                  class="w-4 h-4 accent-black"
                />
                <span class="text-sm text-gray-700 group-hover:text-black transition">
                  Phụ kiện
                </span>
              </label>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="font-bold text-lg mb-4">Khoảng giá</h3>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  value="all"
                  checked={filters.price === "all"}
                  onChange={handleFilterChange}
                  class="w-4 h-4 accent-black"
                />
                <span class="text-sm text-gray-700 group-hover:text-black transition">
                  Tất cả
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  value="under500"
                  checked={filters.price === "under500"}
                  onChange={handleFilterChange}
                  class="w-4 h-4 accent-black"
                />
                <span class="text-sm text-gray-700 group-hover:text-black transition">
                  Dưới 500.000đ
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  value="500-1000"
                  checked={filters.price === "500-1000"}
                  onChange={handleFilterChange}
                  class="w-4 h-4 accent-black"
                />
                <span class="text-sm text-gray-700 group-hover:text-black transition">
                  500.000đ - 1.000.000đ
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  value="over1000"
                  checked={filters.price === "over1000"}
                  onChange={handleFilterChange}
                  class="w-4 h-4 accent-black"
                />
                <span class="text-sm text-gray-700 group-hover:text-black transition">
                  Trên 1.000.000đ
                </span>
              </label>
            </div>
          </div>

          <button
            onClick={() => setFilters({ category: "all", price: "all" })}
            class="w-full py-2.5 border-2 border-black font-bold text-sm uppercase rounded-lg hover:bg-black hover:text-white transition-all duration-300 active:scale-95"
          >
            Xóa bộ lọc
          </button>
        </aside>
        <div>
          <p className="font-bold text-3xl mb-4">Sản phẩm</p>

          {/* items */}
          <div className="grid grid-cols-4 gap-5 ">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative">
                {product.discount && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  {product.discount}
                </span>)}

                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-75 h-80 rounded-2xl hover:scale-105 transition-transform duration-300"
                />
                <p className="font-bold my-1">{product.name}</p>
                <p className="font-bold">{product.price}đ</p>
                <div>
                  <Button
                    onClick={() => addToCart(product)}
                    className={
                      " bg-black text-white rounded-full flex items-center gap-2 text-sm absolute bottom-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    }
                  >
                    <MdShoppingCart size={35} /> Thêm vào giỏ
                  </Button>
                </div>
              </div>
            ))}
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
export default Product;
