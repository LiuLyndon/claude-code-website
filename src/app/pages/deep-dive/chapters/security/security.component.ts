import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 08</span>
      <h1>安全審查機制</h1>
      <p>Settings 規則 → YOLO 分類器（側邊 AI）→ Bash 破壞性命令掃描，三道防線縱深防禦。每個工具執行前都必須通過權限檢查，無法繞過。</p>
      <div class="hero-tags">
        <span class="htag">yoloClassifier.ts</span>
        <span class="htag">permissions.ts</span>
        <span class="htag">bashSecurity.ts</span>
        <span class="htag">20 道安全檢查</span>
        <span class="htag">三道防線</span>
      </div>
    </div>

      <!-- Three Defense Lines -->
      <section class="ch-section">
        <h2>三道防線架構</h2>
        <div class="diagram-box">
          <svg viewBox="0 0 800 380" class="arch-svg">
            <rect width="800" height="380" fill="#0d1117" rx="12"/>
            <text x="400" y="28" text-anchor="middle" fill="#7c5cfc" font-size="13" font-weight="700" font-family="monospace">Defense-in-Depth Security Architecture</text>

            <!-- Tool Call Request -->
            <rect x="320" y="50" width="160" height="44" rx="8" fill="rgba(124,92,252,0.15)" stroke="rgba(124,92,252,0.5)" stroke-width="1.5"/>
            <text x="400" y="69" text-anchor="middle" fill="#e2e8f0" font-size="10" font-weight="700">Tool Call Request</text>
            <text x="400" y="84" text-anchor="middle" fill="#b8c8e0" font-size="8.5">from API response</text>

            <defs>
              <marker id="sa1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#ffd166"/></marker>
              <marker id="sa2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#ff8c42"/></marker>
              <marker id="sa3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#ff4d6d"/></marker>
              <marker id="sa4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#00d4aa"/></marker>
            </defs>

            <!-- Line 1 -->
            <line x1="400" y1="94" x2="400" y2="118" stroke="#ffd166" stroke-width="1.5" marker-end="url(#sa1)"/>
            <rect x="160" y="118" width="480" height="70" rx="8" fill="rgba(255,209,102,0.08)" stroke="rgba(255,209,102,0.4)" stroke-width="1.5"/>
            <text x="400" y="140" text-anchor="middle" fill="#ffd166" font-size="11" font-weight="800">防線 1: Settings 規則引擎</text>
            <text x="400" y="158" text-anchor="middle" fill="#b8c8e0" font-size="9">permissions.ts · 靜態規則匹配 · 允許/拒絕清單</text>
            <text x="400" y="172" text-anchor="middle" fill="#b8c8e0" font-size="9">CLAUDE.md 中的 allow/deny 規則 · 環境變量白名單 · 工具級別授權</text>

            <!-- Line 2 -->
            <line x1="400" y1="188" x2="400" y2="212" stroke="#ff8c42" stroke-width="1.5" marker-end="url(#sa2)"/>
            <rect x="160" y="212" width="480" height="70" rx="8" fill="rgba(255,140,66,0.08)" stroke="rgba(255,140,66,0.4)" stroke-width="1.5"/>
            <text x="400" y="234" text-anchor="middle" fill="#ff8c42" font-size="11" font-weight="800">防線 2: YOLO 分類器（側邊 AI）</text>
            <text x="400" y="252" text-anchor="middle" fill="#b8c8e0" font-size="9">yoloClassifier.ts · 獨立 Claude API 調用 · 快速判斷危險性</text>
            <text x="400" y="266" text-anchor="middle" fill="#b8c8e0" font-size="9">Circuit Breaker: 失敗 MAX=3 次後停用 · 不阻塞主流程 · async 預測</text>

            <!-- Line 3 -->
            <line x1="400" y1="282" x2="400" y2="306" stroke="#ff4d6d" stroke-width="1.5" marker-end="url(#sa3)"/>
            <rect x="160" y="306" width="480" height="56" rx="8" fill="rgba(255,77,109,0.08)" stroke="rgba(255,77,109,0.4)" stroke-width="1.5"/>
            <text x="400" y="328" text-anchor="middle" fill="#ff4d6d" font-size="11" font-weight="800">防線 3: Bash 破壞性命令掃描</text>
            <text x="400" y="346" text-anchor="middle" fill="#b8c8e0" font-size="9">bashSecurity.ts · rm -rf · dd if= · 危險模式正規表達式匹配</text>
            <text x="400" y="360" text-anchor="middle" fill="#b8c8e0" font-size="9">強制用戶確認 / 拒絕執行</text>
          </svg>
        </div>
      </section>

      <!-- YOLO Classifier Details -->
      <section class="ch-section">
        <h2>YOLO 分類器深度解析</h2>
        <div class="detail-grid">
          <div class="detail-card">
            <h3>什麼是 YOLO？</h3>
            <p>YOLO 模式（<em>You Only Look Once</em>）是 Claude Code 的「自動授權」模式。在 YOLO 模式下，工具執行不需要用戶逐一確認。YOLO 分類器是一個獨立的 Claude API 呼叫，用於預測下一個工具呼叫是否安全。</p>
          </div>
          <div class="detail-card">
            <h3>側邊 AI 架構</h3>
            <p>分類器使用輕量 Claude 模型（非主 Agent 模型），以異步方式在主流程旁運行。主流程繼續處理 API 串流，分類器並行判斷危險性，避免增加延遲。</p>
          </div>
          <div class="detail-card">
            <h3>Circuit Breaker</h3>
            <p>若分類器連續失敗 3 次（API 超時 / 錯誤），Circuit Breaker 斷路器介入，暫時停用分類器，回退到靜態規則或用戶確認模式，避免阻塞正常工作流。</p>
          </div>
          <div class="detail-card">
            <h3>預測 vs 強制</h3>
            <p>分類器結果是<strong>建議</strong>而非強制。最終決定由主權限引擎做出。靜態規則（防線 1）的優先級高於分類器預測，確保白名單始終有效。</p>
          </div>
        </div>
      </section>

      <!-- Bash 20 項安全檢查 -->
      <section class="ch-section">
        <h2>BashTool 20 項安全檢查</h2>
        <p class="section-lead">每一條 Bash 命令執行前，<code>bashSecurity.ts</code> 依序執行 20 項正規表達式掃描，覆蓋幾乎所有已知 Shell 注入攻擊面。</p>

        <div class="checks-grid">
          <div class="check-item" *ngFor="let c of bashChecks; let i = index">
            <div class="check-num">{{ (i+1).toString().padStart(2,'0') }}</div>
            <div class="check-body">
              <div class="check-name">{{ c.name }}</div>
              <div class="check-desc">{{ c.desc }}</div>
            </div>
            <div class="check-dot" [style.background]="c.color"></div>
          </div>
        </div>

        <div class="checks-summary">
          <div class="cs-badge">
            <span class="cs-num">20</span>
            <span class="cs-label">/ 20 安全檢查全部通過才允許執行</span>
          </div>
          <div class="cs-note">任一項觸發 → 強制用戶確認或直接拒絕執行</div>
        </div>
      </section>

      <!-- 解釋器黑名單 -->
      <section class="ch-section">
        <h2>自動模式 — 解釋器黑名單</h2>
        <p class="section-lead">在 YOLO 自動模式下，以下腳本語言解釋器<strong>預設全部封鎖</strong>，模型無法在無人監督的情況下執行任意腳本程式碼。</p>

        <div class="blocklist">
          <div class="bl-item" *ngFor="let lang of blockedLangs">
            <div class="bl-name">{{ lang.name }}</div>
            <div class="bl-badge">BLOCKED</div>
            <div class="bl-reason">{{ lang.reason }}</div>
          </div>
        </div>

        <div class="blocklist-warning">
          <div class="bw-icon">⚠️</div>
          <div class="bw-text">自動模式下腳本語言必須經過用戶確認，防止模型在無人監督時執行惡意腳本</div>
        </div>
      </section>

      <!-- Source Table -->
      <section class="ch-section">
        <h2>原始碼位置</h2>
        <div class="src-table-wrap">
          <table class="src-table">
            <thead><tr><th>檔案</th><th>職責</th></tr></thead>
            <tbody>
              <tr><td><code>permissions.ts</code></td><td>靜態規則引擎、允許/拒絕清單解析</td></tr>
              <tr><td><code>yoloClassifier.ts</code></td><td>YOLO 分類器、Circuit Breaker 邏輯</td></tr>
              <tr><td><code>bashSecurity.ts</code></td><td>Bash 危險命令正規表達式掃描</td></tr>
              <tr><td><code>approvals.ts</code></td><td>用戶確認 UI、审批流程協調</td></tr>
              <tr><td><code>tools/Bash/index.ts</code></td><td>Bash 工具執行前的安全檢查調用</td></tr>
            </tbody>
          </table>
        </div>
      </section>
  `,
  styles: [`
    :host { display: block; }
    .chapter-hero {
      padding:48px 40px 40px; border-bottom:1px solid var(--border-color);
      background:radial-gradient(ellipse 70% 50% at 30% 50%, rgba(255,77,109,.08) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#ff4d6d; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#ff4d6d,#ff8c42); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(255,77,109,.1); border:1px solid rgba(255,77,109,.25); color:#ff4d6d; padding:3px 10px; border-radius:4px; }
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .ch-section h2 { font-size:1.3rem; font-weight:800; margin-bottom:24px; }

    .diagram-box { background: #0d1117; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 4px; overflow: hidden; }
    .arch-svg { width: 100%; height: auto; display: block; }

    .detail-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .detail-card {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px;
      h3 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
      p { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.7; }
      em { font-style: italic; color: var(--text-muted); }
      strong { color: var(--text-primary); }
    }

    .src-table-wrap { overflow-x: auto; }
    .src-table { width: 100%; border-collapse: collapse; font-size: 0.85rem;
      thead tr { background: rgba(255,77,109,0.08); }
      th { padding: 10px 16px; text-align: left; font-weight: 700; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
      td { padding: 10px 16px; color: var(--text-secondary); border-bottom: 1px solid rgba(255,255,255,0.04); }
      tr:hover td { background: rgba(255,255,255,0.02); }
      code { font-family: var(--font-mono); font-size: 0.82em; color: #ff4d6d; }
    }

    .section-lead { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px; code { font-family: var(--font-mono); font-size: 0.85em; color: #ff4d6d; background: rgba(255,77,109,.1); padding: 1px 5px; border-radius: 3px; } strong { color: var(--text-primary); } }

    /* ── 20 項安全檢查 ── */
    .checks-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 20px; }
    .check-item { display: flex; align-items: center; gap: 10px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px 14px; transition: border-color .2s; &:hover { border-color: rgba(255,77,109,.3); } }
    .check-num { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: var(--text-muted); min-width: 22px; }
    .check-body { flex: 1; .check-name { font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 2px; } .check-desc { font-size: 0.72rem; color: var(--text-secondary); line-height: 1.4; } }
    .check-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .checks-summary { display: flex; align-items: center; gap: 20px; background: rgba(255,77,109,.06); border: 1px solid rgba(255,77,109,.2); border-radius: 10px; padding: 16px 20px; }
    .cs-badge { display: flex; align-items: baseline; gap: 8px; .cs-num { font-size: 2.4rem; font-weight: 900; color: #ff4d6d; font-family: var(--font-mono); line-height: 1; } .cs-label { font-size: 0.82rem; color: var(--text-secondary); } }
    .cs-note { font-size: 0.78rem; color: var(--text-muted); border-left: 2px solid rgba(255,77,109,.3); padding-left: 14px; line-height: 1.6; }

    /* ── 解釋器黑名單 ── */
    .blocklist { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
    .bl-item { display: flex; align-items: center; gap: 16px; background: var(--bg-card); border: 1px solid rgba(255,77,109,.2); border-radius: 10px; padding: 14px 18px; }
    .bl-name { font-family: var(--font-mono); font-size: 1rem; font-weight: 700; color: var(--text-primary); min-width: 80px; }
    .bl-badge { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; color: #ff4d6d; background: rgba(255,77,109,.12); border: 1px solid rgba(255,77,109,.4); padding: 3px 10px; border-radius: 4px; letter-spacing: .05em; flex-shrink: 0; }
    .bl-reason { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; }
    .blocklist-warning { display: flex; align-items: center; gap: 12px; background: rgba(255,209,102,.06); border: 1px solid rgba(255,209,102,.25); border-radius: 10px; padding: 14px 18px; .bw-icon { font-size: 1.2rem; flex-shrink: 0; } .bw-text { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; } }

    @media (max-width: 640px) {
      .chapter-hero, .ch-section { padding-left: 20px; padding-right: 20px; }
      .checks-grid { grid-template-columns: 1fr; }
      .cs-badge { flex-direction: column; gap: 2px; }
    }
  `]
})
export class SecurityComponent {

  bashChecks = [
    { name: '不完整命令',    desc: '偵測末尾截斷的不完整指令，防止注入補全',       color: '#7c5cfc' },
    { name: 'jq.system()',  desc: 'jq 的 system() 函式可執行任意命令',          color: '#ff4d6d' },
    { name: '危險變量',      desc: '$PATH/$LD_PRELOAD 等環境變量覆蓋攻擊',       color: '#ff4d6d' },
    { name: '反斜杠空白',    desc: '利用 \\ 空格繞過關鍵字過濾',                 color: '#ff8c42' },
    { name: '嵌入換行',      desc: '\\n 換行注入多條隱藏命令',                   color: '#ff4d6d' },
    { name: '花括號展開',    desc: '{a,b} 展開生成意外命令序列',                  color: '#ffd166' },
    { name: '命令替換',      desc: '$(...) 或 `...` 嵌套執行任意命令',           color: '#ff4d6d' },
    { name: 'IFS 注入',      desc: '修改 IFS 分隔符改變命令解析行為',             color: '#ff8c42' },
    { name: 'Token 注入',    desc: '向 API token 傳遞惡意內容',                  color: '#7c5cfc' },
    { name: '反斜杠運算符',  desc: '\\ 運算符繞過黑名單關鍵字',                   color: '#ff8c42' },
    { name: '/proc 訪問',    desc: '讀取 /proc/self/mem 等敏感系統資訊',          color: '#ff4d6d' },
    { name: 'Shell 元字符', desc: '| & ; < > 等 Shell 特殊字符注入',             color: '#5c8aff' },
    { name: 'Zsh 危險命令', desc: 'Zsh 特有的危險語法與全局別名',                 color: '#ff8c42' },
    { name: '混淆標志',      desc: '利用 echo -e / printf 等混淆實際執行內容',    color: '#ffd166' },
    { name: 'Unicode 偽裝', desc: '用視覺相似 Unicode 字符偽裝危險命令',          color: '#ff4d6d' },
    { name: 'Git commit 篡改', desc: 'git commit -m 注入 hook 腳本',            color: '#ff8c42' },
    { name: '哈希注釋',      desc: '# 注釋截斷後半段隱藏真實命令',                color: '#ffd166' },
    { name: 'jq 文件參數',  desc: 'jq --arg 傳入惡意文件路徑',                   color: '#ff8c42' },
    { name: 'I/O 重定向',   desc: '> >> 覆蓋重要系統文件',                        color: '#ff4d6d' },
    { name: '控制字符',      desc: '\\x00-\\x1f 控制字符干擾終端解析',             color: '#5c8aff' },
  ];

  blockedLangs = [
    { name: 'Python',  reason: '可執行任意程式碼、網路請求、文件系統操作' },
    { name: 'Node',    reason: '可執行任意 JS、存取 require(\'child_process\')' },
    { name: 'Ruby',    reason: '可執行系統命令、修改文件系統' },
    { name: 'Perl',    reason: '強大的文字處理與系統調用能力' },
    { name: 'PHP',     reason: '可執行 shell_exec()、system() 等危險函式' },
    { name: 'bash/sh', reason: '直接執行 Shell 腳本，可繞過 BashTool 安全掃描' },
  ];
}
