import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-retrieval',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 05</span>
      <h1>內容檢索策略</h1>
      <p>Glob → Grep → Read 三路互補：文件發現、ripgrep 內容搜索、Token Budget 精確讀取。Claude Code 不使用向量嵌入或語義搜索，而是依賴高效的文本工具組合。</p>
      <div class="hero-tags">
        <span class="htag">GlobTool.ts</span>
        <span class="htag">GrepTool.ts</span>
        <span class="htag">ripgrep.ts</span>
        <span class="htag">三路互補</span>
        <span class="htag">無向量搜索</span>
      </div>
    </div>

      <!-- Strategy Diagram -->
      <section class="ch-section">
        <h2>三路檢索架構</h2>
        <div class="diagram-box">
          <svg viewBox="0 0 800 340" class="arch-svg">
            <rect width="800" height="340" fill="#0d1117" rx="12"/>
            <text x="400" y="28" text-anchor="middle" fill="#7c5cfc" font-size="13" font-weight="700" font-family="monospace">Retrieval Strategy — Glob + Grep + Read</text>

            <!-- Stage 1: Glob -->
            <rect x="40" y="55" width="210" height="220" rx="10" fill="rgba(255,140,66,0.08)" stroke="rgba(255,140,66,0.4)" stroke-width="1.5"/>
            <text x="145" y="80" text-anchor="middle" fill="#ff8c42" font-size="12" font-weight="800">1. Glob</text>
            <text x="145" y="96" text-anchor="middle" fill="#b8c8e0" font-size="8.5">File Discovery</text>
            <line x1="55" y1="106" x2="235" y2="106" stroke="rgba(255,140,66,0.2)" stroke-width="1"/>
            <text x="145" y="124" text-anchor="middle" fill="#b8c8e0" font-size="9">Pattern: **/*.ts</text>
            <text x="145" y="140" text-anchor="middle" fill="#b8c8e0" font-size="9">glob-stream + fast-glob</text>
            <text x="145" y="156" text-anchor="middle" fill="#b8c8e0" font-size="9">returns: file paths[]</text>
            <rect x="65" y="168" width="160" height="40" rx="6" fill="rgba(255,140,66,0.12)" stroke="rgba(255,140,66,0.25)" stroke-width="1"/>
            <text x="145" y="186" text-anchor="middle" fill="#ff8c42" font-size="9" font-weight="700">Use when:</text>
            <text x="145" y="200" text-anchor="middle" fill="#b8c8e0" font-size="8.5">finding files by name/extension</text>
            <rect x="65" y="218" width="160" height="40" rx="6" fill="rgba(255,140,66,0.06)" stroke="rgba(255,140,66,0.2)" stroke-width="1"/>
            <text x="145" y="236" text-anchor="middle" fill="#b8c8e0" font-size="8.5">GlobTool.ts</text>
            <text x="145" y="250" text-anchor="middle" fill="#b8c8e0" font-size="8.5">tools/Glob/</text>

            <!-- Stage 2: Grep -->
            <rect x="295" y="55" width="210" height="220" rx="10" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.4)" stroke-width="1.5"/>
            <text x="400" y="80" text-anchor="middle" fill="#7c5cfc" font-size="12" font-weight="800">2. Grep</text>
            <text x="400" y="96" text-anchor="middle" fill="#b8c8e0" font-size="8.5">Content Search</text>
            <line x1="310" y1="106" x2="490" y2="106" stroke="rgba(124,92,252,0.2)" stroke-width="1"/>
            <text x="400" y="124" text-anchor="middle" fill="#b8c8e0" font-size="9">ripgrep binary (rg)</text>
            <text x="400" y="140" text-anchor="middle" fill="#b8c8e0" font-size="9">regex + glob filter</text>
            <text x="400" y="156" text-anchor="middle" fill="#b8c8e0" font-size="9">returns: file:line:content</text>
            <rect x="320" y="168" width="160" height="40" rx="6" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.25)" stroke-width="1"/>
            <text x="400" y="186" text-anchor="middle" fill="#7c5cfc" font-size="9" font-weight="700">Use when:</text>
            <text x="400" y="200" text-anchor="middle" fill="#b8c8e0" font-size="8.5">searching for functions/symbols</text>
            <rect x="320" y="218" width="160" height="40" rx="6" fill="rgba(124,92,252,0.06)" stroke="rgba(124,92,252,0.2)" stroke-width="1"/>
            <text x="400" y="236" text-anchor="middle" fill="#b8c8e0" font-size="8.5">GrepTool.ts · ripgrep.ts</text>
            <text x="400" y="250" text-anchor="middle" fill="#b8c8e0" font-size="8.5">tools/Grep/</text>

            <!-- Stage 3: Read -->
            <rect x="550" y="55" width="210" height="220" rx="10" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.4)" stroke-width="1.5"/>
            <text x="655" y="80" text-anchor="middle" fill="#00d4aa" font-size="12" font-weight="800">3. Read</text>
            <text x="655" y="96" text-anchor="middle" fill="#b8c8e0" font-size="8.5">Precise Content</text>
            <line x1="565" y1="106" x2="745" y2="106" stroke="rgba(0,212,170,0.2)" stroke-width="1"/>
            <text x="655" y="124" text-anchor="middle" fill="#b8c8e0" font-size="9">offset + limit lines</text>
            <text x="655" y="140" text-anchor="middle" fill="#b8c8e0" font-size="9">Token Budget control</text>
            <text x="655" y="156" text-anchor="middle" fill="#b8c8e0" font-size="9">returns: line-numbered content</text>
            <rect x="575" y="168" width="160" height="40" rx="6" fill="rgba(0,212,170,0.12)" stroke="rgba(0,212,170,0.25)" stroke-width="1"/>
            <text x="655" y="186" text-anchor="middle" fill="#00d4aa" font-size="9" font-weight="700">Use when:</text>
            <text x="655" y="200" text-anchor="middle" fill="#b8c8e0" font-size="8.5">reading specific file ranges</text>
            <rect x="575" y="218" width="160" height="40" rx="6" fill="rgba(0,212,170,0.06)" stroke="rgba(0,212,170,0.2)" stroke-width="1"/>
            <text x="655" y="236" text-anchor="middle" fill="#b8c8e0" font-size="8.5">ReadTool.ts</text>
            <text x="655" y="250" text-anchor="middle" fill="#b8c8e0" font-size="8.5">tools/Read/</text>

            <!-- Flow arrows -->
            <defs>
              <marker id="ra1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#ff8c42"/></marker>
              <marker id="ra2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7c5cfc"/></marker>
            </defs>
            <line x1="250" y1="165" x2="293" y2="165" stroke="#ff8c42" stroke-width="1.5" marker-end="url(#ra1)" stroke-dasharray="4,2"/>
            <text x="271" y="158" text-anchor="middle" fill="#b8c8e0" font-size="7.5">narrow</text>
            <line x1="505" y1="165" x2="548" y2="165" stroke="#7c5cfc" stroke-width="1.5" marker-end="url(#ra2)" stroke-dasharray="4,2"/>
            <text x="526" y="158" text-anchor="middle" fill="#b8c8e0" font-size="7.5">locate</text>

            <text x="400" y="310" text-anchor="middle" fill="#b8c8e0" font-size="9">Typical flow: Glob → Grep → Read (progressive narrowing)</text>
          </svg>
        </div>
      </section>

      <!-- Ripgrep Deep Dive -->
      <section class="ch-section">
        <h2>ripgrep 整合</h2>
        <div class="concepts-grid">
          <div class="concept-card">
            <h3>原生二進制調用</h3>
            <p><code>ripgrep.ts</code> 通過 <code>child_process.spawn()</code> 調用系統的 <code>rg</code> 二進制，避免 Node.js 正規表達式的限制，速度遠超原生 <code>grep</code>。</p>
          </div>
          <div class="concept-card">
            <h3>Token Budget 控制</h3>
            <p><code>ReadTool</code> 接受 <code>offset</code> 和 <code>limit</code> 參數，搭配行號輸出，讓 Claude 可以精確請求特定範圍，避免讀取整個大型文件。</p>
          </div>
          <div class="concept-card">
            <h3>無向量語義搜索</h3>
            <p>Claude Code 刻意不使用嵌入向量或語義搜索。大型語言模型本身具備足夠的推理能力，從文本搜索結果中定位相關代碼，不需要額外的向量索引。</p>
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
              <tr><td><code>tools/Glob/index.ts</code></td><td>Glob 工具、fast-glob 整合</td></tr>
              <tr><td><code>tools/Grep/index.ts</code></td><td>Grep 工具、regex 參數處理</td></tr>
              <tr><td><code>ripgrep.ts</code></td><td>rg 二進制封裝、結果解析</td></tr>
              <tr><td><code>tools/Read/index.ts</code></td><td>Read 工具、offset/limit/行號輸出</td></tr>
            </tbody>
          </table>
        </div>
      </section>
  `,
  styles: [`
    :host { display: block; }
    .chapter-hero {
      padding:48px 40px 40px; border-bottom:1px solid var(--border-color);
      background:radial-gradient(ellipse 70% 50% at 30% 50%, rgba(255,140,66,.08) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#ff8c42; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#ff8c42,#ffd166); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(255,140,66,.1); border:1px solid rgba(255,140,66,.25); color:#ff8c42; padding:3px 10px; border-radius:4px; }
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .ch-section h2 { font-size:1.3rem; font-weight:800; margin-bottom:24px; }

    .diagram-box { background: #0d1117; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 4px; overflow: hidden; }
    .arch-svg { width: 100%; height: auto; display: block; }

    .concepts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
    .concept-card {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px;
      h3 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
      p { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.7; }
      code { font-family: var(--font-mono); font-size: 0.82em; color: #ff8c42; background: rgba(255,140,66,0.08); padding: 1px 5px; border-radius: 3px; }
    }

    .src-table-wrap { overflow-x: auto; }
    .src-table { width: 100%; border-collapse: collapse; font-size: 0.85rem;
      thead tr { background: rgba(255,140,66,0.08); }
      th { padding: 10px 16px; text-align: left; font-weight: 700; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
      td { padding: 10px 16px; color: var(--text-secondary); border-bottom: 1px solid rgba(255,255,255,0.04); }
      tr:hover td { background: rgba(255,255,255,0.02); }
      code { font-family: var(--font-mono); font-size: 0.82em; color: #ff8c42; }
    }

    @media (max-width: 640px) {
      .chapter-hero, .ch-section { padding-left: 20px; padding-right: 20px; }
    }
  `]
})
export class RetrievalComponent {}
