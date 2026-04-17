import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deep-dive',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-tag">深度解析</span>
        <h1>Claude Code 八大核心機制</h1>
        <p>架構圖 · 流程圖 · 對應程式碼位置 — 徹底揭秘 Claude Code 底層運作原理</p>
        <div class="toc">
          <a class="toc-item" *ngFor="let s of sections" [href]="'#section-' + s.id">
            <span class="toc-num">{{ s.num }}</span>
            <span>{{ s.title }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Section Loop -->
    <div *ngFor="let s of sections; let odd = odd">
      <section class="section deep-section" [id]="'section-' + s.id" [class.alt]="odd">
        <div class="container">
          <div class="section-label">
            <span class="section-num">{{ s.num }}</span>
            <span class="section-tag-inline" [style.color]="s.color" [style.border-color]="s.color + '44'" [style.background]="s.color + '11'">{{ s.category }}</span>
          </div>
          <h2 class="section-title" [style.color]="s.color">{{ s.title }}</h2>
          <p class="section-summary">{{ s.summary }}</p>

          <div class="section-layout">
            <!-- Diagram -->
            <div class="diagram-area">
              <div class="diagram-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                {{ s.diagramTitle }}
              </div>
              <div class="diagram-box" [innerHTML]="s.diagram"></div>
            </div>

            <!-- Flow -->
            <div class="flow-area">
              <div class="diagram-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {{ s.flowTitle }}
              </div>
              <div class="flow-steps-list">
                <div class="flow-step-item" *ngFor="let step of s.flowSteps; let last = last; let i = index">
                  <div class="fsi-icon" [style.background]="s.color + '22'" [style.color]="s.color" [style.border-color]="s.color + '44'">{{ step.icon }}</div>
                  <div class="fsi-content">
                    <strong>{{ step.name }}</strong>
                    <span>{{ step.desc }}</span>
                    <code *ngIf="step.code">{{ step.code }}</code>
                  </div>
                  <div class="fsi-arrow" *ngIf="!last" [style.color]="s.color">↓</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Code Locations -->
          <div class="code-locations">
            <div class="code-loc-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              對應程式碼位置
            </div>
            <div class="code-loc-grid">
              <div class="code-loc-item" *ngFor="let loc of s.codeLocations">
                <div class="loc-file">
                  <span class="loc-icon">📄</span>
                  <code class="loc-path">{{ loc.file }}</code>
                </div>
                <div class="loc-fn" *ngIf="loc.fn">
                  <span class="loc-fn-label">關鍵函數：</span>
                  <code class="loc-fn-name">{{ loc.fn }}</code>
                </div>
                <p class="loc-desc">{{ loc.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Key Insights -->
          <div class="key-insights">
            <div class="insight-item" *ngFor="let insight of s.insights">
              <div class="insight-icon" [style.color]="s.color">{{ insight.icon }}</div>
              <div>
                <strong>{{ insight.title }}</strong>
                <span>{{ insight.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    /* ===== Page Hero ===== */
    .page-hero {
      padding: 140px 0 60px;
      background: var(--bg-secondary);
      text-align: center;
      border-bottom: 1px solid var(--border-color);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(rgba(124,92,252,0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(124,92,252,0.04) 1px, transparent 1px);
        background-size: 40px 40px;
      }

      .section-tag { display: inline-block; margin-bottom: 20px; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent-primary); background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.3); padding: 6px 16px; border-radius: 100px; position: relative; }

      h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; margin-bottom: 16px; background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; position: relative; }
      p { font-size: 1.05rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 40px; position: relative; }
    }

    .toc {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      max-width: 900px;
      margin: 0 auto;
      position: relative;
    }

    .toc-item {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 8px 14px;
      text-decoration: none;
      color: var(--text-secondary);
      font-size: 0.82rem;
      font-weight: 500;
      transition: all 0.2s;

      &:hover { border-color: var(--accent-primary); color: var(--accent-primary); background: rgba(124,92,252,0.08); }

      .toc-num {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        font-weight: 700;
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }

    /* ===== Deep Section ===== */
    .deep-section {
      padding: 80px 0;
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-color);

      &.alt { background: var(--bg-secondary); }
    }

    .section-label {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;

      .section-num {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--text-muted);
      }

      .section-tag-inline {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 4px 12px;
        border-radius: 100px;
        border: 1px solid;
      }
    }

    .section-title {
      font-size: clamp(1.6rem, 3vw, 2.4rem);
      font-weight: 900;
      margin-bottom: 14px;
      letter-spacing: -0.02em;
    }

    .section-summary {
      font-size: 1rem;
      color: var(--text-secondary);
      max-width: 800px;
      margin-bottom: 48px;
      line-height: 1.8;
    }

    /* ===== Section Layout ===== */
    .section-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      margin-bottom: 48px;
    }

    .diagram-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-secondary);
      margin-bottom: 16px;

      svg { color: var(--accent-primary); }
    }

    /* ===== Diagram Box ===== */
    .diagram-area { }

    .diagram-box {
      background: var(--bg-code);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px;
      overflow-x: auto;
    }

    /* ===== Flow Steps ===== */
    .flow-area { }

    .flow-steps-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .fsi-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .flow-step-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      position: relative;
    }

    .fsi-content {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      flex: 1;
      margin-bottom: 4px;

      strong { display: block; font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
      span { display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px; }
      code { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 2px 7px; border-radius: 3px; }
    }

    .fsi-arrow {
      position: absolute;
      left: 10px;
      bottom: -18px;
      font-size: 1.1rem;
      font-weight: 700;
      z-index: 1;
    }

    /* ===== Code Locations ===== */
    .code-locations {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 28px;
      margin-bottom: 28px;

      .code-loc-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.82rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-secondary);
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--border-color);

        svg { color: var(--accent-primary); }
      }
    }

    .code-loc-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .code-loc-item {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;
      transition: all 0.2s;

      &:hover { border-color: var(--border-accent); }

      .loc-file {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;

        .loc-icon { font-size: 0.9rem; }
        .loc-path { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary); word-break: break-all; }
      }

      .loc-fn {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
        flex-wrap: wrap;

        .loc-fn-label { font-size: 0.72rem; color: var(--text-muted); }
        .loc-fn-name { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 1px 6px; border-radius: 3px; }
      }

      .loc-desc { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; margin: 0; }
    }

    /* ===== Key Insights ===== */
    .key-insights {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .insight-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;

      .insight-icon { font-size: 1.3rem; flex-shrink: 0; }

      strong { display: block; font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
      span { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; }
    }

    /* ===== Diagram SVG Styles (via innerHTML) ===== */
    :host ::ng-deep {
      .dg-svg { width: 100%; height: auto; }
      .dg-box { fill: #131b2e; stroke: #1e2d4a; stroke-width: 1.5; rx: 8; }
      .dg-box-accent { fill: rgba(124,92,252,0.1); stroke: rgba(124,92,252,0.4); stroke-width: 1.5; }
      .dg-box-green { fill: rgba(0,212,170,0.1); stroke: rgba(0,212,170,0.4); stroke-width: 1.5; }
      .dg-box-orange { fill: rgba(255,140,66,0.1); stroke: rgba(255,140,66,0.4); stroke-width: 1.5; }
      .dg-box-red { fill: rgba(255,77,109,0.1); stroke: rgba(255,77,109,0.4); stroke-width: 1.5; }
      .dg-box-blue { fill: rgba(92,138,255,0.1); stroke: rgba(92,138,255,0.4); stroke-width: 1.5; }
      .dg-text { fill: #e8eaf6; font-family: 'JetBrains Mono', monospace; font-size: 11px; }
      .dg-text-sm { fill: #8892b0; font-family: 'JetBrains Mono', monospace; font-size: 9px; }
      .dg-label { fill: #7c5cfc; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; }
      .dg-label-green { fill: #00d4aa; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; }
      .dg-label-orange { fill: #ff8c42; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; }
      .dg-label-red { fill: #ff4d6d; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; }
      .dg-label-blue { fill: #5c8aff; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; }
      .dg-arrow { stroke: #4a5568; stroke-width: 1.5; fill: none; marker-end: url(#arrow); }
      .dg-arrow-accent { stroke: #7c5cfc; stroke-width: 1.5; fill: none; marker-end: url(#arrow-accent); }
      .dg-arrow-green { stroke: #00d4aa; stroke-width: 1.5; fill: none; marker-end: url(#arrow-green); }
    }

    @media (max-width: 1024px) {
      .section-layout { grid-template-columns: 1fr; }
      .code-loc-grid { grid-template-columns: repeat(2, 1fr); }
      .key-insights { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 640px) {
      .toc { gap: 8px; }
      .code-loc-grid { grid-template-columns: 1fr; }
      .key-insights { grid-template-columns: 1fr; }
    }
  `]
})
export class DeepDiveComponent {
  sections = [
    {
      id: 'agent-loop',
      num: '01',
      title: 'Agent 循環',
      category: 'Core Loop',
      color: '#7c5cfc',
      summary: 'Claude Code 的核心驅動引擎：從用戶輸入 → API 呼叫 → 工具執行 → 結果回饋，形成一個完整的自主執行循環。QueryEngine 負責高層協調，query() 負責 API 通信與流式事件處理，兩者共同構成了強大的代理執行能力。',
      diagramTitle: '架構圖：Agent 循環分層',
      diagram: `<svg class="dg-svg" viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#7c5cfc"/></marker>
          <marker id="arr1g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#00d4aa"/></marker>
        </defs>
        <!-- User -->
        <rect x="10" y="10" width="120" height="44" rx="8" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.4)" stroke-width="1.5"/>
        <text x="70" y="28" text-anchor="middle" class="dg-label-green">👤 用戶輸入</text>
        <text x="70" y="44" text-anchor="middle" class="dg-text-sm">Terminal REPL</text>
        <!-- Arrow -->
        <line x1="130" y1="32" x2="160" y2="32" stroke="#00d4aa" stroke-width="1.5" marker-end="url(#arr1g)"/>
        <!-- REPL -->
        <rect x="162" y="10" width="140" height="44" rx="8" fill="rgba(124,92,252,0.1)" stroke="rgba(124,92,252,0.4)" stroke-width="1.5"/>
        <text x="232" y="28" text-anchor="middle" class="dg-label">🖥️ REPL.tsx</text>
        <text x="232" y="44" text-anchor="middle" class="dg-text-sm">useInput() → handleSubmit()</text>
        <!-- Arrow -->
        <line x1="302" y1="32" x2="332" y2="32" stroke="#7c5cfc" stroke-width="1.5" marker-end="url(#arr1)"/>
        <!-- QueryEngine -->
        <rect x="334" y="10" width="176" height="44" rx="8" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.5)" stroke-width="2"/>
        <text x="422" y="28" text-anchor="middle" class="dg-label">🧠 QueryEngine.ts</text>
        <text x="422" y="44" text-anchor="middle" class="dg-text-sm">對話狀態 · 壓縮決策</text>

        <!-- QueryEngine → query() -->
        <line x1="422" y1="54" x2="422" y2="84" stroke="#7c5cfc" stroke-width="1.5" marker-end="url(#arr1)"/>
        <!-- query() -->
        <rect x="334" y="86" width="176" height="44" rx="8" fill="rgba(92,138,255,0.1)" stroke="rgba(92,138,255,0.4)" stroke-width="1.5"/>
        <text x="422" y="104" text-anchor="middle" class="dg-label-blue">⚡ query.ts</text>
        <text x="422" y="120" text-anchor="middle" class="dg-text-sm">API呼叫 · 流式事件處理</text>

        <!-- query → API -->
        <line x1="422" y1="130" x2="422" y2="160" stroke="#5c8aff" stroke-width="1.5" marker-end="url(#arr1)"/>
        <!-- API -->
        <rect x="334" y="162" width="176" height="44" rx="8" fill="rgba(255,77,109,0.1)" stroke="rgba(255,77,109,0.4)" stroke-width="1.5"/>
        <text x="422" y="180" text-anchor="middle" class="dg-label-red">🌐 Claude API</text>
        <text x="422" y="196" text-anchor="middle" class="dg-text-sm">Streaming Response</text>

        <!-- API → Tool Executor (down-left) -->
        <path d="M334 184 Q200 184 200 222" stroke="#ff8c42" stroke-width="1.5" fill="none" marker-end="url(#arr1)"/>
        <!-- Tool Executor -->
        <rect x="50" y="224" width="300" height="44" rx="8" fill="rgba(255,140,66,0.1)" stroke="rgba(255,140,66,0.4)" stroke-width="1.5"/>
        <text x="200" y="242" text-anchor="middle" class="dg-label-orange">🔧 toolOrchestration.ts</text>
        <text x="200" y="258" text-anchor="middle" class="dg-text-sm">runTools() · 讀寫分離並發執行</text>

        <!-- Tool results back to query -->
        <path d="M350 224 Q350 184 334 184" stroke="#00d4aa" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arr1g)"/>
        <text x="368" y="210" class="dg-text-sm" fill="#00d4aa">tool_result</text>

        <!-- Tool types -->
        <rect x="50" y="292" width="86" height="36" rx="6" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
        <text x="93" y="308" text-anchor="middle" class="dg-text-sm" fill="#00d4aa">Read Tools</text>
        <text x="93" y="322" text-anchor="middle" class="dg-text-sm">並發執行</text>
        <rect x="158" y="292" width="86" height="36" rx="6" fill="rgba(255,77,109,0.08)" stroke="rgba(255,77,109,0.3)" stroke-width="1"/>
        <text x="201" y="308" text-anchor="middle" class="dg-text-sm" fill="#ff4d6d">Write Tools</text>
        <text x="201" y="322" text-anchor="middle" class="dg-text-sm">串行執行</text>
        <rect x="264" y="292" width="86" height="36" rx="6" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.3)" stroke-width="1"/>
        <text x="307" y="308" text-anchor="middle" class="dg-text-sm" fill="#7c5cfc">Agent Tool</text>
        <text x="307" y="322" text-anchor="middle" class="dg-text-sm">子代理生成</text>

        <line x1="200" y1="268" x2="93" y2="292" stroke="#4a5568" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="200" y1="268" x2="201" y2="292" stroke="#4a5568" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="200" y1="268" x2="307" y2="292" stroke="#4a5568" stroke-width="1" stroke-dasharray="3,2"/>
      </svg>`,
      flowTitle: '執行流程：一次完整的 Agent Turn',
      flowSteps: [
        { icon: '⌨️', name: '用戶輸入', desc: 'REPL 接收用戶訊息，觸發 handleSubmit()', code: 'REPL.tsx → useInput()' },
        { icon: '🧠', name: 'QueryEngine 協調', desc: 'Token 計數、壓縮判斷、歷史管理', code: 'QueryEngine.ts → run()' },
        { icon: '📡', name: 'API 呼叫', desc: '構建 MessageParam，開啟串流連線', code: 'query.ts → query()' },
        { icon: '🌊', name: '流式事件處理', desc: '處理 text_delta / tool_use / message_stop', code: 'query.ts → processStream()' },
        { icon: '🔧', name: '工具執行', desc: '分類讀寫工具，並發或串行執行', code: 'toolOrchestration.ts → runTools()' },
        { icon: '↩️', name: 'Tool Result 回饋', desc: '將工具結果作為 tool_result 加入歷史', code: 'query.ts → buildToolResult()' },
        { icon: '🔄', name: '下一輪循環', desc: '若有工具結果，繼續下一輪 API 呼叫', code: 'query.ts → while loop' }
      ],
      codeLocations: [
        { file: 'src/query/QueryEngine.ts', fn: 'QueryEngine.run()', desc: '高層協調器（1,320行），管理對話狀態、Token追蹤、壓縮決策、工具執行協調' },
        { file: 'src/query/query.ts', fn: 'query()', desc: '核心 API 查詢函數（1,732行），負責串流呼叫、工具呼叫循環、事件流處理' },
        { file: 'src/services/tools/toolOrchestration.ts', fn: 'runTools()', desc: '工具執行協調器，實現讀寫分離的並發執行策略' },
        { file: 'src/screens/REPL.tsx', fn: 'handleSubmit()', desc: '主要交互界面（5000+行），處理用戶輸入與訊息渲染' },
        { file: 'src/services/api/claude.ts', fn: 'buildMessageParams()', desc: 'API 請求參數構建（126KB），包含系統提示、快取控制、工具定義' },
        { file: 'src/entrypoints/cli.tsx', fn: 'main()', desc: 'CLI 入口，Commander.js 定義，啟動 React/Ink 渲染' }
      ],
      insights: [
        { icon: '🔁', title: '無限循環直到完成', desc: '只要 Claude 返回 tool_use 事件，Agent 循環就繼續；直到純文字回應才結束。' },
        { icon: '⚡', title: '事件驅動架構', desc: '使用 AsyncGenerator 進行流式處理，每個事件類型（text/tool/stop）有獨立處理路徑。' },
        { icon: '🛡️', title: '錯誤容錯機制', desc: '工具執行失敗不中斷循環，錯誤訊息以 tool_result 形式回饋，讓 Claude 自行修正。' }
      ]
    },
    {
      id: 'tool-design',
      num: '02',
      title: '工具設計',
      category: 'Tool System',
      color: '#00d4aa',
      summary: '40+ 工具遵循統一的介面設計：Zod Schema 輸入驗證、React 組件渲染輸出、並發安全元數據、獨立目錄結構。工具設計採用「宣告式定義 + 命令式執行」的分離模式，確保 AI 能夠準確理解每個工具的能力邊界。',
      diagramTitle: '架構圖：工具設計模式',
      diagram: `<svg class="dg-svg" viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#00d4aa"/></marker>
        </defs>
        <!-- Tool Interface -->
        <rect x="160" y="10" width="200" height="120" rx="10" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.5)" stroke-width="2"/>
        <text x="260" y="30" text-anchor="middle" class="dg-label-green">Tool Interface</text>
        <text x="260" y="48" text-anchor="middle" class="dg-text-sm">src/Tool.ts</text>
        <text x="175" y="68" class="dg-text-sm" fill="#7c5cfc">name:        string</text>
        <text x="175" y="83" class="dg-text-sm" fill="#7c5cfc">description: string</text>
        <text x="175" y="98" class="dg-text-sm" fill="#7c5cfc">inputSchema: ZodSchema</text>
        <text x="175" y="113" class="dg-text-sm" fill="#00d4aa">call():      async fn</text>
        <text x="175" y="128" class="dg-text-sm" fill="#ff8c42">isReadOnly(): bool</text>

        <!-- Tool Registry -->
        <rect x="10" y="170" width="140" height="50" rx="8" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.3)" stroke-width="1.5"/>
        <text x="80" y="191" text-anchor="middle" class="dg-label">📋 tools.ts</text>
        <text x="80" y="208" text-anchor="middle" class="dg-text-sm">工具註冊表</text>
        <text x="80" y="220" text-anchor="middle" class="dg-text-sm">Feature Flag 過濾</text>

        <!-- Zod Validation -->
        <rect x="190" y="170" width="140" height="50" rx="8" fill="rgba(255,209,102,0.08)" stroke="rgba(255,209,102,0.3)" stroke-width="1.5"/>
        <text x="260" y="191" text-anchor="middle" class="dg-label" fill="#ffd166">✅ Zod Schema</text>
        <text x="260" y="208" text-anchor="middle" class="dg-text-sm">輸入類型驗證</text>
        <text x="260" y="220" text-anchor="middle" class="dg-text-sm">運行時安全保護</text>

        <!-- React UI -->
        <rect x="370" y="170" width="140" height="50" rx="8" fill="rgba(92,138,255,0.08)" stroke="rgba(92,138,255,0.3)" stroke-width="1.5"/>
        <text x="440" y="191" text-anchor="middle" class="dg-label-blue">⚛️ UI.tsx</text>
        <text x="440" y="208" text-anchor="middle" class="dg-text-sm">結果渲染組件</text>
        <text x="440" y="220" text-anchor="middle" class="dg-text-sm">Ink 終端渲染</text>

        <!-- Arrows from interface -->
        <line x1="200" y1="130" x2="80" y2="170" stroke="#4a5568" stroke-width="1.5" stroke-dasharray="4,2"/>
        <line x1="260" y1="130" x2="260" y2="170" stroke="#ffd166" stroke-width="1.5" stroke-dasharray="4,2"/>
        <line x1="320" y1="130" x2="440" y2="170" stroke="#5c8aff" stroke-width="1.5" stroke-dasharray="4,2"/>

        <!-- Tool directory examples -->
        <text x="10" y="252" class="dg-text-sm" fill="#4a5568">── tools/</text>
        <text x="10" y="268" class="dg-text-sm" fill="#00d4aa">  ├── BashTool/</text>
        <text x="10" y="283" class="dg-text-sm" fill="#00d4aa">  ├── FileReadTool/</text>
        <text x="10" y="298" class="dg-text-sm" fill="#00d4aa">  ├── GrepTool/</text>
        <text x="150" y="252" class="dg-text-sm" fill="#4a5568">── per tool:</text>
        <text x="150" y="268" class="dg-text-sm" fill="#7c5cfc">  BashTool.ts</text>
        <text x="150" y="283" class="dg-text-sm" fill="#5c8aff">  UI.tsx</text>
        <text x="150" y="298" class="dg-text-sm" fill="#ffd166">  prompt.ts</text>
        <text x="300" y="252" class="dg-text-sm" fill="#4a5568">── 元數據:</text>
        <text x="300" y="268" class="dg-text-sm" fill="#ff8c42">  isReadOnly()</text>
        <text x="300" y="283" class="dg-text-sm" fill="#ff8c42">  isConcurrencySafe()</text>
        <text x="300" y="298" class="dg-text-sm" fill="#ff4d6d">  needsPermission()</text>
      </svg>`,
      flowTitle: '工具執行流程',
      flowSteps: [
        { icon: '🤖', name: 'Claude 發起工具呼叫', desc: 'API 流式回應中包含 tool_use 事件', code: 'event.type === "tool_use"' },
        { icon: '🔍', name: '工具查找', desc: '從 toolRegistry 按 name 查找對應工具', code: 'findToolByName(name)' },
        { icon: '✅', name: 'Schema 驗證', desc: 'Zod.parse() 驗證輸入參數類型', code: 'tool.inputSchema.parse(input)' },
        { icon: '🔒', name: '權限檢查', desc: 'YOLO 分類器或 Settings 規則決定是否執行', code: 'checkPermission(tool, input)' },
        { icon: '⚡', name: '工具執行', desc: '呼叫 tool.call(input)，等待非同步結果', code: 'await tool.call(input)' },
        { icon: '🖥️', name: '結果渲染', desc: 'React UI 組件渲染工具輸出到終端', code: '<ToolUI result={result} />' }
      ],
      codeLocations: [
        { file: 'src/Tool.ts', fn: 'Tool interface', desc: '工具統一介面定義：name、description、inputSchema、call()、isReadOnly()、isConcurrencySafe()' },
        { file: 'src/tools.ts', fn: 'getTools()', desc: '工具註冊表，根據 Feature Flag 條件載入工具集合' },
        { file: 'src/tools/BashTool/BashTool.ts', fn: 'BashTool.call()', desc: 'Bash 工具實現，包含安全檢查、超時控制、後台執行支援' },
        { file: 'src/tools/GrepTool/GrepTool.ts', fn: 'GrepTool.call()', desc: 'Grep 工具，基於 ripgrep，支援 content/files/count 三種輸出模式' },
        { file: 'src/tools/FileReadTool/FileReadTool.ts', fn: 'FileReadTool.call()', desc: '文件讀取工具，支援圖片、PDF、Jupyter Notebook 的智能處理' },
        { file: 'src/tools/AgentTool/AgentTool.ts', fn: 'AgentTool.call()', desc: '子代理工具，生成新的 Agent 實例執行獨立任務' }
      ],
      insights: [
        { icon: '📦', title: '目錄自包含', desc: '每個工具一個目錄，包含邏輯、渲染、提示詞，職責清晰。' },
        { icon: '🎯', title: 'Zod Schema 雙重保障', desc: '同時提供 TypeScript 類型推導和運行時參數驗證，防止 AI 生成錯誤參數。' },
        { icon: '🏷️', title: '並發安全元數據', desc: 'isReadOnly() 和 isConcurrencySafe() 讓調度器自動決定並發策略。' }
      ]
    },
    {
      id: 'concurrency',
      num: '03',
      title: '讀寫分離的工具並發',
      category: 'Concurrency',
      color: '#5c8aff',
      summary: '當 Claude 在一次回應中要求執行多個工具時，Claude Code 智能地將工具分類：只讀工具（Grep/Glob/Read）可並發執行，最多同時 10 個；寫入工具（Write/Edit/Bash）必須串行執行。這避免了競態條件，同時最大化執行效率。',
      diagramTitle: '架構圖：讀寫分離並發模型',
      diagram: `<svg class="dg-svg" viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#5c8aff"/></marker>
          <marker id="arr3g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#00d4aa"/></marker>
          <marker id="arr3r" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#ff4d6d"/></marker>
        </defs>
        <!-- Incoming tool calls -->
        <rect x="160" y="10" width="200" height="44" rx="8" fill="rgba(92,138,255,0.1)" stroke="rgba(92,138,255,0.4)" stroke-width="1.5"/>
        <text x="260" y="29" text-anchor="middle" class="dg-label-blue">📨 多個工具呼叫</text>
        <text x="260" y="45" text-anchor="middle" class="dg-text-sm">Claude 一次回應的工具清單</text>

        <!-- Partitioner -->
        <line x1="260" y1="54" x2="260" y2="80" stroke="#5c8aff" stroke-width="1.5" marker-end="url(#arr3)"/>
        <rect x="160" y="82" width="200" height="44" rx="8" fill="rgba(92,138,255,0.12)" stroke="rgba(92,138,255,0.5)" stroke-width="2"/>
        <text x="260" y="101" text-anchor="middle" class="dg-label-blue">⚖️ partitionToolCalls()</text>
        <text x="260" y="117" text-anchor="middle" class="dg-text-sm">isConcurrencySafe() 分類</text>

        <!-- Two paths -->
        <line x1="200" y1="126" x2="120" y2="160" stroke="#00d4aa" stroke-width="1.5" marker-end="url(#arr3g)"/>
        <line x1="320" y1="126" x2="400" y2="160" stroke="#ff4d6d" stroke-width="1.5" marker-end="url(#arr3r)"/>

        <!-- Read batch -->
        <rect x="20" y="162" width="200" height="60" rx="8" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.4)" stroke-width="1.5"/>
        <text x="120" y="182" text-anchor="middle" class="dg-label-green">✅ 只讀工具批次</text>
        <text x="120" y="198" text-anchor="middle" class="dg-text-sm">Promise.all() 並發</text>
        <text x="120" y="214" text-anchor="middle" class="dg-text-sm">最多 10 個同時執行</text>

        <!-- Write serial -->
        <rect x="300" y="162" width="200" height="60" rx="8" fill="rgba(255,77,109,0.1)" stroke="rgba(255,77,109,0.4)" stroke-width="1.5"/>
        <text x="400" y="182" text-anchor="middle" class="dg-label-red">✏️ 寫入工具串行</text>
        <text x="400" y="198" text-anchor="middle" class="dg-text-sm">for...of 依序執行</text>
        <text x="400" y="214" text-anchor="middle" class="dg-text-sm">互斥鎖保護</text>

        <!-- Read tools list -->
        <text x="20" y="242" class="dg-text-sm" fill="#00d4aa">Grep · Glob · Read</text>
        <text x="20" y="258" class="dg-text-sm" fill="#00d4aa">WebFetch · WebSearch</text>
        <text x="20" y="274" class="dg-text-sm" fill="#4a5568">env: MAX_CONCURRENCY=10</text>

        <!-- Write tools list -->
        <text x="300" y="242" class="dg-text-sm" fill="#ff4d6d">Bash · Write · Edit</text>
        <text x="300" y="258" class="dg-text-sm" fill="#ff4d6d">MultiEdit · NotebookEdit</text>
        <text x="300" y="274" class="dg-text-sm" fill="#4a5568">one at a time</text>

        <!-- Merge results -->
        <line x1="120" y1="222" x2="120" y2="295" stroke="#4a5568" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="400" y1="222" x2="400" y2="295" stroke="#4a5568" stroke-width="1" stroke-dasharray="3,2"/>
        <text x="260" y="295" text-anchor="middle" class="dg-text-sm" fill="#8892b0">→ 合併所有結果 → 回饋下一輪</text>
      </svg>`,
      flowTitle: '並發調度流程',
      flowSteps: [
        { icon: '📋', name: '工具呼叫列表', desc: 'Claude 在單次回應中請求多個工具', code: 'tool_use events[]' },
        { icon: '⚖️', name: '分類判斷', desc: '依 isConcurrencySafe() 分成兩組', code: 'partitionToolCalls()' },
        { icon: '🟢', name: '只讀批次並發', desc: 'Promise.all() 同時執行，最多 10 個', code: 'CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY' },
        { icon: '🔴', name: '寫入工具串行', desc: '一個接一個執行，防止競態', code: 'for await (const t of writeTools)' },
        { icon: '🔗', name: '結果合併', desc: '收集全部結果，按原始順序排列', code: 'mergeResults()' }
      ],
      codeLocations: [
        { file: 'src/services/tools/StreamingToolExecutor.ts', fn: 'StreamingToolExecutor', desc: '工具並發管理核心，負責讀寫分離的調度邏輯' },
        { file: 'src/services/tools/toolOrchestration.ts', fn: 'partitionToolCalls()', desc: '工具分類函數，按 isConcurrencySafe() 分成並發批次和串行清單' },
        { file: 'src/Tool.ts', fn: 'isConcurrencySafe()', desc: '工具元數據：返回 true 表示可與其他工具並發，false 必須串行' },
        { file: 'src/Tool.ts', fn: 'isReadOnly()', desc: '工具元數據：返回 true 表示不修改文件系統狀態' }
      ],
      insights: [
        { icon: '⚡', title: '並發提升效率', desc: '搜索密集型任務（多個 Grep/Glob）可並發，速度提升數倍。' },
        { icon: '🛡️', title: '串行保護一致性', desc: '寫入操作串行，避免並發寫入導致文件損壞或邏輯錯誤。' },
        { icon: '🎛️', title: '環境變數可調', desc: 'CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY 控制最大並發數，預設 10。' }
      ]
    },
    {
      id: 'cache-split',
      num: '04',
      title: 'System Prompt 的快取分裂',
      category: 'Prompt Cache',
      color: '#ffd166',
      summary: 'Anthropic API 支援 Prompt Caching，但快取的「分裂點」設計至關重要。Claude Code 將 System Prompt 分成多個 cache_control 塊：靜態的工具定義塊、動態的系統上下文塊、每次都變化的用戶上下文塊，精確控制快取命中率，大幅降低 API 費用。',
      diagramTitle: '架構圖：System Prompt 快取結構',
      diagram: `<svg class="dg-svg" viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg">
        <!-- System Prompt column -->
        <rect x="10" y="10" width="220" height="296" rx="10" fill="rgba(255,209,102,0.04)" stroke="rgba(255,209,102,0.2)" stroke-width="1"/>
        <text x="120" y="30" text-anchor="middle" class="dg-label" fill="#ffd166">System Prompt 結構</text>

        <!-- Block 1: Static tools (long cache) -->
        <rect x="20" y="40" width="200" height="60" rx="6" fill="rgba(0,212,170,0.12)" stroke="rgba(0,212,170,0.5)" stroke-width="1.5"/>
        <text x="120" y="58" text-anchor="middle" class="dg-text-sm" fill="#00d4aa">🔧 工具定義塊 (Static)</text>
        <text x="120" y="74" text-anchor="middle" class="dg-text-sm">Tool Schemas / MCP tools</text>
        <text x="120" y="88" text-anchor="middle" class="dg-text-sm" fill="#00d4aa">cache_control: 1h TTL</text>

        <!-- Arrow cache_control -->
        <rect x="270" y="55" width="140" height="34" rx="6" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
        <text x="340" y="71" text-anchor="middle" class="dg-text-sm" fill="#00d4aa">✅ 快取命中率高</text>
        <text x="340" y="84" text-anchor="middle" class="dg-text-sm">工具不常變化</text>
        <line x1="220" y1="70" x2="270" y2="72" stroke="#00d4aa" stroke-width="1" stroke-dasharray="3,2"/>

        <!-- Block 2: System context (medium cache) -->
        <rect x="20" y="116" width="200" height="60" rx="6" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.4)" stroke-width="1.5"/>
        <text x="120" y="134" text-anchor="middle" class="dg-text-sm" fill="#7c5cfc">⚙️ 系統上下文塊</text>
        <text x="120" y="150" text-anchor="middle" class="dg-text-sm">Git info / Env / CLAUDE.md</text>
        <text x="120" y="164" text-anchor="middle" class="dg-text-sm" fill="#7c5cfc">cache_control: 5m TTL</text>

        <rect x="270" y="131" width="140" height="34" rx="6" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.3)" stroke-width="1"/>
        <text x="340" y="147" text-anchor="middle" class="dg-text-sm" fill="#7c5cfc">⚡ 中等命中率</text>
        <text x="340" y="160" text-anchor="middle" class="dg-text-sm">每幾分鐘刷新</text>
        <line x1="220" y1="146" x2="270" y2="148" stroke="#7c5cfc" stroke-width="1" stroke-dasharray="3,2"/>

        <!-- Block 3: Dynamic / no cache -->
        <rect x="20" y="192" width="200" height="60" rx="6" fill="rgba(255,77,109,0.1)" stroke="rgba(255,77,109,0.3)" stroke-width="1.5"/>
        <text x="120" y="210" text-anchor="middle" class="dg-text-sm" fill="#ff4d6d">💬 用戶上下文塊</text>
        <text x="120" y="226" text-anchor="middle" class="dg-text-sm">SessionMemory / 動態提示</text>
        <text x="120" y="242" text-anchor="middle" class="dg-text-sm" fill="#ff4d6d">無快取（每次更新）</text>

        <rect x="270" y="207" width="140" height="34" rx="6" fill="rgba(255,77,109,0.08)" stroke="rgba(255,77,109,0.3)" stroke-width="1"/>
        <text x="340" y="223" text-anchor="middle" class="dg-text-sm" fill="#ff4d6d">❌ 不快取</text>
        <text x="340" y="236" text-anchor="middle" class="dg-text-sm">每輪更新</text>
        <line x1="220" y1="222" x2="270" y2="224" stroke="#ff4d6d" stroke-width="1" stroke-dasharray="3,2"/>

        <!-- Break detection -->
        <rect x="270" y="260" width="240" height="44" rx="6" fill="rgba(255,209,102,0.08)" stroke="rgba(255,209,102,0.3)" stroke-width="1.5"/>
        <text x="390" y="279" text-anchor="middle" class="dg-label" fill="#ffd166">🔍 快取分裂偵測</text>
        <text x="390" y="295" text-anchor="middle" class="dg-text-sm">hash 比對 cache_control 區塊</text>
        <text x="30" y="280" class="dg-text-sm" fill="#ffd166">模型/TTL/Scope</text>
        <text x="30" y="295" class="dg-text-sm" fill="#4a5568">變更→強制快取失效</text>
      </svg>`,
      flowTitle: '快取分裂決策流程',
      flowSteps: [
        { icon: '📝', name: '構建 System Prompt', desc: '組合工具定義 + 系統上下文 + 用戶上下文', code: 'buildSystemPrompt()' },
        { icon: '🏷️', name: '設置 cache_control', desc: '在各塊末尾注入 cache_control 標記', code: 'getCacheControl(scope, ttl)' },
        { icon: '🔍', name: '分裂點偵測', desc: 'hash 計算 cache_control 區塊，偵測快取失效', code: 'promptCacheBreakDetection.ts' },
        { icon: '✅', name: 'API 呼叫帶快取', desc: 'API 請求中攜帶 cache_control 標記', code: 'anthropic.messages.create()' },
        { icon: '📊', name: '快取命中統計', desc: '回應中包含 cache_read_input_tokens', code: 'usage.cache_read_input_tokens' }
      ],
      codeLocations: [
        { file: 'src/services/api/claude.ts', fn: 'getCacheControl()', desc: '返回 cache_control 標記，支援 ephemeral scope 和 5m/1h TTL 配置' },
        { file: 'src/services/api/promptCacheBreakDetection.ts', fn: 'detectCacheBreak()', desc: '追蹤 cache_control 區塊的 hash，偵測模型/TTL/Scope 變更導致的快取失效' },
        { file: 'src/utils/systemPrompt.ts', fn: 'buildSystemPrompt()', desc: '系統提示詞構建，組合各個 cache_control 區塊' },
        { file: 'src/context.ts', fn: 'getSystemContext()', desc: 'memoized 函數，構建帶快取標記的系統上下文（Git/環境/CLAUDE.md）' }
      ],
      insights: [
        { icon: '💰', title: '大幅降低 API 費用', desc: '工具定義塊（1h TTL）在長對話中可節省 90% 以上的輸入 Token 費用。' },
        { icon: '⚡', title: '快取命中加速', desc: '快取命中的 Token 處理速度比普通 Token 快約 2 倍，回應延遲降低。' },
        { icon: '🔄', title: '自動失效偵測', desc: '模型切換、TTL 變更、工具更新時，系統自動偵測並使快取失效，確保一致性。' }
      ]
    },
    {
      id: 'retrieval',
      num: '05',
      title: '內容檢索策略',
      category: 'Retrieval',
      color: '#ff8c42',
      summary: '三種互補的檢索工具構成完整的內容發現策略：Glob 按模式發現文件、Grep 按內容搜索文件、Read 讀取具體內容。FileRead 還針對二進制格式（圖片/PDF/Notebook）提供智能處理，並透過 Token Budget 控制輸出規模。',
      diagramTitle: '架構圖：三路檢索策略',
      diagram: `<svg class="dg-svg" viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr5" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#ff8c42"/></marker>
        </defs>
        <!-- Query Intent -->
        <rect x="160" y="10" width="200" height="44" rx="8" fill="rgba(255,140,66,0.1)" stroke="rgba(255,140,66,0.4)" stroke-width="1.5"/>
        <text x="260" y="29" text-anchor="middle" class="dg-label-orange">🎯 查詢意圖</text>
        <text x="260" y="45" text-anchor="middle" class="dg-text-sm">Claude 決定使用哪種工具</text>

        <!-- Three paths -->
        <line x1="200" y1="54" x2="90" y2="90" stroke="#ff8c42" stroke-width="1.5" marker-end="url(#arr5)"/>
        <line x1="260" y1="54" x2="260" y2="90" stroke="#ff8c42" stroke-width="1.5" marker-end="url(#arr5)"/>
        <line x1="320" y1="54" x2="430" y2="90" stroke="#ff8c42" stroke-width="1.5" marker-end="url(#arr5)"/>

        <!-- Glob -->
        <rect x="20" y="92" width="140" height="70" rx="8" fill="rgba(124,92,252,0.1)" stroke="rgba(124,92,252,0.4)" stroke-width="1.5"/>
        <text x="90" y="112" text-anchor="middle" class="dg-label">📁 Glob</text>
        <text x="90" y="128" text-anchor="middle" class="dg-text-sm">glob 模式匹配</text>
        <text x="90" y="144" text-anchor="middle" class="dg-text-sm">按修改時間排序</text>
        <text x="90" y="158" text-anchor="middle" class="dg-text-sm" fill="#7c5cfc">用途：文件發現</text>

        <!-- Grep -->
        <rect x="190" y="92" width="140" height="70" rx="8" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.4)" stroke-width="1.5"/>
        <text x="260" y="112" text-anchor="middle" class="dg-label-green">🔍 Grep</text>
        <text x="260" y="128" text-anchor="middle" class="dg-text-sm">ripgrep 引擎</text>
        <text x="260" y="144" text-anchor="middle" class="dg-text-sm">正則 + 文件類型</text>
        <text x="260" y="158" text-anchor="middle" class="dg-text-sm" fill="#00d4aa">用途：內容搜索</text>

        <!-- Read -->
        <rect x="360" y="92" width="140" height="70" rx="8" fill="rgba(92,138,255,0.1)" stroke="rgba(92,138,255,0.4)" stroke-width="1.5"/>
        <text x="430" y="112" text-anchor="middle" class="dg-label-blue">📄 FileRead</text>
        <text x="430" y="128" text-anchor="middle" class="dg-text-sm">行範圍切片</text>
        <text x="430" y="144" text-anchor="middle" class="dg-text-sm">Token Budget</text>
        <text x="430" y="158" text-anchor="middle" class="dg-text-sm" fill="#5c8aff">用途：具體讀取</text>

        <!-- Special handling -->
        <rect x="190" y="184" width="140" height="88" rx="8" fill="rgba(255,140,66,0.06)" stroke="rgba(255,140,66,0.2)" stroke-width="1"/>
        <text x="260" y="204" text-anchor="middle" class="dg-text-sm" fill="#ff8c42">智能格式處理</text>
        <text x="210" y="222" class="dg-text-sm" fill="#ffd166">🖼️ 圖片 → 縮放/壓縮</text>
        <text x="210" y="238" class="dg-text-sm" fill="#ffd166">📑 PDF → 頁面提取</text>
        <text x="210" y="254" class="dg-text-sm" fill="#ffd166">📓 Notebook → Cell</text>
        <text x="210" y="270" class="dg-text-sm" fill="#ffd166">🔢 大文件 → 分頁讀取</text>
        <line x1="430" y1="162" x2="330" y2="184" stroke="#4a5568" stroke-width="1" stroke-dasharray="3,2"/>
      </svg>`,
      flowTitle: 'Claude 如何選擇檢索策略',
      flowSteps: [
        { icon: '❓', name: '理解查詢需求', desc: 'Claude 分析：需要找文件？搜索內容？讀具體行？', code: 'Claude reasoning' },
        { icon: '📁', name: 'Glob 文件發現', desc: 'src/**/*.ts 找到所有 TypeScript 文件清單', code: 'GlobTool.call({ pattern })' },
        { icon: '🔍', name: 'Grep 內容定位', desc: '在文件中搜索特定模式，找到精確位置', code: 'GrepTool.call({ pattern, path })' },
        { icon: '📄', name: 'FileRead 精確讀取', desc: '讀取特定行範圍，控制 Token 消耗', code: 'FileReadTool.call({ file_path, offset, limit })' }
      ],
      codeLocations: [
        { file: 'src/tools/GlobTool/GlobTool.ts', fn: 'GlobTool.call()', desc: 'glob 模式匹配，返回按修改時間排序的文件路徑列表' },
        { file: 'src/tools/GrepTool/GrepTool.ts', fn: 'GrepTool.call()', desc: '基於 ripgrep 的內容搜索，支援 content/files_with_matches/count 三種輸出模式' },
        { file: 'src/tools/FileReadTool/FileReadTool.ts', fn: 'FileReadTool.call()', desc: '支援圖片（sharp 縮放）、PDF（頁面提取）、Notebook（cell 映射）的智能讀取' },
        { file: 'src/utils/ripgrep.ts', fn: 'ripGrep()', desc: 'ripgrep 的 Node.js 封裝，支援 glob 過濾、類型過濾、上下文行數' }
      ],
      insights: [
        { icon: '🔗', title: '三工具組合使用', desc: 'Glob → Grep → Read 的組合是最常見的代碼理解模式，層層縮小範圍。' },
        { icon: '⚡', title: 'ripgrep 的效能', desc: 'Grep 底層使用 ripgrep（Rust 實現），大型代碼庫搜索比 grep 快 10 倍以上。' },
        { icon: '💰', title: 'Token Budget 控制', desc: 'FileRead 的 offset/limit 參數讓 Claude 精確讀取所需行數，避免讀入整個大文件。' }
      ]
    },
    {
      id: 'memory',
      num: '06',
      title: '三層記憶架構',
      category: 'Memory',
      color: '#7c5cfc',
      summary: 'Claude Code 的記憶系統分為三個層次：CLAUDE.md（持久化知識庫）、SessionMemory（對話級摘要）、Conversation History（完整消息歷史）。這三層各有不同的生命週期和更新頻率，共同構成了 AI 的「長期記憶」能力。',
      diagramTitle: '架構圖：三層記憶系統',
      diagram: `<svg class="dg-svg" viewBox="0 0 520 310" xmlns="http://www.w3.org/2000/svg">
        <!-- Layer 1: CLAUDE.md -->
        <rect x="10" y="10" width="500" height="80" rx="10" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.5)" stroke-width="2"/>
        <text x="260" y="32" text-anchor="middle" class="dg-label">📄 Layer 1: CLAUDE.md 持久化知識庫</text>
        <text x="260" y="50" text-anchor="middle" class="dg-text-sm">長期存在 · Git 版本控制 · 跨會話共享</text>

        <!-- CLAUDE.md sub-items -->
        <rect x="20" y="58" width="100" height="26" rx="4" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.3)" stroke-width="1"/>
        <text x="70" y="75" text-anchor="middle" class="dg-text-sm" fill="#7c5cfc">Managed</text>
        <rect x="132" y="58" width="100" height="26" rx="4" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.3)" stroke-width="1"/>
        <text x="182" y="75" text-anchor="middle" class="dg-text-sm" fill="#7c5cfc">User (~/.claude)</text>
        <rect x="244" y="58" width="100" height="26" rx="4" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.3)" stroke-width="1"/>
        <text x="294" y="75" text-anchor="middle" class="dg-text-sm" fill="#7c5cfc">Project (./)</text>
        <rect x="356" y="58" width="100" height="26" rx="4" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.3)" stroke-width="1"/>
        <text x="406" y="75" text-anchor="middle" class="dg-text-sm" fill="#7c5cfc">Local (private)</text>

        <!-- Layer 2: Session Memory -->
        <rect x="10" y="106" width="500" height="80" rx="10" fill="rgba(0,212,170,0.06)" stroke="rgba(0,212,170,0.4)" stroke-width="1.5"/>
        <text x="260" y="128" text-anchor="middle" class="dg-label-green">🧠 Layer 2: Session Memory</text>
        <text x="260" y="146" text-anchor="middle" class="dg-text-sm">對話級 · 自動維護 · Fork 子代理更新</text>
        <text x="40" y="166" class="dg-text-sm" fill="#4a5568">~/.claude/projects/{hash}/session-memory.md</text>
        <text x="300" y="166" class="dg-text-sm" fill="#00d4aa">非同步更新 · 不阻塞主循環</text>
        <text x="40" y="180" class="dg-text-sm" fill="#00d4aa">週期性摘要 · 存儲關鍵決策與發現</text>

        <!-- Layer 3: Conversation History -->
        <rect x="10" y="202" width="500" height="80" rx="10" fill="rgba(92,138,255,0.06)" stroke="rgba(92,138,255,0.3)" stroke-width="1.5"/>
        <text x="260" y="224" text-anchor="middle" class="dg-label-blue">💬 Layer 3: Conversation History</text>
        <text x="260" y="242" text-anchor="middle" class="dg-text-sm">會話內 · messages[] 陣列 · Token 受限</text>
        <text x="40" y="262" class="dg-text-sm" fill="#4a5568">User / Assistant / Tool messages</text>
        <text x="300" y="262" class="dg-text-sm" fill="#5c8aff">超限時觸發壓縮</text>
        <text x="40" y="278" class="dg-text-sm" fill="#5c8aff">支援 /resume 恢復歷史</text>

        <!-- Merge to context -->
        <text x="10" y="300" class="dg-text-sm" fill="#4a5568">→ 三層合併注入 System Prompt → 每次 API 呼叫</text>
      </svg>`,
      flowTitle: '記憶載入優先順序',
      flowSteps: [
        { icon: '🔍', name: '發現 CLAUDE.md', desc: '從 Managed → User → Project → Local 依序搜索', code: 'findCLAUDEMD()' },
        { icon: '📖', name: '載入並解析', desc: '支援 @include 指令組合多個記憶文件', code: 'loadMemoryPrompt()' },
        { icon: '🧠', name: '載入 Session Memory', desc: '讀取上次會話的摘要，建立連續性', code: 'SessionMemory.load()' },
        { icon: '💬', name: '組合歷史訊息', desc: '將三層記憶組合進 System Prompt', code: 'buildContext()' },
        { icon: '✏️', name: '非同步更新', desc: 'Fork 子代理週期性更新 Session Memory', code: 'SessionMemory.update()' }
      ],
      codeLocations: [
        { file: 'src/utils/claudemd.ts', fn: 'loadCLAUDEMD()', desc: '發現並載入 CLAUDE.md 文件，支援 Managed/User/Project/Local 四個優先級' },
        { file: 'src/services/SessionMemory/sessionMemory.ts', fn: 'SessionMemory', desc: '會話記憶服務，通過 Fork 子代理非同步更新，不阻塞主循環' },
        { file: 'src/context.ts', fn: 'getUserContext()', desc: '構建用戶上下文：載入記憶文件、設置 cache_control，組合進 System Prompt' },
        { file: 'src/memdir/', fn: 'loadMemoryPrompt()', desc: '記憶目錄管理，支援 @include 指令組合多個記憶文件' }
      ],
      insights: [
        { icon: '📚', title: '知識的持久化', desc: 'CLAUDE.md 讓 AI 的學習成果可以跨會話保留，避免每次重新建立上下文。' },
        { icon: '⚡', title: '非同步更新不阻塞', desc: 'Session Memory 通過 Fork 子代理更新，不影響主循環的響應速度。' },
        { icon: '🎯', title: '@include 組合能力', desc: 'CLAUDE.md 支援 @include 指令，可以模組化組合不同的知識片段。' }
      ]
    },
    {
      id: 'compression',
      num: '07',
      title: '五級上下文壓縮',
      category: 'Compression',
      color: '#ff4d6d',
      summary: '當對話 Token 接近上限時，Claude Code 啟動多級壓縮策略：從最輕量的 Token Budget 控制，到最全面的 AI 摘要重寫。五個層次從輕到重依次升級，在保留最大上下文的前提下，儘量減少 Token 消耗。',
      diagramTitle: '架構圖：五級壓縮策略',
      diagram: `<svg class="dg-svg" viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg">
        <!-- Level indicators -->
        <text x="10" y="25" class="dg-text-sm" fill="#4a5568">Token 使用率 →</text>
        <rect x="10" y="30" width="500" height="12" rx="6" fill="rgba(255,255,255,0.05)" stroke="#1e2d4a" stroke-width="1"/>
        <rect x="10" y="30" width="400" height="12" rx="6" fill="rgba(255,77,109,0.3)"/>
        <text x="420" y="42" class="dg-text-sm" fill="#ff4d6d">80%</text>

        <!-- Level 1: Token Budget -->
        <rect x="10" y="52" width="500" height="44" rx="8" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
        <text x="24" y="70" class="dg-label-green">L1</text>
        <text x="50" y="70" class="dg-text-sm" fill="#e8eaf6">Token Budget 控制</text>
        <text x="50" y="86" class="dg-text-sm">工具輸出 / 文件內容設置最大 Token 限制 · 自動截斷</text>
        <text x="450" y="80" text-anchor="middle" class="dg-text-sm" fill="#00d4aa">零開銷</text>

        <!-- Level 2: Selective Filter -->
        <rect x="10" y="104" width="500" height="44" rx="8" fill="rgba(0,212,170,0.06)" stroke="rgba(0,212,170,0.25)" stroke-width="1"/>
        <text x="24" y="122" class="dg-label-green">L2</text>
        <text x="50" y="122" class="dg-text-sm" fill="#e8eaf6">選擇性訊息過濾</text>
        <text x="50" y="138" class="dg-text-sm">刪除冗餘工具結果 / 重複內容 / 過期上下文</text>
        <text x="450" y="130" text-anchor="middle" class="dg-text-sm" fill="#00d4aa">低開銷</text>

        <!-- Level 3: Micro compact -->
        <rect x="10" y="156" width="500" height="44" rx="8" fill="rgba(255,209,102,0.08)" stroke="rgba(255,209,102,0.3)" stroke-width="1"/>
        <text x="24" y="174" class="dg-label" fill="#ffd166">L3</text>
        <text x="50" y="174" class="dg-text-sm" fill="#e8eaf6">Micro 壓縮（規則式）</text>
        <text x="50" y="190" class="dg-text-sm">基於規則的輕量摘要 · cachedMicrocompact · 速度快</text>
        <text x="450" y="182" text-anchor="middle" class="dg-text-sm" fill="#ffd166">中等</text>

        <!-- Level 4: Cached compact -->
        <rect x="10" y="208" width="500" height="44" rx="8" fill="rgba(255,140,66,0.08)" stroke="rgba(255,140,66,0.3)" stroke-width="1"/>
        <text x="24" y="226" class="dg-label-orange">L4</text>
        <text x="50" y="226" class="dg-text-sm" fill="#e8eaf6">Cache-Aware 壓縮</text>
        <text x="50" y="242" class="dg-text-sm">結合快取位置重組 · cache_edits 刪除 · 保留快取</text>
        <text x="450" y="234" text-anchor="middle" class="dg-text-sm" fill="#ff8c42">較高</text>

        <!-- Level 5: Full AI compact -->
        <rect x="10" y="260" width="500" height="44" rx="8" fill="rgba(255,77,109,0.1)" stroke="rgba(255,77,109,0.4)" stroke-width="1.5"/>
        <text x="24" y="278" class="dg-label-red">L5</text>
        <text x="50" y="278" class="dg-text-sm" fill="#e8eaf6">Full AI 摘要壓縮（/compact）</text>
        <text x="50" y="294" class="dg-text-sm">Fork 子代理重寫歷史 · 深度語義摘要 · 最強保留</text>
        <text x="450" y="286" text-anchor="middle" class="dg-text-sm" fill="#ff4d6d">高</text>
      </svg>`,
      flowTitle: '自動壓縮觸發流程',
      flowSteps: [
        { icon: '📊', name: 'Token 使用量監控', desc: '每次 API 呼叫後統計消耗的 Token 數', code: 'usage.input_tokens' },
        { icon: '⚖️', name: '閾值判斷', desc: '使用率 > 80% 觸發壓縮警告，> 95% 強制壓縮', code: 'autoCompact()' },
        { icon: '🗜️', name: '選擇壓縮策略', desc: '根據使用率決定 L1-L5 哪個層次', code: 'compact.ts → selectStrategy()' },
        { icon: '🤖', name: 'L5: 子代理摘要', desc: 'Fork 子代理以「摘要者」角色重寫歷史', code: 'compact() → buildPostCompactMessages()' },
        { icon: '🔄', name: '重建訊息陣列', desc: '將壓縮後的訊息替換現有歷史，繼續對話', code: 'buildPostCompactMessages()' }
      ],
      codeLocations: [
        { file: 'src/services/compact/compact.ts', fn: 'compact()', desc: '主要壓縮協調器，管理完整的 L5 AI 摘要壓縮流程' },
        { file: 'src/services/compact/autoCompact.ts', fn: 'autoCompact()', desc: '自動壓縮決策邏輯，根據 Token 使用率決定觸發時機和策略' },
        { file: 'src/services/compact/cachedMicrocompact.ts', fn: 'cachedMicrocompact()', desc: 'L3/L4 輕量壓縮，結合快取位置重組，保留快取命中率' },
        { file: 'src/query.ts', fn: 'buildPostCompactMessages()', desc: '壓縮後重建訊息陣列，插入邊界標記，確保上下文連續性' }
      ],
      insights: [
        { icon: '🎯', title: '漸進式壓縮', desc: '從最小開銷到最大效果依序升級，在 Token 成本和上下文保留之間動態平衡。' },
        { icon: '🔄', title: '壓縮不中斷對話', desc: '壓縮在後台執行，插入邊界訊息，對話可無縫繼續。' },
        { icon: '🧠', title: 'L5 語義保留最強', desc: 'AI 摘要理解語義，保留最重要的決策和發現，比規則式壓縮更智能。' }
      ]
    },
    {
      id: 'security',
      num: '08',
      title: '安全審查',
      category: 'Security',
      color: '#ff8c42',
      summary: 'Claude Code 的安全系統採用多層防禦：YOLO 分類器（AI 側查詢評估操作風險）、Settings 規則（顯式允許/拒絕模式）、Bash 安全檢查（破壞性命令偵測）。所有工具執行都必須通過權限驗證，確保 AI 不會執行用戶不期望的危險操作。',
      diagramTitle: '架構圖：多層安全防禦',
      diagram: `<svg class="dg-svg" viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr8" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#ff8c42"/></marker>
          <marker id="arr8r" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#ff4d6d"/></marker>
          <marker id="arr8g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#00d4aa"/></marker>
        </defs>
        <!-- Tool Request -->
        <rect x="160" y="10" width="200" height="40" rx="8" fill="rgba(255,140,66,0.1)" stroke="rgba(255,140,66,0.4)" stroke-width="1.5"/>
        <text x="260" y="26" text-anchor="middle" class="dg-label-orange">🔧 工具呼叫請求</text>
        <text x="260" y="42" text-anchor="middle" class="dg-text-sm">tool_name + input</text>

        <line x1="260" y1="50" x2="260" y2="76" stroke="#ff8c42" stroke-width="1.5" marker-end="url(#arr8)"/>

        <!-- Layer 1: Settings Rules -->
        <rect x="60" y="78" width="400" height="50" rx="8" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.3)" stroke-width="1.5"/>
        <text x="260" y="98" text-anchor="middle" class="dg-label">🛡️ Layer 1: Settings 規則匹配</text>
        <text x="260" y="116" text-anchor="middle" class="dg-text-sm">allow/deny 模式 · shell wildcard · 顯式規則</text>

        <!-- Deny path -->
        <line x1="80" y1="103" x2="20" y2="140" stroke="#ff4d6d" stroke-width="1.5" marker-end="url(#arr8r)"/>
        <rect x="10" y="142" width="60" height="28" rx="6" fill="rgba(255,77,109,0.15)" stroke="rgba(255,77,109,0.4)" stroke-width="1"/>
        <text x="40" y="160" text-anchor="middle" class="dg-text-sm" fill="#ff4d6d">❌ 拒絕</text>

        <!-- Continue to Layer 2 -->
        <line x1="260" y1="128" x2="260" y2="154" stroke="#ff8c42" stroke-width="1.5" marker-end="url(#arr8)"/>

        <!-- Layer 2: YOLO Classifier -->
        <rect x="60" y="156" width="400" height="50" rx="8" fill="rgba(255,209,102,0.08)" stroke="rgba(255,209,102,0.3)" stroke-width="1.5"/>
        <text x="260" y="176" text-anchor="middle" class="dg-label" fill="#ffd166">🧠 Layer 2: YOLO 分類器</text>
        <text x="260" y="193" text-anchor="middle" class="dg-text-sm">側邊 AI 查詢 · 風險預測 · 結果快取</text>

        <!-- Ask path -->
        <line x1="80" y1="181" x2="20" y2="214" stroke="#ffd166" stroke-width="1.5"/>
        <rect x="10" y="216" width="60" height="28" rx="6" fill="rgba(255,209,102,0.12)" stroke="rgba(255,209,102,0.4)" stroke-width="1"/>
        <text x="40" y="234" text-anchor="middle" class="dg-text-sm" fill="#ffd166">⚠️ 確認</text>

        <!-- Continue to Layer 3 -->
        <line x1="260" y1="206" x2="260" y2="232" stroke="#ff8c42" stroke-width="1.5" marker-end="url(#arr8)"/>

        <!-- Layer 3: Bash Security -->
        <rect x="60" y="234" width="400" height="50" rx="8" fill="rgba(255,77,109,0.08)" stroke="rgba(255,77,109,0.25)" stroke-width="1"/>
        <text x="260" y="254" text-anchor="middle" class="dg-label-red">⚠️ Layer 3: Bash 安全掃描</text>
        <text x="260" y="270" text-anchor="middle" class="dg-text-sm">rm -rf · git reset --hard · 破壞性命令偵測</text>

        <!-- Allow -->
        <line x1="440" y1="259" x2="490" y2="259" stroke="#00d4aa" stroke-width="1.5" marker-end="url(#arr8g)"/>
        <rect x="492" y="244" width="18" height="28" rx="4" fill="rgba(0,212,170,0.15)" stroke="rgba(0,212,170,0.4)" stroke-width="1"/>
        <text x="500" y="262" text-anchor="middle" class="dg-text-sm" fill="#00d4aa">✅</text>
      </svg>`,
      flowTitle: '權限審查流程',
      flowSteps: [
        { icon: '📋', name: 'Settings 規則優先', desc: 'allow/deny 模式匹配，顯式規則最高優先', code: 'checkSettingsRules()' },
        { icon: '🧠', name: 'YOLO 分類器', desc: '發起側邊 AI 查詢，預測操作風險（allow/ask/deny）', code: 'YoloClassifier.classify()' },
        { icon: '💾', name: '分類結果快取', desc: '相同工具+輸入的分類結果快取，減少 API 呼叫', code: 'classifier cache' },
        { icon: '⚠️', name: 'Bash 安全掃描', desc: '偵測破壞性命令：rm -rf、git reset --hard 等', code: 'bashSecurity.check()' },
        { icon: '❓', name: '用戶確認介面', desc: '高風險操作彈出確認 UI，用戶決定是否執行', code: 'PermissionRequest UI' },
        { icon: '📝', name: '學習用戶決策', desc: '記錄用戶選擇，改善未來的分類準確率', code: 'updateClassifierHistory()' }
      ],
      codeLocations: [
        { file: 'src/utils/permissions/yoloClassifier.ts', fn: 'YoloClassifier', desc: '側邊 AI 查詢分類器，使用 classifier prompt 預測工具呼叫的風險級別，結果快取' },
        { file: 'src/utils/permissions/permissions.ts', fn: 'checkToolPermission()', desc: '主要權限檢查函數，整合 Settings 規則 + YOLO 分類器的完整決策流程' },
        { file: 'src/tools/BashTool/bashSecurity.ts', fn: 'checkBashSecurity()', desc: 'Bash 命令安全掃描，偵測 rm/git reset/chmod 等破壞性命令' },
        { file: 'src/utils/permissions/PermissionResult.ts', fn: 'PermissionResult', desc: '權限決策結果類型：ask（需確認）/ deny（拒絕）/ allow（允許）' }
      ],
      insights: [
        { icon: '🛡️', title: '縱深防禦', desc: '三層安全機制相互補充：規則快、AI 智能、Bash 專項，全方位覆蓋。' },
        { icon: '🧠', title: 'YOLO 越用越準', desc: '分類器從用戶決策歷史學習，對常用工具的預測準確率持續提升。' },
        { icon: '⚡', title: '快取減少延遲', desc: 'YOLO 分類結果快取，相同操作無需重複 AI 查詢，不影響正常工作流速度。' }
      ]
    }
  ];
}
