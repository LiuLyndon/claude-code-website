# Claude Code 深度解析網站

基於 Claude Code 源碼（2026-03-31 快照）逆向分析的技術文件網站，使用 Angular 21 開發。

- **線上版（GitHub Pages）：** https://liulyndon.github.io/claude-code-website/
- **原始碼：** https://github.com/LiuLyndon/claude-code-website

---

## 本地開發

```bash
npm install
npm start
# 開啟 http://localhost:4200/
```

---

## 部署方式

### 方式一：GitHub Pages（自動）

push 到 `master` 分支後，GitHub Actions 會自動執行：

1. `npm ci`
2. `npm run build:docs`（編譯 + 輸出到 `/docs`）
3. 自動 commit & push `/docs` 回 master

網站約 1-2 分鐘後更新：https://liulyndon.github.io/claude-code-website/

若需手動在本機產生 `/docs`：

```bash
npm run build:docs
```

---

### 方式二：IIS 部署（Windows Server）

#### 環境需求

| 工具 | 版本 |
|------|------|
| Node.js | 18 LTS 以上 |
| IIS | 10+（Windows Server 2016+）|
| URL Rewrite Module | 2.x |

#### 編譯

```bat
cd D:\Codes\claude20260331\claude-code-website
build-iis.bat
```

腳本自動執行：安裝套件 → 以 `--base-href /ClaudeDescribe/` 編譯 → 輸出到 `deploy-iis\`

#### IIS 設定（首次，需系統管理員）

```powershell
Set-ExecutionPolicy RemoteSigned -Scope Process
.\iis-setup.ps1
```

#### 部署

```bat
xcopy /e /i /y deploy-iis\* D:\iis-sites\ClaudeDescribe\
```

| IIS 設定項目 | 值 |
|-------------|-----|
| 實體路徑 | `D:\iis-sites\ClaudeDescribe` |
| 連接埠 | 66 |
| .NET CLR 版本 | 無 Managed Code |

開啟：`http://localhost:66/ClaudeDescribe/`

---

## 目錄結構

```
claude-code-website\
├── .github\workflows\deploy.yml  # GitHub Actions 自動部署
├── src\
│   ├── app\
│   │   ├── pages\                # 各頁面元件
│   │   └── components\           # 共用元件
│   └── web.config                # IIS URL Rewrite 規則
├── docs\                         # GitHub Pages 編譯輸出（自動產生）
├── angular.json
└── package.json
```

---

## 常見問題

**重新整理頁面出現 404**
確認 `web.config` 已部署且 URL Rewrite Module 已安裝。

**樣式 / JS 載入失敗**
確認 `--base-href` 與部署路徑一致（結尾需有 `/`）。
