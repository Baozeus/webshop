import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import { useCart } from "./CartContext";
import Button from "./Button";
import { Link } from "react-router-dom";
import img1 from "./assets/avatar.jpg";
// icon
import { FaCartShopping } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";
import { PiStarFourBold } from "react-icons/pi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { BsHandbagFill } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaTwitter, FaArrowRight, FaTruck } from "react-icons/fa";
function Home() {
  const { products } = useContext(ProductContext);
  const { addToCart } = useCart();
  return (
    <>
      {/* nav */}
      <div className="flex items-center justify-between py-5 px-50 fixed top-0 left-0 right-0 bg-white z-10">
        {/* logo */}
        <div>
          <img src="" alt="" />
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
          <Link to="/Admin"><IoMdPerson size={22} /></Link>
        </div>
      </div>

      {/* introduce */}
      <div>
        <img
          src={img1}
          alt="Introduce"
          className="w-full h-150 object-cover relative"
        />
        <div className="absolute top-1/4 left-1/9 w-110 flex flex-col gap-5">
          <p className="text-white text-6xl">New Collection 2026</p>
          <p className="text-white">
            Khám phá những xu hướng thời trang mới nhất, phong cách hiện đại và
            năng động
          </p>
          <div className="flex gap-3">
            <button className="bg-black px-10 py-3 text-white flex items-center gap-2 flex-col rounded-md">
              Mua ngay
              <FaArrowRight />
            </button>
            <button className="bg-white flex items-center justify-center px-11 py-3 text-black rounded-md">
              Khám phá
            </button>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="text-center p-5">
        <p className="text-2xl font-bold">Danh mục sản phẩm</p>
      </div>

      {/* item */}
      <div className="flex justify-center gap-10 py-5 max-w-300 mx-auto">
        <a
          href="#"
          className="text-white bg-black w-100 h-60 flex items-center justify-center rounded-md text-2xl"
        >
          NAM
        </a>
        <a
          href="#"
          className="text-white bg-black w-100 h-60 flex items-center justify-center rounded-md text-2xl"
        >
          NỮ
        </a>
        <a
          href="#"
          className="text-white bg-black w-100 h-60 flex items-center justify-center rounded-md text-2xl"
        >
          PHỤ KIỆN
        </a>
      </div>
      {/* product */}
      <div className=" bg-gray-100 ">
        <div className="text-center p-5">
          <p className="text-2xl font-bold">Sản phẩm nổi bật</p>
        </div>
        <div className="max-w-300 mx-auto grid grid-cols-4 gap-5 ">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  {product.discount ? product.discount : "Mới"}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-75 h-80 rounded-2xl hover:scale-105 transition-transform duration-300"
                />
                <p className="font-bold my-1">{product.name}</p>
                <p className="font-bold">{product.price}</p>
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
            ))} ;
          </div>
        </div>

      {/* footer */}
      <div className="bg-orange-600 ">
        <div className="text-white flex items-center justify-center flex-col gap-3 p-5">
          <PiStarFourBold size={80} />
          <p className="text-3xl">GIẢM GIÁ 50%</p>
          <p className="text-2xl">Cho tất cả sản phẩm - Chỉ trong tuần này!</p>
          <Button
            className={
              "bg-white text-orange-600 px-10 py-3 flex items-center gap-2 rounded-lg"
            }
          >
            Mua Ngay
          </Button>
        </div>
      </div>
      <section class="py-16 bg-white border-t border-gray-100">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-5 text-white">
                <FaTruck size={30} />
              </div>
              <h3 class="font-bold text-lg mb-2">Miễn phí vận chuyển</h3>
              <p class="text-gray-500 text-sm">Cho đơn hàng trên 500.000đ</p>
            </div>

            <div class="flex flex-col items-center">
              <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-5 text-white">
                <IoShieldCheckmarkSharp size={30} />
              </div>
              <h3 class="font-bold text-lg mb-2">Thanh toán an toàn</h3>
              <p class="text-gray-500 text-sm">Bảo mật thông tin 100%</p>
            </div>

            <div class="flex flex-col items-center">
              <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-5 text-white">
                <BsHandbagFill size={30} />
              </div>
              <h3 class="font-bold text-lg mb-2">Đổi trả miễn phí</h3>
              <p class="text-gray-500 text-sm">Trong vòng 30 ngày</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="bg-black text-white pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 class="font-bold text-sm uppercase tracking-widest mb-6">
                FASHION
              </h4>
              <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
                Shop thời trang uy tín hàng đầu Việt Nam. Chất lượng - Phong
                cách - Giá tốt.
              </p>
            </div>

            <div>
              <h4 class="font-bold text-sm uppercase tracking-widest mb-6">
                Liên kết
              </h4>
              <ul class="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#" class="hover:text-white transition">
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-sm uppercase tracking-widest mb-6">
                Chính sách
              </h4>
              <ul class="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#" class="hover:text-white transition">
                    Chính sách đổi trả
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition">
                    Điều khoản dịch vụ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-sm uppercase tracking-widest mb-6">
                Liên hệ
              </h4>
              <div class="text-gray-400 text-sm space-y-3 mb-6">
                <p>Email: contact@fashion.vn</p>
                <p>Hotline: 1900 xxxx</p>
              </div>
              <div class="flex gap-4">
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <FaFacebook size={30} />
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <FaInstagram size={30} />
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <FaTwitter size={30} />
                </a>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-800 pt-8">
            <p class="text-center text-gray-500 text-xs">
              &copy; 2026 FASHION. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Home;
