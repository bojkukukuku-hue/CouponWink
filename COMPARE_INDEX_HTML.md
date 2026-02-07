# 🔄 SO SÁNH FILE index.html - CŨ vs MỚI

## ❌ FILE CŨ (ĐANG LỖI)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CouponWink - Verified AI & Hosting Promo Codes</title>
  
  <!-- ❌❌❌ DÒI SAI - GÂY LỖI ❌❌❌ -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- ❌❌❌ END DÒI SAI ❌❌❌ -->
  
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
  
  <!-- ❌❌❌ DÒI SAI - GÂY LỖI ❌❌❌ -->
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: {
              50: '#ecfdf5',
              100: '#d1fae5',
              200: '#a7f3d0',
              300: '#6ee7b7',
              400: '#34d399',
              500: '#10b981',
              600: '#059669',
              700: '#047857',
              800: '#065f46',
              900: '#064e3b',
            },
            secondary: '#0B2447',
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          },
        }
      }
    }
  </script>
  <!-- ❌❌❌ END DÒI SAI ❌❌❌ -->
  
  <style>
    body {
      font-family: "Plus Jakarta Sans", sans-serif;
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .glass-effect { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); }
    .dark .glass-effect { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(10px); }
    
    h1, h2, h3, h4, h5, h6 {
      letter-spacing: -0.025em;
    }
  </style>
  
<script type="importmap">
{
  "imports": {
    "react/": "https://esm.sh/react@^19.2.4/",
    "react": "https://esm.sh/react@^19.2.4",
    "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
    "recharts": "https://esm.sh/recharts@^3.7.0",
    "react-router-dom": "https://esm.sh/react-router-dom@^7.13.0"
  }
}
</script>
<link rel="stylesheet" href="/index.css">
</head>
<body class="antialiased text-slate-900 bg-slate-50 dark:bg-slate-950 dark:text-slate-100">
  <div id="root"></div>
<script type="module" src="/index.tsx"></script>
</body>
</html>
```

---

## ✅ FILE MỚI (ĐÚNG - KHÔNG LỖI)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CouponWink - Verified AI & Hosting Promo Codes</title>
  
  <!-- ✅✅✅ ĐÃ XÓA CDN SCRIPT ✅✅✅ -->
  <!-- Không còn <script src="https://cdn.tailwindcss.com"></script> -->
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
  
  <!-- ✅✅✅ ĐÃ XÓA TAILWIND CONFIG INLINE ✅✅✅ -->
  <!-- Config đã chuyển sang tailwind.config.js -->
  
  <!-- Import Maps for ESM -->
  <script type="importmap">
  {
    "imports": {
      "react/": "https://esm.sh/react@^19.2.4/",
      "react": "https://esm.sh/react@^19.2.4",
      "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
      "recharts": "https://esm.sh/recharts@^3.7.0",
      "react-router-dom": "https://esm.sh/react-router-dom@^7.13.0"
    }
  }
  </script>
</head>
<body class="antialiased text-slate-900 bg-slate-50 dark:bg-slate-950 dark:text-slate-100">
  <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
</body>
</html>
```

---

## 📊 BẢNG SO SÁNH

| Phần | File CŨ ❌ | File MỚI ✅ |
|------|-----------|------------|
| **CDN Script** | `<script src="https://cdn.tailwindcss.com"></script>` | ❌ ĐÃ XÓA |
| **Inline Config** | `<script>tailwind.config = {...}</script>` | ❌ ĐÃ XÓA → Chuyển sang `tailwind.config.js` |
| **Inline Styles** | `<style>...</style>` | ❌ ĐÃ XÓA → Chuyển sang `index.css` |
| **Import Maps** | ✅ Giữ nguyên | ✅ Giữ nguyên |
| **Body Classes** | ✅ Giữ nguyên | ✅ Giữ nguyên |

---

## 🎯 ĐIỂM KHÁC BIỆT CHÍNH

### ❌ Trong file CŨ có:
```html
<script src="https://cdn.tailwindcss.com"></script>
```
↑↑↑ **DÒNG NÀY GÂY LỖI** ↑↑↑

### ✅ Trong file MỚI:
- **KHÔNG CÓ** dòng đó
- Config chuyển sang `tailwind.config.js`
- Styles chuyển sang `index.css` với `@tailwind`

---

## 🔍 CÁCH KIỂM TRA BẠN ĐANG DÙNG FILE NÀO

### Mở file `index.html` trong dự án của bạn

**Tìm dòng 8-14:**

Nếu thấy:
```html
<script src="https://cdn.tailwindcss.com"></script>
```
→ ❌ Bạn đang dùng FILE CŨ → Cần thay thế!

Nếu KHÔNG thấy dòng trên:
→ ✅ Bạn đã dùng FILE MỚI → OK!

---

## 📝 HÀNH ĐỘNG CẦN LÀM

1. **MỞ** file `index.html` trong dự án
2. **TÌM** dòng `<script src="https://cdn.tailwindcss.com"></script>`
3. **XÓA** toàn bộ dòng đó
4. **TÌM VÀ XÓA** block:
   ```html
   <script>
     tailwind.config = { ... }
   </script>
   ```
5. **TÌM VÀ XÓA** block:
   ```html
   <style>
     body { ... }
     .no-scrollbar { ... }
     ...
   </style>
   ```
6. **LƯU** file
7. **CHẠY** `npm run dev`
8. **KIỂM TRA** F12 Console → Không còn lỗi!

---

## ⚡ CÁCH NHANH NHẤT

**Thay vì chỉnh sửa từng dòng, hãy:**

1. **XÓA** file `index.html` cũ
2. **COPY** file `index.html` mới (đã tải về) vào dự án
3. **DONE!**

---

**💡 Tip:** File mới chỉ có ~30 dòng, ngắn hơn nhiều so với file cũ (~73 dòng)
