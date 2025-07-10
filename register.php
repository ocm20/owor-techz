<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';
// DB connection settings
$host = 'localhost';        // or 127.0.0.1
$db   = 'air_quality_db';
$user = 'mark123';             // your MySQL username
$pass = 'mark2020%';                 // your MySQL password
$charset = 'utf8mb4';

// Connect to MySQL
$mysqli = new mysqli($host, $user, $pass, $db);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Sanitize input
$firstName = $mysqli->real_escape_string($_POST['firstName']);
$lastName = $mysqli->real_escape_string($_POST['lastName']);
$email = $mysqli->real_escape_string($_POST['email']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash password
$phone = $mysqli->real_escape_string($_POST['phone']);

// Simple password match check
if ($_POST['password'] !== $_POST['confirmPassword']) {
    echo "Passwords do not match.";
    exit;
}

// Generate verification token
$token = bin2hex(random_bytes(16));

// Insert into DB
$sql = "INSERT INTO users (first_name, last_name, email, password, phone, is_verified, verification_token) 
        VALUES ('$firstName', '$lastName', '$email', '$password', '$phone', 0, '$token')";

if ($mysqli->query($sql) === TRUE) {
    // Send verification email
    $verify_link = "http://localhost/calvin/verify.php?token=$token";
    $subject = "Verify your email";
    $message = "Click the following link to verify your email: $verify_link";
    $headers = "From: no-reply@yourdomain.com\r\n";

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'calvinmark118@gmail.com'; // Your Gmail address
        $mail->Password   = 'ctxo gdrs ieok rnfa';    // Gmail App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('calvinmark118@gmail.com', 'Kampala Air Quality');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        echo "Registration successful! Please check your email to verify your account.";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}

$mysqli->close();
?>
