import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-tag">工具 & 指令</span>
        <h1>40+ 工具 · 80+ 斜線指令</h1>
        <p>完整的工具與指令生態系統，覆蓋開發工作流程的每個環節</p>
      </div>
    </div>

    <!-- Tools Section -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">內建工具</span>
          <h2>40+ 工具系統</h2>
          <p>每個工具都有完整的 Zod Schema 驗證、React 渲染組件與 TypeScript 類型定義</p>
        </div>

        <div class="tool-filter">
          <button
            *ngFor="let cat of toolCategories"
            class="filter-btn"
            [class.active]="activeCategory() === cat.id"
            (click)="setCategory(cat.id)"
          >
            {{ cat.icon }} {{ cat.name }}
            <span class="filter-count">{{ cat.count }}</span>
          </button>
        </div>

        <div class="tools-grid">
          <div class="tool-card"
               *ngFor="let tool of filteredTools()"
               [class]="'tool-card--' + tool.category">
            <div class="tool-header">
              <code class="tool-name">{{ tool.name }}</code>
              <span class="badge" [class]="tool.badgeClass">{{ tool.category }}</span>
            </div>
            <p class="tool-desc">{{ tool.desc }}</p>
            <div class="tool-schema">
              <div class="schema-row" *ngFor="let param of tool.params">
                <code class="param-name">{{ param.name }}</code>
                <span class="param-type">{{ param.type }}</span>
                <span class="param-req" *ngIf="param.required">必填</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Commands Section -->
    <section class="section commands-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">斜線指令</span>
          <h2>80+ 斜線指令參考</h2>
          <p>完整的指令列表，涵蓋配置、模型、會話、診斷與自訂功能</p>
        </div>

        <div class="commands-layout">
          <div class="cmd-nav">
            <button
              *ngFor="let group of commandGroups"
              class="cmd-nav-btn"
              [class.active]="activeCommandGroup() === group.id"
              (click)="setCommandGroup(group.id)"
            >
              <span>{{ group.icon }}</span>
              {{ group.name }}
            </button>
          </div>

          <div class="cmd-content">
            <ng-container *ngFor="let group of commandGroups">
              <div class="cmd-group" *ngIf="activeCommandGroup() === group.id">
                <div class="cmd-item" *ngFor="let cmd of group.commands">
                  <div class="cmd-header">
                    <code class="cmd-name">{{ cmd.name }}</code>
                    <span class="cmd-alias" *ngIf="cmd.alias">alias: {{ cmd.alias }}</span>
                  </div>
                  <p class="cmd-desc">{{ cmd.desc }}</p>
                  <div class="cmd-example" *ngIf="cmd.example">
                    <span class="example-label">示例：</span>
                    <code>{{ cmd.example }}</code>
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </section>

    <!-- Tool Lifecycle -->
    <section class="section lifecycle-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">工具生命週期</span>
          <h2>工具執行流程</h2>
          <p>從工具呼叫到結果渲染的完整執行鏈路</p>
        </div>

        <div class="lifecycle-diagram">
          <div class="lifecycle-step" *ngFor="let step of lifecycleSteps; let last = last">
            <div class="ls-content" [style.border-color]="step.color + '44'">
              <div class="ls-icon" [style.color]="step.color">{{ step.icon }}</div>
              <strong>{{ step.name }}</strong>
              <p>{{ step.desc }}</p>
              <div class="ls-code" *ngIf="step.code">
                <code>{{ step.code }}</code>
              </div>
            </div>
            <div class="ls-arrow" *ngIf="!last" [style.color]="step.color">↓</div>
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

    /* Tool Filter */
    .tool-filter {
      display: flex;
      gap: 10px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 0.85rem;
      color: var(--text-secondary);
      transition: all 0.2s;

      &:hover { border-color: var(--accent-primary); color: var(--text-primary); }
      &.active { background: rgba(124,92,252,0.1); border-color: var(--accent-primary); color: var(--accent-primary); }

      .filter-count {
        background: rgba(255,255,255,0.08);
        border-radius: 100px;
        padding: 1px 8px;
        font-size: 0.75rem;
        font-family: var(--font-mono);
      }
    }

    /* Tools Grid */
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .tool-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      transition: all 0.3s;

      &:hover { border-color: var(--border-accent); transform: translateY(-2px); box-shadow: var(--shadow-card); }

      .tool-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .tool-name {
        font-family: var(--font-mono);
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--accent-primary);
      }

      .tool-desc {
        font-size: 0.83rem;
        color: var(--text-secondary);
        margin-bottom: 14px;
        line-height: 1.5;
      }

      .tool-schema {
        display: flex;
        flex-direction: column;
        gap: 6px;
        border-top: 1px solid var(--border-color);
        padding-top: 12px;
      }

      .schema-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.76rem;

        .param-name { font-family: var(--font-mono); color: var(--text-code); }
        .param-type { color: var(--accent-green); font-family: var(--font-mono); }
        .param-req { color: var(--accent-red); font-size: 0.7rem; padding: 1px 4px; background: rgba(255,77,109,0.1); border-radius: 3px; }
      }
    }

    /* Commands */
    .commands-section { background: var(--bg-secondary); }

    .commands-layout {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 24px;
    }

    .cmd-nav {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .cmd-nav-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: 1px solid transparent;
      border-radius: 8px;
      padding: 10px 14px;
      cursor: pointer;
      font-size: 0.85rem;
      color: var(--text-secondary);
      text-align: left;
      transition: all 0.2s;

      &:hover { background: rgba(255,255,255,0.04); color: var(--text-primary); }
      &.active { background: rgba(124,92,252,0.1); border-color: rgba(124,92,252,0.3); color: var(--accent-primary); }
    }

    .cmd-content {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px;
    }

    .cmd-item {
      padding: 16px 0;
      border-bottom: 1px solid var(--border-color);

      &:last-child { border-bottom: none; padding-bottom: 0; }
      &:first-child { padding-top: 0; }

      .cmd-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 6px;
      }

      .cmd-name {
        font-family: var(--font-mono);
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--accent-primary);
      }

      .cmd-alias {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        color: var(--text-muted);
      }

      .cmd-desc {
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin-bottom: 8px;
      }

      .cmd-example {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.78rem;

        .example-label { color: var(--text-muted); }
        code { font-family: var(--font-mono); color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 2px 8px; border-radius: 4px; }
      }
    }

    /* Lifecycle */
    .lifecycle-section { background: var(--bg-primary); }

    .lifecycle-diagram {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      max-width: 700px;
      margin: 0 auto;
    }

    .lifecycle-step {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .ls-content {
      width: 100%;
      background: var(--bg-card);
      border: 1px solid;
      border-radius: var(--radius-md);
      padding: 20px 24px;

      .ls-icon { font-size: 1.5rem; margin-bottom: 6px; }
      strong { display: block; font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; }
      p { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 10px; }

      .ls-code code {
        font-family: var(--font-mono);
        font-size: 0.78rem;
        color: var(--accent-green);
        background: rgba(0,212,170,0.08);
        padding: 4px 10px;
        border-radius: 4px;
      }
    }

    .ls-arrow {
      font-size: 1.8rem;
      padding: 8px 0;
    }

    @media (max-width: 1024px) {
      .tools-grid { grid-template-columns: repeat(2, 1fr); }
      .commands-layout { grid-template-columns: 1fr; }
      .cmd-nav { flex-direction: row; flex-wrap: wrap; }
    }

    @media (max-width: 640px) {
      .tools-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ToolsComponent {
  activeCategory = signal('all');
  activeCommandGroup = signal('config');

  toolCategories = [
    { id: 'all', name: '全部', icon: '🔧', count: 40 },
    { id: 'file', name: '文件操作', icon: '📁', count: 8 },
    { id: 'shell', name: 'Shell 執行', icon: '💻', count: 3 },
    { id: 'web', name: 'Web 工具', icon: '🌐', count: 4 },
    { id: 'ai', name: 'AI 工具', icon: '🤖', count: 5 },
    { id: 'task', name: '任務管理', icon: '📋', count: 8 },
    { id: 'mcp', name: 'MCP 工具', icon: '🔌', count: 6 }
  ];

  allTools = [
    { name: 'Read', category: 'file', badgeClass: 'badge badge-blue', desc: '讀取文件內容，支援行範圍指定，自動格式化輸出並標記行號。', params: [{ name: 'file_path', type: 'string', required: true }, { name: 'limit', type: 'number', required: false }, { name: 'offset', type: 'number', required: false }] },
    { name: 'Write', category: 'file', badgeClass: 'badge badge-blue', desc: '寫入或創建文件，完整覆蓋現有內容。', params: [{ name: 'file_path', type: 'string', required: true }, { name: 'content', type: 'string', required: true }] },
    { name: 'Edit', category: 'file', badgeClass: 'badge badge-blue', desc: '精確的字串替換編輯，支援 replace_all 全域替換。', params: [{ name: 'file_path', type: 'string', required: true }, { name: 'old_string', type: 'string', required: true }, { name: 'new_string', type: 'string', required: true }] },
    { name: 'MultiEdit', category: 'file', badgeClass: 'badge badge-blue', desc: '批量多處文件編輯，一次性執行多個 Edit 操作。', params: [{ name: 'file_path', type: 'string', required: true }, { name: 'edits', type: 'Edit[]', required: true }] },
    { name: 'Glob', category: 'file', badgeClass: 'badge badge-blue', desc: '基於 glob 模式的文件搜索，按修改時間排序返回。', params: [{ name: 'pattern', type: 'string', required: true }, { name: 'path', type: 'string', required: false }] },
    { name: 'Grep', category: 'file', badgeClass: 'badge badge-blue', desc: '基於 ripgrep 的內容搜索，支援正則、context、文件類型過濾。', params: [{ name: 'pattern', type: 'string', required: true }, { name: 'path', type: 'string', required: false }, { name: 'glob', type: 'string', required: false }] },
    { name: 'LS', category: 'file', badgeClass: 'badge badge-blue', desc: '列出目錄內容，支援遞歸與隱藏文件顯示。', params: [{ name: 'path', type: 'string', required: true }, { name: 'recursive', type: 'boolean', required: false }] },
    { name: 'NotebookRead', category: 'file', badgeClass: 'badge badge-blue', desc: '讀取 Jupyter Notebook (.ipynb) 文件，包含所有 Cell 輸出。', params: [{ name: 'notebook_path', type: 'string', required: true }] },
    { name: 'Bash', category: 'shell', badgeClass: 'badge badge-orange', desc: '在安全的 Shell 環境執行 Bash 命令，支援超時設置與後台執行。', params: [{ name: 'command', type: 'string', required: true }, { name: 'timeout', type: 'number', required: false }, { name: 'run_in_background', type: 'boolean', required: false }] },
    { name: 'WebFetch', category: 'web', badgeClass: 'badge badge-green', desc: '抓取 URL 內容，支援 HTML 轉 Markdown、自訂 Headers。', params: [{ name: 'url', type: 'string', required: true }, { name: 'prompt', type: 'string', required: false }] },
    { name: 'WebSearch', category: 'web', badgeClass: 'badge badge-green', desc: '執行網路搜索，返回結構化搜索結果列表。', params: [{ name: 'query', type: 'string', required: true }, { name: 'num_results', type: 'number', required: false }] },
    { name: 'Agent', category: 'ai', badgeClass: 'badge badge-purple', desc: '生成子代理執行複雜任務，可指定工具集合與隔離環境。', params: [{ name: 'description', type: 'string', required: true }, { name: 'prompt', type: 'string', required: true }, { name: 'subagent_type', type: 'string', required: false }] },
    { name: 'TaskCreate', category: 'task', badgeClass: 'badge badge-yellow', desc: '創建任務追蹤項目，用於多步驟工作的進度管理。', params: [{ name: 'description', type: 'string', required: true }, { name: 'status', type: 'TaskStatus', required: false }] },
    { name: 'TaskUpdate', category: 'task', badgeClass: 'badge badge-yellow', desc: '更新任務狀態（pending/in_progress/completed/failed）。', params: [{ name: 'task_id', type: 'string', required: true }, { name: 'status', type: 'TaskStatus', required: true }] },
    { name: 'TodoWrite', category: 'task', badgeClass: 'badge badge-yellow', desc: '創建或更新待辦清單，支援批量寫入多個項目。', params: [{ name: 'todos', type: 'Todo[]', required: true }] },
    { name: 'CronCreate', category: 'task', badgeClass: 'badge badge-yellow', desc: '創建定時任務，按 cron 表達式定期執行指定操作。', params: [{ name: 'schedule', type: 'string', required: true }, { name: 'prompt', type: 'string', required: true }] },
    { name: 'EnterWorktree', category: 'ai', badgeClass: 'badge badge-purple', desc: '進入 Git Worktree 隔離環境，用於安全的代碼變更操作。', params: [{ name: 'path', type: 'string', required: false }] },
    { name: 'ExitWorktree', category: 'ai', badgeClass: 'badge badge-purple', desc: '退出 Git Worktree 隔離環境，返回主工作目錄。', params: [] }
  ];

  filteredTools = () => {
    const cat = this.activeCategory();
    if (cat === 'all') return this.allTools;
    return this.allTools.filter(t => t.category === cat);
  };

  commandGroups = [
    {
      id: 'config', name: '配置管理', icon: '⚙️',
      commands: [
        { name: '/config', desc: '開啟互動式配置介面，可設置模型、權限、主題等全部選項。', example: '/config', alias: undefined },
        { name: '/settings', desc: '顯示並編輯當前設定值，支援 JSON 格式查看。', example: '/settings model', alias: undefined },
        { name: '/keybindings', desc: '查看與自訂鍵盤快捷鍵綁定配置。', example: '/keybindings', alias: undefined },
        { name: '/theme', desc: '切換終端顯示主題（dark/light/system）。', example: '/theme dark', alias: undefined },
      ]
    },
    {
      id: 'model', name: '模型控制', icon: '🤖',
      commands: [
        { name: '/model', desc: '切換 Claude 模型，支援 opus/sonnet/haiku 系列。', example: '/model claude-opus-4-5', alias: undefined },
        { name: '/fast', desc: '切換快速模式（Fast Mode），影響回應速度與品質。', example: '/fast', alias: undefined },
        { name: '/api', desc: '切換 API 提供者（anthropic/bedrock/vertex/azure）。', example: '/api bedrock', alias: undefined },
      ]
    },
    {
      id: 'session', name: '會話管理', icon: '💬',
      commands: [
        { name: '/resume', desc: '恢復上次的對話會話，包含完整的上下文與工具歷史。', example: '/resume', alias: undefined },
        { name: '/export', desc: '匯出當前對話為 JSON 或 Markdown 格式。', example: '/export markdown', alias: undefined },
        { name: '/compact', desc: '手動觸發上下文壓縮，釋放 Token 空間。', example: '/compact', alias: undefined },
        { name: '/clear', desc: '清除對話歷史，開始新的會話。', example: '/clear', alias: undefined },
      ]
    },
    {
      id: 'memory', name: '記憶系統', icon: '💾',
      commands: [
        { name: '/memory', desc: '查看與管理 Claude Code 的記憶系統內容。', example: '/memory', alias: undefined },
        { name: '/init', desc: '在當前專案創建 CLAUDE.md 配置文件。', example: '/init', alias: undefined },
      ]
    },
    {
      id: 'diagnostic', name: '診斷工具', icon: '🔍',
      commands: [
        { name: '/doctor', desc: '執行環境診斷，檢查 API 連線、認證狀態、工具可用性。', example: '/doctor', alias: undefined },
        { name: '/help', desc: '顯示所有可用命令的說明文件。', example: '/help', alias: undefined },
        { name: '/status', desc: '顯示當前會話狀態：Token 使用量、成本、模型等。', example: '/status', alias: undefined },
        { name: '/cost', desc: '顯示當前會話的 API 呼叫費用統計。', example: '/cost', alias: undefined },
      ]
    }
  ];

  lifecycleSteps = [
    { icon: '📨', color: '#7c5cfc', name: 'Tool Call 接收', desc: 'Claude API 在串流回應中返回 tool_use 事件', code: 'event.type === "tool_use"' },
    { icon: '🔍', color: '#5c8aff', name: 'Permission 檢查', desc: 'YOLO 分類器評估操作風險，決定是否需要用戶確認', code: 'checkPermission(tool, input)' },
    { icon: '✅', color: '#00d4aa', name: 'Schema 驗證', desc: '使用 Zod Schema 驗證工具輸入參數的類型與合法性', code: 'tool.inputSchema.parse(input)' },
    { icon: '⚡', color: '#ff8c42', name: 'Hook 觸發 (Pre)', desc: '執行 PreToolUse Hook，允許注入前置邏輯', code: 'hooks.preToolUse(tool, input)' },
    { icon: '🔧', color: '#ff4d6d', name: '工具執行', desc: '調用 tool.call(input) 執行實際操作並獲取結果', code: 'result = await tool.call(input)' },
    { icon: '🔔', color: '#ffd166', name: 'Hook 觸發 (Post)', desc: '執行 PostToolUse Hook，允許後置處理邏輯', code: 'hooks.postToolUse(tool, result)' },
    { icon: '🖥️', color: '#7c5cfc', name: '結果渲染', desc: '通過工具的 React 組件渲染結果，顯示於終端', code: '<ToolResult result={result} />' }
  ];

  setCategory(id: string) {
    this.activeCategory.set(id);
  }

  setCommandGroup(id: string) {
    this.activeCommandGroup.set(id);
  }
}
