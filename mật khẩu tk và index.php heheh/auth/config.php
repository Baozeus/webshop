<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = mysqli_connect("localhost", "root", "", "webshop");

if (!$conn) {
    die("DB lỗi: " . mysqli_connect_error());
}

session_start();
?>