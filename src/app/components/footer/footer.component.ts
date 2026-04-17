import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo">
              <div class="logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>Claude Code</span>
            </div>
            <p>Anthropic 官方 AI 編程助手 CLI 工具，提供強大的終端介面與完整的 AI 輔助開發能力。</p>
            <div class="social-links">
              <a href="https://github.com/anthropics/claude-code" target="_blank" class="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://anthropic.com" target="_blank" class="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer-links">
            <h4>導覽</h4>
            <ul>
              <li><a routerLink="/">首頁</a></li>
              <li><a routerLink="/features">功能特性</a></li>
              <li><a routerLink="/architecture">架構設計</a></li>
              <li><a routerLink="/tools">工具指令</a></li>
              <li><a routerLink="/technologies">技術棧</a></li>
              <li><a routerLink="/deep-dive">🔬 深度解析</a></li>
            </ul>
          </div>

          <div class="footer-links">
            <h4>技術</h4>
            <ul>
              <li><a href="#">React + Ink UI</a></li>
              <li><a href="#">TypeScript / Bun</a></li>
              <li><a href="#">MCP 協議</a></li>
              <li><a href="#">多雲端提供者</a></li>
              <li><a href="#">OpenTelemetry</a></li>
            </ul>
          </div>

          <div class="footer-links">
            <h4>資源</h4>
            <ul>
              <li><a href="https://docs.anthropic.com" target="_blank">API 文件</a></li>
              <li><a href="https://anthropic.com" target="_blank">Anthropic 官網</a></li>
              <li><a href="https://github.com/anthropics" target="_blank">GitHub</a></li>
              <li><a href="#">版本更新</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 Anthropic. Claude Code 深度技術解析 | 本網站為技術文件展示用途</p>
          <div class="footer-tech">
            <span class="tag">Angular 21</span>
            <span class="tag">TypeScript</span>
            <span class="tag">SCSS</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
      padding: 80px 0 40px;
      margin-top: 0;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px;
      margin-bottom: 64px;
    }

    .footer-brand {
      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 16px;
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-primary);

        .logo-icon {
          width: 36px;
          height: 36px;
          background: var(--gradient-primary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
      }

      p {
        font-size: 0.9rem;
        line-height: 1.7;
        margin-bottom: 20px;
      }
    }

    .social-links {
      display: flex;
      gap: 12px;
    }

    .social-link {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-secondary);
      transition: all 0.2s;

      &:hover {
        background: rgba(124, 92, 252, 0.1);
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }
    }

    .footer-links {
      h4 {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--text-primary);
        margin-bottom: 20px;
      }

      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;

        li a {
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;

          &:hover { color: var(--accent-primary); }
        }
      }
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 32px;
      border-top: 1px solid var(--border-color);

      p {
        font-size: 0.85rem;
        color: var(--text-muted);
      }

      .footer-tech {
        display: flex;
        gap: 8px;
      }
    }

    @media (max-width: 1024px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 640px) {
      .footer-grid { grid-template-columns: 1fr; gap: 32px; }
      .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
    }
  `]
})
export class FooterComponent {}
