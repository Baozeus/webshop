<?php
include "../auth/config.php";

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] != 'admin') {
    header("Location: ../auth/login.php");
    exit();
}
?>

<h2>ADMIN DASHBOARD</h2>
<p>Xin chào admin: <?php echo $_SESSION['user']['email']; ?></p>

<a href="../auth/logout.php">Logout</a>