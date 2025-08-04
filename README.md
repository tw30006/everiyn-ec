# 飾品電商平台 (Jewelry E-commerce Platform)

一個基於 Vue 3 的現代化飾品電商平台，提供完整的購物體驗和後台管理功能。

## 🛍️ 專案特色

- **前端技術**: Vue 3 + Composition API
- **路由管理**: Vue Router 4
- **樣式框架**: Tailwind CSS
- **建構工具**: Vite
- **UI 組件**: 自定義組件 + Vue Loading Overlay

### 🛒 購物功能

- 購物車管理
- 折扣券系統
- 響應式設計

### 🔐 後台管理

- 管理員登入系統
- 商品管理
- 訂單管理
- 折扣券管理

## 🚀 快速開始

### 環境需求

- Node.js 20.18.0 或以上
- npm 或 yarn

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

開啟 http://localhost:5173 查看應用

### 建置生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

### 部署到 GitHub Pages

```bash
npm run deploy
```

## 📁 專案結構

```
src/
├── components/          # 可重用組件
│   ├── ProductModal.vue    # 商品詳情模態框
│   ├── DeleteModal.vue     # 刪除確認模態框
│   └── CoupenModal.vue     # 折扣券模態框
├── views/              # 頁面組件
│   ├── User/           # 用戶相關頁面
│   └── dashboard/      # 後台管理頁面
├── router.js           # 路由配置
├── main.js             # 應用入口
└── style.css           # 全局樣式
```

## 🛠️ 技術棧

- **Vue 3.5.13** - 前端框架
- **Vite 6.3.5** - 建構工具
- **Vue Router 4.5.1** - 路由管理
- **Pinia 3.0.3** - 狀態管理
- **Tailwind CSS 4.1.7** - CSS 框架
- **Vue Loading Overlay 6.0.6** - 載入動畫

## 📝 開發規範

- 使用 Vue 3 Composition API 語法
- 遵循 ESLint 和 Prettier 程式碼規範
- 組件命名採用 PascalCase
- 檔案命名採用 kebab-case

## 🔧 環境變數

在 `.env` 檔案中配置環境變數：

```env
VITE_API_BASE_URL=your_api_url
```

## 📦 部署

專案支援多種部署方式：

1. **GitHub Pages**: 使用 `npm run deploy`
2. **Vercel**: 直接連接 GitHub 倉庫
3. **Netlify**: 上傳 `dist` 資料夾

## 🤝 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權

此專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案

## 📞 聯絡資訊

如有任何問題或建議，請透過以下方式聯絡：

- Email: your-email@example.com
- GitHub Issues: [專案 Issues 頁面]

---

**注意**: 這是一個開發中的專案，功能可能會持續更新。
