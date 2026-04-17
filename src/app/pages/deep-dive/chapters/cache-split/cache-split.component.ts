import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cache-split',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 04</span>
      <h1>System Prompt 快取分裂</h1>
      <p>三塊快取結構（工具定義 1h / 系統上下文 5m / 用戶上下文無快取）精確控制 API 費用。cache_control: ephemeral 標記決定各段落的 TTL，命中快取可節省 90% Token 費用。</p>
      <div class="hero-tags">
        <span class="htag">claude.ts</span>
        <span class="htag">promptCacheBreakDetection.ts</span>
        <span class="htag">TTL 1h / 5m</span>
        <span class="htag">節省 90% Token</span>
      </div>
    </div>

      <!-- Architecture Diagram -->
      <section class="ch-section">
        <h2>三塊快取架構</h2>
        <div class="diagram-box">
          <svg viewBox="0 0 800 360" class="arch-svg">
            <rect width="800" height="360" fill="#0d1117" rx="12"/>
            <text x="400" y="28" text-anchor="middle" fill="#7c5cfc" font-size="13" font-weight="700" font-family="monospace">Prompt Cache Layout — claude.ts</text>

            <!-- Block 1: Tool Definitions -->
            <rect x="60" y="60" width="680" height="70" rx="8" fill="rgba(255,209,102,0.08)" stroke="rgba(255,209,102,0.5)" stroke-width="2"/>
            <rect x="60" y="60" width="8" height="70" rx="4" fill="#ffd166"/>
            <text x="90" y="86" fill="#ffd166" font-size="11" font-weight="700">Block 1: Tool Definitions</text>
            <text x="90" y="104" fill="#b8c8e0" font-size="9.5">40+ 工具 JSON Schema 序列化 · 約 30K tokens · 變更頻率極低</text>
            <text x="90" y="118" fill="#b8c8e0" font-size="9">cache_control: &#123; type: "ephemeral" &#125; → TTL 1 hour · 快取命中率最高</text>
            <text x="660" y="98" fill="#ffd166" font-size="10" font-weight="700" text-anchor="end">TTL: 1h</text>

            <!-- Block 2: System Context -->
            <rect x="60" y="148" width="680" height="70" rx="8" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.5)" stroke-width="2"/>
            <rect x="60" y="148" width="8" height="70" rx="4" fill="#00d4aa"/>
            <text x="90" y="174" fill="#00d4aa" font-size="11" font-weight="700">Block 2: System Prompt Context</text>
            <text x="90" y="192" fill="#b8c8e0" font-size="9.5">CLAUDE.md 内容 + 系統指令 + 環境變量 · 每次對話首次呼叫建立快取</text>
            <text x="90" y="206" fill="#b8c8e0" font-size="9">cache_control: &#123; type: "ephemeral" &#125; → TTL 5 minutes · 對話期間穩定命中</text>
            <text x="660" y="186" fill="#00d4aa" font-size="10" font-weight="700" text-anchor="end">TTL: 5m</text>

            <!-- Block 3: User Context -->
            <rect x="60" y="236" width="680" height="70" rx="8" fill="rgba(255,77,109,0.08)" stroke="rgba(255,77,109,0.4)" stroke-width="1.5" stroke-dasharray="6,3"/>
            <rect x="60" y="236" width="8" height="70" rx="4" fill="#ff4d6d"/>
            <text x="90" y="262" fill="#ff4d6d" font-size="11" font-weight="700">Block 3: Conversation History</text>
            <text x="90" y="280" fill="#b8c8e0" font-size="9.5">用戶訊息 + 工具結果 · 每個 Turn 追加新訊息 · 快速變更</text>
            <text x="90" y="294" fill="#b8c8e0" font-size="9">不加 cache_control · 無 TTL · 每次呼叫重新計算 Token</text>
            <text x="660" y="274" fill="#ff4d6d" font-size="10" font-weight="700" text-anchor="end">No Cache</text>

            <!-- Labels -->
            <text x="740" y="95" fill="#ffd166" font-size="8" text-anchor="middle" font-weight="700">STATIC</text>
            <text x="740" y="183" fill="#00d4aa" font-size="8" text-anchor="middle" font-weight="700">SEMI-STATIC</text>
            <text x="740" y="271" fill="#ff4d6d" font-size="8" text-anchor="middle" font-weight="700">DYNAMIC</text>

            <!-- Arrow indicating growth -->
            <text x="400" y="338" text-anchor="middle" fill="#b8c8e0" font-size="9">↑ 快取穩定性 (Block 1 最穩定，Block 3 最動態)</text>
          </svg>
        </div>
      </section>

      <!-- Prompt 分割策略 -->
      <section class="ch-section">
        <h2>Prompt 緩存分割策略</h2>
        <p class="section-lead">系統提示以 <code>SYSTEM_PROMPT_DYNAMIC_BOUNDARY</code> 為界切成兩段，靜態段跨會話共享快取，動態段每輪重算不快取。</p>

        <div class="split-diagram">
          <div class="sd-static">
            <div class="sd-header">
              <span class="sd-lock">🔒</span>
              <span class="sd-title">靜態段</span>
              <code class="sd-scope">cacheScope: global</code>
              <span class="sd-badge sd-badge--green">不同會話共享緩存</span>
            </div>
            <div class="sd-pills">
              <div class="sd-pill">Identity <span>身份聲明</span></div>
              <div class="sd-pill">Tool Rules <span>工具指南</span></div>
              <div class="sd-pill">Code Style <span>編碼哲學</span></div>
            </div>
          </div>

          <div class="sd-boundary">
            <div class="sd-boundary-line">SYSTEM_PROMPT_DYNAMIC_BOUNDARY</div>
          </div>

          <div class="sd-dynamic">
            <div class="sd-header">
              <span class="sd-lock">🔄</span>
              <span class="sd-title">動態段</span>
              <code class="sd-scope">每輪重算・不緩存</code>
            </div>
            <div class="sd-pills sd-pills--dynamic">
              <div class="sd-pill">Memory <span>記憶內容</span></div>
              <div class="sd-pill">MCP <span>MCP 指令</span></div>
              <div class="sd-pill">Env Info <span>環境信息</span></div>
            </div>
          </div>
        </div>

        <div class="cost-comparison">
          <div class="cc-title">緩存命中的成本優勢</div>
          <div class="cc-row">
            <div class="cc-label">無緩存</div>
            <div class="cc-bar cc-bar--full"><span class="cc-bar-fill cc-bar-fill--bad"></span><span class="cc-bar-text">全量傳輸・高成本</span></div>
          </div>
          <div class="cc-row">
            <div class="cc-label">有緩存</div>
            <div class="cc-bar">
              <span class="cc-bar-fill cc-bar-fill--good"></span>
              <span class="cc-saving">↓ 85%+ 成本節省</span>
            </div>
          </div>
          <div class="cc-note">精確切割靜態 / 動態內容 → 最大化緩存命中率<br><span class="cc-sub">對自家 API 能力的深度利用</span></div>
        </div>
      </section>

      <!-- Cache Economics -->
      <section class="ch-section">
        <h2>快取經濟學</h2>
        <div class="econ-grid">
          <div class="econ-card">
            <div class="econ-icon">💰</div>
            <h3>成本節省</h3>
            <p>Anthropic Prompt Cache 對命中的 Token 收費約為原始 Token 的 10%。工具定義約 30K tokens，每個 Turn 節省約 <strong>27K token 費用</strong>。</p>
          </div>
          <div class="econ-card">
            <div class="econ-icon">⚡</div>
            <h3>首次 Turn 建立快取</h3>
            <p>首次 API 呼叫時 Block 1/2 建立快取，後續呼叫命中快取。<code>promptCacheBreakDetection.ts</code> 偵測快取是否失效，必要時主動刷新。</p>
          </div>
          <div class="econ-card">
            <div class="econ-icon">🔄</div>
            <h3>cache_edits API</h3>
            <p>Microcompact 的 Cached MC 路徑使用 <code>cache_edits</code> API，對已快取的系統提示進行差量更新，無需重新傳送整個 Block 2，進一步降低成本。</p>
          </div>
        </div>
      </section>

      <!-- Source Table -->
      <section class="ch-section">
        <h2>原始碼位置</h2>
        <div class="src-table-wrap">
          <table class="src-table">
            <thead><tr><th>檔案</th><th>職責</th></tr></thead>
            <tbody>
              <tr><td><code>claude.ts</code></td><td>streamQuery()、cache_control 塊插入邏輯</td></tr>
              <tr><td><code>promptCacheBreakDetection.ts</code></td><td>快取失效偵測、刷新觸發</td></tr>
              <tr><td><code>buildSystemPrompt.ts</code></td><td>Block 1/2 組裝、cache_control 標記</td></tr>
              <tr><td><code>microCompact.ts</code></td><td>cache_edits API 使用（Cached MC 路徑）</td></tr>
            </tbody>
          </table>
        </div>
      </section>
  `,
  styles: [`
    :host { display: block; }
    .chapter-hero {
      padding:48px 40px 40px; border-bottom:1px solid var(--border-color);
      background:radial-gradient(ellipse 70% 50% at 30% 50%, rgba(255,209,102,.08) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#ffd166; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#ffd166,#ff8c42); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(255,209,102,.1); border:1px solid rgba(255,209,102,.25); color:#ffd166; padding:3px 10px; border-radius:4px; }
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .ch-section h2 { font-size:1.3rem; font-weight:800; margin-bottom:24px; }

    .diagram-box { background: #0d1117; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 4px; overflow: hidden; }
    .arch-svg { width: 100%; height: auto; display: block; }

    .econ-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
    .econ-card {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px;
      .econ-icon { font-size: 1.6rem; margin-bottom: 12px; }
      h3 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
      p { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.7; }
      code { font-family: var(--font-mono); font-size: 0.82em; color: #ffd166; background: rgba(255,209,102,0.08); padding: 1px 5px; border-radius: 3px; }
      strong { color: var(--text-primary); }
    }

    .src-table-wrap { overflow-x: auto; }
    .src-table { width: 100%; border-collapse: collapse; font-size: 0.85rem;
      thead tr { background: rgba(255,209,102,0.08); }
      th { padding: 10px 16px; text-align: left; font-weight: 700; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
      td { padding: 10px 16px; color: var(--text-secondary); border-bottom: 1px solid rgba(255,255,255,0.04); }
      tr:hover td { background: rgba(255,255,255,0.02); }
      code { font-family: var(--font-mono); font-size: 0.82em; color: #ffd166; }
    }

    @media (max-width: 640px) {
      .chapter-hero, .ch-section { padding-left: 20px; padding-right: 20px; }
    }

    .section-lead { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px; code { font-family: var(--font-mono); font-size: 0.85em; color: var(--accent-secondary); background: rgba(92,138,255,.1); padding: 1px 5px; border-radius: 3px; } }

    /* ── Prompt Split Diagram ── */
    .split-diagram { border: 1px solid var(--border-color); border-radius: 14px; overflow: hidden; margin-bottom: 24px; }
    .sd-static  { background: linear-gradient(135deg,rgba(0,212,170,.06),var(--bg-card)); padding: 20px 24px; border-bottom: none; }
    .sd-dynamic { background: linear-gradient(135deg,rgba(255,140,66,.04),var(--bg-card)); padding: 20px 24px; }
    .sd-header  { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
    .sd-lock    { font-size: 1rem; }
    .sd-title   { font-size: 0.95rem; font-weight: 800; color: var(--text-primary); }
    .sd-scope   { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); background: rgba(255,255,255,.04); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: 4px; }
    .sd-badge   { font-size: 0.7rem; font-weight: 700; padding: 2px 10px; border-radius: 100px; margin-left: auto; }
    .sd-badge--green { background: rgba(0,212,170,.12); color: #00d4aa; border: 1px solid rgba(0,212,170,.3); }
    .sd-pills   { display: flex; flex-wrap: wrap; gap: 10px; }
    .sd-pill    { background: rgba(0,212,170,.1); border: 1px solid rgba(0,212,170,.3); border-radius: 8px; padding: 7px 14px; font-size: 0.8rem; font-weight: 700; color: #00d4aa; span { font-weight: 400; color: var(--text-secondary); margin-left: 6px; } }
    .sd-pills--dynamic .sd-pill { background: rgba(255,140,66,.1); border-color: rgba(255,140,66,.3); color: #ff8c42; }
    .sd-boundary { background: #0d1117; display: flex; justify-content: center; align-items: center; padding: 10px; }
    .sd-boundary-line { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: #ff4d6d; background: rgba(255,77,109,.12); border: 1px solid rgba(255,77,109,.4); padding: 6px 20px; border-radius: 4px; letter-spacing: .04em; }

    /* ── Cost Comparison ── */
    .cost-comparison { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; }
    .cc-title { font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 18px; }
    .cc-row { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
    .cc-label { font-size: 0.8rem; color: var(--text-muted); min-width: 52px; }
    .cc-bar { flex: 1; height: 36px; background: rgba(255,255,255,.04); border-radius: 6px; overflow: hidden; position: relative; display: flex; align-items: center; }
    .cc-bar--full { }
    .cc-bar-fill { display: block; height: 100%; border-radius: 6px; }
    .cc-bar-fill--bad  { width: 100%; background: linear-gradient(90deg,#ff4d6d,#ff8c42); }
    .cc-bar-fill--good { width: 18%; background: linear-gradient(90deg,#00d4aa,#5c8aff); }
    .cc-bar-text { position: absolute; right: 12px; font-size: 0.75rem; font-weight: 700; color: rgba(255,255,255,.8); }
    .cc-saving { font-size: 0.88rem; font-weight: 800; color: #00d4aa; margin-left: 14px; }
    .cc-note { font-size: 0.82rem; color: var(--text-secondary); text-align: center; margin-top: 16px; line-height: 1.7; border-top: 1px solid var(--border-color); padding-top: 14px; }
    .cc-sub { font-size: 0.78rem; color: var(--accent-secondary); }
  `]
})
export class CacheSplitComponent {}
