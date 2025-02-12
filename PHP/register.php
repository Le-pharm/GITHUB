<?php
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = isset($_POST['name']) ? trim($_POST['name']) : null;
    $email = isset($_POST['email']) ? trim($_POST['email']) : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;
    $phone_number = isset($_POST['phone_number']) ? trim($_POST['phone_number']) : null;

    if (!$name || !$email || !$password || !$phone_number) {
        die("❌ Error: Missing required fields!");
    }

    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Insert user into database
    try {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, phone_number) VALUES (:name, :email, :password, :phone)");
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':password' => $hashed_password,
            ':phone' => $phone_number
        ]);

        echo "✅ Registration successful!";
    } catch (PDOException $e) {
        echo "❌ Error: " . $e->getMessage();
    }
}
?>
