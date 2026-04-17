import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="grid-lines"></div>
        <div class="glow glow-1"></div>
        <div class="glow glow-2"></div>
      </div>

      <div class="container hero-content">
        <div class="hero-badge">
          <span class="dot"></span>
          Anthropic 官方 CLI — 深度技術解析
        </div>

        <h1 class="hero-title">
          <span class="gradient-text">Claude Code</span><br>
          終端 AI 編程助手<br>
          <span class="subtitle-line">完整架構揭密</span>
        </h1>

        <p class="hero-desc">
          深度解析 Anthropic 官方 CLI 工具的完整技術架構<br>
          涵蓋 <strong>40+ 工具</strong>、<strong>80+ 斜線指令</strong>、<strong>多雲端提供者</strong>與<strong>MCP 協議整合</strong>
        </p>

        <div class="hero-actions">
          <a routerLink="/features" class="btn-primary">
            探索功能特性
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a routerLink="/architecture" class="btn-secondary">
            查看架構設計
          </a>
        </div>

        <div class="hero-terminal">
          <div class="terminal-window">
            <div class="terminal-header">
              <div class="dots">
                <span class="dot-red"></span>
                <span class="dot-yellow"></span>
                <span class="dot-green"></span>
              </div>
              <span class="terminal-title">claude — bash</span>
            </div>
            <div class="terminal-body">
              <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="cmd">{{ typedText() }}</span>
                <span class="cursor" [class.blink]="showCursor()">|</span>
              </div>
              <div class="terminal-output" *ngIf="showOutput()">
                <div class="output-line">
                  <span class="out-label">✓</span>
                  <span class="out-text">Claude Code v1.x.x initialized</span>
                </div>
                <div class="output-line">
                  <span class="out-label">→</span>
                  <span class="out-text">Connected to Anthropic API</span>
                </div>
                <div class="output-line">
                  <span class="out-label">→</span>
                  <span class="out-text">Model: claude-opus-4-5 · Context: 200k tokens</span>
                </div>
                <div class="output-line prompt-line">
                  <span class="prompt2">❯</span>
                  <span class="waiting">Ready for your next command...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" *ngFor="let stat of stats">
            <div class="stat-value gradient-text">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-desc">{{ stat.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overview Section -->
    <section class="section overview-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">專案概覽</span>
          <h2>什麼是 Claude Code？</h2>
          <p>一個運行在終端的 AI 編程助手，深度整合開發工作流程，理解整個代碼庫並提供智能輔助</p>
        </div>

        <div class="overview-grid">
          <div class="overview-card" *ngFor="let item of overviewItems">
            <div class="overview-icon" [style.background]="item.gradient">
              <span [innerHTML]="item.icon"></span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="overview-tags">
              <span class="tag" *ngFor="let tag of item.tags">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Preview Section -->
    <section class="section feature-preview-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">核心能力</span>
          <h2>強大的 AI 編程工具集</h2>
          <p>從文件操作到多代理協作，Claude Code 提供完整的開發支援能力</p>
        </div>

        <div class="feature-tabs">
          <div class="tab-nav">
            <button
              *ngFor="let tab of featureTabs; let i = index"
              class="tab-btn"
              [class.active]="activeTab() === i"
              (click)="setTab(i)"
            >
              <span [innerHTML]="tab.icon"></span>
              {{ tab.name }}
            </button>
          </div>

          <div class="tab-content">
            <div class="tab-info">
              <h3>{{ featureTabs[activeTab()].title }}</h3>
              <p>{{ featureTabs[activeTab()].desc }}</p>
              <ul class="feature-list">
                <li *ngFor="let item of featureTabs[activeTab()].items">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {{ item }}
                </li>
              </ul>
              <a [routerLink]="featureTabs[activeTab()].link" class="btn-primary-sm">
                了解更多 →
              </a>
            </div>
            <div class="tab-visual">
              <div class="code-block">
                <div class="code-header">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                  <span class="filename">{{ featureTabs[activeTab()].file }}</span>
                </div>
                <pre [innerHTML]="featureTabs[activeTab()].code"></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Provider Section -->
    <section class="section provider-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">多雲端支援</span>
          <h2>支援主流 AI 雲端提供者</h2>
          <p>彈性的提供者架構，支援 Anthropic 直連、AWS Bedrock、Google Vertex AI 與 Azure</p>
        </div>

        <div class="provider-grid">
          <div class="provider-card" *ngFor="let p of providers">
            <div class="provider-logo" [innerHTML]="p.logo"></div>
            <h4>{{ p.name }}</h4>
            <p>{{ p.desc }}</p>
            <div class="provider-features">
              <span class="badge" [class]="p.badgeClass" *ngFor="let f of p.features">{{ f }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Architecture Preview -->
    <section class="section arch-preview-section">
      <div class="container">
        <div class="arch-preview-inner">
          <div class="arch-text">
            <span class="section-tag">架構設計</span>
            <h2>模組化服務架構</h2>
            <p>Claude Code 採用高度模組化的架構設計，每個功能都是獨立的服務模組，通過清晰的介面進行交互。</p>

            <div class="arch-layers">
              <div class="arch-layer" *ngFor="let layer of archLayers">
                <div class="layer-dot" [style.background]="layer.color"></div>
                <div class="layer-info">
                  <strong>{{ layer.name }}</strong>
                  <span>{{ layer.desc }}</span>
                </div>
              </div>
            </div>

            <a routerLink="/architecture" class="btn-primary">
              查看完整架構
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="arch-diagram">
            <div class="diagram-box" *ngFor="let box of diagBoxes" [class]="box.class">
              <span [innerHTML]="box.icon"></span>
              <strong>{{ box.name }}</strong>
              <small>{{ box.sub }}</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Deep Dive Banner -->
    <section class="deep-dive-banner">
      <div class="container">
        <div class="banner-inner">
          <div class="banner-left">
            <div class="banner-tag">NEW</div>
            <h3>🔬 八大核心機制深度解析</h3>
            <p>含架構圖 · 流程圖 · 對應程式碼位置 — Agent循環、工具設計、讀寫並發、快取分裂、檢索策略、三層記憶、五級壓縮、安全審查</p>
          </div>
          <a routerLink="/deep-dive" class="btn-primary">
            立即探索
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-glow"></div>
          <h2>深入探索 Claude Code</h2>
          <p>瀏覽完整的技術文件，了解每個組件的設計原理與實現細節</p>
          <div class="cta-actions">
            <a routerLink="/deep-dive" class="btn-primary">八大核心機制</a>
            <a routerLink="/features" class="btn-outline">功能特性</a>
            <a routerLink="/tools" class="btn-outline">工具指令</a>
            <a routerLink="/technologies" class="btn-outline">技術棧</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ===== Hero ===== */
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 72px;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .grid-lines {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(124, 92, 252, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124, 92, 252, 0.05) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    .glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;

      &.glow-1 {
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(124, 92, 252, 0.15) 0%, transparent 70%);
        top: -100px;
        right: -100px;
      }

      &.glow-2 {
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(92, 138, 255, 0.1) 0%, transparent 70%);
        bottom: 0;
        left: -100px;
      }
    }

    .hero-content {
      position: relative;
      z-index: 1;
      padding: 80px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: var(--accent-green);
      background: rgba(0, 212, 170, 0.08);
      border: 1px solid rgba(0, 212, 170, 0.2);
      padding: 8px 20px;
      border-radius: 100px;
      margin-bottom: 32px;

      .dot {
        width: 8px;
        height: 8px;
        background: var(--accent-green);
        border-radius: 50%;
        animation: pulse-glow 2s infinite;
        box-shadow: 0 0 8px var(--accent-green);
      }
    }

    .hero-title {
      font-size: clamp(2.5rem, 6vw, 5rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 24px;

      .subtitle-line {
        font-size: 0.65em;
        font-weight: 500;
        color: var(--text-secondary);
        background: none;
        -webkit-text-fill-color: var(--text-secondary);
      }
    }

    .hero-desc {
      font-size: 1.15rem;
      color: var(--text-secondary);
      margin-bottom: 40px;
      max-width: 600px;
      line-height: 1.8;

      strong {
        color: var(--accent-primary);
        font-weight: 600;
      }
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 64px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--gradient-primary);
      color: white;
      font-weight: 600;
      font-size: 0.95rem;
      padding: 14px 28px;
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.3s;
      box-shadow: 0 4px 20px rgba(124, 92, 252, 0.4);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(124, 92, 252, 0.5);
        color: white;
      }
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.05);
      color: var(--text-primary);
      font-weight: 600;
      font-size: 0.95rem;
      padding: 14px 28px;
      border-radius: 10px;
      text-decoration: none;
      border: 1px solid var(--border-color);
      transition: all 0.3s;

      &:hover {
        background: rgba(255,255,255,0.1);
        border-color: var(--accent-primary);
        color: var(--text-primary);
        transform: translateY(-2px);
      }
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      color: var(--text-primary);
      font-weight: 600;
      font-size: 0.95rem;
      padding: 14px 28px;
      border-radius: 10px;
      text-decoration: none;
      border: 1px solid var(--border-color);
      transition: all 0.3s;

      &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }
    }

    .btn-primary-sm {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--gradient-primary);
      color: white;
      font-weight: 600;
      font-size: 0.85rem;
      padding: 10px 20px;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.2s;
      margin-top: 24px;

      &:hover { color: white; transform: translateY(-1px); }
    }

    /* Terminal */
    .hero-terminal {
      width: 100%;
      max-width: 680px;
    }

    .terminal-window {
      background: #0d1117;
      border: 1px solid #21262d;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
    }

    .terminal-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: #161b22;
      border-bottom: 1px solid #21262d;

      .dots { display: flex; gap: 6px; }
      .dot-red { width: 12px; height: 12px; border-radius: 50%; background: #ff5f57; }
      .dot-yellow { width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e; }
      .dot-green { width: 12px; height: 12px; border-radius: 50%; background: #28c840; }

      .terminal-title {
        margin-left: 8px;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: #8b949e;
      }
    }

    .terminal-body {
      padding: 20px 24px;
      font-family: var(--font-mono);
      font-size: 0.875rem;
      min-height: 160px;
    }

    .terminal-line {
      display: flex;
      align-items: center;
      gap: 10px;

      .prompt { color: var(--accent-green); font-weight: 700; }
      .cmd { color: #e6edf3; }
      .cursor {
        color: var(--accent-primary);
        font-weight: 100;
        &.blink { animation: blink 1s step-end infinite; }
      }
    }

    .terminal-output {
      margin-top: 12px;

      .output-line {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 3px 0;
        color: #8b949e;
        font-size: 0.8rem;

        .out-label { color: var(--accent-green); min-width: 14px; }
        .out-text { color: #c9d1d9; }

        &.prompt-line {
          margin-top: 8px;
          .prompt2 { color: var(--accent-purple, #7c5cfc); }
          .waiting { color: #6e7e9a; font-style: italic; }
        }
      }
    }

    /* ===== Stats ===== */
    .stats-section {
      padding: 48px 0;
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0;
    }

    .stat-item {
      text-align: center;
      padding: 24px;
      border-right: 1px solid var(--border-color);

      &:last-child { border-right: none; }

      .stat-value {
        font-size: 2.2rem;
        font-weight: 900;
        font-family: var(--font-mono);
        letter-spacing: -0.02em;
        margin-bottom: 4px;
      }

      .stat-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 4px;
      }

      .stat-desc {
        font-size: 0.78rem;
        color: var(--text-muted);
      }
    }

    /* ===== Overview ===== */
    .overview-section { background: var(--bg-primary); }

    .overview-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .overview-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 32px;
      transition: all 0.3s;

      &:hover {
        border-color: var(--border-accent);
        transform: translateY(-4px);
        box-shadow: var(--shadow-hover);
      }

      .overview-icon {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        font-size: 1.5rem;
      }

      h3 {
        font-size: 1.15rem;
        font-weight: 700;
        margin-bottom: 12px;
      }

      p {
        font-size: 0.9rem;
        line-height: 1.7;
        color: var(--text-secondary);
        margin-bottom: 20px;
      }

      .overview-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    }

    /* ===== Feature Tabs ===== */
    .feature-preview-section { background: var(--bg-secondary); }

    .feature-tabs {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      overflow: hidden;
    }

    .tab-nav {
      display: flex;
      border-bottom: 1px solid var(--border-color);
      overflow-x: auto;
    }

    .tab-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px 24px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
      white-space: nowrap;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: all 0.2s;

      &:hover { color: var(--text-primary); background: rgba(255,255,255,0.03); }
      &.active { color: var(--accent-primary); border-bottom-color: var(--accent-primary); }
    }

    .tab-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      min-height: 400px;
    }

    .tab-info {
      padding: 48px;
      border-right: 1px solid var(--border-color);

      h3 { font-size: 1.5rem; margin-bottom: 16px; }
      p { margin-bottom: 24px; }
    }

    .feature-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 8px;

      li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 0.9rem;
        color: var(--text-secondary);

        svg { color: var(--accent-green); flex-shrink: 0; margin-top: 2px; }
      }
    }

    .tab-visual {
      padding: 32px;
      display: flex;
      align-items: center;
    }

    .tab-visual .code-block {
      width: 100%;
      font-size: 0.8rem;
      line-height: 1.6;

      pre {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-all;
      }
    }

    /* ===== Provider Section ===== */
    .provider-section { background: var(--bg-primary); }

    .provider-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    .provider-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 28px;
      text-align: center;
      transition: all 0.3s;

      &:hover {
        border-color: var(--border-accent);
        transform: translateY(-4px);
        box-shadow: var(--shadow-hover);
      }

      .provider-logo {
        font-size: 2.5rem;
        margin-bottom: 16px;
      }

      h4 {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 10px;
      }

      p {
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin-bottom: 16px;
      }

      .provider-features {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        justify-content: center;
      }
    }

    /* ===== Architecture Preview ===== */
    .arch-preview-section { background: var(--bg-secondary); }

    .arch-preview-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .arch-text {
      .section-tag { margin-bottom: 16px; }
      h2 {
        font-size: 2.2rem;
        font-weight: 800;
        margin-bottom: 20px;
        background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-secondary) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      p { margin-bottom: 32px; }
    }

    .arch-layers {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;
    }

    .arch-layer {
      display: flex;
      align-items: center;
      gap: 16px;

      .layer-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .layer-info {
        display: flex;
        flex-direction: column;
        gap: 2px;

        strong {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        span {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
      }
    }

    .arch-diagram {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .diagram-box {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: all 0.3s;

      &:hover {
        border-color: var(--border-accent);
        box-shadow: var(--shadow-glow);
      }

      span { font-size: 1.5rem; }
      strong { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
      small { font-size: 0.75rem; color: var(--text-muted); }

      &.highlight {
        background: linear-gradient(135deg, rgba(124, 92, 252, 0.1) 0%, rgba(92, 138, 255, 0.1) 100%);
        border-color: rgba(124, 92, 252, 0.3);
      }
    }

    /* ===== Deep Dive Banner ===== */
    .deep-dive-banner {
      padding: 48px 0;
      background: linear-gradient(135deg, rgba(255,140,66,0.06) 0%, rgba(255,77,109,0.06) 100%);
      border-top: 1px solid rgba(255,140,66,0.15);
      border-bottom: 1px solid rgba(255,140,66,0.15);

      .banner-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
      }

      .banner-left {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        flex: 1;
      }

      .banner-tag {
        background: linear-gradient(135deg, #ff8c42, #ff4d6d);
        color: white;
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        padding: 3px 10px;
        border-radius: 4px;
        white-space: nowrap;
        margin-top: 4px;
        flex-shrink: 0;
      }

      h3 {
        font-size: 1.2rem;
        font-weight: 800;
        margin-bottom: 8px;
        color: var(--text-primary);
      }

      p {
        font-size: 0.88rem;
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.6;
      }
    }

    /* ===== CTA ===== */
    .cta-section {
      padding: 100px 0;
      background: var(--bg-primary);
    }

    .cta-inner {
      position: relative;
      text-align: center;
      padding: 80px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      overflow: hidden;

      .cta-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        height: 300px;
        background: radial-gradient(ellipse, rgba(124, 92, 252, 0.15) 0%, transparent 70%);
        pointer-events: none;
      }

      h2 {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 16px;
        position: relative;
      }

      p {
        font-size: 1.1rem;
        margin-bottom: 40px;
        position: relative;
      }
    }

    .cta-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
    }

    @media (max-width: 1024px) {
      .stats-grid { grid-template-columns: repeat(3, 1fr); }
      .overview-grid { grid-template-columns: repeat(2, 1fr); }
      .provider-grid { grid-template-columns: repeat(2, 1fr); }
      .arch-preview-inner { grid-template-columns: 1fr; gap: 40px; }
      .tab-content { grid-template-columns: 1fr; }
      .tab-visual { display: none; }
    }

    @media (max-width: 768px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .stat-item { border-right: none; border-bottom: 1px solid var(--border-color); }
      .overview-grid { grid-template-columns: 1fr; }
      .provider-grid { grid-template-columns: 1fr; }
      .cta-inner { padding: 40px 24px; }
      .cta-inner h2 { font-size: 1.8rem; }
    }
  `]
})
export class HomeComponent implements OnInit {
  typedText = signal('');
  showCursor = signal(true);
  showOutput = signal(false);
  activeTab = signal(0);

  private fullText = 'claude --model claude-opus-4-5';

  stats = [
    { value: '40+', label: '工具', desc: 'Built-in Tools' },
    { value: '80+', label: '斜線指令', desc: 'Slash Commands' },
    { value: '4', label: '雲端提供者', desc: 'API Providers' },
    { value: '200k', label: 'Token 上下文', desc: 'Context Window' },
    { value: '31', label: '功能旗標', desc: 'Feature Flags' },
  ];

  overviewItems = [
    {
      icon: '🖥️',
      title: '終端 REPL 介面',
      desc: 'React + Ink 驅動的終端 UI，提供豐富的互動體驗。支援語法高亮、虛擬列表渲染、鍵盤快捷鍵與自訂主題。',
      gradient: 'linear-gradient(135deg, #7c5cfc 0%, #5c8aff 100%)',
      tags: ['React 19', 'Ink', 'REPL', 'TypeScript']
    },
    {
      icon: '🔧',
      title: '40+ 內建工具',
      desc: '從文件讀寫、Shell 執行到 Web 抓取，提供完整的開發工具集。每個工具都有獨立的渲染組件與型別定義。',
      gradient: 'linear-gradient(135deg, #00d4aa 0%, #5c8aff 100%)',
      tags: ['File I/O', 'Shell', 'Web', 'Agent']
    },
    {
      icon: '🤖',
      title: '多代理協作',
      desc: '支援子代理（Sub-agent）生成與協調，可同時執行多個獨立任務，並通過任務系統追蹤進度與輸出。',
      gradient: 'linear-gradient(135deg, #ff8c42 0%, #ffd166 100%)',
      tags: ['Multi-Agent', 'Task Queue', 'Parallel']
    },
    {
      icon: '🔌',
      title: 'MCP 協議整合',
      desc: 'Model Context Protocol 完整支援，可動態載入外部工具、資源與提示詞，擴展 Claude Code 的能力邊界。',
      gradient: 'linear-gradient(135deg, #ff4d6d 0%, #ff8c42 100%)',
      tags: ['MCP', 'Plugin', 'Extension']
    },
    {
      icon: '🔒',
      title: '精細化權限系統',
      desc: '三層權限模式：Plan（規劃）、Auto（自動）、Manual（手動）。YOLO 分類器、路徑驗證與規則匹配確保安全執行。',
      gradient: 'linear-gradient(135deg, #7c5cfc 0%, #ff4d6d 100%)',
      tags: ['Permission', 'Security', 'Policy']
    },
    {
      icon: '💾',
      title: '會話記憶管理',
      desc: '智能上下文壓縮（Auto/Micro/API 三種模式），Session Memory 持久化，CLAUDE.md 配置，Git 上下文整合。',
      gradient: 'linear-gradient(135deg, #5c8aff 0%, #00d4aa 100%)',
      tags: ['Memory', 'Compaction', 'Context']
    }
  ];

  featureTabs = [
    {
      name: '工具系統',
      icon: '🔧',
      title: '強大的工具系統',
      desc: '40+ 內建工具，每個工具都有明確定義的輸入模式（Zod schema）、獨立的 React 渲染組件與完整的類型定義。',
      link: '/tools',
      file: 'src/tools/read-file/ReadFile.tsx',
      items: [
        '文件操作：Read、Write、Edit、Glob、Grep',
        'Shell 執行：Bash、PowerShell 支援',
        'Web 工具：WebFetch、WebSearch',
        'AI 操作：Agent 生成、MCP 資源存取',
        '任務管理：TaskCreate、TodoWrite、CronCreate'
      ],
      code: `<span class="comment">// Tool Interface Definition</span>
<span class="keyword">interface</span> <span class="type">Tool</span> {
  <span class="variable">name</span>: <span class="type">string</span>
  <span class="variable">description</span>: <span class="type">string</span>
  <span class="variable">inputSchema</span>: <span class="type">ZodSchema</span>
  <span class="function">call</span>(<span class="variable">input</span>: <span class="type">unknown</span>): <span class="type">Promise</span>&lt;<span class="type">ToolResult</span>&gt;
}

<span class="comment">// Example: ReadFile Tool</span>
<span class="keyword">export const</span> <span class="variable">ReadFileTool</span>: <span class="type">Tool</span> = {
  name: <span class="string">'Read'</span>,
  description: <span class="string">'Read file from filesystem'</span>,
  inputSchema: <span class="function">z.object</span>({
    file_path: <span class="function">z.string</span>(),
    limit: <span class="function">z.number</span>().<span class="function">optional</span>(),
    offset: <span class="function">z.number</span>().<span class="function">optional</span>(),
  }),
  <span class="keyword">async</span> <span class="function">call</span>({ file_path, limit, offset }) {
    <span class="keyword">return</span> <span class="keyword">await</span> <span class="function">readFileChunked</span>(file_path, limit, offset)
  }
}`
    },
    {
      name: '斜線指令',
      icon: '/',
      title: '80+ 斜線指令',
      desc: '豐富的斜線指令系統，涵蓋配置管理、模型選擇、會話操作與診斷工具。支援動態載入與自訂指令。',
      link: '/tools',
      file: 'src/commands/model.tsx',
      items: [
        '配置指令：/config、/settings、/keybindings',
        '模型指令：/model、/fast 切換',
        '會話指令：/resume、/export、/compact',
        '診斷指令：/doctor、/help',
        '記憶指令：/memory、/clear-history'
      ],
      code: `<span class="comment">// Slash Command Registry</span>
<span class="keyword">const</span> <span class="variable">commands</span> = [
  {
    name: <span class="string">'/model'</span>,
    description: <span class="string">'Switch Claude model'</span>,
    <span class="function">handler</span>: <span class="keyword">async</span> (<span class="variable">args</span>) => {
      <span class="keyword">const</span> <span class="variable">model</span> = <span class="variable">args</span>[<span class="number">0</span>]
      <span class="keyword">await</span> <span class="function">updateConfig</span>({ model })
      <span class="keyword">return</span> <span class="string">\`Switched to \${model}\`</span>
    }
  },
  {
    name: <span class="string">'/compact'</span>,
    description: <span class="string">'Compress conversation context'</span>,
    <span class="function">handler</span>: <span class="keyword">async</span> () => {
      <span class="keyword">await</span> <span class="function">compactConversation</span>({
        mode: <span class="string">'auto'</span>,
        targetTokens: <span class="number">50000</span>
      })
    }
  }
]`
    },
    {
      name: 'API 整合',
      icon: '🌐',
      title: '多雲端 API 整合',
      desc: '抽象的 API 客戶端層，支援 Anthropic 直連、AWS Bedrock、Google Vertex AI 與 Azure，並提供流式回應處理。',
      link: '/technologies',
      file: 'src/services/api/claude.ts',
      items: [
        'Anthropic API 直連（API Key + OAuth）',
        'AWS Bedrock 整合',
        'Google Vertex AI 支援',
        'Azure Foundry 接入',
        '流式回應（Streaming）處理'
      ],
      code: `<span class="comment">// Multi-Provider API Client</span>
<span class="keyword">class</span> <span class="type">ClaudeAPIClient</span> {
  <span class="keyword">async</span> <span class="function">createMessage</span>(
    <span class="variable">params</span>: <span class="type">MessageParams</span>
  ): <span class="type">AsyncStream</span>&lt;<span class="type">MessageEvent</span>&gt; {

    <span class="keyword">const</span> <span class="variable">provider</span> = <span class="function">detectProvider</span>()

    <span class="keyword">switch</span> (<span class="variable">provider</span>) {
      <span class="keyword">case</span> <span class="string">'anthropic'</span>:
        <span class="keyword">return</span> <span class="keyword">this</span>.<span class="function">anthropicStream</span>(<span class="variable">params</span>)
      <span class="keyword">case</span> <span class="string">'bedrock'</span>:
        <span class="keyword">return</span> <span class="keyword">this</span>.<span class="function">bedrockStream</span>(<span class="variable">params</span>)
      <span class="keyword">case</span> <span class="string">'vertex'</span>:
        <span class="keyword">return</span> <span class="keyword">this</span>.<span class="function">vertexStream</span>(<span class="variable">params</span>)
      <span class="keyword">case</span> <span class="string">'azure'</span>:
        <span class="keyword">return</span> <span class="keyword">this</span>.<span class="function">azureStream</span>(<span class="variable">params</span>)
    }
  }
}`
    },
    {
      name: 'MCP 協議',
      icon: '🔌',
      title: 'Model Context Protocol',
      desc: 'MCP 完整實現，支援 stdio 與 WebSocket 傳輸，動態工具發現、資源管理與自訂提示詞注入。',
      link: '/features',
      file: 'src/services/mcp/MCPManager.ts',
      items: [
        'stdio 與 WebSocket 雙傳輸支援',
        '動態工具（Tool）發現與載入',
        '資源（Resource）管理',
        '提示詞（Prompt）模板注入',
        '34 個 MCP 服務文件（12,000+ 行）'
      ],
      code: `<span class="comment">// MCP Server Manager</span>
<span class="keyword">class</span> <span class="type">MCPManager</span> {
  <span class="keyword">private</span> <span class="variable">servers</span>: <span class="type">Map</span>&lt;<span class="type">string</span>, <span class="type">MCPServer</span>&gt;

  <span class="keyword">async</span> <span class="function">connectServer</span>(<span class="variable">config</span>: <span class="type">ServerConfig</span>) {
    <span class="keyword">const</span> <span class="variable">transport</span> = <span class="variable">config</span>.<span class="variable">type</span> === <span class="string">'stdio'</span>
      ? <span class="keyword">new</span> <span class="function">StdioTransport</span>(<span class="variable">config</span>)
      : <span class="keyword">new</span> <span class="function">WebSocketTransport</span>(<span class="variable">config</span>)

    <span class="keyword">const</span> <span class="variable">server</span> = <span class="keyword">await</span> <span class="function">MCPServer.connect</span>(<span class="variable">transport</span>)
    <span class="keyword">const</span> <span class="variable">tools</span> = <span class="keyword">await</span> <span class="variable">server</span>.<span class="function">listTools</span>()

    <span class="function">this.registerTools</span>(<span class="variable">tools</span>)
    <span class="keyword">this</span>.<span class="variable">servers</span>.<span class="function">set</span>(<span class="variable">config</span>.<span class="variable">name</span>, <span class="variable">server</span>)
  }
}`
    }
  ];

  providers = [
    {
      logo: '🤖',
      name: 'Anthropic Direct',
      desc: '官方直連 API，支援 OAuth 認證與 API Key，完整的 Claude 功能支援。',
      badgeClass: 'badge badge-purple',
      features: ['OAuth', 'API Key', 'Streaming']
    },
    {
      logo: '☁️',
      name: 'AWS Bedrock',
      desc: '透過 Amazon Bedrock 存取 Claude 模型，整合 AWS IAM 與安全體系。',
      badgeClass: 'badge badge-orange',
      features: ['IAM', 'Cross-Region', 'VPC']
    },
    {
      logo: '🔷',
      name: 'Google Vertex AI',
      desc: '透過 Google Cloud Vertex AI 平台，整合 GCP 身份驗證與服務。',
      badgeClass: 'badge badge-blue',
      features: ['gCloud Auth', 'GCP Native']
    },
    {
      logo: '🪟',
      name: 'Azure Foundry',
      desc: '透過 Azure AI Foundry 服務接入，支援企業 Azure Active Directory 認證。',
      badgeClass: 'badge badge-green',
      features: ['Azure AD', 'Enterprise']
    }
  ];

  archLayers = [
    { color: '#7c5cfc', name: '入口層 (cli.tsx)', desc: 'Commander.js CLI 定義，runtime polyfill 注入' },
    { color: '#5c8aff', name: '查詢引擎 (QueryEngine.ts)', desc: '對話狀態管理、上下文壓縮協調' },
    { color: '#00d4aa', name: '核心查詢 (query.ts)', desc: 'API 流式呼叫、工具執行、事件處理' },
    { color: '#ff8c42', name: '服務層 (services/)', desc: 'MCP、OAuth、壓縮、政策限制各子服務' },
    { color: '#ff4d6d', name: 'UI 層 (REPL.tsx)', desc: 'React/Ink 終端渲染、鍵盤輸入、狀態顯示' }
  ];

  diagBoxes = [
    { icon: '⌨️', name: 'CLI Entry', sub: 'cli.tsx', class: '' },
    { icon: '🧠', name: 'Query Engine', sub: 'QueryEngine.ts', class: 'highlight' },
    { icon: '🔀', name: 'API Query', sub: 'query.ts', class: 'highlight' },
    { icon: '🖥️', name: 'REPL UI', sub: 'REPL.tsx', class: '' },
    { icon: '🔧', name: 'Tools', sub: '40+ tools', class: '' },
    { icon: '🌐', name: 'API Client', sub: 'claude.ts', class: '' },
    { icon: '🔌', name: 'MCP', sub: '34 files', class: '' },
    { icon: '💾', name: 'State', sub: 'AppState', class: '' }
  ];

  ngOnInit() {
    this.typeText();
  }

  setTab(index: number) {
    this.activeTab.set(index);
  }

  private typeText() {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= this.fullText.length) {
        this.typedText.set(this.fullText.substring(0, i));
        i++;
      } else {
        clearInterval(interval);
        this.showCursor.set(false);
        setTimeout(() => {
          this.showOutput.set(true);
        }, 300);
      }
    }, 60);
  }
}
