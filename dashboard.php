<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}

echo "<h1>Welcome, " . htmlspecialchars($_SESSION['user_email']) . "!</h1>";
echo "<p>You are now logged in to Kampala Air Quality.</p>";
echo '<a href="logout.php">Logout</a>';
?>
