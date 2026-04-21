<?php
include "config.php";

if (isset($_POST['register'])) {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";

    if (mysqli_query($conn, $sql)) {
        header("Location: login.php");
    } else {
        echo "Email đã tồn tại!";
    }
}
?>

<h2>REGISTER</h2>
<form method="POST">
    <input type="email" name="email" placeholder="Email"><br><br>
    <input type="password" name="password" placeholder="Password"><br><br>
    <button name="register">Register</button>
</form>