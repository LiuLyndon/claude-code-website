import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tool-design',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 02</span>
      <h1>工具設計系統</h1>
      <p>40+ 工具的統一介面設計：Zod Schema 驗證、React UI 渲染、並發元數據、目錄自包含結構。每個工具是一個獨立的 TypeScript 模組，遵循 Tool&lt;I,O&gt; 泛型介面。</p>
      <div class="hero-tags">
        <span class="htag">Tool.ts</span>
        <span class="htag">tools.ts</span>
        <span class="htag">tools/*/</span>
        <span class="htag">Zod Schema</span>
        <span class="htag">40+ 工具</span>
      </div>
    </div>

      <!-- Architecture -->
      <section class="ch-section">
        <h2>工具介面架構</h2>
        <div class="diagram-box">
          <svg viewBox="0 0 800 380" class="arch-svg">
            <rect width="800" height="380" fill="#0d1117" rx="12"/>
            <text x="400" y="30" text-anchor="middle" fill="#7c5cfc" font-size="13" font-weight="700" font-family="monospace">Tool&lt;Input, Output&gt; Interface — tools/Tool.ts</text>

            <!-- Tool Interface Box -->
            <rect x="260" y="50" width="280" height="180" rx="10" fill="rgba(124,92,252,0.1)" stroke="rgba(124,92,252,0.5)" stroke-width="2"/>
            <text x="400" y="74" text-anchor="middle" fill="#7c5cfc" font-size="11" font-weight="700">Tool&lt;I, O&gt; Interface</text>
            <line x1="270" y1="82" x2="530" y2="82" stroke="rgba(124,92,252,0.3)" stroke-width="1"/>
            <text x="280" y="100" fill="#5c8aff" font-size="9.5" font-family="monospace">name: string</text>
            <text x="280" y="116" fill="#5c8aff" font-size="9.5" font-family="monospace">description: string</text>
            <text x="280" y="132" fill="#00d4aa" font-size="9.5" font-family="monospace">inputSchema: ZodSchema&lt;I&gt;</text>
            <text x="280" y="148" fill="#ffd166" font-size="9.5" font-family="monospace">userFacingName(): string</text>
            <text x="280" y="164" fill="#ffd166" font-size="9.5" font-family="monospace">isReadOnly(): boolean</text>
            <text x="280" y="180" fill="#ffd166" font-size="9.5" font-family="monospace">call(input: I): Promise&lt;O&gt;</text>
            <text x="280" y="196" fill="#ff8c42" font-size="9.5" font-family="monospace">renderResultForAssistant(o): string</text>
            <text x="280" y="212" fill="#e879a0" font-size="9.5" font-family="monospace">renderToolUseMessage(i): React.Node</text>

            <!-- 40+ Tools -->
            <rect x="30" y="280" width="100" height="44" rx="6" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
            <text x="80" y="298" text-anchor="middle" fill="#00d4aa" font-size="9" font-weight="700">Read/Write/Edit</text>
            <text x="80" y="312" text-anchor="middle" fill="#b8c8e0" font-size="8">File I/O Tools</text>

            <rect x="150" y="280" width="100" height="44" rx="6" fill="rgba(92,138,255,0.1)" stroke="rgba(92,138,255,0.3)" stroke-width="1"/>
            <text x="200" y="298" text-anchor="middle" fill="#5c8aff" font-size="9" font-weight="700">Glob/Grep</text>
            <text x="200" y="312" text-anchor="middle" fill="#b8c8e0" font-size="8">Search Tools</text>

            <rect x="270" y="280" width="100" height="44" rx="6" fill="rgba(255,140,66,0.1)" stroke="rgba(255,140,66,0.3)" stroke-width="1"/>
            <text x="320" y="298" text-anchor="middle" fill="#ff8c42" font-size="9" font-weight="700">Bash / Computer</text>
            <text x="320" y="312" text-anchor="middle" fill="#b8c8e0" font-size="8">Execution Tools</text>

            <rect x="390" y="280" width="100" height="44" rx="6" fill="rgba(232,121,160,0.1)" stroke="rgba(232,121,160,0.3)" stroke-width="1"/>
            <text x="440" y="298" text-anchor="middle" fill="#e879a0" font-size="9" font-weight="700">WebFetch/Search</text>
            <text x="440" y="312" text-anchor="middle" fill="#b8c8e0" font-size="8">Web Tools</text>

            <rect x="510" y="280" width="100" height="44" rx="6" fill="rgba(255,209,102,0.1)" stroke="rgba(255,209,102,0.3)" stroke-width="1"/>
            <text x="560" y="298" text-anchor="middle" fill="#ffd166" font-size="9" font-weight="700">MCP Tools</text>
            <text x="560" y="312" text-anchor="middle" fill="#b8c8e0" font-size="8">Dynamic / External</text>

            <rect x="630" y="280" width="100" height="44" rx="6" fill="rgba(124,92,252,0.1)" stroke="rgba(124,92,252,0.3)" stroke-width="1"/>
            <text x="680" y="298" text-anchor="middle" fill="#7c5cfc" font-size="9" font-weight="700">Agent/Task</text>
            <text x="680" y="312" text-anchor="middle" fill="#b8c8e0" font-size="8">Sub-Agent Tools</text>

            <!-- Arrow lines down -->
            <line x1="80" y1="278" x2="320" y2="232" stroke="rgba(124,92,252,0.3)" stroke-width="1" stroke-dasharray="3,2"/>
            <line x1="200" y1="278" x2="360" y2="232" stroke="rgba(124,92,252,0.3)" stroke-width="1" stroke-dasharray="3,2"/>
            <line x1="320" y1="278" x2="400" y2="232" stroke="rgba(124,92,252,0.3)" stroke-width="1" stroke-dasharray="3,2"/>
            <line x1="440" y1="278" x2="420" y2="232" stroke="rgba(124,92,252,0.3)" stroke-width="1" stroke-dasharray="3,2"/>
            <line x1="560" y1="278" x2="450" y2="232" stroke="rgba(124,92,252,0.3)" stroke-width="1" stroke-dasharray="3,2"/>
            <line x1="680" y1="278" x2="490" y2="232" stroke="rgba(124,92,252,0.3)" stroke-width="1" stroke-dasharray="3,2"/>

            <!-- Labels -->
            <text x="400" y="260" text-anchor="middle" fill="#b8c8e0" font-size="9">implements Tool&lt;I, O&gt;</text>
          </svg>
        </div>
      </section>

      <!-- Key Concepts -->
      <section class="ch-section">
        <h2>核心設計要點</h2>
        <div class="concepts-grid">
          <div class="concept-card">
            <div class="cc-icon" style="background:rgba(0,212,170,0.12);border-color:rgba(0,212,170,0.3)">📐</div>
            <h3>Zod Schema 驗證</h3>
            <p>每個工具使用 Zod 定義 <code>inputSchema</code>，API 呼叫 Claude 時自動轉換為 JSON Schema。輸入在執行前強制驗證，確保型別安全。</p>
            <div class="code-ref">📁 tools/*/index.ts → inputSchema: z.object(&#123;...&#125;)</div>
          </div>
          <div class="concept-card">
            <div class="cc-icon" style="background:rgba(232,121,160,0.12);border-color:rgba(232,121,160,0.3)">🎨</div>
            <h3>React Ink UI 渲染</h3>
            <p><code>renderToolUseMessage()</code> 返回 React 節點，在 Terminal 中以 Ink 渲染進度、結果預覽。只讀工具展示緊湊摘要，寫入工具展示 diff。</p>
            <div class="code-ref">📁 tools/*/ui.tsx → ToolUseBlock component</div>
          </div>
          <div class="concept-card">
            <div class="cc-icon" style="background:rgba(92,138,255,0.12);border-color:rgba(92,138,255,0.3)">⚡</div>
            <h3>並發元數據</h3>
            <p><code>isReadOnly()</code> 告知調度器此工具是否可並發執行。只讀工具最多 10 個並發；寫入工具必須串行，防止競態條件。</p>
            <div class="code-ref">📁 StreamingToolExecutor.ts → partitionToolCalls()</div>
          </div>
          <div class="concept-card">
            <div class="cc-icon" style="background:rgba(255,140,66,0.12);border-color:rgba(255,140,66,0.3)">📦</div>
            <h3>目錄自包含</h3>
            <p>每個工具獨立存放於 <code>tools/ToolName/</code> 目錄，包含 <code>index.ts</code>（邏輯）、<code>ui.tsx</code>（渲染）、型別定義。新工具只需新增目錄即可接入。</p>
            <div class="code-ref">📁 tools/ → 40+ 子目錄</div>
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
              <tr><td><code>tools/Tool.ts</code></td><td>Tool&lt;I,O&gt; 泛型介面定義</td></tr>
              <tr><td><code>tools/tools.ts</code></td><td>所有工具的統一匯出陣列</td></tr>
              <tr><td><code>tools/*/index.ts</code></td><td>工具邏輯實作、Zod schema、call()</td></tr>
              <tr><td><code>tools/*/ui.tsx</code></td><td>React Ink 渲染組件</td></tr>
              <tr><td><code>StreamingToolExecutor.ts</code></td><td>並發/串行調度執行</td></tr>
            </tbody>
          </table>
        </div>
      </section>
  `,
  styles: [`
    :host { display: block; }
    .chapter-hero {
      padding:48px 40px 40px; border-bottom:1px solid var(--border-color);
      background:radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,212,170,.08) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#00d4aa; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#00d4aa,#5c8aff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(0,212,170,.1); border:1px solid rgba(0,212,170,.25); color:#00d4aa; padding:3px 10px; border-radius:4px; }
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .ch-section h2 { font-size:1.3rem; font-weight:800; margin-bottom:24px; }

    .diagram-box { background: #0d1117; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 4px; overflow: hidden; }
    .arch-svg { width: 100%; height: auto; display: block; }

    .concepts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .concept-card {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px;
      .cc-icon { width: 40px; height: 40px; border: 1px solid; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin-bottom: 12px; }
      h3 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
      p { font-size: 0.83rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 10px; }
      .code-ref { font-family: var(--font-mono); font-size: 0.73rem; color: var(--text-muted); background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 4px 10px; border-radius: 4px; display: inline-block; }
      code { font-family: var(--font-mono); font-size: 0.82em; color: var(--accent-secondary); background: rgba(92,138,255,0.1); padding: 1px 5px; border-radius: 3px; }
    }

    .src-table-wrap { overflow-x: auto; }
    .src-table { width: 100%; border-collapse: collapse; font-size: 0.85rem;
      thead tr { background: rgba(0,212,170,0.08); }
      th { padding: 10px 16px; text-align: left; font-weight: 700; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
      td { padding: 10px 16px; color: var(--text-secondary); border-bottom: 1px solid rgba(255,255,255,0.04); }
      tr:hover td { background: rgba(255,255,255,0.02); }
      code { font-family: var(--font-mono); font-size: 0.82em; color: var(--accent-secondary); }
    }

    @media (max-width: 640px) {
      .chapter-hero, .ch-section { padding-left: 20px; padding-right: 20px; }
    }
  `]
})
export class ToolDesignComponent {}
