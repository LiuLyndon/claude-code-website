import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-concurrency',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 03</span>
      <h1>讀寫分離並發</h1>
      <p>只讀工具（Grep/Glob/Read）並發執行最多 10 個，寫入工具（Write/Edit/Bash）嚴格串行。partitionToolCalls() 在每個 Agent Turn 中精確分類，避免競態條件。</p>
      <div class="hero-tags">
        <span class="htag">StreamingToolExecutor.ts</span>
        <span class="htag">partitionToolCalls()</span>
        <span class="htag">並發 max 10</span>
        <span class="htag">競態條件防護</span>
      </div>
    </div>

      <!-- Concurrency Diagram -->
      <section class="ch-section">
        <h2>讀寫分離架構</h2>
        <div class="diagram-box">
          <svg viewBox="0 0 800 360" class="arch-svg">
            <rect width="800" height="360" fill="#0d1117" rx="12"/>
            <text x="400" y="28" text-anchor="middle" fill="#7c5cfc" font-size="13" font-weight="700" font-family="monospace">partitionToolCalls() — StreamingToolExecutor.ts</text>

            <!-- Input: Tool Calls -->
            <rect x="310" y="50" width="180" height="50" rx="8" fill="rgba(124,92,252,0.15)" stroke="rgba(124,92,252,0.5)" stroke-width="1.5"/>
            <text x="400" y="72" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700">API Response</text>
            <text x="400" y="88" text-anchor="middle" fill="#b8c8e0" font-size="9">tool_use blocks (N calls)</text>

            <!-- Partition -->
            <rect x="320" y="132" width="160" height="44" rx="8" fill="rgba(255,209,102,0.12)" stroke="rgba(255,209,102,0.4)" stroke-width="1.5"/>
            <text x="400" y="152" text-anchor="middle" fill="#ffd166" font-size="10" font-weight="700">partitionToolCalls()</text>
            <text x="400" y="168" text-anchor="middle" fill="#b8c8e0" font-size="9">tool.isReadOnly() → split</text>

            <line x1="400" y1="100" x2="400" y2="130" stroke="#7c5cfc" stroke-width="1.5"/>
            <defs>
              <marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7c5cfc"/></marker>
              <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#00d4aa"/></marker>
              <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#ff4d6d"/></marker>
            </defs>
            <line x1="400" y1="100" x2="400" y2="132" stroke="#7c5cfc" stroke-width="1.5" marker-end="url(#arr1)"/>

            <!-- Left: Read-only concurrent -->
            <line x1="320" y1="154" x2="170" y2="210" stroke="#00d4aa" stroke-width="1.5" marker-end="url(#arr2)"/>
            <rect x="30" y="210" width="280" height="110" rx="8" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.4)" stroke-width="1.5"/>
            <text x="170" y="232" text-anchor="middle" fill="#00d4aa" font-size="10" font-weight="700">Read-Only — Concurrent (max 10)</text>
            <line x1="50" y1="244" x2="290" y2="244" stroke="rgba(0,212,170,0.2)" stroke-width="1" stroke-dasharray="3,2"/>
            <rect x="45" y="254" width="60" height="28" rx="4" fill="rgba(0,212,170,0.12)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
            <text x="75" y="272" text-anchor="middle" fill="#00d4aa" font-size="8.5">Read</text>
            <rect x="115" y="254" width="60" height="28" rx="4" fill="rgba(0,212,170,0.12)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
            <text x="145" y="272" text-anchor="middle" fill="#00d4aa" font-size="8.5">Grep</text>
            <rect x="185" y="254" width="60" height="28" rx="4" fill="rgba(0,212,170,0.12)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
            <text x="215" y="272" text-anchor="middle" fill="#00d4aa" font-size="8.5">Glob</text>
            <rect x="255" y="254" width="50" height="28" rx="4" fill="rgba(0,212,170,0.12)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
            <text x="280" y="272" text-anchor="middle" fill="#00d4aa" font-size="8.5">WebFetch</text>
            <text x="170" y="306" text-anchor="middle" fill="#b8c8e0" font-size="8.5">Promise.all() — parallel execution</text>

            <!-- Right: Write serial -->
            <line x1="480" y1="154" x2="630" y2="210" stroke="#ff4d6d" stroke-width="1.5" marker-end="url(#arr3)"/>
            <rect x="490" y="210" width="280" height="110" rx="8" fill="rgba(255,77,109,0.08)" stroke="rgba(255,77,109,0.4)" stroke-width="1.5"/>
            <text x="630" y="232" text-anchor="middle" fill="#ff4d6d" font-size="10" font-weight="700">Write — Serial (strictly sequential)</text>
            <line x1="510" y1="244" x2="750" y2="244" stroke="rgba(255,77,109,0.2)" stroke-width="1" stroke-dasharray="3,2"/>
            <rect x="510" y="254" width="60" height="28" rx="4" fill="rgba(255,77,109,0.12)" stroke="rgba(255,77,109,0.3)" stroke-width="1"/>
            <text x="540" y="272" text-anchor="middle" fill="#ff4d6d" font-size="8.5">Write</text>
            <rect x="585" y="254" width="60" height="28" rx="4" fill="rgba(255,77,109,0.12)" stroke="rgba(255,77,109,0.3)" stroke-width="1"/>
            <text x="615" y="272" text-anchor="middle" fill="#ff4d6d" font-size="8.5">Edit</text>
            <rect x="660" y="254" width="60" height="28" rx="4" fill="rgba(255,77,109,0.12)" stroke="rgba(255,77,109,0.3)" stroke-width="1"/>
            <text x="690" y="272" text-anchor="middle" fill="#ff4d6d" font-size="8.5">Bash</text>
            <text x="630" y="306" text-anchor="middle" fill="#b8c8e0" font-size="8.5">await one-by-one — no race conditions</text>
          </svg>
        </div>
      </section>

      <!-- Rules -->
      <section class="ch-section">
        <h2>並發規則</h2>
        <div class="rules-grid">
          <div class="rule-card rule-read">
            <h3>只讀工具</h3>
            <div class="tool-list">
              <span>Read</span><span>Grep</span><span>Glob</span><span>WebFetch</span><span>WebSearch</span><span>LS</span>
            </div>
            <p>並發上限 <strong>10 個</strong>，使用 <code>Promise.all()</code>，執行中可互相交錯，不會修改任何檔案系統狀態。</p>
          </div>
          <div class="rule-card rule-write">
            <h3>寫入工具</h3>
            <div class="tool-list write">
              <span>Write</span><span>Edit</span><span>Bash</span><span>Computer</span><span>NotebookEdit</span>
            </div>
            <p>嚴格串行，每個工具完成後才執行下一個，防止多個寫入操作同時修改同一檔案導致競態條件。</p>
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
              <tr><td><code>StreamingToolExecutor.ts</code></td><td>主執行器、並發/串行調度</td></tr>
              <tr><td><code>toolOrchestration.ts</code></td><td>partitionToolCalls() 分類邏輯</td></tr>
              <tr><td><code>tools/*/index.ts</code></td><td>isReadOnly() 各工具實作</td></tr>
            </tbody>
          </table>
        </div>
      </section>
  `,
  styles: [`
    :host { display: block; }
    .chapter-hero {
      padding:48px 40px 40px; border-bottom:1px solid var(--border-color);
      background:radial-gradient(ellipse 70% 50% at 30% 50%, rgba(92,138,255,.08) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#5c8aff; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#5c8aff,#7c5cfc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(92,138,255,.1); border:1px solid rgba(92,138,255,.25); color:#5c8aff; padding:3px 10px; border-radius:4px; }
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .ch-section h2 { font-size:1.3rem; font-weight:800; margin-bottom:24px; }

    .diagram-box { background: #0d1117; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 4px; overflow: hidden; }
    .arch-svg { width: 100%; height: auto; display: block; }

    .rules-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .rule-card {
      background: var(--bg-card); border-radius: var(--radius-md); padding: 24px;
      h3 { font-size: 1rem; font-weight: 800; margin-bottom: 14px; }
      p { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.7; margin-top: 14px; }
      code { font-family: var(--font-mono); font-size: 0.82em; background: rgba(255,255,255,0.06); padding: 1px 5px; border-radius: 3px; }
      strong { color: inherit; }
    }
    .rule-read { border: 1px solid rgba(0,212,170,0.3); h3 { color: #00d4aa; } }
    .rule-write { border: 1px solid rgba(255,77,109,0.3); h3 { color: #ff4d6d; } }
    .tool-list { display: flex; flex-wrap: wrap; gap: 6px; span { font-family: var(--font-mono); font-size: 0.75rem; padding: 3px 10px; border-radius: 4px; } }
    .tool-list:not(.write) span { background: rgba(0,212,170,0.1); border: 1px solid rgba(0,212,170,0.25); color: #00d4aa; }
    .tool-list.write span { background: rgba(255,77,109,0.1); border: 1px solid rgba(255,77,109,0.25); color: #ff4d6d; }

    .src-table-wrap { overflow-x: auto; }
    .src-table { width: 100%; border-collapse: collapse; font-size: 0.85rem;
      thead tr { background: rgba(92,138,255,0.08); }
      th { padding: 10px 16px; text-align: left; font-weight: 700; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
      td { padding: 10px 16px; color: var(--text-secondary); border-bottom: 1px solid rgba(255,255,255,0.04); }
      tr:hover td { background: rgba(255,255,255,0.02); }
      code { font-family: var(--font-mono); font-size: 0.82em; color: var(--accent-secondary); }
    }

    @media (max-width: 640px) {
      .chapter-hero, .ch-section { padding-left: 20px; padding-right: 20px; }
      .rules-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ConcurrencyComponent {}
