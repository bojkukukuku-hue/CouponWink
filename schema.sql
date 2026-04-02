
-- Create database
CREATE DATABASE IF NOT EXISTS couponwink;
USE couponwink;

-- Stores table
CREATE TABLE IF NOT EXISTS stores (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    logo VARCHAR(255),
    color VARCHAR(50),
    rating FLOAT DEFAULT 0,
    reviews INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Active',
    description TEXT,
    website VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    clicks INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    description TEXT,
    clicks INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
    id VARCHAR(255) PRIMARY KEY,
    storeId VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    code VARCHAR(100),
    type VARCHAR(50),
    label VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Active',
    usage INT DEFAULT 0,
    expiry DATE,
    `desc` TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (storeId) REFERENCES stores(id) ON DELETE CASCADE
);

-- Menus table
CREATE TABLE IF NOT EXISTS menus (
    id VARCHAR(255) PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0
);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt TEXT,
    image VARCHAR(255),
    author VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Published',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
    `key` VARCHAR(255) PRIMARY KEY,
    `value` TEXT
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'User',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin
INSERT INTO users (username, password, email, role) VALUES ('admin', 'admin123', 'admin@couponwink.com', 'Admin');

-- Insert seed data (optional)
INSERT INTO categories (id, name, icon, description) VALUES 
('ai-writing', 'AI Writing', 'edit_note', 'Best discounts on AI writing assistants.'),
('ai-images', 'AI Images', 'image', 'Promo codes for AI art generators.'),
('hosting', 'Web Hosting', 'cloud', 'Verified codes for cloud and VPS hosting.');

INSERT INTO stores (id, name, category, logo, color, rating, reviews, status, description, website, featured, clicks) VALUES 
('jasper', 'Jasper AI', 'AI Writing', 'psychology', 'text-purple-500', 4.8, 1250, 'Active', 'Advanced AI content platform for teams.', 'https://jasper.ai', 1, 1500),
('cloudways', 'Cloudways', 'Web Hosting', 'cloud', 'text-blue-500', 4.7, 850, 'Active', 'Managed multi-cloud hosting.', 'https://cloudways.com', 1, 850);

INSERT INTO coupons (id, storeId, title, code, type, label, status, usage, expiry, `desc`) VALUES 
('j1', 'jasper', '20% Off Annual Plans', 'JASPER20', 'Code', '20% OFF', 'Active', 450, '2025-12-31', 'Save on all annual subscriptions.'),
('c1', 'cloudways', 'Free $25 Hosting Credit', 'WINK25', 'Code', '$25 FREE', 'Active', 1200, '2025-12-31', 'Get $25 credit.');

INSERT INTO menus (id, label, path, visible, sort_order) VALUES 
('m1', 'Home', '/', 1, 1),
('m2', 'Categories', '/categories', 1, 2),
('m3', 'Stores', '/search', 1, 3),
('m4', 'Blog', '/blog', 1, 4);
