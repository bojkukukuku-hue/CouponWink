
SET NAMES utf8mb4;

-- Bảng lưu trữ tài khoản người dùng
CREATE TABLE IF NOT EXISTS cw_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Editor', 'User') DEFAULT 'User',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tạo tài khoản Admin mặc định
-- Lưu ý: Trong thực tế nên sử dụng password_hash. Ở đây dùng text thô để khớp với logic API đơn giản.
INSERT IGNORE INTO cw_users (username, email, password, role) 
VALUES ('admin', 'admin@couponwink.com', 'admin123', 'Admin');

-- Các bảng cấu hình hệ thống
CREATE TABLE IF NOT EXISTS cw_settings (
    id INT PRIMARY KEY DEFAULT 1,
    settings_json LONGTEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO cw_settings (id, settings_json) VALUES (1, '{"siteName":"CouponWink","primaryColor":"#10b981","metaTitle":"CouponWink - Best AI & Hosting Deals","metaDescription":"Verified promo codes for AI tools and hosting."}')
ON DUPLICATE KEY UPDATE id=id;

CREATE TABLE IF NOT EXISTS cw_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(50),
    description TEXT,
    customImage LONGTEXT,
    useCustomImage TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cw_stores (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    logo VARCHAR(50),
    customImage LONGTEXT,
    useCustomImage TINYINT(1) DEFAULT 0,
    color VARCHAR(50),
    rating DECIMAL(3,2),
    reviews INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active',
    description TEXT,
    website VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cw_coupons (
    id VARCHAR(50) PRIMARY KEY,
    storeId VARCHAR(50),
    title VARCHAR(255),
    code VARCHAR(100),
    type VARCHAR(50),
    label VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active',
    usage_count INT DEFAULT 0,
    expiry DATE,
    description TEXT,
    link TEXT,
    FOREIGN KEY (storeId) REFERENCES cw_stores(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cw_blogs (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255),
    slug VARCHAR(255),
    content LONGTEXT,
    category VARCHAR(100),
    author VARCHAR(100),
    publish_date DATE,
    status VARCHAR(20) DEFAULT 'Published',
    views INT DEFAULT 0,
    seo_json TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cw_menus (
    id VARCHAR(50) PRIMARY KEY,
    label VARCHAR(255),
    path VARCHAR(255),
    visible TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
