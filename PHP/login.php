<?php
session_start();
require_once 'db.php'; // Ensure this is the correct path

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST['email']) ? trim($_POST['email']) : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;

    if (!$email || !$password) {
        die("❌ Error: Missing required fields!");
    }

    try {
        // ✅ Use `$pdo` instead of `$conn`
        $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // ✅ Set session variables
            $_SESSION['user_id']    = $user['id'];
            $_SESSION['user_name']  = $user['name'];
            $_SESSION['user_email'] = $user['email'];

            // ✅ Redirect AFTER setting session
            header("Location: dashboard.php");
            exit();
        } else {
            echo "❌ Error: Invalid email or password!";
            exit(); // ✅ Ensure script stops execution
        }
    } catch (PDOException $e) {
        echo "❌ Error: " . $e->getMessage();
        exit();
    }
}
?>
