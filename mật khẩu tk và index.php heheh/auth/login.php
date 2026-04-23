<?php
include "config.php";

$error = "";

if (isset($_POST['login'])) {

    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $remember = isset($_POST['remember']);

    // ================= VALIDATE =================
    if ($email == "" || $password == "") {
        $error = "Vui lòng nhập đầy đủ!";
    } 
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Email không hợp lệ!";
    } 
    else {

        // ================= CHECK USER =================
        $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE email=?");
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $user = mysqli_fetch_assoc($result);

        if ($user && password_verify($password, $user['password'])) {

            // ================= SESSION =================
            $_SESSION['user'] = $user;

            // ================= REMEMBER ME =================
            if ($remember) {
                setcookie("user_id", $user['id'], time() + (86400 * 30), "/"); // 30 ngày
            }

            // ================= ROLE =================
            if ($user['role'] == 'admin') {
                header("Location: ../admin/dashboard.php");
            } else {
                header("Location: ../user/home.php");
            }
            exit();

        } else {
            $error = "Sai email hoặc mật khẩu!";
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
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
            cursor: pointer;
        }
        .error {
            color: red;
        }
        .row {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
        }
    </style>
</head>
<body>

<div class="box">
    <h2>Đăng nhập</h2>

    <?php if ($error != "") echo "<p class='error'>$error</p>"; ?>

    <form method="POST">
        <input type="email" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Mật khẩu">

        <div class="row">
            <label><input type="checkbox" name="remember"> Ghi nhớ</label>
            <a href="forgot.php">Quên mật khẩu?</a>
        </div>

        <br>
        <button name="login">Đăng nhập</button>
    </form>

    <br>
    <a href="register.php">Chưa có tài khoản? Đăng ký</a>
</div>

</body>
</html>