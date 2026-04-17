import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()">
      <div class="container nav-inner">
        <a routerLink="/" class="logo">
          <div class="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="logo-text">Claude <span class="gradient-text">Code</span></span>
        </a>

        <div class="nav-links" [class.open]="menuOpen()">
          <a routerLink="/features" routerLinkActive="active" class="nav-link">功能特性</a>
          <a routerLink="/architecture" routerLinkActive="active" class="nav-link">架構設計</a>
          <a routerLink="/tools" routerLinkActive="active" class="nav-link">工具指令</a>
          <a routerLink="/technologies" routerLinkActive="active" class="nav-link">技術棧</a>
          <a routerLink="/token" routerLinkActive="active" class="nav-link nav-link--token">🪙 Token</a>
          <a routerLink="/flow" routerLinkActive="active" class="nav-link nav-link--flow">🔄 互動流程</a>
          <a routerLink="/execution" routerLinkActive="active" class="nav-link nav-link--exec">🔬 執行流程</a>
          <a routerLink="/deep-dive" routerLinkActive="active" class="nav-link nav-link--highlight">🔬 深度解析</a>
          <a routerLink="/local-deploy" routerLinkActive="active" class="nav-link nav-link--teal">🖥️ 本地部署</a>
        </div>

        <div class="nav-actions">
          <a href="https://github.com/anthropics/claude-code" class="btn-github" target="_blank" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <button class="hamburger" (click)="toggleMenu()">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 72px;
      transition: all 0.3s ease;
      border-bottom: 1px solid transparent;

      &.scrolled {
        background: rgba(10, 14, 26, 0.95);
        backdrop-filter: blur(20px);
        border-bottom-color: var(--border-color);
        box-shadow: 0 4px 24px rgba(0,0,0,0.3);
      }
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text-primary);

      .logo-icon {
        width: 40px;
        height: 40px;
        background: var(--gradient-primary);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .logo-text {
        font-size: 1.1rem;
        font-weight: 700;
        letter-spacing: -0.02em;
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-link {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.2s;
      text-decoration: none;

      &:hover {
        color: var(--text-primary);
        background: rgba(255,255,255,0.05);
      }

      &.active {
        color: var(--accent-primary);
        background: rgba(124, 92, 252, 0.1);
      }

    }

    .nav-link--flow {
      color: #5c8aff;
      border: 1px solid rgba(92, 138, 255, 0.25);

      &:hover {
        background: rgba(92, 138, 255, 0.1);
        color: #5c8aff;
      }

      &.active {
        color: #5c8aff;
        background: rgba(92, 138, 255, 0.12);
      }
    }

    .nav-link--teal {
      color: #00d4aa;
      border: 1px solid rgba(0, 212, 170, 0.25);

      &:hover {
        background: rgba(0, 212, 170, 0.1);
        color: #00d4aa;
      }

      &.active {
        color: #00d4aa;
        background: rgba(0, 212, 170, 0.12);
      }
    }

    .nav-link--token {
      color: #ffd166;
      border: 1px solid rgba(255, 209, 102, 0.25);

      &:hover {
        background: rgba(255, 209, 102, 0.1);
        color: #ffd166;
      }

      &.active {
        color: #ffd166;
        background: rgba(255, 209, 102, 0.12);
      }
    }

    .nav-link--exec {
      color: #ff4d6d;
      border: 1px solid rgba(255, 77, 109, 0.25);

      &:hover {
        background: rgba(255, 77, 109, 0.1);
        color: #ff4d6d;
      }

      &.active {
        color: #ff4d6d;
        background: rgba(255, 77, 109, 0.12);
      }
    }

    .nav-link--highlight {
      color: var(--accent-orange);
      border: 1px solid rgba(255, 140, 66, 0.25);

      &:hover {
        background: rgba(255, 140, 66, 0.1);
        color: var(--accent-orange);
      }

      &.active {
        color: var(--accent-orange);
        background: rgba(255, 140, 66, 0.12);
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-github {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      color: var(--text-secondary);
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.2s;

      &:hover {
        background: rgba(255,255,255,0.1);
        border-color: var(--accent-primary);
        color: var(--text-primary);
      }
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;

      span {
        display: block;
        width: 24px;
        height: 2px;
        background: var(--text-primary);
        border-radius: 2px;
        transition: all 0.3s;
      }
    }

    @media (max-width: 768px) {
      .hamburger { display: flex; }
      .nav-links {
        display: none;
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        background: var(--bg-secondary);
        flex-direction: column;
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
        gap: 4px;

        &.open { display: flex; }
      }
    }
  `]
})
export class NavbarComponent {
  isScrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
}
