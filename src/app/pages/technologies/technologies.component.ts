import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-tag">技術棧</span>
        <h1>現代化技術架構</h1>
        <p>精選的技術組合，打造高效能、可維護的 AI 編程助手</p>
      </div>
    </div>

    <!-- Tech Overview -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">核心技術</span>
          <h2>技術棧全覽</h2>
          <p>從運行時到 UI 框架，每個技術選型背後的設計考量</p>
        </div>

        <div class="tech-categories">
          <div class="tech-category" *ngFor="let cat of techCategories">
            <div class="cat-header">
              <div class="cat-icon">{{ cat.icon }}</div>
              <div>
                <h3>{{ cat.name }}</h3>
                <p>{{ cat.desc }}</p>
              </div>
            </div>

            <div class="tech-items">
              <div class="tech-item" *ngFor="let tech of cat.techs">
                <div class="tech-header-row">
                  <div class="tech-logo" [style.background]="tech.gradient">{{ tech.icon }}</div>
                  <div class="tech-meta">
                    <strong>{{ tech.name }}</strong>
                    <span class="tech-version">{{ tech.version }}</span>
                  </div>
                  <span class="badge" [class]="tech.badgeClass">{{ tech.role }}</span>
                </div>
                <p class="tech-desc">{{ tech.desc }}</p>
                <div class="tech-why" *ngIf="tech.why">
                  <span class="why-label">為何選用：</span>
                  <span>{{ tech.why }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dependencies Detail -->
    <section class="section deps-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">相依套件</span>
          <h2>關鍵相依套件詳解</h2>
          <p>package.json 中的核心依賴分析</p>
        </div>

        <div class="deps-grid">
          <div class="dep-group" *ngFor="let group of depGroups">
            <h4 class="dep-group-title">
              <span>{{ group.icon }}</span>
              {{ group.name }}
            </h4>
            <div class="dep-list">
              <div class="dep-item" *ngFor="let dep of group.deps">
                <div class="dep-name">
                  <code>{{ dep.name }}</code>
                  <span class="dep-version">{{ dep.version }}</span>
                </div>
                <p>{{ dep.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Monorepo -->
    <section class="section mono-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Monorepo 結構</span>
          <h2>工作區套件（Workspace Packages）</h2>
          <p>自定義 Native 套件，提供底層能力支撐</p>
        </div>

        <div class="packages-grid">
          <div class="package-card" *ngFor="let pkg of packages">
            <div class="pkg-header">
              <code class="pkg-name">{{ pkg.name }}</code>
              <span class="badge badge-purple">{{ pkg.type }}</span>
            </div>
            <p>{{ pkg.desc }}</p>
            <div class="pkg-native" *ngIf="pkg.native">
              <div class="native-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
                Native (NAPI)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Quality -->
    <section class="section quality-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">代碼品質</span>
          <h2>開發工具鏈</h2>
          <p>保持代碼品質的工具與實踐</p>
        </div>

        <div class="quality-grid">
          <div class="quality-card" *ngFor="let q of qualityTools">
            <div class="quality-icon">{{ q.icon }}</div>
            <h4>{{ q.name }}</h4>
            <p>{{ q.desc }}</p>
            <div class="quality-config" *ngIf="q.config">
              <code>{{ q.config }}</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Performance -->
    <section class="section perf-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">效能設計</span>
          <h2>效能優化策略</h2>
          <p>從建構到運行時的全鏈路效能優化</p>
        </div>

        <div class="perf-grid">
          <div class="perf-card" *ngFor="let p of perfItems">
            <div class="perf-metric">{{ p.metric }}</div>
            <h4>{{ p.name }}</h4>
            <p>{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 自研狀態管理 -->
    <section class="section state-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">自研狀態管理</span>
          <h2>Zustand 風格輕量 Store</h2>
          <p>不依賴第三方庫，專為終端 Ink 渲染優化的狀態管理引擎</p>
        </div>

        <div class="state-layout">
          <div class="state-why">
            <h3>為什麼不直接用 Zustand？</h3>
            <p>Claude Code 的 UI 是在終端中用 React Ink 渲染的。終端 UI 每一幀渲染成本遠高於瀏覽器，因此需要極致精確的渲染控制。自研實現可以：</p>
            <ul>
              <li>使用 <strong>Object.is 引用比較</strong> 的 selector 訂閱，只有你關注的子樹變動才觸發重新渲染</li>
              <li>保持 <strong>Store 實例不變性</strong>，防止意外的全量重渲染</li>
              <li>在 100+ 屬性的大型 AppState 中實現精確更新</li>
            </ul>
          </div>

          <div class="state-appstate">
            <div class="as-title">AppState 核心屬性分類（100+ 個屬性）</div>
            <div class="as-groups">
              <div class="as-group" *ngFor="let g of appStateGroups">
                <div class="asg-label" [style.color]="g.color">{{ g.icon }} {{ g.name }}</div>
                <div class="asg-props">
                  <span class="asgp-tag" *ngFor="let p of g.props">{{ p }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="store-mechanics">
          <div class="sm-card" *ngFor="let m of storeMechanics">
            <div class="sm-icon">{{ m.icon }}</div>
            <div class="sm-title">{{ m.title }}</div>
            <div class="sm-desc">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 可觀測性體系 -->
    <section class="section observability-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">可觀測性</span>
          <h2>三層可觀測性體系</h2>
          <p>Debug 日誌 · OpenTelemetry 追蹤 · 隱私控制</p>
        </div>

        <div class="obs-grid">
          <div class="obs-card" *ngFor="let o of obsLayers">
            <div class="obs-icon" [style.background]="o.bg">{{ o.icon }}</div>
            <div class="obs-body">
              <div class="obs-title">{{ o.title }}</div>
              <div class="obs-desc">{{ o.desc }}</div>
              <div class="obs-tags">
                <span class="obs-tag" *ngFor="let t of o.tags">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="privacy-control">
          <div class="pc-title">🔒 三級隱私開關</div>
          <div class="pc-levels">
            <div class="pc-level" *ngFor="let lv of privacyLevels">
              <div class="pcl-badge" [style.background]="lv.color+'22'" [style.color]="lv.color">{{ lv.level }}</div>
              <div class="pcl-name">{{ lv.name }}</div>
              <div class="pcl-desc">{{ lv.desc }}</div>
            </div>
          </div>
          <div class="pc-note">
            日誌中的代碼內容與文件路徑使用特殊類型標記保護（opaque type），開發者無法意外將敏感信息寫入遙測數據。
          </div>
        </div>
      </div>
    </section>

    <!-- 多雲 Provider 支援 -->
    <section class="section provider-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">多雲 Provider</span>
          <h2>4 種 API Provider 支援</h2>
          <p>透過環境變數切換，無需修改程式碼</p>
        </div>
        <div class="provider-grid">
          <div class="pv-card" *ngFor="let p of providers">
            <div class="pvc-header" [style.borderColor]="p.color+'44'">
              <div class="pvch-logo" [style.background]="p.color+'1a'" [style.color]="p.color">{{ p.logo }}</div>
              <div class="pvch-info">
                <div class="pvchi-name">{{ p.name }}</div>
                <div class="pvchi-env"><code>{{ p.env }}</code></div>
              </div>
              <div class="pvch-badge" [style.background]="p.color+'15'" [style.color]="p.color">{{ p.badge }}</div>
            </div>
            <div class="pvc-body">
              <div class="pvcb-desc">{{ p.desc }}</div>
              <div class="pvcb-features">
                <span class="pvcbf-tag" *ngFor="let f of p.features">{{ f }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="provider-selection">
          <div class="ps-title">Provider 選擇邏輯 (src/utils/model/providers.ts)</div>
          <div class="ps-code">
            <div class="psc-line"><span class="pscl-kw">if</span> <span class="pscl-var">(CLAUDE_CODE_USE_BEDROCK)</span>  <span class="pscl-ret">→ AWS Bedrock</span></div>
            <div class="psc-line"><span class="pscl-kw">if</span> <span class="pscl-var">(CLAUDE_CODE_USE_VERTEX)</span>   <span class="pscl-ret">→ Google Vertex AI</span></div>
            <div class="psc-line"><span class="pscl-kw">if</span> <span class="pscl-var">(CLAUDE_CODE_USE_FOUNDRY)</span>  <span class="pscl-ret">→ Anthropic Foundry</span></div>
            <div class="psc-line"><span class="pscl-kw">else</span>                                <span class="pscl-ret">→ Anthropic API（預設）</span></div>
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

    /* Tech Categories */
    .tech-categories {
      display: flex;
      flex-direction: column;
      gap: 48px;
    }

    .tech-category {
      .cat-header {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 24px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border-color);

        .cat-icon { font-size: 2rem; flex-shrink: 0; }
        h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 6px; }
        p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
      }
    }

    .tech-items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .tech-item {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      transition: all 0.3s;

      &:hover { border-color: var(--border-accent); transform: translateY(-2px); box-shadow: var(--shadow-card); }

      .tech-header-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;

        .tech-logo {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .tech-meta {
          flex: 1;
          strong { display: block; font-size: 0.9rem; font-weight: 700; }
          .tech-version { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
        }
      }

      .tech-desc { font-size: 0.83rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.6; }

      .tech-why {
        font-size: 0.78rem;
        color: var(--text-secondary);
        background: rgba(255,255,255,0.03);
        border-left: 2px solid var(--accent-primary);
        padding: 8px 12px;
        border-radius: 0 4px 4px 0;

        .why-label { color: var(--accent-primary); font-weight: 600; }
      }
    }

    /* Deps */
    .deps-section { background: var(--bg-secondary); }

    .deps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .dep-group {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px;

      .dep-group-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        font-weight: 700;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
      }
    }

    .dep-list { display: flex; flex-direction: column; gap: 16px; }

    .dep-item {
      .dep-name {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;

        code { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-primary); }
        .dep-version { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
      }

      p { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; }
    }

    /* Monorepo */
    .packages-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .package-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      transition: all 0.3s;

      &:hover { border-color: var(--border-accent); transform: translateY(-2px); }

      .pkg-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;

        .pkg-name { font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-green); }
      }

      p { font-size: 0.83rem; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.6; }

      .native-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.72rem;
        font-weight: 600;
        color: var(--accent-orange);
        background: rgba(255,140,66,0.1);
        border: 1px solid rgba(255,140,66,0.3);
        padding: 3px 10px;
        border-radius: 100px;
      }
    }

    /* Quality */
    .quality-section { background: var(--bg-secondary); }

    .quality-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    .quality-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 24px;
      text-align: center;
      transition: all 0.3s;

      &:hover { border-color: var(--border-accent); transform: translateY(-4px); box-shadow: var(--shadow-hover); }

      .quality-icon { font-size: 2rem; margin-bottom: 12px; }
      h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 10px; }
      p { font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px; }
      .quality-config code { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 2px 8px; border-radius: 4px; }
    }

    /* Performance */
    .perf-section { background: var(--bg-primary); }

    .perf-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    .perf-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px;
      text-align: center;
      transition: all 0.3s;

      &:hover { border-color: var(--border-accent); transform: translateY(-4px); }

      .perf-metric {
        font-family: var(--font-mono);
        font-size: 2rem;
        font-weight: 900;
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 8px;
      }

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 10px; }
      p { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6; }
    }

    @media (max-width: 1024px) {
      .tech-items { grid-template-columns: repeat(2, 1fr); }
      .deps-grid { grid-template-columns: repeat(2, 1fr); }
      .packages-grid { grid-template-columns: repeat(2, 1fr); }
      .quality-grid { grid-template-columns: repeat(2, 1fr); }
      .perf-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 640px) {
      .tech-items { grid-template-columns: 1fr; }
      .deps-grid { grid-template-columns: 1fr; }
      .packages-grid { grid-template-columns: 1fr; }
      .quality-grid { grid-template-columns: 1fr; }
      .perf-grid { grid-template-columns: repeat(2, 1fr); }
      .provider-grid { grid-template-columns: 1fr; }
      .state-layout { grid-template-columns: 1fr; }
      .store-mechanics { grid-template-columns: repeat(2, 1fr); }
      .obs-grid { grid-template-columns: 1fr; }
      .pc-levels { grid-template-columns: 1fr; }
    }

    /* ── STATE MANAGEMENT SECTION ── */
    .state-section { background: var(--bg-secondary); }
    .state-layout { display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; margin-bottom: 24px; }
    .state-why { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; h3 { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; } p { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 12px; } ul { padding-left: 18px; } li { font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.6; } strong { color: var(--text-primary); } }
    .state-appstate { background: var(--bg-card); border: 1px solid rgba(124,92,252,.2); border-radius: var(--radius-md); padding: 20px; }
    .as-title { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 16px; }
    .as-groups { display: flex; flex-direction: column; gap: 12px; }
    .as-group { .asg-label { font-size: 0.8rem; font-weight: 700; margin-bottom: 6px; } .asg-props { display: flex; flex-wrap: wrap; gap: 5px; } }
    .asgp-tag { font-family: var(--font-mono); font-size: 0.72rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--text-muted); padding: 2px 8px; border-radius: 4px; }
    .store-mechanics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .sm-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; text-align: center; .sm-icon { font-size: 1.6rem; margin-bottom: 10px; } .sm-title { font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; } .sm-desc { font-size: 0.76rem; color: var(--text-secondary); line-height: 1.5; } }

    /* ── OBSERVABILITY SECTION ── */
    .observability-section {}
    .obs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
    .obs-card { display: flex; gap: 16px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; &:hover { border-color: var(--border-accent); } }
    .obs-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
    .obs-body { .obs-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; } .obs-desc { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 10px; } .obs-tags { display: flex; flex-wrap: wrap; gap: 5px; } }
    .obs-tag { font-size: 0.7rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--text-muted); padding: 2px 8px; border-radius: 4px; }
    .privacy-control { background: var(--bg-card); border: 1px solid rgba(0,212,170,.2); border-radius: var(--radius-md); padding: 24px; .pc-title { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; } }
    .pc-levels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px; }
    .pc-level { background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 10px; padding: 16px; .pcl-badge { font-size: 0.7rem; font-weight: 700; padding: 2px 10px; border-radius: 4px; display: inline-block; margin-bottom: 8px; } .pcl-name { font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; } .pcl-desc { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; } }
    .pc-note { font-size: 0.78rem; color: var(--text-muted); line-height: 1.6; border-top: 1px solid var(--border-color); padding-top: 14px; }

    /* ── PROVIDER SECTION ── */
    .provider-section { background: var(--bg-secondary); }
    .provider-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
    .pv-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px; overflow: hidden; transition: all .2s; &:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,.2); } }
    .pvc-header { display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-bottom: 1px solid; }
    .pvch-logo { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0; }
    .pvch-info { flex: 1; .pvchi-name { font-size: .9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; } .pvchi-env code { font-family: var(--font-mono); font-size: .68rem; color: var(--text-muted); } }
    .pvch-badge { font-size: .65rem; font-weight: 700; padding: 2px 10px; border-radius: 4px; flex-shrink: 0; }
    .pvc-body { padding: 14px 20px; .pvcb-desc { font-size: .82rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 10px; } }
    .pvcb-features { display: flex; flex-wrap: wrap; gap: 6px; }
    .pvcbf-tag { font-size: .7rem; background: rgba(255,255,255,.04); border: 1px solid var(--border-color); color: var(--text-muted); padding: 2px 8px; border-radius: 4px; }
    .provider-selection { background: var(--bg-code); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px 24px; .ps-title { font-size: .72rem; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; letter-spacing: .06em; } .ps-code { display: flex; flex-direction: column; gap: 6px; } }
    .psc-line { display: flex; gap: 12px; align-items: center; font-family: var(--font-mono); font-size: .82rem; }
    .pscl-kw { color: #7c5cfc; font-weight: 700; } .pscl-var { color: #5c8aff; } .pscl-ret { color: #00d4aa; margin-left: auto; }
  `]
})
export class TechnologiesComponent {
  techCategories = [
    {
      icon: '⚡',
      name: '運行時 & 建構工具',
      desc: '選擇 Bun 作為主要運行時，提供比 Node.js 更快的啟動速度與更優異的 TypeScript 支援',
      techs: [
        { icon: '🐰', name: 'Bun', version: '>= 1.2.0', role: '主要', badgeClass: 'badge badge-orange', gradient: 'linear-gradient(135deg, #fbf0df, #f5b83d)', desc: '極速 JavaScript/TypeScript 運行時，支援原生 TypeScript、JSX 編譯，替代 Node.js + npm 的完整工具鏈。', why: '比 Node.js 快 3-10x 的啟動時間，內建 bundler、test runner，無需 webpack/rollup 等額外工具。' },
        { icon: '🔷', name: 'TypeScript', version: '~5.4.2', role: '語言', badgeClass: 'badge badge-blue', gradient: 'linear-gradient(135deg, #1e3a5f, #3178c6)', desc: '強型別的 JavaScript 超集，提供完整的靜態類型檢查，搭配 React Compiler 的優化輸出。', why: '確保 100k+ 行代碼庫的類型安全，TSX 支援讓終端 UI 組件與 Web 組件使用一致的語法。' },
        { icon: '📦', name: 'Bun Workspaces', version: 'Built-in', role: 'Monorepo', badgeClass: 'badge badge-green', gradient: 'linear-gradient(135deg, #1a2e1a, #28a745)', desc: 'Bun 內建的 Workspace 支援，管理 @ant/* 等內部套件，無需 Lerna 或 Turborepo 等工具。', why: '零配置 Monorepo，Native 套件可直接在 Workspace 中引用，開發體驗更流暢。' }
      ]
    },
    {
      icon: '🖥️',
      name: 'UI 框架 & 渲染引擎',
      desc: '革命性地將 React 用於終端界面渲染，打破 Web 與 CLI 的技術邊界',
      techs: [
        { icon: '⚛️', name: 'React', version: '19.2.4', role: '核心', badgeClass: 'badge badge-blue', gradient: 'linear-gradient(135deg, #1a3a4f, #61dafb)', desc: 'React 最新版本，帶來 React Compiler、並行渲染、Suspense 改進，用於終端 UI 的宣告式描述。', why: '聲明式 UI + 組件化開發讓 100+ 終端組件的維護成本大幅降低，狀態管理更清晰。' },
        { icon: '🖋️', name: 'Ink', version: '5.x', role: 'Terminal UI', badgeClass: 'badge badge-purple', gradient: 'linear-gradient(135deg, #2d1b69, #7c5cfc)', desc: '基於 React Reconciler 的終端渲染引擎，將 React 組件渲染為 ANSI 終端輸出。', why: '讓終端 UI 可以使用 React 的全部能力：useState、useEffect、Context，極大提升開發效率。' },
        { icon: '🔀', name: 'react-reconciler', version: '0.33.0', role: '自訂', badgeClass: 'badge badge-orange', gradient: 'linear-gradient(135deg, #4f2d1b, #ff8c42)', desc: '自訂 React Reconciler 實現（src/ink/），讓 React 的虛擬 DOM 差異算法驅動終端輸出。', why: '比直接操作終端 API 更高效，差異更新避免不必要的重繪，確保流暢的使用體驗。' }
      ]
    },
    {
      icon: '🤖',
      name: 'AI & API 整合',
      desc: '完整的 AI API 客戶端生態，支援主流雲端提供者',
      techs: [
        { icon: '🧠', name: '@anthropic-ai/sdk', version: '0.80.0', role: '核心 API', badgeClass: 'badge badge-purple', gradient: 'linear-gradient(135deg, #2d1b69, #7c5cfc)', desc: 'Anthropic 官方 SDK，提供 Claude API 的完整 TypeScript 封裝，支援串流回應與工具呼叫。', why: '官方支援的串流處理、自動重試、Token 計數等能力，減少自行實現的工程負擔。' },
        { icon: '🔌', name: '@modelcontextprotocol/sdk', version: '1.29.0', role: 'MCP', badgeClass: 'badge badge-green', gradient: 'linear-gradient(135deg, #1a3a1a, #28a745)', desc: 'Model Context Protocol 官方 SDK，實現工具、資源、提示詞的標準化協議通信。', why: 'MCP 開放標準讓 Claude Code 的工具生態可以被第三方擴展，降低插件開發門檻。' },
        { icon: '✅', name: 'Zod', version: '4.3.6', role: 'Schema', badgeClass: 'badge badge-yellow', gradient: 'linear-gradient(135deg, #3f3a1a, #ffd166)', desc: '運行時 Schema 驗證庫，用於所有工具輸入的類型驗證，確保 AI 生成的參數符合規範。', why: '提供 TypeScript 類型推導 + 運行時驗證的雙重保障，防止錯誤的工具輸入導致系統崩潰。' }
      ]
    },
    {
      icon: '📊',
      name: '可觀測性 & 監控',
      desc: 'OpenTelemetry 全棧可觀測性，企業級監控能力',
      techs: [
        { icon: '📡', name: '@opentelemetry/api', version: '1.x', role: '追蹤', badgeClass: 'badge badge-blue', gradient: 'linear-gradient(135deg, #1a2a3f, #5c8aff)', desc: 'OpenTelemetry 標準 API，提供分散式追蹤、指標收集與日誌記錄的統一界面。', why: '業界標準的可觀測性框架，可與任何 OTel 兼容的後端（Jaeger、Prometheus）整合。' },
        { icon: '📈', name: '@opentelemetry/sdk-metrics', version: '1.x', role: '指標', badgeClass: 'badge badge-green', gradient: 'linear-gradient(135deg, #1a3a1a, #00d4aa)', desc: 'OpenTelemetry 指標 SDK，收集 API 呼叫次數、延遲、Token 使用量等關鍵業務指標。', why: '提供細粒度的效能監控，幫助識別瓶頸與優化方向。' },
        { icon: '🔍', name: '@opentelemetry/sdk-trace-node', version: '1.x', role: '追蹤', badgeClass: 'badge badge-orange', gradient: 'linear-gradient(135deg, #3f2a1a, #ff8c42)', desc: 'Node.js 端的 OTel 追蹤 SDK，記錄從用戶輸入到 API 回應的完整請求鏈路。', why: '跨越多個工具呼叫的完整追蹤，快速定位多步驟工作流中的問題。' }
      ]
    }
  ];

  depGroups = [
    {
      icon: '🎨', name: 'UI & 終端輸出',
      deps: [
        { name: 'chalk', version: '^5.x', desc: '終端顏色輸出，支援 256 色與真彩色，用於增強 CLI 視覺效果' },
        { name: 'cli-highlight', version: '^2.x', desc: '終端代碼語法高亮，基於 highlight.js 適配終端 ANSI 輸出' },
        { name: '@alcalzone/ansi-tokenize', version: '^0.x', desc: 'ANSI escape code 解析器，用於處理終端控制序列' },
        { name: 'highlight.js', version: '^11.x', desc: '語法高亮引擎，支援 180+ 程式語言的語法識別' }
      ]
    },
    {
      icon: '🌐', name: 'Web & 網路',
      deps: [
        { name: 'ws', version: '^8.20.0', desc: 'WebSocket 客戶端/服務器實現，用於 MCP WebSocket 傳輸模式' },
        { name: 'node-fetch', version: '^3.x', desc: 'Fetch API polyfill，用於 HTTP 請求的統一介面' },
        { name: 'yaml', version: '^2.8.3', desc: 'YAML 解析與序列化，用於讀取 .claude 配置文件' },
        { name: 'commander', version: '^12.x', desc: 'CLI 參數解析框架，定義 claude 命令的所有選項與子命令' }
      ]
    },
    {
      icon: '☁️', name: 'Cloud SDKs',
      deps: [
        { name: '@aws-sdk/client-bedrock-runtime', version: '^3.x', desc: 'AWS Bedrock 客戶端，用於通過 Amazon Bedrock 調用 Claude 模型' },
        { name: 'google-auth-library', version: '^9.x', desc: 'Google 雲端認證庫，支援 Vertex AI 的 OAuth 2.0 認證流程' },
        { name: '@azure/identity', version: '^4.x', desc: 'Azure 身份驗證庫，支援 Azure AD 認證與 Managed Identity' },
        { name: 'sharp', version: '^0.34.5', desc: '高效能圖片處理庫，用於圖片壓縮、格式轉換與元數據提取' }
      ]
    }
  ];

  packages = [
    { name: '@ant/color-diff-napi', type: 'NAPI', native: true, desc: 'Native 顏色差異計算模組，用於終端顏色比較與 diff 高亮顯示，比純 JS 實現效能提升 10x+。' },
    { name: '@ant/audio-capture-napi', type: 'NAPI', native: true, desc: 'Native 音頻捕獲模組，為未來的語音輸入模式（VOICE_MODE 功能旗標）提供底層支撐。' },
    { name: '@ant/image-processor-napi', type: 'NAPI', native: true, desc: 'Native 圖片處理模組，高效處理截圖、圖片壓縮等視覺內容，支援視覺功能的低延遲處理。' },
    { name: '@ant/modifiers-napi', type: 'NAPI', native: true, desc: 'Native 修飾鍵偵測模組，準確捕獲 Ctrl/Alt/Shift 等修飾鍵狀態，實現複雜的鍵盤快捷鍵。' },
    { name: '@ant/url-handler-napi', type: 'NAPI', native: true, desc: 'Native URL 處理模組，高效的 URL 解析與驗證，處理終端中可點擊 URL 的識別與格式化。' },
    { name: '@ant/sdk', type: 'SDK Stub', native: false, desc: 'Claude Code SDK 存根（Stub），提供外部開發者構建 Claude Code 插件與整合的標準介面。' }
  ];

  qualityTools = [
    { icon: '🦊', name: 'Biome', desc: '極速的 Linter + Formatter 工具，Rust 實現，速度比 ESLint + Prettier 快 10x+。', config: 'biome.json' },
    { icon: '✂️', name: 'Knip', desc: '死碼（Dead Code）偵測工具，找出未使用的 exports、文件與依賴套件。', config: 'knip.json' },
    { icon: '🔍', name: 'TypeScript Strict', desc: '啟用全部嚴格模式選項，包含 noImplicitAny、strictNullChecks 等。', config: 'tsconfig.json' },
    { icon: '📏', name: 'React Compiler', desc: 'Facebook 最新 React Compiler，自動生成 useMemo/useCallback 優化代碼。', config: 'compiler output' }
  ];

  providers = [
    {
      logo:'🟠', name:'Anthropic API', color:'#ff8c42', badge:'預設', env:'ANTHROPIC_API_KEY',
      desc:'直接呼叫 api.anthropic.com，支援所有最新功能（Extended Thinking、Prompt Cache、Beta 等）。',
      features:['所有 Beta 功能', 'Streaming SSE', 'Token Counting API']
    },
    {
      logo:'🟡', name:'AWS Bedrock', color:'#ffd166', badge:'企業', env:'CLAUDE_CODE_USE_BEDROCK=1',
      desc:'透過 Amazon Bedrock Runtime 呼叫 Claude，使用 AWS IAM 認證，符合企業安全合規要求。',
      features:['AWS IAM 認證', '資料不離 AWS 區域', 'SLA 企業保障']
    },
    {
      logo:'🔵', name:'Google Vertex AI', color:'#5c8aff', badge:'GCP', env:'CLAUDE_CODE_USE_VERTEX=1',
      desc:'透過 Google Cloud Vertex AI 呼叫 Claude，使用 GCP Service Account 認證，整合 GCP 生態。',
      features:['GCP 服務帳號認證', '指定區域 VERTEX_REGION', 'VPC 私有存取']
    },
    {
      logo:'🟣', name:'Anthropic Foundry', color:'#a78bfa', badge:'多雲', env:'CLAUDE_CODE_USE_FOUNDRY=1',
      desc:'Anthropic 管理的多雲抽象層，統一路由到最佳 Provider，同時保留 Anthropic 功能相容性。',
      features:['多雲自動路由', '與 firstParty API 相容', '企業租戶隔離']
    },
  ];

  appStateGroups = [
    { icon: '⚙️', name: '設定', color: '#7c5cfc', props: ['settings', 'globalConfig', 'localConfig', 'permissions'] },
    { icon: '📋', name: '任務', color: '#5c8aff', props: ['currentTask', 'taskQueue', 'taskHistory', 'planMode'] },
    { icon: '🔧', name: '工具', color: '#00d4aa', props: ['availableTools', 'mcpServers', 'toolResults', 'activeToolCalls'] },
    { icon: '🛡️', name: '安全', color: '#ff8c42', props: ['permissionRequests', 'yoloMode', 'deniedOps', 'sandboxState'] },
    { icon: '⚡', name: '投機執行', color: '#ffd166', props: ['speculativeQueue', 'overlayFS', 'pendingConfirm', 'pipelineState'] },
    { icon: '🧠', name: '上下文', color: '#ff4d6d', props: ['conversationHistory', 'tokenCount', 'compressionState', 'sessionMemory'] },
  ];

  storeMechanics = [
    { icon: '🎯', title: 'Selector 訂閱', desc: '使用 Object.is 引用比較，只有 selector 返回值變化時才通知訂閱者，避免無效渲染。' },
    { icon: '🔒', title: 'Store 不變性', desc: 'Store 實例引用保持不變，只有內部狀態值更新，防止因 Store 替換導致全量重渲染。' },
    { icon: '⚡', title: '批量更新', desc: '多個狀態更新合並為單次 flush，在同一事件循環中的多個 setState 只觸發一次渲染。' },
    { icon: '🔍', title: '中間件追蹤', desc: 'Debug 模式下記錄每次狀態更新的 action 類型與 diff，方便追蹤複雜的狀態流轉。' },
  ];

  obsLayers = [
    {
      icon: '📝', bg: 'linear-gradient(135deg,rgba(124,92,252,.2),rgba(92,138,255,.2))',
      title: 'Debug 日誌系統',
      desc: '多級別結構化日誌（debug/info/warn/error），寫入 ~/.claude/logs/ 目錄，輪轉策略防止磁碟佔用過大。BetaDash 模式可實時流式輸出到終端。',
      tags: ['~/.claude/logs/', 'betaDash', '結構化 JSON', '日誌輪轉']
    },
    {
      icon: '🔭', bg: 'linear-gradient(135deg,rgba(0,212,170,.2),rgba(92,138,255,.2))',
      title: 'OpenTelemetry 追蹤',
      desc: '完整的分散式追蹤支援，每次 Agent Turn 生成 Span，工具調用作為子 Span，可匯出到 Jaeger / Grafana Tempo 等後端進行性能分析。',
      tags: ['OTel Spans', 'Jaeger 匯出', 'Agent Turn 追蹤', '工具調用 Span']
    },
    {
      icon: '📊', bg: 'linear-gradient(135deg,rgba(255,209,102,.2),rgba(255,140,66,.2))',
      title: 'Statsig 遙測',
      desc: 'Statsig SDK 收集匿名使用數據與 A/B 實驗指標（如功能旗標效果），支援在 settings.json 中完全關閉，不影響核心功能。',
      tags: ['Statsig SDK', 'A/B 實驗', '功能旗標', '可完全關閉']
    },
    {
      icon: '🔔', bg: 'linear-gradient(135deg,rgba(255,77,109,.2),rgba(255,140,66,.2))',
      title: '一方事件記錄',
      desc: '內部事件系統記錄 API 呼叫次數、Token 用量、工具執行成功率等核心指標，用於產品優化與容量規劃。',
      tags: ['API 用量統計', 'Token 計費', '工具成功率', '容量規劃']
    },
  ];

  privacyLevels = [
    { level: 'Level 0', name: '全部啟用', color: '#ff4d6d', desc: '所有遙測數據正常收集，包含匿名使用統計與 A/B 實驗數據。' },
    { level: 'Level 1', name: '僅必要流量', color: '#ffd166', desc: 'Statsig 遙測關閉，只保留 API 計費相關的必要流量統計。' },
    { level: 'Level 2', name: '完全禁用', color: '#00d4aa', desc: '所有遙測與追蹤全部關閉，完全離線模式，適合高安全合規環境。' },
  ];

  perfItems = [
    { metric: '450+', name: '代碼分割塊', desc: '使用 Bun.build 代碼分割，按需載入功能模組，減少首次載入時間。' },
    { metric: '~25MB', name: '完整打包大小', desc: '所有功能的完整打包，包含所有 Node.js Native 模組的依賴。' },
    { metric: '3-10x', name: 'Bun vs Node.js', desc: 'Bun 運行時比 Node.js 快 3-10 倍的冷啟動時間，提升開發體驗。' },
    { metric: '200k', name: 'Token 上下文', desc: 'Claude 3.5+ 支援 200k Token 上下文窗口，配合壓縮策略延長可用壽命。' }
  ];
}
