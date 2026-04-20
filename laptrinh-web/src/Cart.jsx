import { useCart } from "./CartContext";
import { HiOutlineTrash } from "react-icons/hi";
function Cart() {
  const { cartItems, updateQty, removeItem, subtotal } = useCart();
  const shipping = 0;
  console.log("Dữ liệu giỏ hàng:", cartItems);
  return (
    <div className="max-w-6xl mx-auto p-8">
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
                <p className="text-sm text-gray-400">Màu: Trắng | Size: S</p>
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
        <div className="w-full lg:w-80 bg-gray-50 p-6 rounded-2xl h-fit">
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
            Thanh toán
          </button>
          <button className="w-full border py-3 rounded-full mt-2 text-sm font-medium">
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
