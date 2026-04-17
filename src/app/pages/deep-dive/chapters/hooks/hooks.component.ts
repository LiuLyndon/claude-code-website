import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hooks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 10</span>
      <h1>Hook System · 27 個生命週期事件</h1>
      <p>在 Claude Code 執行的每個關鍵節點插入自訂邏輯 — 從工具執行前後到 Session 開始結束</p>
      <div class="hero-tags">
        <span class="htag">src/utils/hooks.ts</span>
        <span class="htag">27 種 Hook 事件</span>
        <span class="htag">Sync / Async</span>
        <span class="htag">.claude/settings.json</span>
      </div>
    </div>

    <!-- ① Hook 是什麼 -->
    <section class="ch-section">
      <div class="ch-section-header">
        <span class="csh-num">01</span>
        <div>
          <h2>Hook 是什麼？</h2>
          <p>讓外部腳本在 Claude Code 執行流程中的特定節點介入</p>
        </div>
      </div>
      <div class="concept-boxes">
        <div class="cb-item" *ngFor="let c of concepts">
          <div class="cbi-icon">{{ c.icon }}</div>
          <div class="cbi-title">{{ c.title }}</div>
          <div class="cbi-desc">{{ c.desc }}</div>
        </div>
      </div>
    </section>

    <!-- ② 27 個事件全覽 — CSS Grid 視覺化 -->
    <section class="ch-section ch-section--dark">
      <div class="ch-section-header">
        <span class="csh-num">02</span>
        <div>
          <h2>27 個 Hook 事件全覽</h2>
          <p>依類別分組，點選查看用途</p>
        </div>
      </div>
      <div class="events-grid">
        <div class="eg-group" *ngFor="let g of hookGroups">
          <div class="egg-header" [style.color]="g.color">
            <span>{{ g.icon }}</span><span>{{ g.name }}</span>
          </div>
          <div class="egg-events">
            <div class="egge-item" *ngFor="let e of g.events"
                 [style.borderColor]="g.color+'33'"
                 [style.background]="g.color+'09'">
              <span class="egge-name" [style.color]="g.color">{{ e.name }}</span>
              <span class="egge-desc">{{ e.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ Hook 執行流程動畫 -->
    <section class="ch-section">
      <div class="ch-section-header">
        <span class="csh-num">03</span>
        <div>
          <h2>Hook 執行流程</h2>
          <p>以 PreToolUse 為例：從工具呼叫到 Hook 決策</p>
        </div>
      </div>

      <div class="hook-pipeline">
        <div class="hp-stage" *ngFor="let s of hookPipeline; let i = index" [style.animationDelay]="i*0.08+'s'">
          <div class="hps-box" [style.borderColor]="s.color+'55'" [style.background]="s.color+'0d'">
            <div class="hpsb-icon" [style.color]="s.color">{{ s.icon }}</div>
            <div class="hpsb-title">{{ s.title }}</div>
            <div class="hpsb-desc">{{ s.desc }}</div>
            <div class="hpsb-code" *ngIf="s.code">{{ s.code }}</div>
          </div>
          <div class="hps-arrow" *ngIf="i < hookPipeline.length-1" [style.color]="s.color">→</div>
        </div>
      </div>

      <div class="hook-responses">
        <div class="hr-title">PreToolUse Hook 可以回傳的決策</div>
        <div class="hr-grid">
          <div class="hrg-item" *ngFor="let r of preToolResponses">
            <div class="hrgi-badge" [style.background]="r.color+'22'" [style.color]="r.color" [style.borderColor]="r.color+'44'">{{ r.decision }}</div>
            <div class="hrgi-desc">{{ r.desc }}</div>
            <div class="hrgi-example" *ngIf="r.example"><code>{{ r.example }}</code></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ Sync vs Async Hook -->
    <section class="ch-section ch-section--dark">
      <div class="ch-section-header">
        <span class="csh-num">04</span>
        <div>
          <h2>同步 vs 非同步 Hook</h2>
          <p>選擇適合的執行模式</p>
        </div>
      </div>

      <div class="sync-async">
        <div class="sa-card">
          <div class="sac-header sync-header">⏱️ Sync Hook</div>
          <div class="sac-flow">
            <div class="sacf-step">Claude Code 觸發事件</div>
            <div class="sacf-arrow">↓</div>
            <div class="sacf-step sacf-hook">執行 Hook 腳本</div>
            <div class="sacf-arrow">↓</div>
            <div class="sacf-step sacf-wait">等待腳本完成（Timeout: 600s）</div>
            <div class="sacf-arrow">↓</div>
            <div class="sacf-step">讀取 stdout JSON 決策</div>
            <div class="sacf-arrow">↓</div>
            <div class="sacf-step sacf-done">繼續 / 中止執行</div>
          </div>
          <div class="sac-use">適用：需要在執行前做決定（PreToolUse、PermissionRequest）</div>
        </div>

        <div class="sa-card">
          <div class="sac-header async-header">⚡ Async Hook</div>
          <div class="sac-flow">
            <div class="sacf-step">Claude Code 觸發事件</div>
            <div class="sacf-arrow">↓</div>
            <div class="sacf-step sacf-hook">啟動 Hook 腳本（背景）</div>
            <div class="sacf-arrow sacf-parallel">↕ 並行</div>
            <div class="sacf-step sacf-parallel-box">Claude Code 繼續執行</div>
            <div class="sacf-arrow">↓</div>
            <div class="sacf-step sacf-done">Hook 結果稍後通知</div>
          </div>
          <div class="sac-use">適用：通知、日誌、監控（PostToolUse、Notification）</div>
        </div>
      </div>
    </section>

    <!-- ⑤ 環境變數 & 設定範例 -->
    <section class="ch-section">
      <div class="ch-section-header">
        <span class="csh-num">05</span>
        <div>
          <h2>環境變數 & 設定範例</h2>
          <p>Hook 腳本能獲取哪些 Context 資訊</p>
        </div>
      </div>

      <div class="env-vars">
        <div class="ev-title">每個 Hook 腳本都能使用的環境變數</div>
        <div class="ev-grid">
          <div class="evg-item" *ngFor="let v of envVars">
            <div class="evgi-name">{{ v.name }}</div>
            <div class="evgi-desc">{{ v.desc }}</div>
          </div>
        </div>
      </div>

      <div class="config-example">
        <div class="ce-title">settings.json 設定範例</div>
        <div class="ce-code">
          <div class="cec-line" *ngFor="let l of configLines" [style.paddingLeft]="l.indent*16+'px'">
            <span class="cecl-key" *ngIf="l.key">{{ l.key }}</span>
            <span class="cecl-val" *ngIf="l.val" [style.color]="l.color||'#00d4aa'">{{ l.val }}</span>
            <span class="cecl-comment" *ngIf="l.comment">{{ l.comment }}</span>
          </div>
        </div>
      </div>

      <div class="use-cases">
        <div class="uc-title">常見 Hook 使用場景</div>
        <div class="uc-grid">
          <div class="ucg-card" *ngFor="let u of useCases">
            <div class="ucgc-icon">{{ u.icon }}</div>
            <div class="ucgc-title">{{ u.title }}</div>
            <div class="ucgc-desc">{{ u.desc }}</div>
            <div class="ucgc-hook">Hook: <code>{{ u.hook }}</code></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .chapter-hero {
      padding:48px 40px 40px; border-bottom:1px solid var(--border-color);
      background:radial-gradient(ellipse 70% 50% at 70% 50%, rgba(255,209,102,.07) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#ffd166; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#ffd166,#ff8c42); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(255,209,102,.1); border:1px solid rgba(255,209,102,.25); color:#ffd166; padding:3px 10px; border-radius:4px; }
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .ch-section--dark { background:rgba(255,255,255,.01); }
    .ch-section-header { display:flex; gap:20px; align-items:flex-start; margin-bottom:32px; }
    .csh-num { font-family:var(--font-mono); font-size:.65rem; font-weight:800; color:var(--text-muted); background:rgba(255,255,255,.04); border:1px solid var(--border-color); padding:4px 10px; border-radius:6px; flex-shrink:0; margin-top:4px; }
    .ch-section-header h2 { font-size:1.3rem; font-weight:800; margin-bottom:4px; }
    .ch-section-header p { font-size:.85rem; color:var(--text-secondary); margin:0; }

    /* ── CONCEPTS ── */
    .concept-boxes { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px; }
    .cb-item {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; padding:20px;
      .cbi-icon { font-size:1.8rem; margin-bottom:10px; }
      .cbi-title { font-size:.9rem; font-weight:700; color:var(--text-primary); margin-bottom:6px; }
      .cbi-desc { font-size:.8rem; color:var(--text-secondary); line-height:1.6; }
    }

    /* ── EVENTS GRID ── */
    .events-grid { display:flex; flex-direction:column; gap:20px; }
    .eg-group { background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; overflow:hidden; }
    .egg-header { display:flex; align-items:center; gap:8px; padding:12px 20px; background:rgba(255,255,255,.02); border-bottom:1px solid var(--border-color); font-size:.8rem; font-weight:800; }
    .egg-events { padding:12px 16px; display:flex; flex-wrap:wrap; gap:8px; }
    .egge-item {
      border:1px solid; border-radius:8px; padding:8px 14px; min-width:140px;
      .egge-name { font-family:var(--font-mono); font-size:.72rem; font-weight:700; display:block; margin-bottom:3px; }
      .egge-desc { font-size:.72rem; color:var(--text-secondary); }
    }

    /* ── HOOK PIPELINE ── */
    .hook-pipeline {
      display:flex; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:28px;
    }
    .hp-stage { display:flex; align-items:center; gap:8px; animation:fadeUp .4s ease both; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    .hps-box {
      border:1px solid; border-radius:12px; padding:14px 16px; min-width:140px;
      .hpsb-icon { font-size:1.3rem; margin-bottom:6px; }
      .hpsb-title { font-size:.82rem; font-weight:700; color:var(--text-primary); margin-bottom:4px; }
      .hpsb-desc { font-size:.75rem; color:var(--text-secondary); margin-bottom:6px; line-height:1.5; }
      .hpsb-code { font-family:var(--font-mono); font-size:.68rem; color:#a78bfa; background:rgba(124,92,252,.08); padding:4px 8px; border-radius:4px; }
    }
    .hps-arrow { font-size:1.3rem; }

    .hook-responses { background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; padding:20px; }
    .hr-title { font-size:.82rem; font-weight:700; color:var(--text-primary); margin-bottom:14px; }
    .hr-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; }
    .hrg-item { .hrgi-badge { font-size:.72rem; font-weight:800; padding:3px 10px; border-radius:4px; border:1px solid; display:inline-block; margin-bottom:6px; font-family:var(--font-mono); } .hrgi-desc { font-size:.78rem; color:var(--text-secondary); margin-bottom:4px; } .hrgi-example code { font-family:var(--font-mono); font-size:.68rem; color:#a78bfa; } }

    /* ── SYNC ASYNC ── */
    .sync-async { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
    .sa-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; overflow:hidden; }
    .sac-header { padding:14px 20px; font-size:.85rem; font-weight:700; &.sync-header { background:rgba(92,138,255,.12); color:#5c8aff; } &.async-header { background:rgba(0,212,170,.12); color:#00d4aa; } }
    .sac-flow { padding:16px 20px; display:flex; flex-direction:column; align-items:center; gap:4px; }
    .sacf-step { font-size:.78rem; color:var(--text-secondary); background:rgba(255,255,255,.04); border:1px solid var(--border-color); padding:7px 16px; border-radius:6px; width:100%; text-align:center; &.sacf-hook { color:#ffd166; background:rgba(255,209,102,.08); border-color:rgba(255,209,102,.25); } &.sacf-wait { color:#ff8c42; background:rgba(255,140,66,.08); border-color:rgba(255,140,66,.25); } &.sacf-done { color:#00d4aa; background:rgba(0,212,170,.08); border-color:rgba(0,212,170,.25); } &.sacf-parallel-box { color:#7c5cfc; background:rgba(124,92,252,.08); border-color:rgba(124,92,252,.25); } }
    .sacf-arrow { color:var(--text-muted); font-size:.9rem; &.sacf-parallel { color:#7c5cfc; } }
    .sac-use { font-size:.75rem; color:var(--text-muted); padding:12px 20px; border-top:1px solid var(--border-color); font-style:italic; }

    /* ── ENV VARS ── */
    .env-vars { margin-bottom:24px; .ev-title { font-size:.82rem; font-weight:700; color:var(--text-primary); margin-bottom:12px; } }
    .ev-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:8px; }
    .evg-item {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:8px; padding:10px 14px;
      .evgi-name { font-family:var(--font-mono); font-size:.75rem; color:#5c8aff; margin-bottom:3px; }
      .evgi-desc { font-size:.75rem; color:var(--text-secondary); }
    }

    .config-example { background:var(--bg-code); border:1px solid var(--border-color); border-radius:12px; overflow:hidden; margin-bottom:24px; .ce-title { padding:10px 16px; font-size:.72rem; color:var(--text-muted); background:rgba(255,255,255,.02); border-bottom:1px solid var(--border-color); text-transform:uppercase; letter-spacing:.06em; } .ce-code { padding:14px 16px; display:flex; flex-direction:column; gap:3px; } }
    .cec-line { display:flex; gap:6px; font-size:.75rem; font-family:var(--font-mono); }
    .cecl-key { color:#5c8aff; } .cecl-comment { color:var(--text-muted); font-style:italic; }

    .use-cases { .uc-title { font-size:.82rem; font-weight:700; color:var(--text-primary); margin-bottom:14px; } }
    .uc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:14px; }
    .ucg-card {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:18px;
      transition:all .2s; &:hover { border-color:rgba(255,209,102,.35); transform:translateY(-2px); }
      .ucgc-icon { font-size:1.6rem; margin-bottom:8px; } .ucgc-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:4px; } .ucgc-desc { font-size:.78rem; color:var(--text-secondary); margin-bottom:8px; line-height:1.5; } .ucgc-hook { font-size:.72rem; color:var(--text-muted); code { font-family:var(--font-mono); color:#ffd166; } }
    }
    @media (max-width:768px) { .ch-section { padding:32px 20px; } .sync-async { grid-template-columns:1fr; } }
  `]
})
export class HooksComponent {
  concepts = [
    { icon:'🎣', title:'Hook = 生命週期鉤子', desc:'在 Claude Code 執行流程的特定節點（工具前後、Session 開始等），插入你自己的腳本邏輯。' },
    { icon:'🔒', title:'安全第一', desc:'Trust Dialog 未接受前，所有 Hook 都被封鎖。Hook 腳本以當前用戶身份執行，受完整系統權限限制。' },
    { icon:'📤', title:'JSON 通訊', desc:'Hook 腳本透過 stdout 輸出 JSON 物件與 Claude Code 溝通，決定是否繼續執行、修改輸入等。' },
    { icon:'⏱️', title:'超時保護', desc:'預設 Timeout 600 秒，防止 Hook 腳本無限阻塞。可按需調整每個 Hook 的超時設定。' },
  ];

  hookGroups = [
    {
      icon:'🔧', name:'工具執行', color:'#7c5cfc',
      events:[
        { name:'PreToolUse', desc:'工具執行前，可修改輸入或否決' },
        { name:'PostToolUse', desc:'工具執行後，可修改輸出結果' },
        { name:'PostToolUseFailure', desc:'工具執行失敗時觸發' },
      ]
    },
    {
      icon:'💬', name:'Session 與提示', color:'#5c8aff',
      events:[
        { name:'UserPromptSubmit', desc:'用戶送出訊息時' },
        { name:'SessionStart', desc:'Session 開始時' },
        { name:'SessionEnd', desc:'Session 結束時（1.5s Timeout）' },
        { name:'Setup', desc:'首次設定時' },
      ]
    },
    {
      icon:'🤖', name:'Sub-Agent', color:'#00d4aa',
      events:[
        { name:'SubagentStart', desc:'子 Agent 啟動時' },
        { name:'SubagentStop', desc:'子 Agent 完成時' },
      ]
    },
    {
      icon:'🛡️', name:'權限控制', color:'#ff8c42',
      events:[
        { name:'PermissionRequest', desc:'自動決策工具權限' },
        { name:'PermissionDenied', desc:'權限被拒絕時' },
      ]
    },
    {
      icon:'🗜️', name:'Context 壓縮', color:'#ff4d6d',
      events:[
        { name:'PreCompact', desc:'壓縮前，可保存重要資訊' },
        { name:'PostCompact', desc:'壓縮後，可恢復狀態' },
      ]
    },
    {
      icon:'📋', name:'任務與通知', color:'#ffd166',
      events:[
        { name:'Stop', desc:'模型停止生成時' },
        { name:'Notification', desc:'Claude Code 發出通知時' },
        { name:'TaskCreated', desc:'背景任務建立時' },
        { name:'TaskCompleted', desc:'背景任務完成時' },
        { name:'TeammateIdle', desc:'團隊 Agent 閒置時' },
      ]
    },
    {
      icon:'🔌', name:'MCP & 其他', color:'#a78bfa',
      events:[
        { name:'Elicitation', desc:'MCP Server 請求用戶輸入' },
        { name:'ElicitationResult', desc:'用戶回應 MCP 請求後' },
        { name:'ConfigChange', desc:'設定檔變更時' },
        { name:'WorktreeCreate', desc:'Git Worktree 建立' },
        { name:'WorktreeRemove', desc:'Git Worktree 移除' },
        { name:'InstructionsLoaded', desc:'CLAUDE.md 載入時' },
        { name:'CwdChanged', desc:'工作目錄變更時' },
        { name:'FileChanged', desc:'檔案被修改時' },
      ]
    },
  ];

  hookPipeline = [
    { icon:'🧠', color:'#7c5cfc', title:'模型決策', desc:'Claude 決定呼叫某工具', code:'tool_use: { name, input }' },
    { icon:'🔍', color:'#5c8aff', title:'事件觸發', desc:'系統觸發 PreToolUse', code:'runPreToolUseHooks()' },
    { icon:'⚙️', color:'#ff8c42', title:'執行 Hook', desc:'spawn 子行程執行腳本', code:'executeHook(script, env)' },
    { icon:'📤', color:'#00d4aa', title:'讀取決策', desc:'解析 stdout JSON 輸出', code:'{ continue: true/false }' },
    { icon:'✅', color:'#ffd166', title:'套用結果', desc:'繼續、中止或修改執行', code:'allow / deny / modify' },
  ];

  preToolResponses = [
    { decision:'allow', color:'#00d4aa', desc:'允許工具執行，不做任何修改', example:'{ "continue": true }' },
    { decision:'deny', color:'#ff4d6d', desc:'拒絕工具執行，並附上原因', example:'{ "continue": false, "reason": "..." }' },
    { decision:'modify', color:'#ff8c42', desc:'修改工具的輸入參數後再執行', example:'{ "continue": true, "input": {...} }' },
    { decision:'ask', color:'#ffd166', desc:'要求 Claude Code 先詢問用戶', example:'{ "permission": "ask" }' },
  ];

  envVars = [
    { name:'CLAUDE_SESSION_ID', desc:'當前 Session 的唯一識別碼 (UUID)' },
    { name:'CLAUDE_CWD', desc:'當前工作目錄路徑' },
    { name:'CLAUDE_TRANSCRIPT_PATH', desc:'本次 Session 對話記錄檔案路徑' },
    { name:'CLAUDE_PERMISSION_MODE', desc:'當前權限模式（ask/auto/plan 等）' },
    { name:'CLAUDE_AGENT_ID', desc:'如在子 Agent 中執行，此 Agent 的 ID' },
    { name:'CLAUDE_ENV_FILE', desc:'Session 環境變數檔案路徑（JSON）' },
  ];

  configLines = [
    { indent:0, key:'"hooks":', val:'', color:'' },
    { indent:1, key:'"PreToolUse":', val:'[', color:'' },
    { indent:2, key:'{', val:'', color:'' },
    { indent:3, key:'"matcher":', val:'"Bash",', color:'#ffd166', comment:' // 匹配工具名稱' },
    { indent:3, key:'"command":', val:'"./scripts/pre-bash-check.sh"', color:'#00d4aa' },
    { indent:2, key:'}', val:'', color:'' },
    { indent:1, key:'],', val:'', color:'' },
    { indent:1, key:'"PostToolUse":', val:'[', color:'' },
    { indent:2, key:'{', val:'', color:'' },
    { indent:3, key:'"matcher":', val:'"*",', color:'#ffd166', comment:' // 匹配所有工具' },
    { indent:3, key:'"command":', val:'"./scripts/log-tool-use.sh",', color:'#00d4aa' },
    { indent:3, key:'"async":', val:'true', color:'#ff8c42', comment:' // 非同步，不阻塞' },
    { indent:2, key:'}', val:'', color:'' },
    { indent:1, key:']', val:'', color:'' },
  ];

  useCases = [
    { icon:'🔒', title:'指令安全審查', desc:'在 Bash 指令執行前，掃描是否含有危險操作（rm -rf、sudo 等）', hook:'PreToolUse' },
    { icon:'📊', title:'工具使用日誌', desc:'記錄所有工具呼叫到外部系統（Slack、資料庫），用於稽核', hook:'PostToolUse' },
    { icon:'🧪', title:'自動化測試', desc:'每次檔案修改後自動執行相關測試，確保程式碼品質', hook:'PostToolUse (FileEdit)' },
    { icon:'🔔', title:'桌面通知', desc:'長時間任務完成後發送桌面通知或 Slack 訊息', hook:'TaskCompleted' },
    { icon:'💾', title:'狀態備份', desc:'在 Context 壓縮前保存重要狀態，壓縮後恢復', hook:'PreCompact' },
    { icon:'🛡️', title:'自動權限決策', desc:'根據工具類型和環境自動核准/拒絕，減少手動確認', hook:'PermissionRequest' },
  ];
}
