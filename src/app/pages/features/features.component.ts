import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-tag">功能特性</span>
        <h1>Claude Code 完整功能解析</h1>
        <p>深度剖析 Claude Code 的每一個核心功能模組，從互動式 REPL 到多代理協作系統</p>
      </div>
    </div>

    <!-- Core Features -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">核心功能</span>
          <h2>六大核心能力</h2>
          <p>構成 Claude Code 強大能力的六個核心功能領域</p>
        </div>

        <div class="core-features-grid">
          <div class="core-feature-card" *ngFor="let f of coreFeatures; let i = index">
            <div class="feature-number">0{{ i + 1 }}</div>
            <div class="feature-icon" [style.color]="f.color">{{ f.icon }}</div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
            <ul>
              <li *ngFor="let detail of f.details">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ detail }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Permission System -->
    <section class="section perm-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">安全系統</span>
          <h2>精細化權限控制</h2>
          <p>三層權限模式確保 AI 操作的安全性與可控性</p>
        </div>

        <div class="perm-grid">
          <div class="perm-card" *ngFor="let p of permModes">
            <div class="perm-header">
              <div class="perm-icon" [style.background]="p.gradient">{{ p.icon }}</div>
              <div>
                <h3>{{ p.name }}</h3>
                <span class="badge" [class]="p.badgeClass">{{ p.badge }}</span>
              </div>
            </div>
            <p>{{ p.desc }}</p>
            <div class="perm-features">
              <div class="perm-feature" *ngFor="let f of p.features">
                <div class="perm-dot" [style.background]="p.color"></div>
                {{ f }}
              </div>
            </div>
          </div>
        </div>

        <div class="yolo-info">
          <div class="yolo-inner">
            <div class="yolo-icon">🎯</div>
            <div>
              <h4>YOLO 分類器</h4>
              <p>智能的操作風險評估系統，根據工具類型、路徑、操作內容自動判斷是否需要用戶確認，平衡安全性與執行效率。</p>
            </div>
            <div class="yolo-tags">
              <span class="tag">路徑驗證</span>
              <span class="tag">規則匹配</span>
              <span class="tag">風險評估</span>
              <span class="tag">Policy 執行</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Context Management -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">上下文管理</span>
          <h2>智能上下文壓縮</h2>
          <p>三種壓縮策略確保長對話的連貫性，在 Token 限制內保留最重要的上下文</p>
        </div>

        <div class="compact-grid">
          <div class="compact-card" *ngFor="let c of compactModes">
            <div class="compact-header">
              <span class="compact-icon">{{ c.icon }}</span>
              <div>
                <h4>{{ c.name }}</h4>
                <span class="badge" [class]="c.badgeClass">{{ c.badge }}</span>
              </div>
            </div>
            <p>{{ c.desc }}</p>
            <div class="compact-stats">
              <div class="compact-stat" *ngFor="let s of c.stats">
                <div class="cs-value">{{ s.value }}</div>
                <div class="cs-label">{{ s.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="token-flow">
          <h4>Token 追蹤流程</h4>
          <div class="flow-steps">
            <div class="flow-step" *ngFor="let step of tokenFlow; let last = last">
              <div class="flow-icon">{{ step.icon }}</div>
              <div class="flow-info">
                <strong>{{ step.name }}</strong>
                <small>{{ step.desc }}</small>
              </div>
              <div class="flow-arrow" *ngIf="!last">→</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Memory System -->
    <section class="section memory-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">記憶系統</span>
          <h2>多層次記憶架構</h2>
          <p>從 CLAUDE.md 配置到會話持久化，構建完整的知識記憶體系</p>
        </div>

        <div class="memory-grid">
          <div class="memory-card" *ngFor="let m of memoryLayers">
            <div class="memory-icon">{{ m.icon }}</div>
            <div class="memory-info">
              <h4>{{ m.name }}</h4>
              <p>{{ m.desc }}</p>
              <div class="memory-path">
                <code>{{ m.path }}</code>
              </div>
            </div>
            <div class="memory-priority" [class]="m.priorityClass">{{ m.priority }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Flags -->
    <section class="section flags-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">功能旗標</span>
          <h2>31 個進階功能旗標</h2>
          <p>隱藏的進階功能，揭示 Claude Code 的未來發展方向</p>
        </div>

        <div class="flags-grid">
          <div class="flag-group" *ngFor="let group of flagGroups">
            <h4 class="flag-group-title">
              <span>{{ group.icon }}</span>
              {{ group.name }}
            </h4>
            <div class="flag-list">
              <div class="flag-item" *ngFor="let flag of group.flags">
                <div class="flag-status">
                  <span class="flag-dot"></span>
                </div>
                <code class="flag-name">{{ flag.name }}</code>
                <span class="flag-desc">{{ flag.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hook System -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Hook 系統</span>
          <h2>靈活的 Hook 生命週期</h2>
          <p>在工具執行前後注入自訂邏輯，實現流程自動化</p>
        </div>

        <div class="hook-demo">
          <div class="hook-left">
            <div class="hook-item" *ngFor="let h of hooks">
              <div class="hook-icon" [style.background]="h.gradient">{{ h.icon }}</div>
              <div class="hook-info">
                <strong>{{ h.name }}</strong>
                <span>{{ h.trigger }}</span>
                <p>{{ h.desc }}</p>
              </div>
            </div>
          </div>

          <div class="hook-right">
            <div class="code-block">
              <div class="code-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="filename">~/.claude/settings.json</span>
              </div>
              <pre [innerHTML]="hookCodeHtml"></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero {
      padding: 160px 0 80px;
      background: var(--bg-secondary);
      text-align: center;
      border-bottom: 1px solid var(--border-color);

      .section-tag { display: inline-block; margin-bottom: 20px; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent-primary); background: rgba(124, 92, 252, 0.1); border: 1px solid rgba(124, 92, 252, 0.3); padding: 6px 16px; border-radius: 100px; }
      h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; margin-bottom: 16px; background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      p { font-size: 1.1rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; }
    }

    /* Core Features */
    .core-features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .core-feature-card {
      position: relative;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 32px;
      transition: all 0.3s;
      overflow: hidden;

      &:hover {
        border-color: var(--border-accent);
        transform: translateY(-4px);
        box-shadow: var(--shadow-hover);
      }

      .feature-number {
        font-family: var(--font-mono);
        font-size: 3rem;
        font-weight: 900;
        color: rgba(255,255,255,0.04);
        position: absolute;
        top: 16px;
        right: 24px;
        line-height: 1;
      }

      .feature-icon {
        font-size: 2rem;
        margin-bottom: 16px;
      }

      h3 {
        font-size: 1.15rem;
        font-weight: 700;
        margin-bottom: 12px;
      }

      p {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 20px;
        line-height: 1.7;
      }

      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 10px;

        li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);

          svg { color: var(--accent-green); flex-shrink: 0; margin-top: 2px; }
        }
      }
    }

    /* Permission */
    .perm-section { background: var(--bg-secondary); }

    .perm-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }

    .perm-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 28px;
      transition: all 0.3s;

      &:hover { border-color: var(--border-accent); transform: translateY(-4px); }

      .perm-header {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 16px;

        .perm-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }

        h3 { font-size: 1.1rem; margin-bottom: 6px; }
      }

      p { font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.7; }

      .perm-features {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .perm-feature {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.85rem;
        color: var(--text-secondary);

        .perm-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
      }
    }

    .yolo-info {
      background: linear-gradient(135deg, rgba(124, 92, 252, 0.08) 0%, rgba(92, 138, 255, 0.08) 100%);
      border: 1px solid rgba(124, 92, 252, 0.2);
      border-radius: var(--radius-lg);
      padding: 28px;

      .yolo-inner {
        display: flex;
        align-items: center;
        gap: 24px;

        .yolo-icon { font-size: 2.5rem; flex-shrink: 0; }

        h4 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
        p { font-size: 0.9rem; color: var(--text-secondary); }

        .yolo-tags {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
        }
      }
    }

    /* Compact */
    .compact-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 40px;
    }

    .compact-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 28px;
      transition: all 0.3s;

      &:hover { border-color: var(--border-accent); transform: translateY(-4px); }

      .compact-header {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 16px;

        .compact-icon { font-size: 2rem; }
        h4 { font-size: 1rem; font-weight: 700; margin-bottom: 6px; }
      }

      p { font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.7; }

      .compact-stats {
        display: flex;
        gap: 20px;

        .compact-stat {
          .cs-value { font-family: var(--font-mono); font-size: 1.3rem; font-weight: 700; color: var(--accent-primary); }
          .cs-label { font-size: 0.75rem; color: var(--text-muted); }
        }
      }
    }

    .token-flow {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 28px;

      h4 { font-size: 1rem; font-weight: 700; margin-bottom: 24px; }

      .flow-steps {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
      }

      .flow-step {
        display: flex;
        align-items: center;
        gap: 12px;

        .flow-icon { font-size: 1.5rem; }
        .flow-info {
          strong { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
          small { font-size: 0.75rem; color: var(--text-muted); }
        }
        .flow-arrow { color: var(--accent-primary); font-size: 1.2rem; }
      }
    }

    /* Memory */
    .memory-section { background: var(--bg-secondary); }

    .memory-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .memory-card {
      display: flex;
      align-items: center;
      gap: 20px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px 24px;
      transition: all 0.2s;

      &:hover { border-color: var(--border-accent); }

      .memory-icon { font-size: 1.8rem; flex-shrink: 0; }
      .memory-info {
        flex: 1;
        h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 4px; }
        p { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px; }
        .memory-path code { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 2px 8px; border-radius: 4px; }
      }
      .memory-priority {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 100px;
        &.high { background: rgba(124,92,252,0.15); color: var(--accent-primary); }
        &.medium { background: rgba(92,138,255,0.15); color: var(--accent-secondary); }
        &.low { background: rgba(0,212,170,0.15); color: var(--accent-green); }
      }
    }

    /* Flags */
    .flags-section { background: var(--bg-primary); }

    .flags-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .flag-group {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px;

      .flag-group-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        font-weight: 700;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
      }
    }

    .flag-list { display: flex; flex-direction: column; gap: 10px; }

    .flag-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;

      .flag-status {
        padding-top: 4px;
        .flag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
          flex-shrink: 0;
        }
      }

      .flag-name {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--accent-primary);
        background: rgba(124,92,252,0.08);
        padding: 1px 6px;
        border-radius: 4px;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .flag-desc { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; }
    }

    /* Hooks */
    .hook-demo {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .hook-left { display: flex; flex-direction: column; gap: 20px; }

    .hook-item {
      display: flex;
      gap: 16px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      transition: all 0.2s;

      &:hover { border-color: var(--border-accent); }

      .hook-icon {
        width: 44px;
        height: 44px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        flex-shrink: 0;
      }

      .hook-info {
        strong { display: block; font-size: 0.9rem; font-weight: 700; margin-bottom: 2px; }
        span { display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-primary); margin-bottom: 6px; }
        p { font-size: 0.82rem; color: var(--text-secondary); margin: 0; }
      }
    }

    @media (max-width: 1024px) {
      .core-features-grid { grid-template-columns: repeat(2, 1fr); }
      .perm-grid { grid-template-columns: repeat(2, 1fr); }
      .compact-grid { grid-template-columns: repeat(2, 1fr); }
      .flags-grid { grid-template-columns: repeat(2, 1fr); }
      .hook-demo { grid-template-columns: 1fr; }
    }

    @media (max-width: 768px) {
      .core-features-grid { grid-template-columns: 1fr; }
      .perm-grid { grid-template-columns: 1fr; }
      .compact-grid { grid-template-columns: 1fr; }
      .flags-grid { grid-template-columns: 1fr; }
      .yolo-info .yolo-inner { flex-direction: column; }
    }
  `]
})
export class FeaturesComponent {
  hookCodeHtml = `<span class="operator">{</span>
  <span class="string">"hooks"</span>: <span class="operator">{</span>
    <span class="string">"PreToolUse"</span>: [
      <span class="operator">{</span>
        <span class="string">"matcher"</span>: <span class="string">"Bash"</span>,
        <span class="string">"hooks"</span>: [<span class="operator">{</span>
          <span class="string">"type"</span>: <span class="string">"command"</span>,
          <span class="string">"command"</span>: <span class="string">"echo 'Before bash'"</span>
        <span class="operator">}]</span>
      <span class="operator">}</span>
    ],
    <span class="string">"PostToolUse"</span>: [
      <span class="operator">{</span>
        <span class="string">"matcher"</span>: <span class="string">"Write"</span>,
        <span class="string">"hooks"</span>: [<span class="operator">{</span>
          <span class="string">"type"</span>: <span class="string">"command"</span>,
          <span class="string">"command"</span>: <span class="string">"git add -A"</span>
        <span class="operator">}]</span>
      <span class="operator">}</span>
    ],
    <span class="string">"Stop"</span>: [...],
    <span class="string">"Notification"</span>: [...]
  <span class="operator">}</span>
<span class="operator">}</span>`;

  coreFeatures = [
    {
      icon: '🖥️', color: '#7c5cfc',
      title: '互動式 REPL 介面',
      desc: '基於 React 19 + Ink 建構的終端 UI，提供豐富的互動體驗，包含虛擬列表渲染以確保大量訊息的流暢顯示。',
      details: [
        'React 19 + Ink 終端渲染引擎',
        '自訂 React Reconciler（src/ink/）',
        '虛擬列表渲染（效能優化）',
        '100+ React/Ink 組件',
        '鍵盤快捷鍵與自訂 Hooks',
        'ANSI 顏色解析與 Syntax Highlight'
      ]
    },
    {
      icon: '🔧', color: '#00d4aa',
      title: '40+ 內建工具',
      desc: '完整的工具生態系統，每個工具都有 Zod Schema 定義的輸入驗證、獨立的 React 渲染組件與完整類型支援。',
      details: [
        '文件工具：Read、Write、Edit、MultiEdit',
        '搜尋工具：Glob、Grep（基於 ripgrep）',
        'Shell 工具：Bash、PowerShell',
        'Web 工具：WebFetch、WebSearch',
        'AI 工具：Agent（子代理生成）',
        '任務工具：TaskCreate、TodoWrite、CronCreate'
      ]
    },
    {
      icon: '💬', color: '#5c8aff',
      title: '80+ 斜線指令',
      desc: '豐富的斜線指令系統，支援動態載入，涵蓋配置管理、模型切換、會話操作等全方位功能。',
      details: [
        '/model — 切換 Claude 模型',
        '/fast — 切換快速回應模式',
        '/compact — 壓縮對話上下文',
        '/resume — 恢復上次會話',
        '/doctor — 環境診斷',
        '/memory — 記憶系統管理'
      ]
    },
    {
      icon: '🔌', color: '#ff8c42',
      title: 'MCP 協議完整支援',
      desc: 'Model Context Protocol 全面實現，34 個服務文件共 12,000+ 行代碼，支援 stdio 與 WebSocket 雙傳輸。',
      details: [
        'stdio / WebSocket 雙傳輸模式',
        '動態工具發現與載入',
        '資源（Resource）管理',
        '提示詞（Prompt）模板',
        'MCP Server 生命週期管理',
        '工具結果格式化與渲染'
      ]
    },
    {
      icon: '🤖', color: '#ff4d6d',
      title: '多代理協作系統',
      desc: '支援生成子代理（Sub-agent）執行獨立任務，透過任務系統追蹤進度，實現真正的並行 AI 工作流。',
      details: [
        'Agent Tool 生成子代理',
        'TaskCreate / TaskGet 任務追蹤',
        'TaskOutput 結果收集',
        'EnterWorktree 隔離執行環境',
        'CronCreate 定時任務',
        'RemoteTrigger 遠端觸發'
      ]
    },
    {
      icon: '📊', color: '#ffd166',
      title: 'OpenTelemetry 可觀測性',
      desc: '完整的 OpenTelemetry 整合，涵蓋分散式追蹤、指標收集與結構化日誌，適用於企業級監控場景。',
      details: [
        '@opentelemetry/api 追蹤與指標',
        '@opentelemetry/sdk-trace-node',
        '@opentelemetry/sdk-metrics',
        '結構化日誌輸出',
        'API 呼叫成本追蹤',
        'Token 使用量統計'
      ]
    }
  ];

  permModes = [
    {
      icon: '📋', name: 'Plan 模式', badge: '規劃模式', badgeClass: 'badge badge-purple',
      gradient: 'linear-gradient(135deg, #7c5cfc, #5c8aff)',
      color: '#7c5cfc',
      desc: '所有操作在執行前都需要用戶顯式確認，適合需要最高安全級別的場景。',
      features: ['所有工具呼叫需要確認', '顯示操作計畫與預期影響', '可拒絕任何操作', '完整的審計追蹤']
    },
    {
      icon: '⚡', name: 'Auto 模式', badge: '自動模式', badgeClass: 'badge badge-green',
      gradient: 'linear-gradient(135deg, #00d4aa, #5c8aff)',
      color: '#00d4aa',
      desc: '智能判斷哪些操作可以自動執行，哪些需要用戶確認。YOLO 分類器評估操作風險。',
      features: ['YOLO 風險評估', '低風險操作自動執行', '高風險操作請求確認', 'Policy 規則匹配']
    },
    {
      icon: '👆', name: 'Manual 模式', badge: '手動模式', badgeClass: 'badge badge-orange',
      gradient: 'linear-gradient(135deg, #ff8c42, #ffd166)',
      color: '#ff8c42',
      desc: '用戶完全控制每一個工具呼叫，適合學習了解 Claude Code 操作原理或精細控制執行流程。',
      features: ['完全用戶驅動', '可查看完整工具輸入', '適合學習與調試', '精細化執行控制']
    }
  ];

  compactModes = [
    {
      icon: '🤖', name: 'Auto 壓縮', badge: '自動', badgeClass: 'badge badge-purple',
      desc: '使用 Claude 模型智能摘要對話歷史，保留關鍵上下文同時大幅減少 Token 消耗。',
      stats: [{ value: '~70%', label: 'Token 節省' }, { value: '高', label: '語義保留' }]
    },
    {
      icon: '⚡', name: 'Micro 壓縮', badge: '輕量', badgeClass: 'badge badge-green',
      desc: '基於規則的快速壓縮，刪除冗餘的工具結果與重複內容，速度快但語義保留度較低。',
      stats: [{ value: '~40%', label: 'Token 節省' }, { value: '中', label: '速度' }]
    },
    {
      icon: '🔗', name: 'API 壓縮', badge: '外部', badgeClass: 'badge badge-blue',
      desc: '調用外部 API 服務進行上下文壓縮，適合自訂壓縮策略或使用更強大的摘要模型。',
      stats: [{ value: '可配置', label: '壓縮率' }, { value: '最高', label: '靈活性' }]
    }
  ];

  tokenFlow = [
    { icon: '💬', name: '用戶輸入', desc: 'User message' },
    { icon: '📊', name: 'Token 計算', desc: 'tokenCount()' },
    { icon: '⚖️', name: '閾值判斷', desc: '> 80% limit?' },
    { icon: '🗜️', name: '觸發壓縮', desc: 'compact()' },
    { icon: '📤', name: 'API 呼叫', desc: 'createMessage()' },
    { icon: '💰', name: '成本記錄', desc: 'trackCost()' }
  ];

  memoryLayers = [
    { icon: '📄', name: 'CLAUDE.md（全局）', desc: '存放於 ~/.claude/CLAUDE.md，全局用戶偏好與行為規則', path: '~/.claude/CLAUDE.md', priority: '最高優先', priorityClass: 'high' },
    { icon: '📁', name: 'CLAUDE.md（專案）', desc: '存放於專案根目錄，定義專案特定的規則與上下文', path: './CLAUDE.md', priority: '高優先', priorityClass: 'high' },
    { icon: '🗂️', name: 'Session Memory', desc: 'SessionMemory 服務持久化當前會話的重要資訊', path: '~/.claude/projects/', priority: '中優先', priorityClass: 'medium' },
    { icon: '📝', name: 'Conversation History', desc: '完整的對話歷史，支援 /resume 恢復上次會話', path: '~/.claude/conversations/', priority: '中優先', priorityClass: 'medium' },
    { icon: '⚙️', name: 'Settings & Config', desc: '全局設定檔，包含 hooks、model、權限等配置', path: '~/.claude/settings.json', priority: '低優先', priorityClass: 'low' },
    { icon: '🔑', name: 'Credentials & OAuth', desc: 'OAuth Token 與 API 金鑰安全存儲', path: '~/.claude/.credentials.json', priority: '安全存儲', priorityClass: 'low' }
  ];

  flagGroups = [
    {
      icon: '🤖', name: '自主代理',
      flags: [
        { name: 'KAIROS', desc: '自主任務執行引擎' },
        { name: 'PROACTIVE', desc: '主動建議與自動化' },
        { name: 'COORDINATOR_MODE', desc: '多代理協調模式' },
        { name: 'ULTRAPLAN', desc: '超級規劃能力' }
      ]
    },
    {
      icon: '🌐', name: '遠端分散式',
      flags: [
        { name: 'BRIDGE_MODE', desc: '橋接模式遠端連線' },
        { name: 'DAEMON', desc: '後台常駐服務' },
        { name: 'BG_SESSIONS', desc: '後台會話管理' },
        { name: 'SSH_REMOTE', desc: 'SSH 遠端執行' }
      ]
    },
    {
      icon: '🛠️', name: '進階工具',
      flags: [
        { name: 'CHICAGO_MCP', desc: '進階 MCP 功能' },
        { name: 'WEB_BROWSER_TOOL', desc: '瀏覽器控制工具' },
        { name: 'VOICE_MODE', desc: '語音輸入模式' },
        { name: 'UDS_INBOX', desc: 'Unix Domain Socket 通信' }
      ]
    }
  ];

  hooks = [
    { icon: '⬆️', gradient: 'linear-gradient(135deg, #7c5cfc, #5c8aff)', name: 'PreToolUse', trigger: 'before:tool_call', desc: '工具執行前觸發，可用於日誌記錄、安全檢查、環境準備等前置操作。' },
    { icon: '⬇️', gradient: 'linear-gradient(135deg, #00d4aa, #5c8aff)', name: 'PostToolUse', trigger: 'after:tool_call', desc: '工具執行後觸發，可用於自動 Git 提交、格式化、通知等後置操作。' },
    { icon: '🛑', gradient: 'linear-gradient(135deg, #ff4d6d, #ff8c42)', name: 'Stop', trigger: 'on:session_stop', desc: '會話結束時觸發，可用於清理資源、生成報告、發送通知。' },
    { icon: '🔔', gradient: 'linear-gradient(135deg, #ffd166, #ff8c42)', name: 'Notification', trigger: 'on:notification', desc: '需要通知用戶時觸發，可整合 Slack、Email 或系統通知。' }
  ];
}
