import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deep-dive-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="dd-layout">
      <!-- Sidebar -->
      <aside class="dd-sidebar">
        <div class="sidebar-header">
          <a routerLink="/deep-dive" class="sidebar-brand">
            <span class="sidebar-icon">🔬</span>
            <div>
              <strong>深度解析</strong>
              <small>十二大核心機制</small>
            </div>
          </a>
        </div>

        <nav class="sidebar-nav">
          <a *ngFor="let ch of chapters"
             [routerLink]="ch.path"
             routerLinkActive="active"
             class="sidebar-item"
             [class.sidebar-item--highlight]="ch.highlight">
            <span class="si-num">{{ ch.num }}</span>
            <span class="si-icon">{{ ch.icon }}</span>
            <div class="si-text">
              <strong>{{ ch.title }}</strong>
              <small>{{ ch.sub }}</small>
            </div>
          </a>
        </nav>

        <div class="sidebar-footer">
          <a routerLink="/" class="sidebar-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            返回首頁
          </a>
        </div>
      </aside>

      <!-- Content -->
      <main class="dd-content">
        <router-outlet />

        <!-- 上/下一章導航（自動根據當前路由計算）-->
        <nav class="chapter-pager" *ngIf="prevChapter || nextChapter">
          <a class="cp-btn cp-btn--prev"
             *ngIf="prevChapter"
             [routerLink]="prevChapter.path">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            <div class="cp-label">
              <span class="cp-hint">上一章</span>
              <span class="cp-title">{{ prevChapter.icon }} {{ prevChapter.title }}</span>
            </div>
          </a>

          <div class="cp-center">
            <span class="cp-progress">{{ currentIndex + 1 }} / {{ chapters.length }}</span>
          </div>

          <a class="cp-btn cp-btn--next"
             *ngIf="nextChapter"
             [routerLink]="nextChapter.path">
            <div class="cp-label">
              <span class="cp-hint">下一章</span>
              <span class="cp-title">{{ nextChapter.icon }} {{ nextChapter.title }}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </nav>
      </main>
    </div>
  `,
  styles: [`
    .dd-layout {
      display: flex;
      min-height: 100vh;
      padding-top: 72px;
    }

    /* ===== Sidebar ===== */
    .dd-sidebar {
      width: 260px;
      flex-shrink: 0;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 72px;
      height: calc(100vh - 72px);
      overflow-y: auto;
    }

    .sidebar-header {
      padding: 24px 16px 16px;
      border-bottom: 1px solid var(--border-color);
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-primary);

      .sidebar-icon {
        font-size: 1.4rem;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, rgba(255,140,66,0.2), rgba(255,77,109,0.2));
        border: 1px solid rgba(255,140,66,0.3);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      strong { display: block; font-size: 0.9rem; font-weight: 700; }
      small { font-size: 0.72rem; color: var(--text-muted); }
    }

    .sidebar-nav {
      flex: 1;
      padding: 12px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .sidebar-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 10px;
      border-radius: 8px;
      text-decoration: none;
      color: var(--text-secondary);
      transition: all 0.2s;
      border: 1px solid transparent;

      &:hover {
        background: rgba(255,255,255,0.04);
        color: var(--text-primary);
      }

      &.active {
        background: rgba(124,92,252,0.1);
        border-color: rgba(124,92,252,0.25);
        color: var(--accent-primary);

        .si-num { color: var(--accent-primary); }
        strong { color: var(--accent-primary); }
      }

    }

    .sidebar-item--highlight.active {
      background: rgba(255,140,66,0.1);
      border-color: rgba(255,140,66,0.25);
      color: var(--accent-orange);
      .si-num { color: var(--accent-orange); }
      strong { color: var(--accent-orange); }
    }

    .sidebar-item {

      .si-num {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        font-weight: 700;
        color: var(--text-muted);
        min-width: 20px;
      }

      .si-icon { font-size: 1rem; }

      .si-text {
        flex: 1;
        min-width: 0;
        strong { display: block; font-size: 0.82rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        small { font-size: 0.7rem; color: var(--text-muted); }
      }
    }

    .sidebar-footer {
      padding: 12px 16px;
      border-top: 1px solid var(--border-color);
    }

    .sidebar-back {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8rem;
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s;

      &:hover { color: var(--text-secondary); }
    }

    /* ===== Content ===== */
    .dd-content {
      flex: 1;
      min-width: 0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    /* ===== Chapter Pager ===== */
    .chapter-pager {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px 32px;
      border-top: 1px solid var(--border-color);
      background: var(--bg-secondary);
      max-width: 960px;
      margin: 0 auto;
      width: 100%;
    }

    .cp-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      text-decoration: none;
      color: var(--text-secondary);
      background: var(--bg-card);
      transition: all 0.2s;
      flex: 1;
      min-width: 0;

      &:hover {
        border-color: var(--border-accent);
        color: var(--text-primary);
        background: rgba(255,255,255,0.04);
      }

      svg { flex-shrink: 0; color: var(--text-muted); }
    }

    .cp-btn--prev { justify-content: flex-start; }
    .cp-btn--next { justify-content: flex-end; }

    .cp-label {
      display: flex;
      flex-direction: column;
      min-width: 0;

      .cp-hint {
        font-size: 0.68rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-family: var(--font-mono);
      }

      .cp-title {
        font-size: 0.84rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .cp-btn--next .cp-label { text-align: right; }

    .cp-center {
      flex-shrink: 0;
      .cp-progress {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        color: var(--text-muted);
        white-space: nowrap;
      }
    }

    @media (max-width: 900px) {
      .dd-layout { flex-direction: column; }
      .dd-sidebar {
        width: 100%;
        height: auto;
        position: static;
        .sidebar-nav { flex-direction: row; flex-wrap: wrap; overflow-x: auto; }
        .sidebar-item { flex-direction: column; gap: 4px; padding: 8px 12px; text-align: center; min-width: 80px; .si-text { display: none; } }
      }
      .chapter-pager { padding: 16px 20px; gap: 10px; }
      .cp-btn { padding: 10px 12px; }
    }

    @media (max-width: 600px) {
      .cp-btn--prev .cp-label .cp-title,
      .cp-btn--next .cp-label .cp-title { display: none; }
    }
  `]
})
export class DeepDiveLayoutComponent {
  private router = inject(Router);
  chapters = [
    { num: '01', icon: '🔁', title: 'Agent 循環', sub: 'Core Loop', path: '/deep-dive/agent-loop', highlight: false },
    { num: '02', icon: '🔧', title: '工具設計', sub: 'Tool System', path: '/deep-dive/tool-design', highlight: false },
    { num: '03', icon: '⚡', title: '讀寫分離並發', sub: 'Concurrency', path: '/deep-dive/concurrency', highlight: false },
    { num: '04', icon: '💾', title: '快取分裂', sub: 'Prompt Cache', path: '/deep-dive/cache-split', highlight: false },
    { num: '05', icon: '🔍', title: '內容檢索策略', sub: 'Retrieval', path: '/deep-dive/retrieval', highlight: false },
    { num: '06', icon: '🧠', title: '三層記憶架構', sub: 'Memory', path: '/deep-dive/memory', highlight: false },
    { num: '07', icon: '🗜️', title: '四層壓縮體系', sub: 'Compression', path: '/deep-dive/compression', highlight: true },
    { num: '08', icon: '🛡️', title: '安全審查', sub: 'Security', path: '/deep-dive/security', highlight: false },
    { num: '09', icon: '🔌', title: 'MCP Protocol', sub: 'MCP', path: '/deep-dive/mcp', highlight: true },
    { num: '10', icon: '🎣', title: 'Hook System', sub: 'Hooks', path: '/deep-dive/hooks', highlight: true },
    { num: '11', icon: '🤖', title: 'Sub-Agent 架構', sub: 'Sub-Agent', path: '/deep-dive/sub-agent', highlight: true },
    { num: '12', icon: '⚡', title: '投機執行機制', sub: 'Speculative Exec', path: '/deep-dive/speculative-exec', highlight: true },
  ];

  get currentIndex(): number {
    const url = this.router.url;
    return this.chapters.findIndex(c => url.includes(c.path.replace('/deep-dive/', '')));
  }

  get prevChapter() {
    const i = this.currentIndex;
    return i > 0 ? this.chapters[i - 1] : null;
  }

  get nextChapter() {
    const i = this.currentIndex;
    return i >= 0 && i < this.chapters.length - 1 ? this.chapters[i + 1] : null;
  }
}
