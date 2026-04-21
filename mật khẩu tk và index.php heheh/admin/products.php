<?php
include "../auth/config.php";

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] != 'admin') {
    header("Location: ../auth/login.php");
    exit();
}

// ================= ADD PRODUCT =================
if (isset($_POST['add'])) {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $stock = $_POST['stock'];

    mysqli_query($conn, "INSERT INTO products (name, price, stock) 
                         VALUES ('$name', '$price', '$stock')");
}

// ================= DELETE =================
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    mysqli_query($conn, "DELETE FROM products WHERE id=$id");
}

// ================= GET PRODUCTS =================
$result = mysqli_query($conn, "SELECT * FROM products");
?>

<h2>🛠️ ADMIN - Quản lý sản phẩm</h2>

<!-- FORM ADD -->
<form method="POST">
    <input name="name" placeholder="Tên sản phẩm"><br><br>
    <input name="price" placeholder="Giá"><br><br>
    <input name="stock" placeholder="Số lượng"><br><br>
    <button name="add">➕ Thêm sản phẩm</button>
</form>

<br><br>

<table border="1" cellpadding="10">
<tr>
    <th>ID</th>
    <th>Tên</th>
    <th>Giá</th>
    <th>Stock</th>
    <th>Action</th>
</tr>

<?php while($row = mysqli_fetch_assoc($result)) { ?>
<tr>
    <td><?= $row['id'] ?></td>
    <td><?= $row['name'] ?></td>
    <td><?= $row['price'] ?> VND</td>
    <td><?= $row['stock'] ?></td>
    <td>
        <a href="?delete=<?= $row['id'] ?>">❌ Xóa</a>
    </td>
</tr>
<?php } ?>
</table>

<br>
<a href="dashboard.php">← Quay lại Dashboard</a>