<?php
session_start();
// Redirect to login page if user is not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: /index.html"); // Adjust this path if needed
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../styles.css"> <!-- Adjust the path if needed -->
</head>
<body>
    <div class="container">
        <h2>Dashboard</h2>
        <p>Welcome, <strong><?php echo htmlspecialchars($_SESSION['user_name']); ?></strong>!</p>
        <p>Your email: <strong><?php echo htmlspecialchars($_SESSION['user_email']); ?></strong></p>

        <!-- Logout Button -->
        <p>
            <a href="logout.php" style="color: red; font-weight: bold; text-decoration: none; font-size: 18px;">
                🚪 Logout
            </a>
        </p>
    </div>
</body>
</html>
