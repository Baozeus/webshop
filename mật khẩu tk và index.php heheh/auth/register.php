<?php
include "config.php";

$error = "";

if (isset($_POST['register'])) {

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm = $_POST['confirm'];

    // ================= VALIDATE =================
    if ($name == "" || $email == "" || $password == "") {
        $error = "Vui lòng nhập đầy đủ!";
    }
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Email không hợp lệ!";
    }
    elseif ($password != $confirm) {
        $error = "Mật khẩu không khớp!";
    }
    else {
        // ================= CHECK EMAIL =================
        $check = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
        if (mysqli_num_rows($check) > 0) {
            $error = "Email đã tồn tại!";
        } else {

            // ================= HASH PASSWORD =================
            $hash = password_hash($password, PASSWORD_DEFAULT);

            // ================= INSERT =================
            $sql = "INSERT INTO users (name, email, password) 
                    VALUES ('$name', '$email', '$hash')";

            if (mysqli_query($conn, $sql)) {

                // 👉 auto login sau đăng ký
                $user_id = mysqli_insert_id($conn);
                $user = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM users WHERE id=$user_id"));
                $_SESSION['user'] = $user;

                header("Location: ../user/home.php");
                exit();
            } else {
                $error = "Lỗi hệ thống!";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
    <style>
        body {
            font-family: Arial;
            background: #f5f5f5;
        }
        .box {
            width: 350px;
            margin: 100px auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
        }
        input {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
        }
        button {
            width: 100%;
            padding: 10px;
            background: #ee4d2d;
            color: white;
            border: none;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>

<div class="box">
    <h2>Đăng ký</h2>

    <?php if ($error != "") echo "<p class='error'>$error</p>"; ?>

    <form method="POST">
        <input type="text" name="name" placeholder="Họ tên">
        <input type="email" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Mật khẩu">
        <input type="password" name="confirm" placeholder="Nhập lại mật khẩu">
        <button name="register">Đăng ký</button>
    </form>

    <br>
    <a href="login.php">Đã có tài khoản? Đăng nhập</a>
</div>

</body>
</html>