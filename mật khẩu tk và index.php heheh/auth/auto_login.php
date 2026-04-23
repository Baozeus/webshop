<?php
include "config.php";

if (!isset($_SESSION['user']) && isset($_COOKIE['user_id'])) {
    $id = $_COOKIE['user_id'];
    $result = mysqli_query($conn, "SELECT * FROM users WHERE id=$id");
    $user = mysqli_fetch_assoc($result);

    if ($user) {
        $_SESSION['user'] = $user;
    }
}
?>