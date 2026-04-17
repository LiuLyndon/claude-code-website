import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 09</span>
      <h1>MCP · Model Context Protocol</h1>
      <p>Claude Code 如何透過標準協議連接外部世界 — 讓任何服務都能成為 Claude 的工具</p>
      <div class="hero-tags">
        <span class="htag">src/services/mcp/client.ts</span>
        <span class="htag">@modelcontextprotocol/sdk</span>
        <span class="htag">7 種傳輸類型</span>
        <span class="htag">動態工具發現</span>
      </div>
    </div>

    <!-- ① 什麼是 MCP -->
    <section class="ch-section">
      <div class="ch-section-header">
        <span class="csh-num">01</span>
        <div>
          <h2>MCP 是什麼？</h2>
          <p>讓 Claude 連接外部世界的標準插座</p>
        </div>
      </div>

      <div class="analogy-box">
        <div class="ab-left">
          <div class="ab-icon">🔌</div>
          <div class="ab-title">把 MCP 想像成 USB</div>
          <div class="ab-desc">
            就像 USB 讓任何設備都能接上電腦，MCP 讓任何服務都能接上 Claude。
            只要實作 MCP 協議，資料庫、瀏覽器、Git、Slack… 都能成為 Claude 可以使用的工具。
          </div>
        </div>
        <div class="ab-right">
          <div class="ab-item" *ngFor="let item of analogyItems">
            <span class="ai-icon">{{ item.icon }}</span>
            <div class="ai-body">
              <div class="ai-name">{{ item.name }}</div>
              <div class="ai-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ② 7 種傳輸類型 CSS 圖 -->
    <section class="ch-section ch-section--dark">
      <div class="ch-section-header">
        <span class="csh-num">02</span>
        <div>
          <h2>7 種傳輸類型</h2>
          <p>MCP 支援多種連接方式，從本地子行程到雲端 WebSocket</p>
        </div>
      </div>

      <div class="transport-diagram">
        <div class="td-center">
          <div class="tdc-box">
            <div class="tdc-pulse"></div>
            <span class="tdc-label">Claude Code<br>MCP Client</span>
          </div>
        </div>
        <div class="td-transports">
          <div class="td-transport" *ngFor="let t of transports; let i = index"
               [style.animationDelay]="i*0.1+'s'"
               [style.borderColor]="t.color+'44'"
               [style.background]="t.color+'0d'">
            <div class="tdt-line" [style.background]="'linear-gradient(90deg,'+t.color+',transparent)'"></div>
            <div class="tdt-badge" [style.background]="t.color+'22'" [style.color]="t.color">{{ t.type }}</div>
            <div class="tdt-name">{{ t.name }}</div>
            <div class="tdt-desc">{{ t.desc }}</div>
            <div class="tdt-use">{{ t.use }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ 完整連接流程 -->
    <section class="ch-section">
      <div class="ch-section-header">
        <span class="csh-num">03</span>
        <div>
          <h2>從設定到可用：完整連接流程</h2>
          <p>Claude Code 如何發現、連接、快取 MCP Server</p>
        </div>
      </div>

      <div class="flow-steps">
        <div class="fs-step" *ngFor="let s of connectionFlow; let i = index" [style.animationDelay]="i*0.1+'s'">
          <div class="fss-num" [style.background]="s.color+'22'" [style.color]="s.color" [style.borderColor]="s.color+'44'">{{ i+1 }}</div>
          <div class="fss-content">
            <div class="fss-title">{{ s.title }}</div>
            <div class="fss-desc">{{ s.desc }}</div>
            <div class="fss-code" *ngIf="s.code">{{ s.code }}</div>
            <div class="fss-detail" *ngIf="s.detail">{{ s.detail }}</div>
          </div>
          <div class="fss-arrow" *ngIf="i < connectionFlow.length-1">↓</div>
        </div>
      </div>
    </section>

    <!-- ④ 工具發現與呼叫 -->
    <section class="ch-section ch-section--dark">
      <div class="ch-section-header">
        <span class="csh-num">04</span>
        <div>
          <h2>工具發現 → 呼叫 → 結果</h2>
          <p>MCP 工具如何被 Claude 找到並使用</p>
        </div>
      </div>

      <div class="tool-discovery">
        <div class="tdy-phase" *ngFor="let p of toolDiscovery">
          <div class="tdyp-header" [style.color]="p.color">
            <span class="tdyp-icon">{{ p.icon }}</span>
            <span>{{ p.phase }}</span>
          </div>
          <div class="tdyp-box" [style.borderColor]="p.color+'33'">
            <div class="tdypb-title">{{ p.title }}</div>
            <div class="tdypb-content">{{ p.content }}</div>
            <div class="tdypb-code">{{ p.code }}</div>
            <div class="tdypb-note" *ngIf="p.note">💡 {{ p.note }}</div>
          </div>
          <div class="tdyp-arrow" *ngIf="p.arrow">→</div>
        </div>
      </div>
    </section>

    <!-- ⑤ 認證機制 -->
    <section class="ch-section">
      <div class="ch-section-header">
        <span class="csh-num">05</span>
        <div>
          <h2>OAuth & 認證機制</h2>
          <p>MCP 如何安全地連接需要身份驗證的服務</p>
        </div>
      </div>

      <div class="auth-flow">
        <div class="af-title">OAuth 認證流程 (SSE/HTTP Transport)</div>
        <div class="af-steps">
          <div class="afs-item" *ngFor="let s of authSteps; let i = index">
            <div class="afsi-who" [style.color]="s.color">{{ s.who }}</div>
            <div class="afsi-line" [style.background]="s.color+'33'"></div>
            <div class="afsi-action">{{ s.action }}</div>
          </div>
        </div>
      </div>

      <div class="auth-types">
        <div class="at-card" *ngFor="let a of authTypes">
          <div class="atc-name" [style.color]="a.color">{{ a.name }}</div>
          <div class="atc-desc">{{ a.desc }}</div>
          <div class="atc-when">適用：{{ a.when }}</div>
        </div>
      </div>
    </section>

    <!-- ⑥ 設定範例 -->
    <section class="ch-section ch-section--dark">
      <div class="ch-section-header">
        <span class="csh-num">06</span>
        <div>
          <h2>設定 MCP Server</h2>
          <p>在 .claude/settings.json 中加入 MCP 設定</p>
        </div>
      </div>

      <div class="config-examples">
        <div class="ce-card" *ngFor="let c of configExamples">
          <div class="cec-title">{{ c.title }}</div>
          <div class="cec-code">
            <div class="cecc-line" *ngFor="let line of c.lines" [style.paddingLeft]="line.indent*14+'px'">
              <span class="cecc-key" *ngIf="line.key">{{ line.key }}</span>
              <span class="cecc-val" *ngIf="line.val" [style.color]="line.color||'#00d4aa'">{{ line.val }}</span>
              <span class="cecc-comment" *ngIf="line.comment">{{ line.comment }}</span>
            </div>
          </div>
          <div class="cec-note">{{ c.note }}</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    /* ── HERO ── */
    .chapter-hero {
      padding: 48px 40px 40px; border-bottom: 1px solid var(--border-color);
      background: radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,212,170,.08) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#00d4aa; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.8rem,3vw,2.4rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#00d4aa,#5c8aff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(0,212,170,.1); border:1px solid rgba(0,212,170,.25); color:#00d4aa; padding:3px 10px; border-radius:4px; }

    /* ── SECTION ── */
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .ch-section--dark { background:rgba(255,255,255,.01); }
    .ch-section-header { display:flex; gap:20px; align-items:flex-start; margin-bottom:36px; }
    .csh-num { font-family:var(--font-mono); font-size:.65rem; font-weight:800; color:var(--text-muted); background:rgba(255,255,255,.04); border:1px solid var(--border-color); padding:4px 10px; border-radius:6px; flex-shrink:0; margin-top:4px; }
    .ch-section-header h2 { font-size:1.4rem; font-weight:800; margin-bottom:4px; }
    .ch-section-header p { font-size:.85rem; color:var(--text-secondary); margin:0; }

    /* ── ANALOGY BOX ── */
    .analogy-box {
      display:grid; grid-template-columns:1fr 1fr; gap:24px;
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:16px; padding:28px;
    }
    .ab-left { display:flex; flex-direction:column; gap:12px; }
    .ab-icon { font-size:2.5rem; }
    .ab-title { font-size:1.1rem; font-weight:700; color:#00d4aa; }
    .ab-desc { font-size:.85rem; color:var(--text-secondary); line-height:1.7; }
    .ab-right { display:flex; flex-direction:column; gap:14px; border-left:1px solid var(--border-color); padding-left:24px; }
    .ab-item { display:flex; gap:12px; align-items:flex-start; }
    .ai-icon { font-size:1.3rem; flex-shrink:0; }
    .ai-name { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:2px; }
    .ai-desc { font-size:.78rem; color:var(--text-secondary); }

    /* ── TRANSPORT DIAGRAM ── */
    .transport-diagram {
      display:flex; flex-direction:column; gap:24px; align-items:center;
    }
    .td-center { position:relative; }
    .tdc-box {
      background:rgba(0,212,170,.12); border:2px solid #00d4aa; border-radius:16px;
      padding:16px 32px; text-align:center; position:relative;
      .tdc-pulse { position:absolute; inset:0; border-radius:14px; background:rgba(0,212,170,.1); animation:pulse 2s ease infinite; }
      .tdc-label { font-size:.82rem; font-weight:700; color:#00d4aa; font-family:var(--font-mono); position:relative; z-index:1; white-space:nowrap; }
    }
    @keyframes pulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.04);opacity:0} }
    .td-transports { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; width:100%; }
    .td-transport {
      border:1px solid; border-radius:12px; padding:16px; position:relative; overflow:hidden;
      animation:fadeUp .4s ease both;
      .tdt-line { position:absolute; top:0; left:0; right:0; height:3px; }
      .tdt-badge { font-size:.65rem; font-weight:800; padding:2px 8px; border-radius:4px; display:inline-block; margin-bottom:8px; letter-spacing:.04em; }
      .tdt-name { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:4px; }
      .tdt-desc { font-size:.75rem; color:var(--text-secondary); margin-bottom:6px; line-height:1.5; }
      .tdt-use { font-size:.7rem; color:var(--text-muted); font-style:italic; }
    }
    @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

    /* ── FLOW STEPS ── */
    .flow-steps { display:flex; flex-direction:column; gap:0; max-width:760px; }
    .fs-step { display:flex; gap:16px; align-items:flex-start; position:relative; animation:fadeUp .4s ease both; }
    .fss-num {
      width:32px; height:32px; border-radius:50%; border:1px solid; display:flex; align-items:center; justify-content:center;
      font-size:.75rem; font-weight:800; flex-shrink:0; z-index:1;
    }
    .fss-content { flex:1; padding:0 0 28px; border-left:2px dashed rgba(255,255,255,.06); padding-left:20px; margin-left:-16px; }
    .fss-title { font-size:.9rem; font-weight:700; color:var(--text-primary); margin-bottom:4px; }
    .fss-desc { font-size:.82rem; color:var(--text-secondary); line-height:1.6; margin-bottom:6px; }
    .fss-code { font-family:var(--font-mono); font-size:.75rem; color:#a78bfa; background:rgba(124,92,252,.08); padding:6px 12px; border-radius:6px; margin-bottom:6px; }
    .fss-detail { font-size:.75rem; color:var(--text-muted); }
    .fss-arrow { position:absolute; left:15px; bottom:4px; color:var(--text-muted); font-size:.9rem; }

    /* ── TOOL DISCOVERY ── */
    .tool-discovery { display:flex; align-items:stretch; flex-wrap:wrap; gap:8px; }
    .tdy-phase { display:flex; align-items:center; gap:8px; }
    .tdyp-header { display:flex; align-items:center; gap:6px; font-size:.75rem; font-weight:700; writing-mode:horizontal-tb; }
    .tdyp-icon { font-size:1.2rem; }
    .tdyp-box {
      border:1px solid; border-radius:12px; padding:16px; min-width:160px; max-width:200px;
      .tdypb-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:6px; }
      .tdypb-content { font-size:.78rem; color:var(--text-secondary); margin-bottom:8px; line-height:1.5; }
      .tdypb-code { font-family:var(--font-mono); font-size:.7rem; color:#a78bfa; background:rgba(124,92,252,.08); padding:4px 8px; border-radius:4px; margin-bottom:6px; }
      .tdypb-note { font-size:.72rem; color:var(--text-muted); line-height:1.5; }
    }
    .tdyp-arrow { font-size:1.4rem; color:var(--text-muted); flex-shrink:0; }

    /* ── AUTH FLOW ── */
    .auth-flow {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px;
      padding:24px; margin-bottom:20px;
      .af-title { font-size:.82rem; font-weight:700; color:var(--text-primary); margin-bottom:20px; }
    }
    .af-steps { display:flex; flex-direction:column; gap:0; }
    .afs-item { display:flex; gap:16px; align-items:center; }
    .afsi-who { font-size:.75rem; font-weight:700; width:90px; flex-shrink:0; text-align:right; }
    .afsi-line { width:24px; height:2px; flex-shrink:0; }
    .afsi-action { font-size:.82rem; color:var(--text-secondary); padding:10px 0; border-bottom:1px dashed rgba(255,255,255,.04); flex:1; }

    .auth-types { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px; }
    .at-card {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:16px;
      .atc-name { font-size:.85rem; font-weight:700; margin-bottom:6px; }
      .atc-desc { font-size:.78rem; color:var(--text-secondary); margin-bottom:6px; line-height:1.5; }
      .atc-when { font-size:.72rem; color:var(--text-muted); }
    }

    /* ── CONFIG EXAMPLES ── */
    .config-examples { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:16px; }
    .ce-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; overflow:hidden; }
    .cec-title { font-size:.78rem; font-weight:700; color:var(--text-muted); padding:12px 16px; background:rgba(255,255,255,.02); border-bottom:1px solid var(--border-color); text-transform:uppercase; letter-spacing:.06em; }
    .cec-code { padding:14px 16px; font-family:var(--font-mono); display:flex; flex-direction:column; gap:3px; }
    .cecc-line { display:flex; gap:6px; font-size:.75rem; }
    .cecc-key { color:#5c8aff; }
    .cecc-comment { color:var(--text-muted); font-style:italic; }
    .cec-note { font-size:.75rem; color:var(--text-muted); padding:10px 16px; border-top:1px solid var(--border-color); }

    @media (max-width:768px) {
      .ch-section { padding:32px 20px; }
      .analogy-box { grid-template-columns:1fr; .ab-right { border-left:none; padding-left:0; border-top:1px solid var(--border-color); padding-top:16px; } }
      .tool-discovery { flex-direction:column; }
    }
  `]
})
export class McpComponent {
  analogyItems = [
    { icon:'🗄️', name:'資料庫 MCP Server', desc:'讓 Claude 直接查詢 PostgreSQL、MongoDB' },
    { icon:'🌐', name:'瀏覽器 MCP Server', desc:'讓 Claude 操控真實瀏覽器，抓取動態網頁' },
    { icon:'📧', name:'Slack/Gmail MCP', desc:'讓 Claude 讀取、傳送訊息到溝通工具' },
    { icon:'🐙', name:'GitHub MCP Server', desc:'讓 Claude 操作 PR、Issue、Review' },
  ];

  transports = [
    { type:'stdio', color:'#7c5cfc', name:'Standard I/O', desc:'啟動子行程，透過 stdin/stdout 通訊', use:'本地工具、命令列程式（最常見）' },
    { type:'sse', color:'#5c8aff', name:'Server-Sent Events', desc:'HTTP 長連線串流，支援 OAuth 認證', use:'遠端服務、需要身份驗證的 API' },
    { type:'http', color:'#00d4aa', name:'Streamable HTTP', desc:'標準 HTTP 請求/回應，支援串流', use:'Stateless 微服務，REST API 封裝' },
    { type:'ws', color:'#ff8c42', name:'WebSocket', desc:'全雙工即時通訊協議', use:'需要低延遲雙向推送的服務' },
    { type:'sse-ide', color:'#ff4d6d', name:'SSE (IDE)', desc:'IDE 擴充套件專用 SSE 變體', use:'VS Code / JetBrains 擴充套件' },
    { type:'ws-ide', color:'#ffd166', name:'WS (IDE)', desc:'IDE 擴充套件專用 WebSocket', use:'需要低延遲的 IDE 整合' },
    { type:'sdk', color:'#a78bfa', name:'SDK In-Process', desc:'同進程內直接呼叫，零網路開銷', use:'Managed/Claude.ai Proxy 代理伺服器' },
  ];

  connectionFlow = [
    { color:'#7c5cfc', title:'讀取設定檔 (Discovery)',
      desc:'Claude Code 從 4 個來源收集 MCP Server 設定，依優先級合併：',
      code:'~/.claude/settings.json  (用戶級)\n.claude/settings.json    (專案級)\n企業 MDM 政策\nClaude.ai Marketplace',
      detail:null },
    { color:'#5c8aff', title:'connectToServer() — 建立連線',
      desc:'使用 memoize() 快取連線，同一個 Server 在整個 Session 只建立一次連線。',
      code:"const client = await connectToServer(serverConfig)\n// memoize → 第二次呼叫直接返回快取",
      detail:'內部呼叫 @modelcontextprotocol/sdk 的 Client.connect()，交換 capabilities。' },
    { color:'#00d4aa', title:'client.call("tools/list") — 工具發現',
      desc:'連線後立即列出所有可用工具，包含名稱、描述、輸入 Schema。',
      code:'const { tools } = await client.call("tools/list")',
      detail:'工具名稱自動正規化：去除特殊字元，重複名稱自動加後綴。描述截斷至 2048 字元。' },
    { color:'#ff8c42', title:'注入工具池 (Tool Pool)',
      desc:'MCP 工具以 mcp__<server>__<toolName> 格式加入 Claude Code 的工具清單，與內建工具統一管理。',
      code:'// 例：mcp__github__create_issue\n//     mcp__postgres__query',
      detail:null },
    { color:'#ff4d6d', title:'client.call("tools/call") — 執行工具',
      desc:'模型呼叫 MCP 工具時，Claude Code 轉發請求到對應 Server，等待結果。',
      code:'await client.call("tools/call", {\n  name: toolName,\n  arguments: input\n})',
      detail:'Timeout: 100M ms (27.8 小時)，單次請求 60 秒。Session 過期 (404 + -32001) 自動重連。' },
  ];

  toolDiscovery = [
    { color:'#7c5cfc', icon:'⚙️', phase:'設定', arrow:true,
      title:'Server 設定', content:'在 settings.json 中定義 Server 類型與連線參數',
      code:'{ "type": "stdio", "command": "npx @github/mcp" }',
      note:null },
    { color:'#5c8aff', icon:'🔗', phase:'連線', arrow:true,
      title:'建立連線', content:'啟動子行程或建立 HTTP/WS 連線，交換 Protocol 版本',
      code:'sdk.Client.connect(transport)',
      note:'連線快取，斷線自動重連' },
    { color:'#00d4aa', icon:'🔍', phase:'發現', arrow:true,
      title:'工具清單', content:'呼叫 tools/list 取得所有工具 Schema',
      code:'{ name, description, inputSchema }',
      note:'描述上限 2048 字元' },
    { color:'#ff8c42', icon:'🤖', phase:'使用', arrow:false,
      title:'模型呼叫', content:'Claude 決定使用工具後，Claude Code 轉發 tools/call',
      code:'{ name, arguments } → result',
      note:'結果轉換為 ToolResultBlock' },
  ];

  authSteps = [
    { color:'#7c5cfc', who:'Claude Code', action:'嘗試連線 MCP Server，收到 401 Unauthorized' },
    { color:'#ff8c42', who:'MCP Server', action:'回傳 OAuth Authorization URL' },
    { color:'#5c8aff', who:'Claude Code', action:'透過 McpAuthTool 在 REPL 中顯示授權連結' },
    { color:'#00d4aa', who:'用戶', action:'點擊連結，在瀏覽器完成 OAuth 授權' },
    { color:'#5c8aff', who:'OAuth Provider', action:'回傳 Access Token 給 Claude Code' },
    { color:'#7c5cfc', who:'Claude Code', action:'使用 Token 重新連線，快取 15 分鐘' },
  ];

  authTypes = [
    { color:'#5c8aff', name:'OAuth 2.0', desc:'透過 ClaudeAuthProvider 處理完整 OAuth 流程，用於 SSE/HTTP 傳輸', when:'GitHub、Google、Slack 等需要用戶授權的服務' },
    { color:'#7c5cfc', name:'XAA (Cross-App)', desc:'透過 Claude.ai Identity Provider 的跨應用存取，SEP-990 規範', when:'Claude.ai Marketplace 上的代理服務' },
    { color:'#00d4aa', name:'Static Headers', desc:'在 settings.json 中直接配置靜態認證標頭', when:'API Key 類型的服務（OpenAI、Anthropic API）' },
    { color:'#ff8c42', name:'Dynamic Headers', desc:'透過 headersHelper 設定，執行 Shell 命令動態產生 Token', when:'需要每次刷新 Token 的企業 SSO' },
  ];

  configExamples = [
    {
      title:'stdio — 本地命令列工具',
      lines:[
        { indent:0, key:'"mcpServers":', val:'', color:'' },
        { indent:1, key:'"github":', val:'', color:'' },
        { indent:2, key:'"type":', val:'"stdio",', color:'#00d4aa' },
        { indent:2, key:'"command":', val:'"npx",', color:'#00d4aa' },
        { indent:2, key:'"args":', val:'["@github/mcp-server"]', color:'#00d4aa' },
      ],
      note:'最常見設定，啟動 npx 子行程透過 stdin/stdout 通訊'
    },
    {
      title:'sse — 遠端 HTTP Server',
      lines:[
        { indent:0, key:'"mcpServers":', val:'', color:'' },
        { indent:1, key:'"myApi":', val:'', color:'' },
        { indent:2, key:'"type":', val:'"sse",', color:'#5c8aff' },
        { indent:2, key:'"url":', val:'"https://api.example.com/mcp",', color:'#5c8aff' },
        { indent:2, key:'"headers":', val:'{ "X-API-Key": "..." }', color:'#5c8aff' },
      ],
      note:'適合遠端服務，支援 OAuth 2.0 身份驗證'
    },
    {
      title:'headersHelper — 動態 Token',
      lines:[
        { indent:2, key:'"headersHelper":', val:'"./scripts/get-token.sh",', color:'#ff8c42' },
        { indent:0, key:'', val:'', comment:'// 腳本輸出 JSON: {"Authorization": "Bearer ..."}' },
      ],
      note:'每次連線前執行 Shell 腳本動態取得認證 Token'
    },
  ];
}
