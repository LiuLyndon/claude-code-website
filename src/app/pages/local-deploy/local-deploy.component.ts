import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-local-deploy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-wrap">

      <!-- Hero -->
      <section class="hero">
        <div class="container">
          <div class="hero-tag">可行性方案</div>
          <h1 class="hero-title">Claude Code <span class="hl">×</span> 本地 LLM<br>混合部署架構</h1>
          <p class="hero-desc">
            利用 Claude Code 2.1.88 的自動調教機制，整合本地 LLM（Qwen／DeepSeek）與本地知識庫，
            打造兼顧<strong>隱私安全</strong>、<strong>回應速度</strong>與<strong>推理品質</strong>的混合部署可行性方案。
          </p>
          <div class="hero-chips">
            <span class="chip chip-green">Claude Code 2.1.88</span>
            <span class="chip chip-blue">本地 LLM (Ollama)</span>
            <span class="chip chip-purple">Vector DB</span>
            <span class="chip chip-orange">智能路由</span>
            <span class="chip chip-gray">RAG 知識庫</span>
          </div>
        </div>
      </section>

      <!-- Architecture Flow SVG -->
      <section class="section">
        <div class="container">
          <div class="section-label">整體架構流程</div>
          <h2 class="section-title">混合部署端對端流程圖</h2>
          <p class="section-sub">從開發者輸入到最終輸出，展示 Claude Code 作為統一入口，透過智能路由分派任務至本地或雲端</p>

          <!-- Clarification callout -->
          <div class="arch-clarify">
            <div class="ac-row">
              <div class="ac-item ac-item-native">
                <div class="ac-icon">📂</div>
                <div class="ac-body">
                  <div class="ac-title">Claude Code 原生知識庫存取</div>
                  <div class="ac-desc">Claude Code <strong>不需要向量資料庫</strong>。它透過 <code>Glob</code>（找檔案）、<code>Grep</code>（ripgrep 搜尋）、<code>Read</code>（讀取內容）直接操作檔案系統，搜尋到的內容直接放入 context window。這是 Exact Search，精準且無需 embedding。</div>
                </div>
              </div>
              <div class="ac-divider">vs</div>
              <div class="ac-item ac-item-rag">
                <div class="ac-icon">🤖</div>
                <div class="ac-body">
                  <div class="ac-title">本地 LLM 的 RAG 管道（選用）</div>
                  <div class="ac-desc">本地 LLM（Qwen、DeepSeek 等）<strong>沒有內建的檔案存取工具</strong>，需要向量資料庫做語義搜尋。透過 MCP Server 將 RAG 結果傳回給 Claude Code，才能擴展本地 LLM 的知識範圍。</div>
                </div>
              </div>
            </div>
          </div>

          <div class="diagram-wrap">
            <svg viewBox="0 0 860 540" class="flow-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad-main" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#7c5cfc"/>
                  <stop offset="100%" style="stop-color:#00d4aa"/>
                </linearGradient>
                <linearGradient id="grad-local" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#00d4aa;stop-opacity:0.2"/>
                  <stop offset="100%" style="stop-color:#00d4aa;stop-opacity:0.04"/>
                </linearGradient>
                <linearGradient id="grad-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#7c5cfc;stop-opacity:0.2"/>
                  <stop offset="100%" style="stop-color:#7c5cfc;stop-opacity:0.04"/>
                </linearGradient>
                <marker id="arr-main" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#7c5cfc"/>
                </marker>
                <marker id="arr-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#00d4aa"/>
                </marker>
                <marker id="arr-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#ffd166"/>
                </marker>
              </defs>

              <!-- Background panels -->
              <rect x="10" y="240" width="380" height="220" rx="12" fill="url(#grad-local)" stroke="rgba(0,212,170,0.2)" stroke-width="1"/>
              <rect x="470" y="240" width="380" height="220" rx="12" fill="url(#grad-cloud)" stroke="rgba(124,92,252,0.2)" stroke-width="1"/>
              <text x="30" y="264" fill="rgba(0,212,170,0.6)" font-size="10" font-family="monospace" font-weight="700">本地路徑 (Privacy-First)</text>
              <text x="490" y="264" fill="rgba(124,92,252,0.6)" font-size="10" font-family="monospace" font-weight="700">雲端路徑 (Intelligence-First)</text>

              <!-- Developer Input -->
              <rect x="310" y="10" width="240" height="44" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
              <text x="430" y="28" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700" font-family="monospace">Developer</text>
              <text x="430" y="44" text-anchor="middle" fill="#b8c8e0" font-size="9" font-family="monospace">CLI / IDE / SDK</text>

              <!-- Arrow: Developer → Claude Code -->
              <line x1="430" y1="54" x2="430" y2="80" stroke="#7c5cfc" stroke-width="1.5" marker-end="url(#arr-main)"/>

              <!-- Claude Code 2.1.88 Orchestrator -->
              <rect x="200" y="80" width="460" height="56" rx="10" fill="rgba(124,92,252,0.15)" stroke="rgba(124,92,252,0.6)" stroke-width="2"/>
              <text x="430" y="101" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="900" font-family="monospace">Claude Code 2.1.88</text>
              <text x="430" y="118" text-anchor="middle" fill="#b8c8e0" font-size="9" font-family="monospace">Orchestrator · CLAUDE.md 自動調教 · Hooks · Custom Commands</text>

              <!-- Arrow: Claude Code → Router -->
              <line x1="430" y1="136" x2="430" y2="164" stroke="#7c5cfc" stroke-width="1.5" marker-end="url(#arr-main)"/>

              <!-- Task Router Diamond -->
              <polygon points="430,164 490,195 430,226 370,195" fill="rgba(255,209,102,0.12)" stroke="rgba(255,209,102,0.7)" stroke-width="1.5"/>
              <text x="430" y="191" text-anchor="middle" fill="#ffd166" font-size="10" font-weight="800" font-family="monospace">任務</text>
              <text x="430" y="204" text-anchor="middle" fill="#ffd166" font-size="10" font-weight="800" font-family="monospace">路由器</text>

              <!-- Branch labels -->
              <text x="255" y="228" text-anchor="middle" fill="#00d4aa" font-size="9" font-family="monospace">簡單 / 隱私敏感</text>
              <text x="605" y="228" text-anchor="middle" fill="#a78bfa" font-size="9" font-family="monospace">複雜 / 多檔案推理</text>

              <!-- Left branch arrow: Router → Local LLM -->
              <path d="M 370,195 C 280,210 160,230 140,280" stroke="#00d4aa" stroke-width="1.5" fill="none" marker-end="url(#arr-green)"/>

              <!-- Right branch arrow: Router → Claude API -->
              <path d="M 490,195 C 580,210 720,230 720,280" stroke="#7c5cfc" stroke-width="1.5" fill="none" marker-end="url(#arr-main)"/>

              <!-- Local LLM Box -->
              <rect x="30" y="280" width="220" height="58" rx="8" fill="rgba(0,212,170,0.12)" stroke="rgba(0,212,170,0.5)" stroke-width="1.5"/>
              <text x="140" y="302" text-anchor="middle" fill="#00d4aa" font-size="11" font-weight="800" font-family="monospace">本地 LLM</text>
              <text x="140" y="318" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">Qwen2.5-Coder-32B</text>
              <text x="140" y="330" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">DeepSeek-Coder · CodeStral</text>

              <!-- Claude API Box -->
              <rect x="610" y="280" width="220" height="58" rx="8" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.5)" stroke-width="1.5"/>
              <text x="720" y="302" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="800" font-family="monospace">Claude API</text>
              <text x="720" y="318" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">claude-sonnet-4-6</text>
              <text x="720" y="330" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">60-80 tok/s · 多檔案推理</text>

              <!-- Arrow: Local LLM → Local DB -->
              <line x1="140" y1="338" x2="140" y2="368" stroke="#00d4aa" stroke-width="1.5" marker-end="url(#arr-green)"/>

              <!-- Arrow: Claude API → Cloud Context -->
              <line x1="720" y1="338" x2="720" y2="368" stroke="#7c5cfc" stroke-width="1.5" marker-end="url(#arr-main)"/>

              <!-- Local LLM RAG Source -->
              <rect x="20" y="368" width="240" height="64" rx="8" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.35)" stroke-width="1.2"/>
              <text x="140" y="386" text-anchor="middle" fill="#00d4aa" font-size="10" font-weight="700" font-family="monospace">本地 LLM · RAG 知識庫</text>
              <text x="140" y="400" text-anchor="middle" fill="#ffd166" font-size="7.5" font-family="monospace">（僅本地 LLM 需要，Claude Code 不需要）</text>
              <text x="140" y="414" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">ChromaDB / pgvector · nomic-embed-text</text>
              <text x="140" y="426" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">MSSQL / PostgreSQL 業務數據</text>

              <!-- Cloud Context -->
              <rect x="600" y="368" width="240" height="64" rx="8" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.35)" stroke-width="1.2"/>
              <text x="720" y="388" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="700" font-family="monospace">雲端上下文</text>
              <text x="720" y="403" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">Web 搜尋 · MCP Server</text>
              <text x="720" y="416" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">遠端 API · 外部文件庫</text>
              <text x="720" y="427" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">RAG over cloud knowledge</text>

              <!-- Converge arrows → Output -->
              <path d="M 140,432 C 140,480 340,498 400,498" stroke="#ffd166" stroke-width="1.5" fill="none" marker-end="url(#arr-orange)"/>
              <path d="M 720,432 C 720,480 520,498 460,498" stroke="#ffd166" stroke-width="1.5" fill="none" marker-end="url(#arr-orange)"/>

              <!-- Output box -->
              <rect x="280" y="484" width="300" height="44" rx="8" fill="rgba(255,209,102,0.1)" stroke="rgba(255,209,102,0.5)" stroke-width="1.5"/>
              <text x="430" y="502" text-anchor="middle" fill="#ffd166" font-size="11" font-weight="800" font-family="monospace">結果聚合 → 開發者輸出</text>
              <text x="430" y="518" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">Claude Code UI · IDE 擴充 · SDK callback</text>
            </svg>
          </div>
        </div>
      </section>

      <!-- Three Layers -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-label">技術架構</div>
          <h2 class="section-title">三層技術架構詳解</h2>

          <div class="layers">
            <div class="layer-card">
              <div class="layer-num">L1</div>
              <div class="layer-body">
                <div class="layer-badge" style="background:rgba(124,92,252,0.15);color:#a78bfa;border-color:rgba(124,92,252,0.3)">Orchestrator</div>
                <h3>Claude Code 2.1.88 自動調教層</h3>
                <p>作為統一入口與協調者，透過 CLAUDE.md 設定行為規則、Hooks 攔截每次工具呼叫、Custom Commands 擴展能力。<strong>Claude Code 原生使用 Glob／Grep／Read 直接存取檔案系統，不需要向量資料庫</strong>——這是它的核心優勢之一。</p>
                <div class="tech-pills">
                  <span>Glob — 檔案路徑搜尋</span>
                  <span>Grep — ripgrep 全文搜尋</span>
                  <span>Read — 直接讀取檔案</span>
                  <span>CLAUDE.md 規則引擎</span>
                  <span>Hooks / Custom Commands</span>
                  <span>MCP Server 整合</span>
                </div>
              </div>
            </div>

            <div class="layer-card">
              <div class="layer-num">L2</div>
              <div class="layer-body">
                <div class="layer-badge" style="background:rgba(255,209,102,0.15);color:#ffd166;border-color:rgba(255,209,102,0.3)">Router</div>
                <h3>智能任務路由層</h3>
                <p>根據任務特徵（複雜度、隱私敏感度、多檔案依賴、回應速度要求）動態決定路由至本地 LLM 或 Claude API。可配置靜態規則或使用輕量分類器進行預測。</p>
                <div class="tech-pills">
                  <span>任務複雜度評分</span>
                  <span>隱私敏感度檢測</span>
                  <span>多檔案依賴分析</span>
                  <span>回應時間 SLA</span>
                  <span>Circuit Breaker 備援</span>
                </div>
              </div>
            </div>

            <div class="layer-card">
              <div class="layer-num">L3</div>
              <div class="layer-body">
                <div class="layer-badge" style="background:rgba(0,212,170,0.15);color:#00d4aa;border-color:rgba(0,212,170,0.3)">Execution</div>
                <h3>雙軌執行層</h3>
                <p>本地軌道由 Ollama 運行量化模型（GGUF/Q4），透過 MCP Server 讓 Claude Code 呼叫本地 LLM。<strong>若本地 LLM 需要查詢文件，才需要搭配 ChromaDB / pgvector 做 RAG</strong>；若任務僅是代碼生成，本地 LLM 不需要向量庫。雲端軌道直接使用 Claude API，由 Claude Code 原生工具提供上下文。</p>
                <div class="tech-pills">
                  <span>Ollama Runtime</span>
                  <span>MCP Server 橋接</span>
                  <span>ChromaDB / pgvector（選用）</span>
                  <span>MSSQL / PostgreSQL（選用）</span>
                  <span>Claude API SDK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Task Routing Matrix -->
      <section class="section">
        <div class="container">
          <div class="section-label">決策矩陣</div>
          <h2 class="section-title">任務路由決策矩陣</h2>
          <p class="section-sub">根據 Kunal Ganglani 的 50 任務基準測試（RTX 4070 Ti Super × Qwen2.5-Coder-32B vs Claude Sonnet）</p>

          <div class="matrix-wrap">
            <div class="matrix-header">
              <div class="mh-task">任務類型</div>
              <div class="mh-local">本地 LLM</div>
              <div class="mh-cloud">Claude API</div>
              <div class="mh-delta">差距</div>
              <div class="mh-rec">建議路由</div>
            </div>

            <div class="matrix-row" *ngFor="let row of routingMatrix">
              <div class="mr-task">
                <span class="mr-icon">{{ row.icon }}</span>
                <span>{{ row.task }}</span>
              </div>
              <div class="mr-score">
                <div class="score-bar-wrap">
                  <div class="score-bar" [style.width.%]="row.local * 20" [style.background]="'#00d4aa'"></div>
                </div>
                <span class="score-val">{{ row.local }}/5</span>
              </div>
              <div class="mr-score">
                <div class="score-bar-wrap">
                  <div class="score-bar" [style.width.%]="row.cloud * 20" [style.background]="'#7c5cfc'"></div>
                </div>
                <span class="score-val">{{ row.cloud }}/5</span>
              </div>
              <div class="mr-delta" [style.color]="row.delta > 0.4 ? '#ff4d6d' : '#ffd166'">
                {{ row.delta > 0 ? '+' : '' }}{{ row.delta.toFixed(1) }}
              </div>
              <div class="mr-rec">
                <span class="rec-badge" [style.background]="row.rec === '本地' ? 'rgba(0,212,170,0.15)' : 'rgba(124,92,252,0.15)'"
                  [style.color]="row.rec === '本地' ? '#00d4aa' : '#a78bfa'"
                  [style.border-color]="row.rec === '本地' ? 'rgba(0,212,170,0.3)' : 'rgba(124,92,252,0.3)'">
                  {{ row.rec }}
                </span>
              </div>
            </div>

            <!-- Privacy row -->
            <div class="matrix-row matrix-row-special">
              <div class="mr-task">
                <span class="mr-icon">🔒</span>
                <span>隱私敏感代碼</span>
              </div>
              <div class="mr-score">
                <div class="score-bar-wrap">
                  <div class="score-bar" style="width:80%;background:#00d4aa"></div>
                </div>
                <span class="score-val">本地強制</span>
              </div>
              <div class="mr-score">
                <div class="score-bar-wrap">
                  <div class="score-bar" style="width:0%"></div>
                </div>
                <span class="score-val">N/A</span>
              </div>
              <div class="mr-delta" style="color:#00d4aa">政策</div>
              <div class="mr-rec">
                <span class="rec-badge" style="background:rgba(0,212,170,0.15);color:#00d4aa;border-color:rgba(0,212,170,0.3)">本地</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Performance Benchmark -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-label">效能基準</div>
          <h2 class="section-title">回應速度 vs 推理品質</h2>

          <div class="perf-grid">
            <div class="perf-card">
              <h3>回應延遲</h3>
              <div class="perf-bars">
                <div class="pb-item" *ngFor="let item of latencyItems">
                  <div class="pb-label">{{ item.label }}</div>
                  <div class="pb-bar-wrap">
                    <div class="pb-bar" [style.width.%]="item.pct" [style.background]="item.color"></div>
                    <span class="pb-val">{{ item.val }}</span>
                  </div>
                  <div class="pb-note">{{ item.note }}</div>
                </div>
              </div>
            </div>

            <div class="perf-card">
              <h3>Token 生成速度</h3>
              <div class="perf-bars">
                <div class="pb-item" *ngFor="let item of tokenItems">
                  <div class="pb-label">{{ item.label }}</div>
                  <div class="pb-bar-wrap">
                    <div class="pb-bar" [style.width.%]="item.pct" [style.background]="item.color"></div>
                    <span class="pb-val">{{ item.val }}</span>
                  </div>
                  <div class="pb-note">{{ item.note }}</div>
                </div>
              </div>
            </div>

            <div class="perf-card perf-card-wide">
              <h3>整體評分（1-5 分）</h3>
              <div class="overall-bars">
                <div class="ob-row" *ngFor="let item of overallItems">
                  <div class="ob-name">{{ item.name }}</div>
                  <div class="ob-bars">
                    <div class="ob-bar-group">
                      <span class="ob-tag ob-local">本地</span>
                      <div class="ob-track">
                        <div class="ob-fill" [style.width.%]="item.local * 20" style="background:#00d4aa"></div>
                      </div>
                      <span class="ob-score">{{ item.local }}</span>
                    </div>
                    <div class="ob-bar-group">
                      <span class="ob-tag ob-cloud">雲端</span>
                      <div class="ob-track">
                        <div class="ob-fill" [style.width.%]="item.cloud * 20" style="background:#7c5cfc"></div>
                      </div>
                      <span class="ob-score">{{ item.cloud }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LLM Hardware Requirements -->
      <section class="section">
        <div class="container">
          <div class="section-label">硬體需求</div>
          <h2 class="section-title">常用本地 LLM 最低硬體配置速查</h2>
          <p class="section-sub">以 Ollama + GGUF Q4_K_M 量化為基準。CPU 推理不需顯卡但速度較慢；Apple Silicon 以統一記憶體代替獨立 VRAM，能耗比極佳。</p>

          <div class="llm-tiers">
            <div class="llm-tier" *ngFor="let tier of llmTiers">
              <div class="lt-head" [style.border-left-color]="tier.color">
                <div class="lt-left">
                  <span class="lt-icon">{{ tier.icon }}</span>
                  <div>
                    <div class="lt-label" [style.color]="tier.color">{{ tier.label }}</div>
                    <div class="lt-note">{{ tier.note }}</div>
                  </div>
                </div>
                <span class="lt-badge" *ngIf="tier.noGpu">無需顯卡</span>
              </div>
              <div class="llm-model-grid">
                <div class="lm-card" *ngFor="let m of tier.models">
                  <div class="lmc-top">
                    <span class="lmc-name">{{ m.name }}</span>
                    <span class="lmc-params" [style.background]="tier.color + '20'" [style.color]="tier.color">{{ m.params }}</span>
                  </div>
                  <div class="lmc-hw">{{ m.minHw }}</div>
                  <div class="lmc-bottom">
                    <span class="lmc-vram">VRAM: {{ m.vram }}</span>
                    <span class="lmc-speed">{{ m.speed }}</span>
                    <span class="lmc-stars">{{ m.stars }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hw-note">
            <span>📌</span>
            <span>量化建議：<strong>Q4_K_M</strong> 為品質與速度最佳平衡點。記憶體緊張時可降至 <strong>Q3_K_M</strong>；追求更高品質選 <strong>Q5_K_M / Q6_K</strong>。星級評分基於代碼生成任務。</span>
          </div>
        </div>
      </section>

      <!-- Database Comparison -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-label">知識庫選型</div>
          <h2 class="section-title">本地 LLM 知識庫資料庫選型</h2>
          <p class="section-sub">以下資料庫供<strong>本地 LLM 的 RAG 管道</strong>使用，Claude Code 本身不需要這些——它直接用 Glob／Grep／Read 存取檔案系統。若你希望本地 LLM 能查詢企業文件或資料庫，才需要在此選型。</p>

          <div class="db-groups">
            <div class="db-group" *ngFor="let group of dbGroups">
              <div class="dg-title">
                <span class="dg-type" [style.color]="group.typeColor">{{ group.type }}</span>
                <span class="dg-desc">{{ group.desc }}</span>
              </div>
              <div class="db-cards">
                <div class="db-card" *ngFor="let opt of group.options" [class.db-card-featured]="opt.enterprise">
                  <div class="dc-head">
                    <div class="dc-name">{{ opt.name }}</div>
                    <span class="dc-tag" [style.color]="opt.tagColor" [style.border-color]="opt.tagColor + '55'"
                      [style.background]="opt.tagColor + '18'">{{ opt.tag }}</span>
                  </div>
                  <p class="dc-note">{{ opt.note }}</p>
                  <div class="dc-chips">
                    <span class="dcc dcc-v" *ngIf="opt.vdb">向量搜尋</span>
                    <span class="dcc dcc-r" *ngIf="opt.relational">關聯查詢</span>
                    <span class="dcc dcc-e" *ngIf="opt.enterprise">企業整合</span>
                  </div>
                  <div class="dc-detail">
                    <div class="dc-pros">
                      <div class="dc-pro" *ngFor="let p of opt.pros">✓ {{ p }}</div>
                    </div>
                    <div class="dc-cons">
                      <div class="dc-con" *ngFor="let c of opt.cons">△ {{ c }}</div>
                    </div>
                  </div>
                  <div class="dc-setup-row">
                    <span class="dc-setup-label">安裝</span>
                    <code class="dc-setup-code">{{ opt.setup }}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Enterprise Integration Code -->
          <div class="enterprise-callout">
            <h3 class="ec-title">企業資料庫整合範例</h3>
            <div class="ec-tabs">
              <div class="ec-panel">
                <div class="ec-panel-header">
                  <span class="ec-db-icon">🔷</span>
                  <span>MSSQL × LangChain SQLDatabaseChain</span>
                </div>
                <div class="ec-code-grid">
                  <div class="ec-block">
                    <div class="ec-block-label">安裝依賴</div>
                    <pre class="ec-code"><code>pip install pyodbc langchain-community sqlalchemy</code></pre>
                  </div>
                  <div class="ec-block">
                    <div class="ec-block-label">自然語言查詢現有 MSSQL 數據</div>
                    <pre class="ec-code"><code>from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import create_sql_agent

conn_str = (
  "mssql+pyodbc://user:pass&#64;server/mydb"
  "?driver=ODBC+Driver+17+for+SQL+Server"
)
db = SQLDatabase.from_uri(conn_str)
agent = create_sql_agent(llm=local_llm, db=db, verbose=True)

# LLM 直接用自然語言查詢 MSSQL
agent.run("列出上個月銷售額最高的 5 個客戶")</code></pre>
                  </div>
                </div>
              </div>

              <div class="ec-panel">
                <div class="ec-panel-header">
                  <span class="ec-db-icon">🐘</span>
                  <span>PostgreSQL + pgvector × LangChain RAG</span>
                </div>
                <div class="ec-code-grid">
                  <div class="ec-block">
                    <div class="ec-block-label">啟用 pgvector 擴充</div>
                    <pre class="ec-code"><code>-- 在 PostgreSQL 執行一次即可
CREATE EXTENSION IF NOT EXISTS vector;
pip install langchain-postgres pgvector psycopg2-binary</code></pre>
                  </div>
                  <div class="ec-block">
                    <div class="ec-block-label">向量儲存 + RAG 查詢</div>
                    <pre class="ec-code"><code>from langchain_postgres import PGVector
from langchain_ollama import OllamaEmbeddings

store = PGVector(
  connection="postgresql://user:pass&#64;localhost/ragdb",
  embedding=OllamaEmbeddings(model="nomic-embed-text"),
  collection_name="internal_docs"
)
# 加入文件並進行語義搜尋
store.add_documents(docs)
results = store.similarity_search("API 驗證流程", k=5)</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div class="ec-note">
              <strong>💡 MSSQL + pgvector 雙軌方案：</strong>
              業務數據留在 MSSQL（零遷移），文件/代碼知識庫存入 PostgreSQL pgvector。LangChain 路由器根據查詢類型分派至對應資料庫，兼顧企業合規性與 RAG 彈性。
            </div>
          </div>
        </div>
      </section>

      <!-- Cost Analysis -->
      <section class="section">
        <div class="container">
          <div class="section-label">成本效益</div>
          <h2 class="section-title">成本效益分析</h2>

          <div class="cost-grid">
            <div class="cost-card cost-local">
              <div class="cost-header">
                <span class="cost-icon">💻</span>
                <div>
                  <div class="cost-title">本地 LLM 方案</div>
                  <div class="cost-subtitle">一次性投資</div>
                </div>
              </div>
              <div class="cost-items">
                <div class="ci-row" *ngFor="let item of localCosts">
                  <span class="ci-name">{{ item.name }}</span>
                  <span class="ci-val">{{ item.val }}</span>
                </div>
              </div>
              <div class="cost-total">
                <span>總計</span>
                <span class="ct-val">~$650</span>
              </div>
              <div class="cost-pros">
                <div class="cp-item" *ngFor="let p of localPros">✓ {{ p }}</div>
              </div>
            </div>

            <div class="cost-divider">
              <div class="cd-line"></div>
              <div class="cd-center">
                <div class="breakeven-box">
                  <div class="be-label">回本時間</div>
                  <div class="be-val">6-8 個月</div>
                  <div class="be-sub">以每月 $80 API 費計算</div>
                </div>
              </div>
              <div class="cd-line"></div>
            </div>

            <div class="cost-card cost-cloud">
              <div class="cost-header">
                <span class="cost-icon">☁️</span>
                <div>
                  <div class="cost-title">Claude API 方案</div>
                  <div class="cost-subtitle">月付費模式</div>
                </div>
              </div>
              <div class="cost-items">
                <div class="ci-row" *ngFor="let item of cloudCosts">
                  <span class="ci-name">{{ item.name }}</span>
                  <span class="ci-val">{{ item.val }}</span>
                </div>
              </div>
              <div class="cost-total">
                <span>每月費用</span>
                <span class="ct-val">$60-100</span>
              </div>
              <div class="cost-pros">
                <div class="cp-item" *ngFor="let p of cloudPros">✓ {{ p }}</div>
              </div>
            </div>
          </div>

          <div class="hybrid-note">
            <div class="hn-icon">⚡</div>
            <div class="hn-body">
              <strong>建議：混合方案最優解</strong>
              <p>85-90% 日常編碼任務路由至本地 LLM，僅將複雜多檔案推理任務送至 Claude API。
              實測每月 API 費用可降至 <strong>$15-25</strong>，在保有頂級推理品質的同時大幅降低開銷。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Implementation Roadmap -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-label">實作指南</div>
          <h2 class="section-title">五步驟實作路線圖</h2>

          <div class="roadmap">
            <div class="rm-item" *ngFor="let step of roadmapSteps; let i = index">
              <div class="rm-left">
                <div class="rm-num" [style.background]="step.color + '22'" [style.border-color]="step.color + '55'" [style.color]="step.color">
                  {{ step.num }}
                </div>
                <div class="rm-line" *ngIf="i < roadmapSteps.length - 1"></div>
              </div>
              <div class="rm-body">
                <div class="rm-tag" [style.color]="step.color">{{ step.tag }}</div>
                <h3 class="rm-title">{{ step.title }}</h3>
                <p class="rm-desc">{{ step.desc }}</p>
                <div class="rm-cmds">
                  <code *ngFor="let cmd of step.cmds">{{ cmd }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Config Reference -->
      <section class="section">
        <div class="container">
          <div class="section-label">設定參考</div>
          <h2 class="section-title">CLAUDE.md 混合部署配置範例</h2>

          <div class="config-grid">
            <div class="cfg-block">
              <div class="cfg-title">路由規則設定</div>
              <pre class="cfg-code"><code># CLAUDE.md — 混合部署路由規則

## 本地 LLM 路由條件
- 單檔函數生成 / 代碼補全
- 隱私敏感模組 (src/auth/**, src/payment/**)
- 簡單 Bug 修復 (&lt; 3 個檔案)
- 代碼格式化 / 重構

## Claude API 路由條件
- 跨多個模組的架構設計
- 複雜 Bug 診斷 (&gt;= 4 個檔案關聯)
- 需要網路搜尋的技術問題
- 新功能完整設計

## 本地知識庫 RAG 觸發
- 詢問公司內部 API / 規範時
- 需要查詢 docs/** 文件時</code></pre>
            </div>

            <div class="cfg-block">
              <div class="cfg-title">Hooks 配置範例</div>
              <pre class="cfg-code"><code>// .claude/hooks/route-classifier.sh
#!/bin/bash
# PreToolUse Hook：任務路由分類

TASK="$1"
FILE_COUNT=$(echo "$TASK" | grep -o '\\.ts' | wc -l)

if [ "$FILE_COUNT" -gt 3 ]; then
  echo "ROUTE=cloud"
elif echo "$TASK" | grep -q "auth\|payment\|secret"; then
  echo "ROUTE=local-only"
else
  echo "ROUTE=local"
fi</code></pre>
            </div>
          </div>

          <!-- Summary Table -->
          <div class="summary-wrap">
            <h3 class="summary-title">技術選型速查表</h3>
            <div class="sum-table-wrap">
              <table class="sum-table">
                <thead>
                  <tr>
                    <th>組件</th>
                    <th>推薦選項</th>
                    <th>備選方案</th>
                    <th>用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let row of techTable">
                    <td><code>{{ row.component }}</code></td>
                    <td class="td-rec">{{ row.rec }}</td>
                    <td class="td-alt">{{ row.alt }}</td>
                    <td class="td-use">{{ row.use }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    /* ===== Page Wrap ===== */
    .page-wrap { padding-top: 72px; }

    /* ===== Hero ===== */
    .hero {
      padding: 80px 0 60px;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,170,0.08) 0%, transparent 70%);
      border-bottom: 1px solid var(--border-color);

      .hero-tag {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        color: #00d4aa;
        background: rgba(0,212,170,0.1);
        border: 1px solid rgba(0,212,170,0.3);
        padding: 4px 14px;
        border-radius: 100px;
        display: inline-block;
        margin-bottom: 20px;
      }

      .hero-title {
        font-size: clamp(2rem, 5vw, 3.2rem);
        font-weight: 900;
        color: var(--text-primary);
        line-height: 1.15;
        margin-bottom: 16px;
        letter-spacing: -0.03em;
      }

      .hero-desc {
        font-size: 1rem;
        color: var(--text-secondary);
        line-height: 1.8;
        max-width: 680px;
        margin-bottom: 28px;

        strong { color: var(--text-primary); }
      }

      .hero-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    }

    .hl { color: #00d4aa; }

    .chip {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 5px 14px;
      border-radius: 100px;
      border: 1px solid;
    }

    .chip-green { background: rgba(0,212,170,0.1); color: #00d4aa; border-color: rgba(0,212,170,0.3); }
    .chip-blue { background: rgba(59,130,246,0.1); color: #60a5fa; border-color: rgba(59,130,246,0.3); }
    .chip-purple { background: rgba(124,92,252,0.1); color: #a78bfa; border-color: rgba(124,92,252,0.3); }
    .chip-orange { background: rgba(255,140,66,0.1); color: #ff8c42; border-color: rgba(255,140,66,0.3); }
    .chip-gray { background: rgba(255,255,255,0.05); color: var(--text-secondary); border-color: var(--border-color); }

    /* ===== Sections ===== */
    .section {
      padding: 72px 0;
      border-bottom: 1px solid var(--border-color);
    }

    .section-alt {
      background: rgba(255,255,255,0.012);
    }

    .section-label {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #00d4aa;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .section-title {
      font-size: clamp(1.4rem, 3vw, 2rem);
      font-weight: 900;
      color: var(--text-primary);
      margin-bottom: 10px;
      letter-spacing: -0.02em;
    }

    .section-sub {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: 36px;
      max-width: 680px;
      line-height: 1.7;
    }

    /* ===== Architecture Clarification ===== */
    .arch-clarify {
      margin-bottom: 24px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .ac-row {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: stretch;
    }

    .ac-item {
      display: flex;
      gap: 16px;
      padding: 20px 24px;
      align-items: flex-start;

      .ac-icon { font-size: 1.6rem; flex-shrink: 0; margin-top: 2px; }

      .ac-title {
        font-size: 0.88rem;
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 6px;
      }

      .ac-desc {
        font-size: 0.8rem;
        color: var(--text-secondary);
        line-height: 1.65;

        strong { color: var(--text-primary); }
        code {
          font-family: var(--font-mono);
          font-size: 0.82em;
          background: rgba(0,212,170,0.1);
          color: #00d4aa;
          padding: 1px 5px;
          border-radius: 3px;
        }
      }
    }

    .ac-item-native { border-left: 3px solid #00d4aa; background: rgba(0,212,170,0.04); }
    .ac-item-rag    { border-left: 3px solid #7c5cfc; background: rgba(124,92,252,0.04); }

    .ac-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
      border-left: 1px solid var(--border-color);
      border-right: 1px solid var(--border-color);
      background: rgba(255,255,255,0.01);
    }

    /* ===== Flow Diagram ===== */
    .diagram-wrap {
      background: #0d1117;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 4px;
      overflow: hidden;
    }

    .flow-svg { width: 100%; height: auto; display: block; }

    /* ===== Three Layers ===== */
    .layers {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .layer-card {
      display: flex;
      gap: 24px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 24px 28px;
      align-items: flex-start;

      .layer-num {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        font-weight: 900;
        color: var(--text-muted);
        background: rgba(255,255,255,0.04);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 6px 10px;
        min-width: 40px;
        text-align: center;
        flex-shrink: 0;
        margin-top: 4px;
      }

      .layer-body {
        flex: 1;

        .layer-badge {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid;
          display: inline-block;
          margin-bottom: 8px;
        }

        h3 {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        p {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 14px;
        }
      }
    }

    .tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      span {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        color: var(--text-muted);
        background: rgba(255,255,255,0.04);
        border: 1px solid var(--border-color);
        padding: 3px 10px;
        border-radius: 5px;
      }
    }

    /* ===== Routing Matrix ===== */
    .matrix-wrap {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .matrix-header {
      display: grid;
      grid-template-columns: 2fr 1.8fr 1.8fr 0.8fr 1fr;
      gap: 0;
      background: rgba(255,255,255,0.04);
      border-bottom: 1px solid var(--border-color);
      padding: 10px 20px;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .matrix-row {
      display: grid;
      grid-template-columns: 2fr 1.8fr 1.8fr 0.8fr 1fr;
      gap: 0;
      padding: 12px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.04);
      align-items: center;

      &:last-child { border-bottom: none; }
      &:hover { background: rgba(255,255,255,0.02); }
    }

    .matrix-row-special {
      background: rgba(0,212,170,0.03);
    }

    .mr-task {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.85rem;
      color: var(--text-primary);
      font-weight: 500;

      .mr-icon { font-size: 1rem; }
    }

    .mr-score {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .score-bar-wrap {
      flex: 1;
      height: 6px;
      background: rgba(255,255,255,0.06);
      border-radius: 3px;
      overflow: hidden;
    }

    .score-bar {
      height: 100%;
      border-radius: 3px;
      transition: width 0.4s ease;
    }

    .score-val {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      min-width: 32px;
      text-align: right;
    }

    .mr-delta {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      text-align: center;
    }

    .mr-rec { display: flex; align-items: center; }

    .rec-badge {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 3px 12px;
      border-radius: 100px;
      border: 1px solid;
    }

    /* ===== Performance Cards ===== */
    .perf-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .perf-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 24px;

      h3 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; }
    }

    .perf-card-wide {
      grid-column: 1 / -1;
    }

    .perf-bars { display: flex; flex-direction: column; gap: 16px; }

    .pb-item { display: flex; flex-direction: column; gap: 6px; }

    .pb-label {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .pb-bar-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .pb-bar {
      height: 8px;
      border-radius: 4px;
      flex: none;
    }

    .pb-val {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .pb-note {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-style: italic;
    }

    .overall-bars { display: flex; flex-direction: column; gap: 14px; }

    .ob-row {
      display: grid;
      grid-template-columns: 180px 1fr;
      align-items: center;
      gap: 16px;

      .ob-name { font-size: 0.84rem; color: var(--text-primary); font-weight: 500; }
      .ob-bars { display: flex; flex-direction: column; gap: 5px; }
    }

    .ob-bar-group {
      display: flex;
      align-items: center;
      gap: 8px;

      .ob-tag {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        font-weight: 700;
        padding: 1px 6px;
        border-radius: 3px;
        min-width: 32px;
        text-align: center;
      }

      .ob-local { background: rgba(0,212,170,0.15); color: #00d4aa; }
      .ob-cloud { background: rgba(124,92,252,0.15); color: #a78bfa; }

      .ob-track {
        flex: 1;
        height: 7px;
        background: rgba(255,255,255,0.05);
        border-radius: 4px;
        overflow: hidden;
      }

      .ob-fill { height: 100%; border-radius: 4px; }

      .ob-score {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-muted);
        min-width: 20px;
      }
    }

    /* ===== Cost Analysis ===== */
    .cost-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 0;
      margin-bottom: 24px;
    }

    .cost-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 24px;

      .cost-header {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 20px;

        .cost-icon { font-size: 1.8rem; }
        .cost-title { font-size: 1rem; font-weight: 800; color: var(--text-primary); }
        .cost-subtitle { font-size: 0.78rem; color: var(--text-muted); }
      }
    }

    .cost-local { border-color: rgba(0,212,170,0.25); }
    .cost-cloud { border-color: rgba(124,92,252,0.25); }

    .cost-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }

    .ci-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.84rem;

      .ci-name { color: var(--text-secondary); }
      .ci-val { color: var(--text-primary); font-weight: 600; font-family: var(--font-mono); }
    }

    .cost-total {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid var(--border-color);
      padding-top: 12px;
      margin-bottom: 16px;
      font-weight: 700;
      font-size: 0.9rem;
      color: var(--text-primary);

      .ct-val { font-family: var(--font-mono); color: #00d4aa; font-size: 1rem; }
    }

    .cost-pros {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .cp-item { font-size: 0.8rem; color: var(--text-secondary); }
    }

    .cost-divider {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 20px;
    }

    .cd-line { flex: 1; width: 2px; background: var(--border-color); }

    .cd-center { padding: 16px 0; }

    .breakeven-box {
      background: rgba(255,209,102,0.1);
      border: 1px solid rgba(255,209,102,0.3);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      text-align: center;
      min-width: 140px;

      .be-label { font-size: 0.72rem; color: var(--text-muted); margin-bottom: 4px; }
      .be-val { font-size: 1.4rem; font-weight: 900; color: #ffd166; font-family: var(--font-mono); }
      .be-sub { font-size: 0.68rem; color: var(--text-muted); margin-top: 4px; line-height: 1.4; }
    }

    .hybrid-note {
      display: flex;
      gap: 16px;
      background: rgba(0,212,170,0.06);
      border: 1px solid rgba(0,212,170,0.2);
      border-radius: var(--radius-md);
      padding: 20px 24px;

      .hn-icon { font-size: 1.4rem; flex-shrink: 0; }
      .hn-body {
        strong { display: block; font-size: 0.95rem; color: var(--text-primary); margin-bottom: 6px; }
        p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7; margin: 0; }
        strong { font-weight: 700; }
      }
    }

    /* ===== Roadmap ===== */
    .roadmap { display: flex; flex-direction: column; gap: 0; }

    .rm-item {
      display: flex;
      gap: 24px;
    }

    .rm-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
    }

    .rm-num {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 2px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 900;
      flex-shrink: 0;
    }

    .rm-line {
      width: 2px;
      flex: 1;
      background: var(--border-color);
      min-height: 24px;
    }

    .rm-body {
      flex: 1;
      padding-bottom: 36px;

      .rm-tag { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 4px; }
      .rm-title { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; }
      .rm-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 12px; }

      .rm-cmds {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;

        code {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          background: var(--bg-code);
          color: #00d4aa;
          border: 1px solid var(--border-color);
          padding: 3px 10px;
          border-radius: 5px;
        }
      }
    }

    /* ===== Config Blocks ===== */
    .config-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 36px;
    }

    .cfg-block {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;

      .cfg-title {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--text-muted);
        background: rgba(255,255,255,0.03);
        border-bottom: 1px solid var(--border-color);
        padding: 10px 16px;
      }
    }

    .cfg-code {
      margin: 0;
      padding: 16px;
      background: transparent;
      overflow-x: auto;

      code {
        font-family: var(--font-mono);
        font-size: 0.76rem;
        color: var(--text-secondary);
        line-height: 1.7;
        white-space: pre;
        display: block;
      }
    }

    /* ===== Summary Table ===== */
    .summary-wrap {
      .summary-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; }
    }

    .sum-table-wrap { overflow-x: auto; }

    .sum-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.84rem;

      thead tr { background: rgba(255,255,255,0.04); }
      th { padding: 10px 16px; text-align: left; font-weight: 700; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
      td { padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); }
      tr:hover td { background: rgba(255,255,255,0.02); }
      tr:last-child td { border-bottom: none; }
      code { font-family: var(--font-mono); font-size: 0.82em; color: #00d4aa; }

      .td-rec { color: var(--text-primary); font-weight: 600; }
      .td-alt { color: var(--text-muted); }
      .td-use { color: var(--text-secondary); }
    }

    /* ===== LLM Hardware ===== */
    .llm-tiers { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }

    .llm-tier {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .lt-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 16px 20px;
      border-left: 4px solid;
      background: rgba(255,255,255,0.02);
      border-bottom: 1px solid var(--border-color);
      gap: 12px;

      .lt-left {
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }

      .lt-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }
      .lt-label { font-size: 0.9rem; font-weight: 800; margin-bottom: 3px; }
      .lt-note { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; }
    }

    .lt-badge {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      background: rgba(148,163,184,0.12);
      color: #94a3b8;
      border: 1px solid rgba(148,163,184,0.25);
      padding: 3px 10px;
      border-radius: 100px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .llm-model-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1px;
      background: var(--border-color);
    }

    .lm-card {
      background: var(--bg-card);
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .lmc-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .lmc-name { font-size: 0.84rem; font-weight: 700; color: var(--text-primary); }
      .lmc-params { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; white-space: nowrap; }
      .lmc-hw { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; }

      .lmc-bottom {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .lmc-vram { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); background: rgba(255,255,255,0.04); padding: 2px 6px; border-radius: 3px; }
      .lmc-speed { font-family: var(--font-mono); font-size: 0.7rem; color: #00d4aa; }
      .lmc-stars { font-size: 0.72rem; color: var(--accent-orange); letter-spacing: 1px; }
    }

    .hw-note {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.82rem;
      color: var(--text-secondary);
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      line-height: 1.6;

      strong { color: var(--text-primary); }
    }

    /* ===== Database Groups ===== */
    .db-groups { display: flex; flex-direction: column; gap: 28px; margin-bottom: 28px; }

    .db-group { }

    .dg-title {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;

      .dg-type { font-size: 0.9rem; font-weight: 800; }
      .dg-desc { font-size: 0.8rem; color: var(--text-muted); }
    }

    .db-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
    }

    .db-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .db-card-featured {
      border-color: rgba(255,209,102,0.3);
      background: linear-gradient(135deg, rgba(255,209,102,0.03) 0%, var(--bg-card) 100%);
    }

    .dc-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;

      .dc-name { font-size: 0.92rem; font-weight: 800; color: var(--text-primary); }
    }

    .dc-tag {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 100px;
      border: 1px solid;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .dc-note { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }

    .dc-chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .dcc {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .dcc-v { background: rgba(124,92,252,0.15); color: #a78bfa; }
    .dcc-r { background: rgba(255,140,66,0.15); color: #ff8c42; }
    .dcc-e { background: rgba(255,209,102,0.15); color: #ffd166; }

    .dc-detail {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .dc-pro { font-size: 0.77rem; color: #00d4aa; }
      .dc-con { font-size: 0.77rem; color: var(--text-muted); }
    }

    .dc-setup-row {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-code);
      border: 1px solid var(--border-color);
      border-radius: 5px;
      padding: 6px 10px;

      .dc-setup-label { font-size: 0.7rem; color: var(--text-muted); white-space: nowrap; }
      .dc-setup-code { font-family: var(--font-mono); font-size: 0.75rem; color: #00d4aa; background: none; padding: 0; border: none; }
    }

    /* ===== Enterprise Callout ===== */
    .enterprise-callout {
      background: var(--bg-card);
      border: 1px solid rgba(255,209,102,0.25);
      border-radius: var(--radius-md);
      padding: 24px;

      .ec-title { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; }
    }

    .ec-tabs { display: flex; flex-direction: column; gap: 24px; }

    .ec-panel {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }

    .ec-panel-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: rgba(255,255,255,0.03);
      border-bottom: 1px solid var(--border-color);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-primary);

      .ec-db-icon { font-size: 1.1rem; }
    }

    .ec-code-grid {
      display: grid;
      grid-template-columns: 1fr 1.6fr;
      gap: 0;
    }

    .ec-block {
      border-right: 1px solid var(--border-color);
      overflow: hidden;

      &:last-child { border-right: none; }

      .ec-block-label {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        color: var(--text-muted);
        padding: 8px 14px;
        border-bottom: 1px solid var(--border-color);
        background: rgba(255,255,255,0.02);
      }
    }

    .ec-code {
      margin: 0;
      padding: 14px;
      overflow-x: auto;

      code {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-secondary);
        line-height: 1.7;
        white-space: pre;
        display: block;
      }
    }

    .ec-note {
      margin-top: 16px;
      font-size: 0.82rem;
      color: var(--text-secondary);
      background: rgba(255,209,102,0.05);
      border: 1px solid rgba(255,209,102,0.2);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      line-height: 1.7;

      strong { color: #ffd166; }
    }

    /* ===== Responsive ===== */
    @media (max-width: 768px) {
      .perf-grid { grid-template-columns: 1fr; }
      .perf-card-wide { grid-column: 1; }
      .cost-grid { grid-template-columns: 1fr; }
      .cost-divider { flex-direction: row; padding: 16px 0; }
      .cd-line { flex: 1; height: 2px; width: auto; }
      .config-grid { grid-template-columns: 1fr; }
      .ob-row { grid-template-columns: 1fr; gap: 8px; }
      .matrix-header, .matrix-row { grid-template-columns: 1.5fr 1fr 1fr; }
      .mh-delta, .mr-delta, .mh-rec, .mr-rec { display: none; }
      .ac-row { grid-template-columns: 1fr; }
      .ac-divider { border-left: none; border-right: none; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 10px 24px; }
      .llm-model-grid { grid-template-columns: 1fr 1fr; }
      .db-cards { grid-template-columns: 1fr; }
      .ec-code-grid { grid-template-columns: 1fr; }
      .ec-block { border-right: none; border-bottom: 1px solid var(--border-color); }
    }

    @media (max-width: 640px) {
      .hero { padding: 60px 0 40px; }
      .section { padding: 48px 0; }
    }
  `]
})
export class LocalDeployComponent {

  llmTiers = [
    {
      tier: 'cpu', color: '#94a3b8', icon: '💻', noGpu: true,
      label: '無需顯卡 — CPU 推理',
      note: '任何現代 CPU 均可執行。速度慢但零成本，適合偶發使用、低預算或純隱私場景。需要 RAM 代替 VRAM。',
      models: [
        { name: 'Qwen2.5-Coder 1.5B', params: '1.5B', vram: '無需', minHw: 'i5 / Ryzen 5 + 4GB RAM', speed: '5-10 tok/s', stars: '★★☆☆☆' },
        { name: 'LLaMA 3.2 3B',        params: '3B',   vram: '無需', minHw: 'i7 / Ryzen 7 + 8GB RAM', speed: '3-7 tok/s',  stars: '★★★☆☆' },
        { name: 'Phi-3 Mini 3.8B',     params: '3.8B', vram: '無需', minHw: 'i7 / Ryzen 7 + 8GB RAM', speed: '2-5 tok/s',  stars: '★★★☆☆' },
      ]
    },
    {
      tier: 'entry', color: '#00d4aa', icon: '🎮', noGpu: false,
      label: '入門顯卡 — 4-8GB VRAM',
      note: '入門 NVIDIA／AMD 顯卡即可流暢執行 7-8B 模型，推理品質大幅提升。是 CP 值最高的起步配置。',
      models: [
        { name: 'Mistral 7B',           params: '7B', vram: '4GB', minHw: 'GTX 1660 Ti / RX 6600',   speed: '15-20 tok/s', stars: '★★★☆☆' },
        { name: 'Qwen2.5-Coder 7B',    params: '7B', vram: '5GB', minHw: 'RTX 3060 6GB / RX 6600',  speed: '20-28 tok/s', stars: '★★★★☆' },
        { name: 'LLaMA 3.1 8B',        params: '8B', vram: '6GB', minHw: 'RTX 3060 8GB / RX 6700',  speed: '18-25 tok/s', stars: '★★★★☆' },
        { name: 'CodeGemma 7B',        params: '7B', vram: '6GB', minHw: 'RTX 3060 8GB / RX 6700',  speed: '15-20 tok/s', stars: '★★★☆☆' },
      ]
    },
    {
      tier: 'mid', color: '#ffd166', icon: '🖥️', noGpu: false,
      label: '中高階顯卡 — 10-24GB VRAM',
      note: '14-32B 大型模型需 RTX 3080 以上。代碼生成品質媲美早期商業模型，是生產環境的最佳平衡點。',
      models: [
        { name: 'Qwen2.5-Coder 14B',       params: '14B', vram: '10GB', minHw: 'RTX 3080 10GB / RX 7800 XT', speed: '15-22 tok/s', stars: '★★★★☆' },
        { name: 'DeepSeek-Coder V2 16B',   params: '16B', vram: '12GB', minHw: 'RTX 3080 12GB / RX 7900 GRE', speed: '12-18 tok/s', stars: '★★★★★' },
        { name: 'CodeStral 22B',           params: '22B', vram: '16GB', minHw: 'RTX 3090 / RTX 4080',         speed: '10-15 tok/s', stars: '★★★★★' },
        { name: 'Qwen2.5-Coder 32B',      params: '32B', vram: '20GB', minHw: 'RTX 3090 / RTX 4090',         speed: '8-12 tok/s',  stars: '★★★★★' },
      ]
    },
    {
      tier: 'apple', color: '#a78bfa', icon: '🍎', noGpu: false,
      label: 'Apple Silicon — 統一記憶體',
      note: 'CPU + GPU 共享統一記憶體，無需獨立顯卡。速度超越同等 VRAM 的 NVIDIA，能耗比業界最佳。',
      models: [
        { name: 'Qwen 7B / LLaMA 8B',   params: '7-8B', vram: '16GB 統一', minHw: 'M2 / M3 16GB',          speed: '25-40 tok/s', stars: '★★★★☆' },
        { name: 'Qwen2.5-Coder 14B',    params: '14B',  vram: '32GB 統一', minHw: 'M3 Pro / M2 Max 32GB',  speed: '20-30 tok/s', stars: '★★★★☆' },
        { name: 'Qwen2.5-Coder 32B',    params: '32B',  vram: '64GB 統一', minHw: 'M3 Max / M4 Max 64GB',  speed: '15-22 tok/s', stars: '★★★★★' },
      ]
    },
  ];

  dbGroups = [
    {
      type: '向量資料庫',
      typeColor: '#7c5cfc',
      desc: '— RAG 語義搜尋核心，將文件/代碼轉為向量並支援相似度查詢',
      options: [
        {
          name: 'ChromaDB', tag: '推薦入門', tagColor: '#00d4aa', vdb: true, relational: false, enterprise: false,
          setup: 'pip install chromadb',
          note: 'Python 原生，一行程式碼啟動本地持久化資料庫，最快上手。適合個人開發、中小型項目與快速原型。',
          pros: ['零配置本地持久化', 'LangChain 原生整合', '支援 metadata 過濾'],
          cons: ['不適合超大規模場景']
        },
        {
          name: 'FAISS', tag: 'Meta 出品', tagColor: '#60a5fa', vdb: true, relational: false, enterprise: false,
          setup: 'pip install faiss-cpu',
          note: 'Facebook 開源，純記憶體索引，相似度搜尋速度業界最快。無持久化，需自行序列化儲存。可選 GPU 版加速。',
          pros: ['搜尋速度最快', 'GPU 加速版可用', '久經考驗的穩定性'],
          cons: ['無原生持久化', '純 in-memory']
        },
        {
          name: 'Qdrant', tag: '生產級', tagColor: '#ff8c42', vdb: true, relational: false, enterprise: false,
          setup: 'docker run -p 6333:6333 qdrant/qdrant',
          note: 'Rust 寫成，提供完整 REST/gRPC API，有本地 Docker 版與雲端版。支援 payload 過濾，適合生產環境部署。',
          pros: ['REST/gRPC API 完整', 'Docker 本地部署', '高階過濾搜尋'],
          cons: ['需要 Docker 或獨立程序']
        },
      ]
    },
    {
      type: '關聯式 / 企業資料庫',
      typeColor: '#ff8c42',
      desc: '— 整合企業現有數據，LLM 對結構化業務資料（訂單、用戶、日誌）做自然語言查詢',
      options: [
        {
          name: 'PostgreSQL + pgvector', tag: '全能首選', tagColor: '#ffd166', vdb: true, relational: true, enterprise: true,
          setup: 'CREATE EXTENSION vector;',
          note: '在 PostgreSQL 啟用 pgvector 擴充後，同時支援向量搜尋與關聯查詢。一套資料庫解決所有需求，無需多系統管理，是新項目的最佳全能選擇。',
          pros: ['向量 + 關聯二合一', '無需額外 Vector DB', 'LangChain 原生支援', 'pgAdmin 可視化管理'],
          cons: ['需安裝 pgvector 擴充（一次性）']
        },
        {
          name: 'Microsoft SQL Server', tag: '企業整合', tagColor: '#60a5fa', vdb: false, relational: true, enterprise: true,
          setup: 'pip install pyodbc langchain-community',
          note: '透過 LangChain SQLDatabaseChain，LLM 可直接以自然語言查詢現有 MSSQL 資料，對現有數據零侵入。Windows 企業環境首選，可搭配 Qdrant 補充向量能力。Express 版本免費。',
          pros: ['零數據遷移成本', 'Windows 企業原生', 'T-SQL 自然語言查詢', 'Azure SQL 雲端無縫遷移'],
          cons: ['無原生向量索引', '完整版需授權費用']
        },
        {
          name: 'DuckDB', tag: '分析型', tagColor: '#94a3b8', vdb: false, relational: true, enterprise: false,
          setup: 'pip install duckdb',
          note: '嵌入式 OLAP 資料庫，直接讀取 Parquet、CSV、JSON 等格式，無需伺服器。適合本地數據湖分析與 BI 查詢場景，OLAP 速度優異。',
          pros: ['直讀 Parquet/CSV/JSON', '零配置嵌入式', '超快 OLAP 分析查詢'],
          cons: ['不適合高並發寫入', '無向量搜尋']
        },
        {
          name: 'SQLite', tag: '輕量入門', tagColor: '#94a3b8', vdb: false, relational: true, enterprise: false,
          setup: 'import sqlite3  # Python 內建',
          note: 'Python 標準庫內建，無需安裝任何軟體，適合快速原型和小型知識庫。搭配 LangChain SQLChain 可讓 LLM 自然語言查詢本地結構化數據。',
          pros: ['零安裝', 'Python 標準庫內建', '單檔案資料庫，易備份'],
          cons: ['不適合大量數據', '無並發寫入']
        },
      ]
    },
  ];

  routingMatrix = [
    { icon: '⚡', task: '函數生成 / 代碼補全', local: 4.1, cloud: 4.4, delta: 0.3, rec: '本地' },
    { icon: '🐛', task: 'Bug 偵測與診斷', local: 3.8, cloud: 4.6, delta: 0.8, rec: '雲端' },
    { icon: '♻️', task: '代碼重構優化', local: 4.0, cloud: 4.3, delta: 0.3, rec: '本地' },
    { icon: '📁', task: '多檔案上下文推理', local: 2.8, cloud: 4.5, delta: 1.7, rec: '雲端' },
    { icon: '📖', task: '代碼解釋與文檔', local: 4.2, cloud: 4.1, delta: -0.1, rec: '本地' },
  ];

  latencyItems = [
    { label: '本地 LLM (短提示)', pct: 44, val: '1.4s', color: '#00d4aa', note: '無網絡延遲，SSD 直讀模型' },
    { label: '本地 LLM (長提示)', pct: 100, val: '3.2s', color: '#00d4aa', note: 'RTX 4070 Ti Super 測試值' },
    { label: 'Claude API', pct: 66, val: '2.1s', color: '#7c5cfc', note: '含網絡 RTT，服務端高度優化' },
  ];

  tokenItems = [
    { label: '本地 LLM', pct: 25, val: '15-25 tok/s', color: '#00d4aa', note: 'GPU 受限，量化 Q4 模型' },
    { label: 'Claude API', pct: 100, val: '60-80 tok/s', color: '#7c5cfc', note: 'Anthropic 專用推理硬體' },
  ];

  overallItems = [
    { name: '函數生成', local: 4.1, cloud: 4.4 },
    { name: 'Bug 偵測', local: 3.8, cloud: 4.6 },
    { name: '代碼重構', local: 4.0, cloud: 4.3 },
    { name: '多檔案推理', local: 2.8, cloud: 4.5 },
    { name: '代碼解釋', local: 4.2, cloud: 4.1 },
  ];

  localCosts = [
    { name: 'GPU (RTX 4070 Ti Super)', val: '$489' },
    { name: '電力消耗 (月)', val: '~$8' },
    { name: '設定與調優工時 (20h)', val: '一次性' },
  ];

  localPros = ['數據完全不離開本機', '無 API 限速', '離線可用', '長期邊際成本接近零'];

  cloudCosts = [
    { name: 'Claude API (中度使用)', val: '$60-80/月' },
    { name: 'Claude API (重度使用)', val: '$80-100/月' },
    { name: '硬體投資', val: '$0' },
  ];

  cloudPros = ['頂級多檔案推理品質', '無需維護硬體', '即開即用', '持續模型升級'];

  roadmapSteps = [
    {
      num: '01',
      color: '#00d4aa',
      tag: '環境配置',
      title: '安裝 Ollama 並下載本地模型',
      desc: '在本機安裝 Ollama 運行時，拉取 Qwen2.5-Coder-32B 或 DeepSeek-Coder-V2 量化模型（約 20GB VRAM / 離線 GGUF）。',
      cmds: ['ollama pull qwen2.5-coder:32b', 'ollama pull nomic-embed-text', 'ollama serve'],
    },
    {
      num: '02',
      color: '#7c5cfc',
      tag: '知識庫建構',
      title: '建立本地 Vector DB 與文件索引',
      desc: '使用 ChromaDB 或 FAISS 建立向量資料庫，將本地文件（Markdown、代碼、PDF）切塊後用 nomic-embed-text 產生嵌入向量，實現 RAG 增強查詢。',
      cmds: ['pip install chromadb langchain', 'python index_docs.py --dir ./docs', 'python index_docs.py --dir ./src'],
    },
    {
      num: '03',
      color: '#ff8c42',
      tag: 'Claude Code 整合',
      title: '設定 MCP Server 橋接本地 LLM',
      desc: '建立一個 MCP Server（Model Context Protocol），讓 Claude Code 2.1.88 能透過標準工具介面呼叫本地 Ollama API 和向量庫查詢，無需修改 Claude Code 核心邏輯。',
      cmds: ['claude mcp add local-llm ./mcp-local-llm.js', 'claude mcp add local-rag ./mcp-rag-server.js'],
    },
    {
      num: '04',
      color: '#ffd166',
      tag: '路由規則',
      title: '設定 CLAUDE.md 路由策略與 Hooks',
      desc: '在 CLAUDE.md 中定義任務路由規則：簡單任務導向本地 LLM，複雜多檔案任務導向 Claude API，隱私敏感代碼強制本地執行。使用 PreToolUse Hook 做動態分類。',
      cmds: ['# 編輯 CLAUDE.md 加入路由規則', 'mkdir -p .claude/hooks', 'chmod +x .claude/hooks/route-classifier.sh'],
    },
    {
      num: '05',
      color: '#ff4d6d',
      tag: '測試與調優',
      title: '基準測試、調整路由閾值',
      desc: '用您的真實代碼庫執行基準測試，測量本地 vs 雲端回應品質差距。調整路由閾值（如檔案數量、模組敏感度清單），持續優化 API 費用與品質的平衡點。',
      cmds: ['claude --benchmark ./test-tasks/', 'claude --stats  # 查看路由分佈'],
    },
  ];

  techTable = [
    { component: 'Local LLM Runtime', rec: 'Ollama', alt: 'LM Studio / llama.cpp', use: '本地模型推理' },
    { component: 'Coding Model', rec: 'Qwen2.5-Coder-32B', alt: 'DeepSeek-Coder-V2 / CodeStral', use: '代碼生成與補全' },
    { component: 'Embedding Model', rec: 'nomic-embed-text', alt: 'mxbai-embed-large', use: '向量化文件內容' },
    { component: 'Vector Database', rec: 'ChromaDB', alt: 'FAISS / Qdrant', use: 'RAG 知識庫儲存' },
    { component: 'Local Database', rec: 'SQLite', alt: 'DuckDB', use: '結構化本地數據' },
    { component: 'MCP Server', rec: 'custom Node.js', alt: 'Python FastMCP', use: '橋接 Claude Code 與本地服務' },
    { component: 'Cloud LLM', rec: 'claude-sonnet-4-6', alt: 'claude-opus-4-6', use: '複雜推理任務' },
  ];
}
