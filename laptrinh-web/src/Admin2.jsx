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
    if (!formData.name || !formData.price) return alert("Vui lòng nhập tên và giá!");
    addProduct(formData);
    setFormData({ name: "", price: "", discount: "", image: "" });
    alert("Thêm sản phẩm thành công!");
  };