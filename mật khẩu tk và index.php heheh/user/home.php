<?php
include "../auth/config.php";

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] != 'user') {
    header("Location: ../auth/login.php");
    exit();
}
?>

<h2>USER PAGE</h2>
<p>Xin chào: <?php echo $_SESSION['user']['email']; ?></p>

<a href="../auth/logout.php">Logout</a>