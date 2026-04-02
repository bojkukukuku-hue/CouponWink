
<?php
/**
 * CouponWink API Bridge for SQL
 * Optimized for cPanel/Apache environments
 */

error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// DATABASE CONFIGURATION
$host = 'localhost';
$db   = 'couponwink_db';
$user = 'db_user';
$pass = 'db_password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true);

function send_json($data) {
    echo json_encode($data);
    exit;
}

switch ($action) {
    case 'login':
        $username = $input['username'] ?? '';
        $password = $input['password'] ?? '';
        
        $stmt = $pdo->prepare("SELECT id, username, email, role FROM cw_users WHERE (username = ? OR email = ?) AND password = ?");
        $stmt->execute([$username, $username, $password]);
        $user = $stmt->fetch();
        
        if ($user) {
            send_json(['success' => true, 'user' => $user]);
        } else {
            send_json(['success' => false, 'message' => 'Tài khoản hoặc mật khẩu không chính xác.']);
        }
        break;

    case 'get_settings':
        $stmt = $pdo->query("SELECT settings_json FROM cw_settings WHERE id = 1");
        $row = $stmt->fetch();
        if ($row && !empty($row['settings_json'])) {
            echo $row['settings_json'];
            exit;
        }
        send_json((object)[]);
        break;

    case 'save_settings':
        $stmt = $pdo->prepare("INSERT INTO cw_settings (id, settings_json) VALUES (1, ?) ON DUPLICATE KEY UPDATE settings_json = ?");
        $json = json_encode($input);
        $stmt->execute([$json, $json]);
        send_json(['success' => true]);
        break;

    case 'get_stores':
        send_json($pdo->query("SELECT * FROM cw_stores")->fetchAll());
        break;

    case 'save_store':
        $stmt = $pdo->prepare("REPLACE INTO cw_stores (id, name, category, logo, customImage, useCustomImage, color, rating, reviews, status, description, website) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
        $stmt->execute([
            $input['id'], 
            $input['name'], 
            $input['category'], 
            $input['logo'], 
            $input['customImage'] ?? null, 
            isset($input['useCustomImage']) && $input['useCustomImage'] ? 1 : 0, 
            $input['color'] ?? 'text-primary-500', 
            $input['rating'] ?? 4.5, 
            $input['reviews'] ?? 0, 
            $input['status'] ?? 'Active', 
            $input['description'] ?? '', 
            $input['website'] ?? ''
        ]);
        send_json(['success' => true]);
        break;

    case 'delete_store':
        $stmt = $pdo->prepare("DELETE FROM cw_stores WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        send_json(['success' => true]);
        break;

    case 'get_coupons':
        send_json($pdo->query("SELECT * FROM cw_coupons")->fetchAll());
        break;

    case 'save_coupon':
        $stmt = $pdo->prepare("REPLACE INTO cw_coupons (id, storeId, title, code, type, label, status, usage_count, expiry, description, link) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
        $stmt->execute([
            $input['id'], 
            $input['storeId'], 
            $input['title'], 
            $input['code'] ?? null, 
            $input['type'], 
            $input['label'], 
            $input['status'] ?? 'Active', 
            $input['usage_count'] ?? 0, 
            $input['expiry'] ?? null, 
            $input['description'] ?? '', 
            $input['link'] ?? ''
        ]);
        send_json(['success' => true]);
        break;

    case 'delete_coupon':
        $stmt = $pdo->prepare("DELETE FROM cw_coupons WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        send_json(['success' => true]);
        break;

    case 'get_categories':
        send_json($pdo->query("SELECT * FROM cw_categories")->fetchAll());
        break;

    case 'save_category':
        $stmt = $pdo->prepare("REPLACE INTO cw_categories (id, name, icon, description, customImage, useCustomImage) VALUES (?,?,?,?,?,?)");
        $stmt->execute([
            $input['id'], 
            $input['name'], 
            $input['icon'], 
            $input['description'] ?? '', 
            $input['customImage'] ?? null, 
            isset($input['useCustomImage']) && $input['useCustomImage'] ? 1 : 0
        ]);
        send_json(['success' => true]);
        break;

    case 'delete_category':
        $stmt = $pdo->prepare("DELETE FROM cw_categories WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        send_json(['success' => true]);
        break;

    case 'get_menus':
        send_json($pdo->query("SELECT * FROM cw_menus ORDER BY sort_order ASC")->fetchAll());
        break;

    case 'save_menus':
        $pdo->query("DELETE FROM cw_menus");
        $stmt = $pdo->prepare("INSERT INTO cw_menus (id, label, path, visible, sort_order) VALUES (?,?,?,?,?)");
        foreach ($input as $m) {
            $stmt->execute([
                $m['id'], 
                $m['label'], 
                $m['path'], 
                (isset($m['visible']) && $m['visible']) ? 1 : 0, 
                $m['sort_order'] ?? 0
            ]);
        }
        send_json(['success' => true]);
        break;

    case 'get_blogs':
        send_json($pdo->query("SELECT * FROM cw_blogs")->fetchAll());
        break;

    case 'save_blog':
        $stmt = $pdo->prepare("REPLACE INTO cw_blogs (id, title, slug, content, category, author, publish_date, status, views, seo_json) VALUES (?,?,?,?,?,?,?,?,?,?)");
        $stmt->execute([
            $input['id'], 
            $input['title'], 
            $input['slug'], 
            $input['content'], 
            $input['category'], 
            $input['author'], 
            $input['date'], 
            $input['status'] ?? 'Published', 
            $input['views'] ?? 0, 
            json_encode($input['seo'] ?? [])
        ]);
        send_json(['success' => true]);
        break;

    case 'delete_blog':
        $stmt = $pdo->prepare("DELETE FROM cw_blogs WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        send_json(['success' => true]);
        break;

    default:
        http_response_code(400);
        send_json(['error' => 'Invalid action']);
}
