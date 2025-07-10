<?php
session_start();
// Database settings
$host = 'localhost';
$db   = 'air_quality_db';
$user = 'mark123'; // change if needed
$pass = 'mark2020%';     // change if needed

// Create connection
$mysqli = new mysqli($host, $user, $pass, $db);
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Sanitize inputs
$email = $mysqli->real_escape_string($_POST['email']);
$password = $_POST['password'];

// Check if user exists
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $mysqli->query($sql);

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Check if email is verified
    if (!$user['is_verified']) {
        echo "<script>alert('Please verify your email before logging in.'); window.location.href='login.html';</script>";
        exit;
    }

    // Check password
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];

        // Redirect to dashboard
        header("Location: dashboard.html");
        exit;
    } else {
        echo "<script>alert('❌ Incorrect password.'); window.location.href='login.html';</script>";
    }
} else {
    echo "<script>alert('❌ Email not found.'); window.location.href='login.html';</script>";
}

$mysqli->close();
?>
