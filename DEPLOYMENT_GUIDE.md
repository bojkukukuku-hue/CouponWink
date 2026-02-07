# 🚀 Hướng Dẫn Deploy CouponWink lên Vercel

## ✅ Checklist File Cần Thiết

### File đã được tạo/kiểm tra:
- ✅ `vercel.json` - Cấu hình deployment
- ✅ `index.html` - HTML chính (đã kiểm tra)
- ✅ `index.css` - CSS global (đã tạo)
- ✅ `.env.example` - Mẫu biến môi trường
- ✅ `.env.local` - File môi trường local

---

## 📋 Các Bước Deploy

### Bước 1: Chuẩn Bị Gemini API Key

1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập tài khoản Google
3. Click **"Create API Key"**
4. Copy API key (dạng: `AIzaSy...`)
5. Lưu lại an toàn

### Bước 2: Push Code Lên GitHub

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "Initial commit - CouponWink project"

# Thêm remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push lên GitHub
git push -u origin main
```

### Bước 3: Deploy Lên Vercel

#### Cách 1: Qua Vercel Dashboard (Khuyến nghị)

1. Truy cập: https://vercel.com
2. Đăng nhập/Đăng ký
3. Click **"Add New Project"**
4. Import repository GitHub của bạn
5. Vercel sẽ tự động detect framework là **Vite**

#### Cấu hình Build Settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Bước 4: Setup Environment Variables

Trong Vercel Dashboard:

1. Vào tab **"Environment Variables"**
2. Thêm biến:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `AIzaSy...` (API key của bạn)
   - **Environments**: Chọn tất cả (Production, Preview, Development)
3. Click **"Save"**

### Bước 5: Deploy

1. Click **"Deploy"**
2. Đợi 2-3 phút
3. Vercel sẽ build và deploy tự động
4. Nhận link production: `https://your-project.vercel.app`

---

## 🔧 Cách 2: Deploy Qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Thêm environment variable
vercel env add GEMINI_API_KEY

# Deploy production
vercel --prod
```

---

## 🌍 Setup Environment Variables Local

Để chạy local:

1. Copy file `.env.example` thành `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Mở `.env.local` và thêm API key:
   ```
   GEMINI_API_KEY=AIzaSy...
   ```

3. Chạy dev server:
   ```bash
   npm install
   npm run dev
   ```

---

## 🐛 Troubleshooting

### Lỗi: "GEMINI_API_KEY is not defined"
- Kiểm tra đã add environment variable trong Vercel chưa
- Redeploy project sau khi add env variable

### Lỗi: Build failed
- Kiểm tra `package.json` có đầy đủ dependencies
- Chạy `npm install` local để test

### Lỗi: 404 khi refresh page
- File `vercel.json` đã có cấu hình rewrites
- Nếu vẫn lỗi, kiểm tra routing trong `App.tsx`

### Lỗi: Tailwind CSS không load
- `index.html` đang dùng CDN Tailwind nên sẽ work
- Kiểm tra network tab xem CDN có bị chặn không

---

## 📝 File Quan Trọng

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### `vite.config.ts`
- Đã cấu hình đọc `GEMINI_API_KEY` từ env
- Export ra `process.env.API_KEY` và `process.env.GEMINI_API_KEY`

---

## ✅ Kiểm Tra Sau Deploy

1. ✅ Trang chủ load được
2. ✅ Routing hoạt động (click menu, navigate pages)
3. ✅ Dark mode toggle
4. ✅ Search hoạt động
5. ✅ Admin dashboard access
6. ✅ API calls to Gemini (nếu có)

---

## 🔐 Bảo Mật

- ❌ **KHÔNG BAO GIỜ** commit file `.env.local` hoặc `.env`
- ✅ File `.gitignore` đã có `*.local` để tránh commit nhầm
- ✅ Chỉ setup GEMINI_API_KEY trong Vercel Dashboard
- ✅ Không hardcode API key trong code

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Check Vercel build logs
2. Check browser console
3. Verify environment variables trong Vercel
4. Test local trước khi deploy

---

## 🎉 Hoàn Thành!

Sau khi deploy thành công, bạn sẽ có:
- ✅ Website live tại Vercel
- ✅ SSL/HTTPS tự động
- ✅ CDN global
- ✅ Auto deployment khi push GitHub
- ✅ Environment variables được bảo mật

**Link Production**: `https://your-project.vercel.app`
