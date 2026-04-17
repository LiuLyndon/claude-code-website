# Claude Code 深度解析網站

基於 Claude Code 源碼（2026-03-31 快照）逆向分析的技術文件網站，使用 Angular 21 開發。

---

## 環境需求

| 工具 | 版本 | 用途 |
|------|------|------|
| Node.js | 18 LTS 以上 | 執行環境 / npm |
| npm | 9+ | 套件管理 |
| IIS | 10+ (Windows Server 2016+) | 生產部署 |
| URL Rewrite Module | 2.x | IIS SPA 路由回退 |

> **Node.js 下載：** https://nodejs.org/

---

## 快速自行編譯（IIS 部署版）

### 方法一：一鍵批次腳本（推薦）

```bat
cd D:\Codes\claude20260331\claude-code-website
build-iis.bat
```

腳本會自動執行：
1. 安裝 npm 相依套件
2. 以 `--base-href /ClaudeDescribe/` 編譯 Production 版本
3. 將輸出整理到 `deploy-iis\` 資料夾

完成後直接部署 `deploy-iis\` 資料夾的內容到 IIS。

---

### 方法二：手動逐步執行

```bat
# 1. 進入專案目錄
cd D:\Codes\claude20260331\claude-code-website

# 2. 安裝相依套件（首次或更新後執行）
npm install --legacy-peer-deps

# 3. 編譯（指定虛擬路徑）
npx ng build --configuration=production --base-href /ClaudeDescribe/

# 4. 輸出位置
#    dist\claude-code-website\browser\
```

---

## IIS 部署步驟

### 前置準備

1. 安裝 **IIS URL Rewrite Module 2.x**
   - 下載：https://www.iis.net/downloads/microsoft/url-rewrite

2. 執行 **IIS 伺服器層級設定腳本**（只需執行一次，需系統管理員）：

```powershell
# 以系統管理員開啟 PowerShell
Set-ExecutionPolicy RemoteSigned -Scope Process
.\iis-setup.ps1
```

此腳本會：
- 在 IIS 伺服器層級加入 `.css`、`.js`、`.woff2` 等 MIME Type（修正 CSS 被拒絕的問題）
- 解鎖 `staticContent` 區段
- 確認 URL Rewrite Module 已安裝
- 執行 `iisreset`

> **為什麼不在 web.config 設定 MIME Type？**  
> IIS 的 `<staticContent>` 區段預設在應用程式層級為「唯讀鎖定」，在 web.config 中修改會導致 HTTP 500.19 (0x8007000d) 錯誤。正確做法是在伺服器層級（applicationHost.config）設定，iis-setup.ps1 已自動處理。

### 部署設定

```
網站根目錄
└── ClaudeDescribe\          ← 虛擬目錄或應用程式
    ├── index.html
    ├── web.config           ← 已含 URL Rewrite 規則（自動複製）
    ├── main-xxxxx.js
    ├── chunk-xxxxx.js
    └── ...
```

#### 步驟 1：建立網站 / 虛擬目錄

**IIS 管理員 → 網站 → 新增網站：**

| 設定項目 | 值 |
|---------|-----|
| 網站名稱 | ClaudeDescribe |
| 實體路徑 | `D:\iis-sites\ClaudeDescribe` |
| 連接埠 | **66** |
| 主機名稱 | （留空，或填入伺服器 IP） |

或若已有其他網站，改用 **應用程式 / 虛擬目錄**：

```
既有網站 (Port 66)
└── 應用程式: ClaudeDescribe
    └── 實體路徑: D:\iis-sites\ClaudeDescribe
```

#### 步驟 2：應用程式集區設定

| 設定項目 | 值 |
|---------|-----|
| .NET CLR 版本 | **無 Managed Code** |
| Managed Pipeline | **整合式** |
| 識別 | ApplicationPoolIdentity |

> Angular 是純靜態檔案，不需要 .NET Runtime。

#### 步驟 3：複製檔案

將 `deploy-iis\` 資料夾內的所有檔案複製到 IIS 實體路徑：

```bat
xcopy /e /i /y deploy-iis\* D:\iis-sites\ClaudeDescribe\
```

#### 步驟 4：驗證 web.config

確認 `D:\iis-sites\ClaudeDescribe\web.config` 存在（編譯時自動複製）。
此檔案包含 Angular SPA 路由回退規則，缺少它重新整理頁面會出現 404。

#### 步驟 5：開啟網站

```
http://localhost:66/ClaudeDescribe/
http://<伺服器IP>:66/ClaudeDescribe/
```

---

## 防火牆 Port 66 開放（Windows Server）

```powershell
# PowerShell（系統管理員）
New-NetFirewallRule `
  -DisplayName "IIS ClaudeDescribe Port 66" `
  -Direction Inbound `
  -Protocol TCP `
  -LocalPort 66 `
  -Action Allow
```

---

## 本地開發（不部署 IIS）

```bat
npm install --legacy-peer-deps
npx ng serve
# 開啟 http://localhost:4200/
```

---

## 目錄結構說明

```
claude-code-website\
├── src\
│   ├── app\
│   │   ├── pages\            # 各頁面元件
│   │   │   ├── deep-dive\    # 深度解析 12 大章節
│   │   │   ├── execution\    # 執行流程頁
│   │   │   ├── token\        # Token 說明頁
│   │   │   └── ...
│   │   ├── components\       # 共用元件（navbar 等）
│   │   └── app.routes.ts     # 路由設定
│   ├── styles.scss           # 全域樣式變數
│   └── web.config            # IIS URL Rewrite 規則
├── angular.json              # Angular 建構設定
├── package.json
├── build-iis.bat             # 一鍵編譯腳本
└── README.md                 # 本檔案
```

---

## 常見問題

### Q: 重新整理頁面出現 IIS 404

**原因：** Angular Router 的路由由前端處理，IIS 找不到對應實體檔案。  
**解決：** 確認 `web.config` 已複製到部署目錄，且 URL Rewrite Module 已安裝。

### Q: 樣式或 JS 載入失敗（404 on /main-xxx.js）

**原因：** `--base-href` 設定與 IIS 虛擬路徑不一致。  
**解決：** 確認編譯時使用 `--base-href /ClaudeDescribe/`（結尾需有斜線）。

### Q: npm install 失敗，peer dependency 錯誤

**解決：** 加上 `--legacy-peer-deps` 旗標：
```bat
npm install --legacy-peer-deps
```

### Q: Port 66 無法連線

**解決：** 檢查 Windows 防火牆規則，並確認 IIS 網站繫結設定為 Port 66。

### Ref: 
https://www.youtube.com/watch?v=1zdSqb7BsgY


