# ✅ CHECKLIST DEPLOY VERCEL

## Trước Khi Deploy

- [ ] Đã có tài khoản Vercel (https://vercel.com)
- [ ] Đã có GitHub repository
- [ ] Đã lấy Gemini API Key (https://aistudio.google.com/app/apikey)
- [ ] Đã test local (`npm run dev`)

## Files Cần Có

- [x] `vercel.json` - Đã tạo ✅
- [x] `index.html` - Đã có ✅
- [x] `index.css` - Đã tạo ✅
- [x] `.gitignore` - Đã update ✅
- [x] `.env.example` - Đã tạo ✅
- [x] `package.json` - Đã có ✅
- [x] `vite.config.ts` - Đã có ✅

## Các Bước Deploy

### 1️⃣ Lấy API Key
```
Truy cập: https://aistudio.google.com/app/apikey
→ Create API Key
→ Copy key (AIzaSy...)
```

### 2️⃣ Push Lên GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 3️⃣ Import Vào Vercel
```
1. Vào https://vercel.com
2. New Project
3. Import từ GitHub
4. Chọn repository
```

### 4️⃣ Setup Environment Variables
```
Trong Vercel Dashboard:
→ Settings
→ Environment Variables
→ Add New:
   Key: GEMINI_API_KEY
   Value: AIzaSy... (paste API key)
→ Save
```

### 5️⃣ Deploy
```
→ Deploy button
→ Đợi 2-3 phút
→ Nhận link: https://your-project.vercel.app
```

## Sau Deploy

- [ ] Test trang chủ
- [ ] Test navigation (click menu)
- [ ] Test dark mode
- [ ] Test responsive (mobile)
- [ ] Test admin dashboard

## ⚠️ LƯU Ý QUAN TRỌNG

❌ KHÔNG commit file `.env.local`
❌ KHÔNG hardcode API key trong code
✅ CHỈ setup API key trong Vercel Dashboard
✅ File `.gitignore` đã được cấu hình đúng

## 🐛 Nếu Lỗi

1. Check Vercel build logs
2. Verify GEMINI_API_KEY đã add chưa
3. Redeploy sau khi add env variable
4. Check browser console để debug

## 📞 Quick Commands

```bash
# Test local
npm install
npm run dev

# Build test
npm run build
npm run preview

# Deploy với Vercel CLI
npm i -g vercel
vercel login
vercel --prod
```

---

✅ **Tất cả đã sẵn sàng để deploy!**
