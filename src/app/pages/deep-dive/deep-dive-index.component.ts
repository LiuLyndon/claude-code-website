import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deep-dive-index',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="index-hero">
      <span class="section-tag">深度解析</span>
      <h1>Claude Code 十二大核心機制</h1>
      <p>基於 Claude Code 源碼（2026-03-31 快照，512K 行 TypeScript）逆向分析<br>每個章節包含架構圖、流程圖與精確的程式碼位置</p>
    </div>

    <div class="index-grid">
      <a [routerLink]="ch.path" class="chapter-card" *ngFor="let ch of chapters"
         [class.chapter-card--highlight]="ch.highlight">
        <div class="cc-num">{{ ch.num }}</div>
        <div class="cc-icon" [style.background]="ch.gradient">{{ ch.icon }}</div>
        <div class="cc-body">
          <h3>{{ ch.title }}</h3>
          <p>{{ ch.desc }}</p>
          <div class="cc-tags">
            <span class="tag" *ngFor="let t of ch.tags">{{ t }}</span>
          </div>
        </div>
        <div class="cc-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
        <div class="cc-badge" *ngIf="ch.highlight">已深入補充</div>
      </a>
    </div>
  `,
  styles: [`
    .index-hero {
      padding: 60px 40px 40px;
      border-bottom: 1px solid var(--border-color);

      .section-tag { display: inline-block; margin-bottom: 16px; font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-primary); background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.3); padding: 4px 14px; border-radius: 100px; }
      h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 12px; background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      p { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8; }
    }

    .index-grid {
      padding: 32px 40px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .chapter-card {
      position: relative;
      display: flex;
      align-items: center;
      gap: 20px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px 24px;
      text-decoration: none;
      transition: all 0.25s;

      &:hover {
        border-color: var(--border-accent);
        transform: translateX(6px);
        box-shadow: var(--shadow-card);

        .cc-arrow { opacity: 1; transform: translateX(4px); }
      }

    }

    .chapter-card--highlight {
      border-color: rgba(255,140,66,0.25);
      background: linear-gradient(135deg, rgba(255,140,66,0.04) 0%, var(--bg-card) 100%);

      &:hover { border-color: rgba(255,140,66,0.5); }
    }

    .chapter-card {

      .cc-num {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        font-weight: 700;
        color: var(--text-muted);
        min-width: 24px;
      }

      .cc-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        flex-shrink: 0;
      }

      .cc-body {
        flex: 1;
        min-width: 0;

        h3 { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
        p { font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 10px; line-height: 1.5; }

        .cc-tags { display: flex; flex-wrap: wrap; gap: 6px; }
      }

      .cc-arrow {
        color: var(--text-muted);
        opacity: 0.4;
        transition: all 0.25s;
        flex-shrink: 0;
      }

      .cc-badge {
        position: absolute;
        top: -8px;
        right: 16px;
        font-size: 0.65rem;
        font-weight: 700;
        color: var(--accent-orange);
        background: rgba(255,140,66,0.12);
        border: 1px solid rgba(255,140,66,0.3);
        padding: 2px 10px;
        border-radius: 100px;
      }
    }

    @media (max-width: 640px) {
      .index-hero { padding: 40px 20px 24px; h1 { font-size: 1.6rem; } }
      .index-grid { padding: 20px; }
    }
  `]
})
export class DeepDiveIndexComponent {
  chapters = [
    { num: '01', icon: '🔁', gradient: 'linear-gradient(135deg,rgba(124,92,252,.2),rgba(92,138,255,.2))', title: 'Agent 循環', path: '/deep-dive/agent-loop', desc: 'QueryEngine + query() 的主循環：用戶輸入→API呼叫→工具執行→結果回饋的完整Agent Turn。', tags: ['QueryEngine.ts', 'query.ts', 'toolOrchestration.ts'], highlight: false },
    { num: '02', icon: '🔧', gradient: 'linear-gradient(135deg,rgba(0,212,170,.2),rgba(92,138,255,.2))', title: '工具設計', path: '/deep-dive/tool-design', desc: '40+ 工具的統一介面設計：Zod Schema 驗證、React UI 渲染、並發元數據、目錄自包含結構。', tags: ['Tool.ts', 'tools.ts', 'tools/*/'], highlight: false },
    { num: '03', icon: '⚡', gradient: 'linear-gradient(135deg,rgba(92,138,255,.2),rgba(124,92,252,.2))', title: '讀寫分離並發', path: '/deep-dive/concurrency', desc: '只讀工具（Grep/Glob/Read）並發執行最多10個，寫入工具（Write/Edit/Bash）嚴格串行，避免競態。', tags: ['StreamingToolExecutor.ts', 'partitionToolCalls()'], highlight: false },
    { num: '04', icon: '💾', gradient: 'linear-gradient(135deg,rgba(255,209,102,.2),rgba(255,140,66,.2))', title: 'System Prompt 快取分裂', path: '/deep-dive/cache-split', desc: '三塊快取結構（工具定義1h/系統上下文5m/用戶上下文無快取）精確控制API費用。', tags: ['claude.ts', 'promptCacheBreakDetection.ts'], highlight: false },
    { num: '05', icon: '🔍', gradient: 'linear-gradient(135deg,rgba(255,140,66,.2),rgba(255,209,102,.2))', title: '內容檢索策略', path: '/deep-dive/retrieval', desc: 'Glob→Grep→Read 三路互補：文件發現、ripgrep 內容搜索、Token Budget 精確讀取。', tags: ['GlobTool.ts', 'GrepTool.ts', 'ripgrep.ts'], highlight: false },
    { num: '06', icon: '🧠', gradient: 'linear-gradient(135deg,rgba(124,92,252,.2),rgba(255,77,109,.2))', title: '三層記憶架構', path: '/deep-dive/memory', desc: 'CLAUDE.md（持久化）+ SessionMemory（對話級摘要）+ Conversation History（完整歷史）三層疊加。', tags: ['claudemd.ts', 'sessionMemory.ts', 'context.ts'], highlight: false },
    { num: '07', icon: '🗜️', gradient: 'linear-gradient(135deg,rgba(255,77,109,.2),rgba(255,140,66,.2))', title: '四層遞進壓縮體系', path: '/deep-dive/compression', desc: '微壓縮(規則/<1ms) → 自動壓縮觸發 → Fork Agent全量摘要(5-30s) → Session Memory壓縮(<10ms)。已驗證邏輯正確。', tags: ['microCompact.ts', 'autoCompact.ts', 'compact.ts', 'sessionMemoryCompact.ts'], highlight: true },
    { num: '08', icon: '🛡️', gradient: 'linear-gradient(135deg,rgba(255,140,66,.2),rgba(255,77,109,.2))', title: '安全審查', path: '/deep-dive/security', desc: 'Settings規則 → YOLO分類器（側邊AI）→ Bash破壞性命令掃描，三道防線縱深防禦。', tags: ['yoloClassifier.ts', 'permissions.ts', 'bashSecurity.ts'], highlight: false },
    { num: '09', icon: '🔌', gradient: 'linear-gradient(135deg,rgba(0,212,170,.2),rgba(92,138,255,.2))', title: 'MCP Protocol', path: '/deep-dive/mcp', desc: '7 種傳輸類型連接外部服務，動態工具發現、OAuth 認證、會話快取，讓任何服務都能成為 Claude 的工具。', tags: ['mcp/client.ts', '@modelcontextprotocol/sdk', '7 Transport Types'], highlight: true },
    { num: '10', icon: '🎣', gradient: 'linear-gradient(135deg,rgba(255,209,102,.2),rgba(255,140,66,.2))', title: 'Hook System', path: '/deep-dive/hooks', desc: '27 個生命週期事件，Sync/Async 兩種模式，在工具執行前後、Session 開始結束等節點注入自訂邏輯。', tags: ['utils/hooks.ts', '27 Hook Events', 'PreToolUse / PostToolUse'], highlight: true },
    { num: '11', icon: '🤖', gradient: 'linear-gradient(135deg,rgba(124,92,252,.2),rgba(167,139,250,.2))', title: 'Sub-Agent 架構', path: '/deep-dive/sub-agent', desc: '多層代理結構、Worktree 隔離、Fork 機制共享 Prompt Cache，及權限降級委派的完整設計。', tags: ['AgentTool.tsx', 'forkSubagent.ts', 'Worktree / Remote Isolation'], highlight: true },
    { num: '12', icon: '⚡', gradient: 'linear-gradient(135deg,rgba(255,209,102,.2),rgba(255,140,66,.2))', title: '投機執行機制', path: '/deep-dive/speculative-exec', desc: 'Overlay 檔案系統隔離 + 流水線化預執行，在用戶確認前悄悄完成寫操作，近零延遲完成確認。', tags: ['speculativeExec.ts', 'overlayFS.ts', 'Copy-up / Drop'], highlight: true },
  ];
}
