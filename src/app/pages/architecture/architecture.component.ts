import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-tag">架構設計</span>
        <h1>完整架構設計</h1>
        <p>基於 v2.1.88 Source Map 還原 · 1906 個 TypeScript 文件 · 51.2 萬行代碼</p>
      </div>
    </div>

    <!-- Runtime Core (Services + State + Build merged) -->
    <section class="section runtime-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">核心模組</span>
          <h2>核心運行時模組</h2>
          <p>服務層、狀態管理與 Bun 建構系統三者融合，構成 Claude Code 的運行時基礎</p>
        </div>

        <div class="runtime-layout">

          <!-- Services column -->
          <div class="runtime-col">
            <div class="rcol-label">服務模組</div>
            <div class="service-list">
              <div class="service-row" *ngFor="let s of serviceModules">
                <div class="sr-icon" [style.color]="s.color">{{ s.icon }}</div>
                <div class="sr-body">
                  <div class="sr-title">
                    <strong>{{ s.name }}</strong>
                    <code>{{ s.path }}</code>
                    <span class="badge badge-purple sr-size">{{ s.size }}</span>
                  </div>
                  <p>{{ s.desc }}</p>
                  <div class="sr-files">
                    <code *ngFor="let f of s.files">{{ f.name }}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- State + Build column -->
          <div class="runtime-col">
            <div class="rcol-label">狀態管理</div>
            <div class="state-mini-grid">
              <div class="smg-card">
                <h5>AppState Context</h5>
                <p>React Context API 管理全局狀態（對話歷史、工具、Token 計數、permissionMode）</p>
                <code>src/state/AppState.tsx</code>
              </div>
              <div class="smg-card">
                <h5>Store (Zustand Pattern)</h5>
                <p>模組級單例管理跨組件持久化狀態：工具歷史、設定快取、toolRegistry</p>
                <code>src/state/store.ts</code>
              </div>
              <div class="smg-card">
                <h5>Session Singletons</h5>
                <div class="singleton-mini">
                  <span *ngFor="let s of singletons"><code>{{ s.name }}</code></span>
                </div>
              </div>
            </div>

            <div class="rcol-label" style="margin-top:24px">Bun 建構系統</div>
            <div class="build-mini">
              <div class="bm-flow">
                <span *ngFor="let step of buildSteps; let last = last">
                  <code>{{ step.name }}</code>
                  <span class="bm-arrow" *ngIf="!last">→</span>
                </span>
              </div>
              <div class="bm-outputs">
                <div *ngFor="let o of buildOutputs">
                  <strong>{{ o.name }}</strong>
                  <span>{{ o.size }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Full Architecture Overview -->
    <section class="section full-arch-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">完整架構</span>
          <h2>Claude Code 完整架構拆解</h2>
          <p>基於 v2.1.88 Source Map 還原 · 1906 個 TypeScript 文件 · 51.2 萬行代碼</p>
        </div>

        <div class="arch-cols-grid">
          <div class="arch-col" *ngFor="let col of archCols">
            <div class="acol-header" [style.background]="col.gradient">
              <span class="acol-num">{{ col.num }}</span>
              <div>
                <strong>{{ col.title }}</strong>
                <small>{{ col.sub }}</small>
              </div>
            </div>
            <div class="acol-cards">
              <div class="acol-card" *ngFor="let card of col.cards">
                <div class="acard-title">{{ card.name }}</div>
                <ul class="acard-items">
                  <li *ngFor="let item of card.items">{{ item }}</li>
                </ul>
                <div class="acard-files">
                  <code *ngFor="let f of card.files">{{ f }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Five Entry Modes -->
    <section class="section entry-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">入口層</span>
          <h2>五種運行入口模式</h2>
          <p>Claude Code 支持多種啟動模式，每種模式針對不同的使用場景</p>
        </div>
        <div class="entry-grid">
          <div class="entry-card" *ngFor="let e of entryModes">
            <div class="entry-icon" [style.background]="e.gradient">{{ e.icon }}</div>
            <div class="entry-body">
              <h4>{{ e.name }}</h4>
              <p>{{ e.desc }}</p>
              <div class="entry-tags">
                <code *ngFor="let t of e.tags">{{ t }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cross-cutting Concerns (merged: Permission + Hooks + Commands + Cost) -->
    <section class="section cross-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">橫切面機制</span>
          <h2>安全 · 鉤子 · 命令 · 遙測</h2>
          <p>貫穿整個系統的橫切面關注點，每個機制詳細說明請參見功能特性頁面</p>
        </div>
        <div class="cross-grid">
          <div class="cross-card" *ngFor="let c of crossItems">
            <div class="cc-head">
              <span class="cc-dot" [style.background]="c.color"></span>
              <strong>{{ c.title }}</strong>
            </div>
            <ul>
              <li *ngFor="let p of c.points">{{ p }}</li>
            </ul>
            <div class="cc-files">
              <code *ngFor="let f of c.files">{{ f }}</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Codenames -->
    <section class="section codename-section">
      <div class="container">
        <div class="codename-layout">
          <div class="codename-main">
            <div class="section-header" style="text-align:left;padding:0 0 28px">
              <span class="section-tag">內部代號</span>
              <h2>Source Codenames</h2>
              <p>源碼中發現的內部命名，幫助識別版本與組件</p>
            </div>
            <div class="codename-list">
              <div class="cn-item" *ngFor="let c of codeNames">
                <span class="cn-name">{{ c.name }}</span>
                <span class="cn-sep">→</span>
                <span class="cn-desc">{{ c.desc }}</span>
              </div>
            </div>
          </div>
          <div class="codename-side">
            <div class="tech-ref-box">
              <div class="trb-icon">⚡</div>
              <div>
                <strong>技術棧詳細分析</strong>
                <p>TypeScript + Bun · React/Ink · Zod v4 · &#64;anthropic-ai/sdk · MCP SDK · lodash-es</p>
                <a routerLink="/technologies" class="trb-link">查看完整技術棧 →</a>
              </div>
            </div>
            <div class="tech-ref-box">
              <div class="trb-icon">🔬</div>
              <div>
                <strong>深度機制解析</strong>
                <p>Agent 循環、壓縮體系、快取分裂、並發讀寫等 8 個核心機制的源碼級分析</p>
                <a routerLink="/deep-dive" class="trb-link">進入深度解析 →</a>
              </div>
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

    /* Arch Layers */
    .arch-layers-visual {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .arch-layer-item {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-left: 4px solid;
      border-radius: var(--radius-md);
      padding: 24px 28px;
      transition: all 0.3s;

      &:hover { background: var(--bg-card-hover); box-shadow: var(--shadow-card); }

      .layer-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 12px;

        .layer-badge {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .layer-title {
          flex: 1;
          h3 { font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
          .layer-file { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); }
        }

        .layer-size {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          white-space: nowrap;
        }
      }

      p { font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px; }

      .layer-items { display: flex; flex-wrap: wrap; gap: 8px; }
    }

    /* Flow */
    .flow-section { background: var(--bg-secondary); }

    .flow-diagram {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      max-width: 600px;
      margin: 0 auto;
    }

    .flow-node {
      width: 100%;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px 24px;
      text-align: center;
      transition: all 0.3s;

      &:hover { border-color: var(--border-accent); }

      .flow-icon { font-size: 1.5rem; margin-bottom: 6px; }
      strong { display: block; font-size: 0.95rem; font-weight: 700; }
      small { font-size: 0.78rem; color: var(--text-secondary); }
      .flow-detail { font-size: 0.75rem; color: var(--accent-green); margin-top: 4px; font-family: var(--font-mono); }

      &.highlight-node {
        background: linear-gradient(135deg, rgba(124, 92, 252, 0.1), rgba(92, 138, 255, 0.1));
        border-color: rgba(124, 92, 252, 0.3);
      }

      &.user-node { background: linear-gradient(135deg, rgba(0, 212, 170, 0.08), rgba(92, 138, 255, 0.08)); border-color: rgba(0, 212, 170, 0.2); }
      &.api-node { background: linear-gradient(135deg, rgba(255, 77, 109, 0.08), rgba(255, 140, 66, 0.08)); border-color: rgba(255, 77, 109, 0.2); }

      &.small-node { padding: 14px 20px; }
    }

    .flow-connector {
      font-size: 1.5rem;
      color: var(--accent-primary);
      padding: 8px 0;
    }

    .flow-row {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    /* Services */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .service-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 28px;
      transition: all 0.3s;

      &:hover { border-color: var(--border-accent); transform: translateY(-4px); box-shadow: var(--shadow-hover); }

      .service-header {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        margin-bottom: 16px;

        .service-icon { font-size: 2rem; flex-shrink: 0; }
        h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 4px; }
        code { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
        .service-size { margin-left: auto; white-space: nowrap; font-size: 0.72rem; }
      }

      p { font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.7; }

      .service-files { display: flex; flex-direction: column; gap: 10px; }

      .service-file {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.82rem;

        .file-icon { font-size: 0.9rem; }
        code { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary); background: rgba(124,92,252,0.08); padding: 1px 6px; border-radius: 4px; white-space: nowrap; }
        span { color: var(--text-secondary); }
      }
    }

    /* State */
    .state-section { background: var(--bg-secondary); }

    .state-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .state-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 28px;

      h4 { font-size: 1rem; font-weight: 700; margin-bottom: 12px; }
      p { font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.7; }
    }

    .singleton-list { display: flex; flex-direction: column; gap: 10px; }
    .singleton-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.82rem;

      code { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 2px 8px; border-radius: 4px; white-space: nowrap; }
      span { color: var(--text-secondary); }
    }

    /* Build */
    .build-section { background: var(--bg-primary); }

    .build-flow {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }

    .build-step {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .build-step-content {
      display: flex;
      gap: 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;

      .build-step-icon { font-size: 1.5rem; }
      .build-step-info {
        strong { display: block; font-size: 0.9rem; font-weight: 700; margin-bottom: 4px; }
        span { display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px; }
        code { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 2px 8px; border-radius: 4px; }
      }
    }

    .build-arrow { font-size: 1.5rem; color: var(--accent-primary); }

    .build-output {
      h4 { font-size: 1rem; font-weight: 700; margin-bottom: 20px; }
    }

    .output-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .output-item {
      display: flex;
      gap: 12px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;

      .output-icon { font-size: 1.5rem; flex-shrink: 0; }
      .output-info {
        strong { display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; }
        span { display: block; font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 6px; }
        .output-size { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary); }
      }
    }

    /* ===== Runtime Core (merged) ===== */
    .runtime-section { background: var(--bg-secondary); }

    .runtime-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .runtime-col { display: flex; flex-direction: column; }

    .rcol-label {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent-primary);
      margin-bottom: 12px;
    }

    .service-list { display: flex; flex-direction: column; gap: 14px; }

    .service-row {
      display: flex;
      gap: 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;

      .sr-icon { font-size: 1.5rem; flex-shrink: 0; }
      .sr-body { flex: 1; min-width: 0;
        .sr-title { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 6px;
          strong { font-size: 0.88rem; font-weight: 700; color: var(--text-primary); }
          code { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); }
          .sr-size { font-size: 0.68rem; margin-left: auto; }
        }
        p { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px; }
        .sr-files { display: flex; flex-wrap: wrap; gap: 4px;
          code { font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-primary); background: rgba(124,92,252,0.08); border: 1px solid rgba(124,92,252,0.2); padding: 1px 6px; border-radius: 4px; }
        }
      }
    }

    .state-mini-grid { display: flex; flex-direction: column; gap: 10px; }

    .smg-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 14px 16px;

      h5 { font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
      p { font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.5; }
      code { font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 2px 6px; border-radius: 4px; }
    }

    .singleton-mini { display: flex; flex-wrap: wrap; gap: 6px;
      code { font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-green); background: rgba(0,212,170,0.08); border: 1px solid rgba(0,212,170,0.2); padding: 1px 7px; border-radius: 4px; }
    }

    .build-mini {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;

      .bm-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; margin-bottom: 12px;
        code { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-primary); background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2); padding: 2px 8px; border-radius: 4px; }
        .bm-arrow { color: var(--text-muted); font-size: 0.8rem; }
      }
      .bm-outputs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
        div { display: flex; flex-direction: column; gap: 2px; strong { font-size: 0.78rem; font-weight: 700; color: var(--text-primary); } span { font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-primary); } }
      }
    }

    /* ===== Cross-cutting Concerns (merged) ===== */
    .cross-section { background: var(--bg-primary); }

    .cross-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .cross-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;

      .cc-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        .cc-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        strong { font-size: 0.92rem; font-weight: 700; color: var(--text-primary); }
      }
      ul { margin: 0 0 12px 16px; padding: 0; list-style: disc;
        li { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.7; }
      }
      .cc-files { display: flex; flex-wrap: wrap; gap: 6px;
        code { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 1px 7px; border-radius: 4px; }
      }
    }

    /* ===== Codenames ===== */
    .codename-layout {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 48px;
      align-items: start;
    }

    .tech-ref-box {
      display: flex;
      gap: 16px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 16px;

      .trb-icon { font-size: 1.5rem; flex-shrink: 0; }
      strong { display: block; font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
      p { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px; }
      .trb-link { font-size: 0.78rem; color: var(--accent-primary); text-decoration: none; font-weight: 600;
        &:hover { text-decoration: underline; }
      }
    }

    @media (max-width: 1024px) {
      .services-grid { grid-template-columns: 1fr; }
      .state-grid { grid-template-columns: 1fr; }
      .output-grid { grid-template-columns: repeat(2, 1fr); }
      .runtime-layout { grid-template-columns: 1fr; }
      .codename-layout { grid-template-columns: 1fr; }
    }

    @media (max-width: 768px) {
      .build-flow { flex-direction: column; }
      .output-grid { grid-template-columns: 1fr; }
      .cross-grid { grid-template-columns: 1fr; }
    }

    /* ===== Full Architecture ===== */
    .full-arch-section { background: var(--bg-primary); }

    .arch-cols-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }

    .arch-col {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .acol-header {
      border-radius: 10px;
      padding: 14px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 4px;

      .acol-num { font-family: var(--font-mono); font-size: 1.2rem; font-weight: 900; color: rgba(255,255,255,0.9); min-width: 24px; }
      strong { display: block; font-size: 0.82rem; font-weight: 800; color: white; }
      small { font-size: 0.7rem; color: rgba(255,255,255,0.7); }
    }

    .acol-cards { display: flex; flex-direction: column; gap: 8px; }

    .acol-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 14px;

      .acard-title { font-size: 0.8rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }

      .acard-items { margin: 0 0 8px 14px; padding: 0; list-style: disc;
        li { font-size: 0.73rem; color: var(--text-secondary); line-height: 1.6; }
      }

      .acard-files { display: flex; flex-wrap: wrap; gap: 4px;
        code { font-family: var(--font-mono); font-size: 0.65rem; color: var(--accent-primary); background: rgba(124,92,252,0.08); border: 1px solid rgba(124,92,252,0.2); padding: 1px 6px; border-radius: 4px; }
      }
    }

    /* ===== Entry Modes ===== */
    .entry-section { background: var(--bg-secondary); }

    .entry-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }

    .entry-card {
      display: flex;
      gap: 16px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      transition: all 0.25s;

      &:hover { border-color: var(--border-accent); box-shadow: var(--shadow-card); }

      .entry-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
      .entry-body { flex: 1;
        h4 { font-size: 0.92rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
        p { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 10px; }
        .entry-tags { display: flex; flex-wrap: wrap; gap: 4px;
          code { font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-secondary); background: rgba(92,138,255,0.1); border: 1px solid rgba(92,138,255,0.2); padding: 1px 7px; border-radius: 4px; }
        }
      }
    }

    /* ===== Safety ===== */
    .safety-section { background: var(--bg-primary); }

    .safety-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }

    .safety-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;

      .sc-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        .sc-badge { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; border: 1px solid; padding: 2px 8px; border-radius: 4px; white-space: nowrap; }
        h4 { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
      }
      p { font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.6; }
      .sc-list { margin: 0 0 12px 16px; padding: 0; list-style: disc;
        li { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.7; }
      }
      .sc-file { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 3px 8px; border-radius: 4px; display: inline-block; }
    }

    /* ===== Hooks ===== */
    .hooks-section { background: var(--bg-secondary); }

    .hooks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin-bottom: 20px; }

    .hooks-group {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;

      .hg-header { background: rgba(124,92,252,0.12); border-bottom: 1px solid var(--border-color); padding: 10px 16px; font-size: 0.78rem; font-weight: 700; color: var(--accent-primary); }
      .hg-hooks { padding: 12px; display: flex; flex-direction: column; gap: 8px; }
      .hg-hook { display: flex; flex-direction: column; gap: 2px;
        code { font-family: var(--font-mono); font-size: 0.73rem; color: var(--accent-secondary); }
        span { font-size: 0.73rem; color: var(--text-muted); }
      }
    }

    .hooks-note {
      font-size: 0.82rem;
      color: var(--text-secondary);
      background: rgba(124,92,252,0.05);
      border: 1px solid rgba(124,92,252,0.2);
      padding: 12px 16px;
      border-radius: 8px;

      strong { color: var(--accent-primary); }
    }

    /* ===== Commands ===== */
    .commands-section { background: var(--bg-primary); }

    .cmd-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }

    .cmd-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      transition: all 0.25s;

      &:hover { border-color: var(--border-accent); }

      .cc-icon { font-size: 1.5rem; margin-bottom: 10px; }
      h4 { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
      p { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px; }
      .cc-tags { display: flex; flex-wrap: wrap; gap: 6px;
        span { font-size: 0.7rem; color: var(--text-muted); background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: 4px; }
      }
    }

    /* ===== Cost ===== */
    .cost-section { background: var(--bg-secondary); }

    .cost-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }

    .cost-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;

      .cost-icon { font-size: 1.5rem; margin-bottom: 10px; }
      h4 { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
      p { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 10px; }
      code { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-green); background: rgba(0,212,170,0.08); border: 1px solid rgba(0,212,170,0.2); padding: 3px 8px; border-radius: 4px; display: inline-block; }
    }

    /* ===== Special Features ===== */
    .special-section { background: var(--bg-primary); }

    .special-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }

    /* ===== Codenames ===== */
    .codename-section { background: var(--bg-secondary); }

    .codename-list { display: flex; flex-direction: column; gap: 10px; }
    .cn-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 8px;

      .cn-name { font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--accent-orange); min-width: 90px; }
      .cn-sep { color: var(--text-muted); }
      .cn-desc { font-size: 0.8rem; color: var(--text-secondary); }
    }

    @media (max-width: 1200px) {
      .arch-cols-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 1024px) {
      .arch-cols-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .arch-cols-grid { grid-template-columns: 1fr 1fr; }
      .cross-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 480px) {
      .arch-cols-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ArchitectureComponent {
  appStateCode = `<span class="keyword">interface</span> <span class="type">AppState</span> &#123;
  <span class="variable">messages</span>: <span class="type">Message</span>[]
  <span class="variable">currentTool</span>: <span class="type">Tool</span> | <span class="keyword">null</span>
  <span class="variable">isLoading</span>: <span class="type">boolean</span>
  <span class="variable">model</span>: <span class="type">string</span>
  <span class="variable">tokenCount</span>: <span class="type">number</span>
  <span class="variable">permissionMode</span>: <span class="type">PermMode</span>
  <span class="variable">mcpServers</span>: <span class="type">MCPServer</span>[]
&#125;`;

  storeCode = `<span class="keyword">const</span> <span class="variable">useStore</span> = <span class="function">create</span>&lt;<span class="type">Store</span>&gt;()(<span class="variable">set</span> => (&#123;
  <span class="variable">toolHistory</span>: [],
  <span class="variable">config</span>: <span class="function">loadConfig</span>(),
  <span class="function">addToolCall</span>: (<span class="variable">tool</span>) =>
    <span class="function">set</span>(<span class="variable">state</span> => (&#123;
      <span class="variable">toolHistory</span>: [
        ...<span class="variable">state</span>.<span class="variable">toolHistory</span>,
        <span class="variable">tool</span>
      ]
    &#125;)),
&#125;))`;

  archLayers = [
    {
      name: '入口層 — CLI Entry',
      file: 'src/entrypoints/cli.tsx',
      size: '~200 行',
      color: '#7c5cfc',
      desc: 'Commander.js 的 CLI 定義入口，負責 runtime polyfill 注入、環境偵測、參數解析，並啟動 React/Ink 渲染引擎。',
      items: ['Commander.js', 'Runtime Polyfill', 'Bun 環境偵測', 'argv 解析', 'Ink render()']
    },
    {
      name: '查詢引擎層 — Query Engine',
      file: 'src/query/QueryEngine.ts',
      size: '~1,320 行',
      color: '#5c8aff',
      desc: '高層協調器，管理完整的對話生命週期：對話狀態維護、Token 追蹤、上下文壓縮決策、工具執行協調。',
      items: ['對話狀態管理', 'Token 計數', '壓縮策略決策', '工具執行協調', '錯誤恢復']
    },
    {
      name: '核心查詢層 — Query Core',
      file: 'src/query/query.ts',
      size: '~1,732 行',
      color: '#00d4aa',
      desc: '實際的 API 呼叫與串流事件處理核心：構建請求參數、處理串流事件（text/tool_use/tool_result）、管理工具呼叫循環。',
      items: ['API 串流呼叫', '工具呼叫循環', '事件流處理', '重試邏輯', '成本追蹤']
    },
    {
      name: 'UI 渲染層 — REPL Screen',
      file: 'src/screens/REPL.tsx',
      size: '~5,000 行',
      color: '#ff8c42',
      desc: '主要的互動式終端界面：處理用戶鍵盤輸入、渲染訊息列表、顯示工具執行狀態與 Token 統計。',
      items: ['useInput() Hook', '虛擬列表渲染', '鍵盤快捷鍵', '狀態列顯示', 'Markdown 渲染']
    },
    {
      name: '服務層 — Services',
      file: 'src/services/',
      size: '20+ 子模組',
      color: '#ff4d6d',
      desc: '獨立的功能服務集合，每個服務專注於特定功能域：MCP 管理、OAuth 認證、上下文壓縮、政策限制、會話記憶。',
      items: ['MCP 服務 (34 文件)', 'OAuth 認證流', '壓縮服務', '政策限制', '會話記憶']
    }
  ];

  serviceModules = [
    {
      icon: '🔌', color: '#ff8c42', name: 'MCP 服務', path: 'src/services/mcp/',
      size: '34 文件 / 12k+ 行',
      desc: 'Model Context Protocol 的完整實現，管理 MCP 服務器連線、工具發現、資源管理與提示詞注入。',
      files: [
        { name: 'MCPManager.ts', desc: '服務器生命週期管理' },
        { name: 'MCPClient.ts', desc: '客戶端連線封裝' },
        { name: 'StdioTransport.ts', desc: 'stdio 傳輸實現' },
        { name: 'WebSocketTransport.ts', desc: 'WebSocket 傳輸' }
      ]
    },
    {
      icon: '🔑', color: '#7c5cfc', name: 'OAuth 認證', path: 'src/services/oauth/',
      size: '10+ 文件',
      desc: 'OAuth 2.0 完整流程實現，支援 PKCE 流程、Token 刷新、安全存儲，與 Anthropic 身份驗證服務整合。',
      files: [
        { name: 'OAuthManager.ts', desc: 'OAuth 流程協調器' },
        { name: 'PKCEFlow.ts', desc: 'PKCE 認證流程' },
        { name: 'TokenStore.ts', desc: 'Token 安全存儲' },
        { name: 'RefreshHandler.ts', desc: 'Token 自動刷新' }
      ]
    },
    {
      icon: '🗜️', color: '#00d4aa', name: '壓縮服務', path: 'src/services/compact/',
      size: '8 文件',
      desc: '三種上下文壓縮策略的實現：Auto（AI 摘要）、Micro（規則壓縮）、API（外部服務）。',
      files: [
        { name: 'CompactManager.ts', desc: '壓縮策略協調器' },
        { name: 'AutoCompact.ts', desc: 'AI 摘要壓縮' },
        { name: 'MicroCompact.ts', desc: '規則式輕量壓縮' },
        { name: 'APICompact.ts', desc: '外部 API 壓縮' }
      ]
    },
    {
      icon: '🛡️', color: '#ff4d6d', name: '政策限制', path: 'src/services/policyLimits/',
      size: '6 文件',
      desc: 'Policy 執行引擎，管理 API 呼叫限制、費用上限、操作白名單與黑名單規則。',
      files: [
        { name: 'PolicyManager.ts', desc: '政策規則管理' },
        { name: 'RateLimiter.ts', desc: 'API 速率限制' },
        { name: 'CostTracker.ts', desc: '費用追蹤上限' },
        { name: 'RuleMatcher.ts', desc: '規則匹配引擎' }
      ]
    }
  ];

  singletons = [
    { name: 'apiClient', desc: 'Claude API 客戶端單例' },
    { name: 'mcpManager', desc: 'MCP 服務器連線池' },
    { name: 'sessionMemory', desc: '會話記憶存儲' },
    { name: 'configStore', desc: '配置快取' },
    { name: 'toolRegistry', desc: '工具註冊表' }
  ];

  buildSteps = [
    { icon: '📝', name: '原始碼', desc: 'src/entrypoints/cli.tsx', cmd: undefined },
    { icon: '🔍', name: 'TypeScript', desc: 'Bun TypeScript 編譯', cmd: 'bun build' },
    { icon: '✂️', name: '代碼分割', desc: '~450 個 Chunk 文件', cmd: '--splitting' },
    { icon: '🔧', name: '後處理', desc: 'import.meta.require 修補', cmd: 'build.ts' },
    { icon: '📦', name: '產出', desc: 'dist/cli.js', cmd: undefined }
  ];

  buildOutputs = [
    { icon: '⚡', name: 'dist/cli.js', desc: '主要入口文件', size: '~25MB' },
    { icon: '🗂️', name: 'dist/chunks/', desc: '代碼分割塊', size: '~450 文件' },
    { icon: '📦', name: 'npm package', desc: 'bin: claude-js', size: '發布就緒' },
    { icon: '🔗', name: 'ESM + CJS', desc: '雙模組格式支援', size: '兼容性' }
  ];

  archCols = [
    {
      num: '1', title: '入口層', sub: 'Entry Points',
      gradient: 'linear-gradient(135deg,#7c5cfc,#5c8aff)',
      cards: [
        { name: 'Interactive REPL 交互終端', items: ['React / Ink 終端 UI', 'Vim 模式 / 快捷鍵綁定', '結構化 IO / Agent SDK'], files: ['main.tsx', 'screens/', 'keybindings/'] },
        { name: 'Headless / SDK 無頭模式', items: ['--print / --stream-json', '結構化 IO / Agent SDK'], files: ['QueryEngine.ts', 'agentSdkTypes.ts'] },
        { name: 'MCP Server 模式', items: ['@modelcontextprotocol/sdk', 'StdioServerTransport'], files: ['entrypoints/mcp.ts'] },
        { name: 'Bridge / IDE 橋接', items: ['WebSocket 混合傳輸', 'JWT 鑑權 / 近程會話同步'], files: ['bridge/', 'SDKMessage'] },
        { name: 'Server / Daemon 守護進程', items: ['HTTP API 后台持久運行', 'Remote Control 遠程控制'], files: ['--daemon', '--bg'] }
      ]
    },
    {
      num: '2', title: '智能體循環', sub: 'Agent Loop',
      gradient: 'linear-gradient(135deg,#00d4aa,#5c8aff)',
      cards: [
        { name: 'QUERY LOOP 主循環', items: ['while(true) AsyncGenerator', '命令語義分類：使用/流/靜默', 'ReAct: 思考→行動→觀察', 'turnCount 循環計數'], files: ['queryLoop()', 'turnCount'] },
        { name: 'System Prompt 提示詞組裝', items: ['靜態規范 + DYNAMIC_BOUNDARY', '動態: memory / env / MCP / skills', 'KV Cache 分塊策略'], files: ['prompts.ts', 'cache scope'] },
        { name: 'API 調用層', items: ['services/spi/claude.ts', 'SSE 流式 / Beta headers', 'Bedrock profile / 模型路由'], files: ['queryModel()', 'streaming'] },
        { name: '循環控制', items: ['max-output 恢復（最多 3 次）', 'stop hooks / token budget', 'abort / fallback 模型'], files: ['stopHooks.ts', 'tokenBudget.ts'] }
      ]
    },
    {
      num: '3', title: '工具運行時', sub: 'Tool Runtime',
      gradient: 'linear-gradient(135deg,#ff8c42,#ffd166)',
      cards: [
        { name: 'tools.ts 注冊中心', items: ['getAllBaseTools() 工具清單', 'assembleToolPool 分區排序', '保 Prompt Cache 穩定'], files: ['Feature Data', 'Statsig 同步'] },
        { name: 'toolOrchestration.ts 編排', items: ['partitionToolCalls 讀寫分類', '開發安全分級 / 最大 10 并發', '上下文路徑征服應用'], files: ['isConcurrencySafe()'] },
        { name: 'Tool.ts 類型協議', items: ['buildTool 工廠函數', 'fail-closed 默認值', 'isReadOnly / isDestructive / schema'], files: ['Zod v4', 'checkPermissions'] },
        { name: 'StreamingToolExecutor', items: ['流式中并行執行工具', '近似 SSE 近似并行', '不等完成就開啟結果'], files: ['toolExecution.ts'] },
        { name: '動態工具搜索', items: ['ToolSearchTool 按需加載', '100+ 工具時不全量注入', '名字 + 一句話描述先過篩'], files: ['isToolSearchEnabled'] }
      ]
    },
    {
      num: '4', title: '執行層', sub: 'Execution Layer',
      gradient: 'linear-gradient(135deg,#ff4d6d,#ff8c42)',
      cards: [
        { name: 'Bash / Shell 終端執行', items: ['SandboxManager 沙箱', '命令語義分類：使用/流/靜默', '超時控制 / 進度展示 2000ms'], files: ['BashTool', 'PowerShell'] },
        { name: '文件系統操作', items: ['Read / Edit / Write / Glob / Grep', 'PDF / 圖片 / Notebook 支持', '設備路徑征服返回 /dev/zero'], files: ['FileReadTool', 'FileEditTool'] },
        { name: '網絡 & MCP 客戶端', items: ['WebFetch / WebSearch', 'MCP: stdio / SSE / WebSocket', 'ListResources / ReadResource'], files: ['MCPTool', 'LSPTool'] },
        { name: 'Agent / Task 子智能體', items: ['AgentTool 生成子代理', '子代理間 Mailbox 文件通訊', 'worktree 物理隔離上下文'], files: ['runAgent.ts', 'SendMessage'] },
        { name: 'Skill / 技能工具', items: ['SkillTool 加載 Markdown 指令', 'bundled 內置技能'], files: ['skills/', 'frontmatter'] }
      ]
    },
    {
      num: '5', title: '上下文與記憶', sub: 'Context & Memory',
      gradient: 'linear-gradient(135deg,#7c5cfc,#ff4d6d)',
      cards: [
        { name: 'MEMORY.md 索引 (Hot)', items: ['常駐加載 / 200 行 + 25KB 双限', '只存指針不存原內容', '截斷保護 + WARNING 追加'], files: ['memdir.ts', 'truncate'] },
        { name: '話題文件召回 (Warm)', items: ['源碼 sideQuery 智能選擇', '最多 5 個 / frontmatter 元信息', '不代代码 / 記偏好和判斷'], files: ['findRelevantMemories'] },
        { name: '歷史 & Grep 搜索 (Cold)', items: ['對話存 .json 文件', '不用 RAG / 不用向量 DB', 'Agentic Search 按需檢索'], files: ['Grep', 'Glob'] },
        { name: '五級上下文壓縮', items: ['Snip → Micro → Collapse', '+ AutoCompact → Reactive', '斷路器 3 次 / 九段式摘要策'], files: ['compact/', 'circuit breaker'] },
        { name: 'CLAUDE.md 項目配置', items: ['getClaude Mds 鏈式加載', '項目級 + 目錄級 + 全局', '靜态注入 user context'], files: ['context.ts', 'getMemoryFiles'] }
      ]
    }
  ];

  entryModes = [
    {
      icon: '💻', name: 'Interactive REPL 交互終端',
      gradient: 'linear-gradient(135deg,rgba(124,92,252,0.2),rgba(92,138,255,0.2))',
      desc: '最常用的模式，基於 React 19 + Ink 構建的全功能終端 UI，支持 Vim 鍵綁定、Markdown 渲染、工具進度展示。',
      tags: ['main.tsx', 'REPL.tsx', 'keybindings/', 'React Ink']
    },
    {
      icon: '📡', name: 'Headless / SDK 無頭模式',
      gradient: 'linear-gradient(135deg,rgba(0,212,170,0.2),rgba(92,138,255,0.2))',
      desc: '通過 --print / --stream-json 標志以無 UI 模式運行，輸出結構化 JSON，適合 CI/CD 集成和自動化腳本。',
      tags: ['--print', '--stream-json', 'QueryEngine.ts', 'agentSdkTypes.ts']
    },
    {
      icon: '🔌', name: 'MCP Server 模式',
      gradient: 'linear-gradient(135deg,rgba(255,140,66,0.2),rgba(255,209,102,0.2))',
      desc: '作為 MCP (Model Context Protocol) 服務器運行，通過 stdio 傳輸暴露所有工具，供其他 AI 系統調用。',
      tags: ['entrypoints/mcp.ts', 'StdioServerTransport', '@modelcontextprotocol/sdk']
    },
    {
      icon: '🌉', name: 'Bridge / IDE 橋接模式',
      gradient: 'linear-gradient(135deg,rgba(232,121,160,0.2),rgba(124,92,252,0.2))',
      desc: 'WebSocket 混合傳輸的 IDE 集成橋接，實現與 VS Code / JetBrains 等 IDE 的實時通訊，支持 JWT 鑑權。',
      tags: ['bridge/', 'SDKMessage', 'WebSocket', 'JWT']
    },
    {
      icon: '🖥️', name: 'Server / Daemon 守護進程',
      gradient: 'linear-gradient(135deg,rgba(255,77,109,0.2),rgba(255,140,66,0.2))',
      desc: '作為後台守護進程運行，提供 HTTP API 供遠程控制，支持會話持久化和多客戶端連接。',
      tags: ['--daemon', '--bg', 'HTTP API', 'Remote Control']
    }
  ];

  crossItems = [
    {
      color: '#7c5cfc',
      title: '權限與安全 Permission & Safety',
      points: [
        'PermissionMode: default / plan / auto / bypass 四層模式',
        'YOLO Classifier: 側邊 Claude API 預測，Circuit Breaker MAX=3',
        'Bash 安全掃描: rm -rf / dd if= 等破壞性命令正規表達式攔截',
        'Anti-Distillation: fake_tools 反訓練數據提取保護'
      ],
      files: ['permissions.ts', 'yoloClassifier.ts', 'bashSecurity.ts']
    },
    {
      color: '#00d4aa',
      title: '生命週期鉤子 Lifecycle Hooks',
      points: [
        'Tool: PreToolUse / PostToolUse / PostToolUseFailure',
        'Session: SessionStart / SessionEnd / Stop',
        'Compact: PreCompact / PostCompact / StopFailure',
        '優先級: hook > plugin > skill > command'
      ],
      files: ['hooks/', 'shell hook', 'function hook', 'agent hook']
    },
    {
      color: '#ff8c42',
      title: '命令與插件 Commands & Plugins',
      points: [
        '85+ 斜杠命令: /compact /review /commit /pr /memory ...',
        'Plugins: cmd / skill / hook / MCP / agent 五種類型',
        'Skills: Markdown prompt + allowedTools + hooks',
        'MCP Client: tool / resource / command / skill'
      ],
      files: ['commands/', 'skills/', 'plugins/']
    },
    {
      color: '#ffd166',
      title: '費用與遙測 Cost & Telemetry',
      points: [
        'cost-tracker.ts: input/output/cache_read/cache_write 分類計費',
        'OpenTelemetry: getCostCounter / getTokenCounter 接口',
        'GrowthBook: 動態功能旗標 / A/B 測試 / Session Memory 閾值',
        'tengu_* 遙測事件: lastCost / lastModelUsage 追蹤'
      ],
      files: ['cost-tracker.ts', 'openTelemetry.ts', 'growthbook.ts']
    }
  ];

  codeNames = [
    { name: 'Capybara', desc: 'Claude 4.6 變量名（源碼中大量出現）' },
    { name: 'Fennec', desc: 'Opus 4.6 內部代號' },
    { name: 'Numbat', desc: '預發布測試版本占位符' },
    { name: 'Tengu', desc: '遙測事件前綴（tengu_* 系列事件）' },
    { name: 'ANT', desc: '內部員工標識符（USER_TYPE = ANT）' },
    { name: 'Mulberry32', desc: '虛擬寵物系統使用的 PRNG 算法' }
  ];
}
