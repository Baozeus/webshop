<?php
include "../auth/config.php";

if (!isset($_SESSION['user'])) {
    header("Location: ../auth/login.php");
    exit();
}

$result = mysqli_query($conn, "SELECT * FROM products");
?>

<style>
body {
    font-family: Arial;
    background: #f5f5f5;
}

.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
}

.card {
    background: white;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
}

.card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.price {
    color: red;
    font-weight: bold;
}

button {
    background: orange;
    border: none;
    padding: 10px;
    color: white;
    cursor: pointer;
}
</style>

<h2 style="text-align:center;">🛍️ SHOP QUẦN ÁO</h2>

<div class="container">
<?php while($row = mysqli_fetch_assoc($result)) { ?>
    <div class="card">
        <img src="../images/<?= $row['image'] ?? 'default.jpg' ?>">
        <h3><?= $row['name'] ?></h3>
        <p class="price"><?= number_format($row['price']) ?> VND</p>
        <button>🛒 Thêm vào giỏ</button>
    </div>
<?php } ?>
</div>