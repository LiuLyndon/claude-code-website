import { Component, inject } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';

@Component({
  selector: 'app-execution',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- HERO -->
    <div class="page-hero">
      <div class="container">
        <span class="section-tag">深度解析</span>
        <h1>Claude Code <span class="gradient-text">完整執行流程</span></h1>
        <p class="hero-desc">
          從你按下 Enter 到看見回應，每一毫秒背後發生了什麼？<br>
          基於 <code>claude-code</code> 原始碼，逐步拆解 8 大執行階段、23+ 安全機制與所有關鍵技術決策
        </p>
        <div class="hero-meta">
          <span class="hm-item">📁 原始碼參考</span>
          <span class="hm-sep">·</span>
          <span class="hm-item">8 個執行階段</span>
          <span class="hm-sep">·</span>
          <span class="hm-item">23+ 安全機制</span>
          <span class="hm-sep">·</span>
          <span class="hm-item">適合所有人閱讀</span>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════
         全覽時間軸
    ══════════════════════════════ -->
    <section class="section overview-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">執行全覽</span>
          <h2>8 大階段，一次看清</h2>
          <p>點選任一階段可跳至詳細說明</p>
        </div>
        <div class="phase-map">
          <div class="pm-card" *ngFor="let p of phases" (click)="scrollTo(p.id)" role="button" tabindex="0">
            <div class="pm-num">{{ p.num }}</div>
            <div class="pm-icon">{{ p.icon }}</div>
            <div class="pm-title">{{ p.title }}</div>
            <div class="pm-time">{{ p.time }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         PHASE 1 — Bootstrap
    ══════════════════════════════ -->
    <section class="section phase-section" id="phase-1">
      <div class="container">
        <div class="phase-header">
          <div class="ph-badge">Phase 01</div>
          <div class="ph-icon">🚀</div>
          <div class="ph-body">
            <h2>Bootstrap 啟動與初始化</h2>
            <p>CLI 被呼叫後的第一件事：快速路徑判斷、模組載入、服務初始化</p>
          </div>
          <div class="ph-time">50 ~ 150 ms</div>
        </div>

        <div class="step-timeline">

          <div class="st-block">
            <div class="stb-head">
              <span class="stb-file">src/entrypoints/cli.tsx</span>
              <span class="stb-badge badge-purple">Entry Point</span>
            </div>
            <div class="stb-steps">
              <div class="ss-item" *ngFor="let s of phase1Steps.cli; let i = index" [style.animationDelay]="i*80+'ms'">
                <div class="ss-dot" [style.background]="s.color"></div>
                <div class="ss-body">
                  <div class="ss-title">{{ s.title }}</div>
                  <div class="ss-desc">{{ s.desc }}</div>
                  <div class="ss-code" *ngIf="s.code">{{ s.code }}</div>
                </div>
                <div class="ss-tech" *ngIf="s.tech">
                  <span class="tech-tag" *ngFor="let t of s.tech">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="stb-arrow">↓ 動態 import src/main.tsx</div>

          <div class="st-block">
            <div class="stb-head">
              <span class="stb-file">src/entrypoints/init.ts</span>
              <span class="stb-badge badge-blue">Memoized Singleton</span>
            </div>
            <div class="stb-steps">
              <div class="ss-item" *ngFor="let s of phase1Steps.init; let i = index" [style.animationDelay]="i*80+'ms'">
                <div class="ss-dot" [style.background]="s.color"></div>
                <div class="ss-body">
                  <div class="ss-title">{{ s.title }}</div>
                  <div class="ss-desc">{{ s.desc }}</div>
                  <div class="ss-code" *ngIf="s.code">{{ s.code }}</div>
                </div>
                <div class="ss-tech" *ngIf="s.tech">
                  <span class="tech-tag" *ngFor="let t of s.tech">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="insight-box">
          <span class="ib-icon">💡</span>
          <div class="ib-text">
            <strong>為什麼要 Memoize init()？</strong>
            init() 使用 <code>memoize()</code> 封裝，整個程序生命週期只執行一次。
            這確保憑證讀取、網路設定、遙測初始化等高成本操作不會重複執行，
            即使在多個模組中多次呼叫 init() 也沒問題。
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         PHASE 2 — System Prompt Assembly
    ══════════════════════════════ -->
    <section class="section section-dark phase-section" id="phase-2">
      <div class="container">
        <div class="phase-header">
          <div class="ph-badge">Phase 02</div>
          <div class="ph-icon">📋</div>
          <div class="ph-body">
            <h2>System Prompt 組裝</h2>
            <p>在第一次呼叫 API 之前，Claude Code 將多個資料來源組合成完整的系統提示</p>
          </div>
          <div class="ph-time">10 ~ 50 ms</div>
        </div>

        <div class="prompt-anatomy">
          <div class="pa-label">完整 System Prompt 的組成結構</div>
          <div class="pa-blocks">
            <div class="pa-block" *ngFor="let b of promptBlocks">
              <div class="pab-header" [style.background]="b.color + '22'" [style.borderColor]="b.color + '55'">
                <span class="pab-icon">{{ b.icon }}</span>
                <span class="pab-name" [style.color]="b.color">{{ b.name }}</span>
                <span class="pab-size">{{ b.size }}</span>
              </div>
              <div class="pab-desc">{{ b.desc }}</div>
              <div class="pab-source">來源：<code>{{ b.source }}</code></div>
            </div>
          </div>
        </div>

        <div class="step-timeline mt-40">
          <div class="st-block">
            <div class="stb-head">
              <span class="stb-file">src/context.ts</span>
              <span class="stb-badge badge-teal">Context Builder</span>
            </div>
            <div class="stb-steps">
              <div class="ss-item" *ngFor="let s of phase2Steps; let i = index" [style.animationDelay]="i*80+'ms'">
                <div class="ss-dot" [style.background]="s.color"></div>
                <div class="ss-body">
                  <div class="ss-title">{{ s.title }}</div>
                  <div class="ss-desc">{{ s.desc }}</div>
                  <div class="ss-code" *ngIf="s.code">{{ s.code }}</div>
                </div>
                <div class="ss-tech" *ngIf="s.tech">
                  <span class="tech-tag" *ngFor="let t of s.tech">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         PHASE 3 — ReAct Loop
    ══════════════════════════════ -->
    <section class="section phase-section" id="phase-3">
      <div class="container">
        <div class="phase-header">
          <div class="ph-badge">Phase 03</div>
          <div class="ph-icon">🔄</div>
          <div class="ph-body">
            <h2>ReAct 主循環</h2>
            <p>Claude Code 的核心引擎 — 反覆「思考 → 行動 → 觀察」直到任務完成</p>
          </div>
          <div class="ph-time">2 ~ 30 秒 / 迴圈</div>
        </div>

        <!-- ReAct Loop 視覺化 -->
        <div class="react-loop-visual">
          <div class="rlv-center">
            <div class="rlv-core">
              <div class="rlv-pulse"></div>
              <span class="rlv-label">query.ts<br>while(true)</span>
            </div>
          </div>
          <div class="rlv-nodes">
            <div class="rlv-node" *ngFor="let n of reactNodes; let i = index"
                 [style.animationDelay]="i*0.2+'s'"
                 [style.borderColor]="n.color"
                 [style.background]="n.color+'11'">
              <div class="rvn-icon" [style.color]="n.color">{{ n.icon }}</div>
              <div class="rvn-name">{{ n.name }}</div>
              <div class="rvn-detail">{{ n.detail }}</div>
            </div>
          </div>
        </div>

        <div class="step-timeline mt-40">
          <div class="st-block">
            <div class="stb-head">
              <span class="stb-file">src/query.ts  ·  queryLoop()</span>
              <span class="stb-badge badge-orange">Core Engine</span>
            </div>
            <div class="stb-steps">
              <div class="ss-item" *ngFor="let s of phase3Steps; let i = index" [style.animationDelay]="i*80+'ms'">
                <div class="ss-dot" [style.background]="s.color"></div>
                <div class="ss-body">
                  <div class="ss-title">{{ s.title }}</div>
                  <div class="ss-desc">{{ s.desc }}</div>
                  <div class="ss-code" *ngIf="s.code">{{ s.code }}</div>
                  <div class="ss-sub" *ngIf="s.sub">
                    <div class="sub-item" *ngFor="let sub of s.sub">
                      <span class="sub-arrow">→</span>{{ sub }}
                    </div>
                  </div>
                </div>
                <div class="ss-tech" *ngIf="s.tech">
                  <span class="tech-tag" *ngFor="let t of s.tech">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="exit-conditions">
          <div class="ec-title">循環結束條件（任一達成即退出）</div>
          <div class="ec-list">
            <div class="ec-item" *ngFor="let e of exitConditions">
              <span class="ec-icon">{{ e.icon }}</span>
              <span class="ec-text">{{ e.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         PHASE 4 — Permission & Safety
    ══════════════════════════════ -->
    <section class="section section-dark phase-section" id="phase-4">
      <div class="container">
        <div class="phase-header">
          <div class="ph-badge">Phase 04</div>
          <div class="ph-icon">🛡️</div>
          <div class="ph-body">
            <h2>安全檢查系統 · 23+ 機制</h2>
            <p>每一個工具呼叫都必須通過多層安全閘門，任一層拒絕即中止執行</p>
          </div>
          <div class="ph-time">0 ~ 500 ms</div>
        </div>

        <!-- Permission Flow Diagram -->
        <div class="perm-flow">
          <div class="pf-title">hasPermissionsToUseTool() 決策流程</div>
          <div class="pf-pipeline">
            <div class="pfp-step" *ngFor="let s of permFlow; let i = index">
              <div class="pfps-num">{{ i + 1 }}</div>
              <div class="pfps-box" [style.borderColor]="s.color + '55'" [style.background]="s.color + '0d'">
                <div class="pfps-icon" [style.color]="s.color">{{ s.icon }}</div>
                <div class="pfps-title">{{ s.title }}</div>
                <div class="pfps-desc">{{ s.desc }}</div>
              </div>
              <div class="pfps-arrow" *ngIf="i < permFlow.length - 1">→</div>
            </div>
          </div>
        </div>

        <!-- 5 Permission Layers -->
        <div class="perm-layers">
          <div class="pl-title">五層權限架構</div>
          <div class="pl-grid">
            <div class="pl-card" *ngFor="let l of permLayers; let i = index">
              <div class="plc-num">Layer {{ i + 1 }}</div>
              <div class="plc-icon">{{ l.icon }}</div>
              <div class="plc-name">{{ l.name }}</div>
              <div class="plc-desc">{{ l.desc }}</div>
              <div class="plc-source"><code>{{ l.source }}</code></div>
            </div>
          </div>
        </div>

        <!-- 23 Safety Checks -->
        <div class="safety-checks">
          <div class="sc-title">23+ 安全機制完整列表</div>
          <div class="sc-groups">
            <div class="scg-block" *ngFor="let g of safetyGroups">
              <div class="scgb-header" [style.color]="g.color">
                <span>{{ g.icon }}</span>
                <span>{{ g.category }}</span>
              </div>
              <div class="scgb-items">
                <div class="scgi-item" *ngFor="let item of g.items; let i = index">
                  <span class="scgi-num">{{ item.num }}</span>
                  <div class="scgi-body">
                    <div class="scgi-title">{{ item.title }}</div>
                    <div class="scgi-desc">{{ item.desc }}</div>
                    <div class="scgi-file" *ngIf="item.file"><code>{{ item.file }}</code></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Permission Modes -->
        <div class="perm-modes">
          <div class="pm-title">6 種 Permission Mode</div>
          <div class="pm-grid">
            <div class="pmg-card" *ngFor="let m of permModes">
              <div class="pmgc-name" [style.color]="m.color">{{ m.name }}</div>
              <div class="pmgc-desc">{{ m.desc }}</div>
              <div class="pmgc-use">{{ m.use }}</div>
            </div>
          </div>
        </div>

        <div class="insight-box">
          <span class="ib-icon">⚡</span>
          <div class="ib-text">
            <strong>Auto Mode 分類器 (AI 安全評估)</strong>：在 auto/yolo 模式下，危險指令需要透過
            <code>classifyYoloAction()</code> 送至獨立的 AI 安全評估 API，耗時約 300–500ms。
            連續被拒絕 <strong>5 次</strong>或累計 <strong>20 次</strong>後，系統自動回退到互動提示模式，避免無限拒絕循環。
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         PHASE 5 — Tool Execution
    ══════════════════════════════ -->
    <section class="section phase-section" id="phase-5">
      <div class="container">
        <div class="phase-header">
          <div class="ph-badge">Phase 05</div>
          <div class="ph-icon">⚙️</div>
          <div class="ph-body">
            <h2>工具執行與並發控制</h2>
            <p>唯讀工具並發執行、寫入工具串列執行，結果統一回傳給模型繼續推理</p>
          </div>
          <div class="ph-time">100ms ~ 10s</div>
        </div>

        <!-- Concurrency Visual -->
        <div class="concurrency-visual">
          <div class="cv-title">工具分批策略 (toolOrchestration.ts)</div>
          <div class="cv-timeline">
            <div class="cvt-label">時間軸</div>
            <div class="cvt-lanes">
              <div class="cvtl-lane">
                <span class="lane-label read-label">並發批次 ①</span>
                <div class="lane-tool read-tool" *ngFor="let t of concurrencyViz.batch1">{{ t }}</div>
              </div>
              <div class="cvtl-lane serial-lane">
                <span class="lane-label write-label">串列執行</span>
                <div class="lane-tool write-tool">{{ concurrencyViz.write1 }}</div>
              </div>
              <div class="cvtl-lane">
                <span class="lane-label read-label">並發批次 ②</span>
                <div class="lane-tool read-tool" *ngFor="let t of concurrencyViz.batch2">{{ t }}</div>
              </div>
            </div>
            <div class="cvt-rule">最大並發數：<code>CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY</code> (預設 10)</div>
          </div>
        </div>

        <div class="step-timeline mt-40">
          <div class="st-block">
            <div class="stb-head">
              <span class="stb-file">src/services/tools/toolExecution.ts  ·  runToolUse()</span>
              <span class="stb-badge badge-teal">Tool Gate</span>
            </div>
            <div class="stb-steps">
              <div class="ss-item" *ngFor="let s of phase5Steps; let i = index" [style.animationDelay]="i*80+'ms'">
                <div class="ss-dot" [style.background]="s.color"></div>
                <div class="ss-body">
                  <div class="ss-title">{{ s.title }}</div>
                  <div class="ss-desc">{{ s.desc }}</div>
                  <div class="ss-code" *ngIf="s.code">{{ s.code }}</div>
                  <div class="ss-sub" *ngIf="s.sub">
                    <div class="sub-item" *ngFor="let sub of s.sub">
                      <span class="sub-arrow">→</span>{{ sub }}
                    </div>
                  </div>
                </div>
                <div class="ss-tech" *ngIf="s.tech">
                  <span class="tech-tag" *ngFor="let t of s.tech">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tool Categories -->
        <div class="tool-categories">
          <div class="tc-title">工具分類與執行特性</div>
          <div class="tc-grid">
            <div class="tcg-card" *ngFor="let cat of toolCategories">
              <div class="tcgc-header" [style.borderColor]="cat.color + '44'">
                <span class="tcgc-icon">{{ cat.icon }}</span>
                <span class="tcgc-name" [style.color]="cat.color">{{ cat.name }}</span>
                <span class="tcgc-mode" [style.background]="cat.color + '22'" [style.color]="cat.color">{{ cat.mode }}</span>
              </div>
              <div class="tcgc-tools">
                <span class="tct-tag" *ngFor="let t of cat.tools">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         PHASE 6 — Context Management
    ══════════════════════════════ -->
    <section class="section section-dark phase-section" id="phase-6">
      <div class="container">
        <div class="phase-header">
          <div class="ph-badge">Phase 06</div>
          <div class="ph-icon">🧹</div>
          <div class="ph-body">
            <h2>Context 管理與自動壓縮</h2>
            <p>對話不斷增長，Claude Code 使用多種策略維持在 200K Token 上限內高效運作</p>
          </div>
          <div class="ph-time">觸發時 1 ~ 5 秒</div>
        </div>

        <div class="compact-strategies">
          <div class="cs-title">5 種壓縮策略（依優先級排列）</div>
          <div class="cs-list">
            <div class="cs-item" *ngFor="let s of compactStrategies; let i = index">
              <div class="csi-priority" [style.background]="s.color + '22'" [style.color]="s.color">P{{ i + 1 }}</div>
              <div class="csi-body">
                <div class="csi-name">{{ s.name }}</div>
                <div class="csi-desc">{{ s.desc }}</div>
                <div class="csi-trigger">觸發條件：{{ s.trigger }}</div>
                <div class="csi-file"><code>{{ s.file }}</code></div>
              </div>
              <div class="csi-badge" [style.color]="s.color" [style.borderColor]="s.color + '44'" [style.background]="s.color + '11'">
                {{ s.badge }}
              </div>
            </div>
          </div>
        </div>

        <div class="compact-flow">
          <div class="cf-title">Auto Compaction 流程</div>
          <div class="cf-steps">
            <div class="cfs-step" *ngFor="let s of compactFlow; let i = index">
              <div class="cfss-num">{{ i + 1 }}</div>
              <div class="cfss-text">{{ s }}</div>
              <div class="cfss-arrow" *ngIf="i < compactFlow.length - 1">→</div>
            </div>
          </div>
        </div>

        <div class="insight-box">
          <span class="ib-icon">🔬</span>
          <div class="ib-text">
            <strong>Microcompaction（快取優化壓縮）</strong>：在每次 API 呼叫前，
            系統會掃描訊息歷史，找出可以安全刪除的「快取編輯訊息」（對同一檔案的舊版本修改記錄），
            在不影響語意的情況下縮小 Context，這個操作幾乎是零成本的。
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         PHASE 7 — Error Recovery
    ══════════════════════════════ -->
    <section class="section phase-section" id="phase-7">
      <div class="container">
        <div class="phase-header">
          <div class="ph-badge">Phase 07</div>
          <div class="ph-icon">🔧</div>
          <div class="ph-body">
            <h2>錯誤恢復機制</h2>
            <p>遇到 API 錯誤、Token 超限、網路中斷時，系統如何自動恢復而不崩潰</p>
          </div>
          <div class="ph-time">自動重試 1 ~ 10 秒</div>
        </div>

        <div class="error-grid">
          <div class="eg-card" *ngFor="let e of errorTypes">
            <div class="egc-header" [style.borderColor]="e.color + '44'">
              <span class="egc-icon">{{ e.icon }}</span>
              <span class="egc-type" [style.color]="e.color">{{ e.type }}</span>
              <span class="egc-recoverable"
                    [style.background]="e.recoverable ? '#00d4aa22' : '#ff4d6d22'"
                    [style.color]="e.recoverable ? '#00d4aa' : '#ff4d6d'">
                {{ e.recoverable ? '可恢復' : '不可恢復' }}
              </span>
            </div>
            <div class="egc-examples">
              <span class="egce-tag" *ngFor="let ex of e.examples">{{ ex }}</span>
            </div>
            <div class="egc-strategy">
              <div class="egcs-label">恢復策略</div>
              <div class="egcs-text">{{ e.strategy }}</div>
            </div>
            <div class="egc-detail" *ngIf="e.detail">{{ e.detail }}</div>
          </div>
        </div>

        <div class="retry-strategy">
          <div class="rs-title">Retry 策略 (src/services/api/withRetry.ts)</div>
          <div class="rs-timeline">
            <div class="rst-step" *ngFor="let r of retrySteps; let i = index">
              <div class="rsts-attempt" [style.color]="r.color">嘗試 {{ i + 1 }}</div>
              <div class="rsts-wait">{{ r.wait }}</div>
              <div class="rsts-action">{{ r.action }}</div>
            </div>
          </div>
          <div class="rs-note">Fallback Model：主模型失敗後自動切換至備用模型（例：Opus → Sonnet）</div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         PHASE 8 — Output & Cleanup
    ══════════════════════════════ -->
    <section class="section section-dark phase-section" id="phase-8">
      <div class="container">
        <div class="phase-header">
          <div class="ph-badge">Phase 08</div>
          <div class="ph-icon">💾</div>
          <div class="ph-body">
            <h2>輸出、記錄與優雅關閉</h2>
            <p>對話結束後，Session 資料被持久化，資源被正確釋放，供未來 /resume 使用</p>
          </div>
          <div class="ph-time">10 ~ 50 ms</div>
        </div>

        <div class="step-timeline">
          <div class="st-block">
            <div class="stb-head">
              <span class="stb-file">gracefulShutdown()  ·  Session Persistence</span>
              <span class="stb-badge badge-purple">Cleanup</span>
            </div>
            <div class="stb-steps">
              <div class="ss-item" *ngFor="let s of phase8Steps; let i = index" [style.animationDelay]="i*80+'ms'">
                <div class="ss-dot" [style.background]="s.color"></div>
                <div class="ss-body">
                  <div class="ss-title">{{ s.title }}</div>
                  <div class="ss-desc">{{ s.desc }}</div>
                  <div class="ss-code" *ngIf="s.code">{{ s.code }}</div>
                </div>
                <div class="ss-tech" *ngIf="s.tech">
                  <span class="tech-tag" *ngFor="let t of s.tech">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="session-file">
          <div class="sf-title">Session 記錄檔格式 (JSONL)</div>
          <div class="sf-code">
            <div class="sfc-line"><span class="sfc-key">~/.claude/projects/</span><span class="sfc-val">[project-hash]/</span></div>
            <div class="sfc-line"><span class="sfc-key">  sessions/</span></div>
            <div class="sfc-line"><span class="sfc-key">    [session-uuid].jsonl</span><span class="sfc-comment">  ← 每行一個 JSON 事件</span></div>
            <div class="sfc-sep"></div>
            <div class="sfc-line"><span class="sfc-key">"type":</span><span class="sfc-val"> "user"</span><span class="sfc-comment">  // user | assistant | tool_use | tool_result</span></div>
            <div class="sfc-line"><span class="sfc-key">"sessionId":</span><span class="sfc-val"> "uuid-v4"</span></div>
            <div class="sfc-line"><span class="sfc-key">"timestamp":</span><span class="sfc-val"> "2026-04-13T..."</span></div>
            <div class="sfc-line"><span class="sfc-key">"costUSD":</span><span class="sfc-val"> 0.0023</span></div>
            <div class="sfc-line"><span class="sfc-key">"durationMs":</span><span class="sfc-val"> 4521</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         技術總覽
    ══════════════════════════════ -->
    <section class="section" id="tech-overview">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">技術棧總覽</span>
          <h2>完整流程使用到的所有技術</h2>
          <p>從 CLI 框架到 AI 安全分類器，一次看清所有技術決策</p>
        </div>
        <div class="tech-overview-grid">
          <div class="tog-card" *ngFor="let t of techOverview">
            <div class="togc-category">{{ t.category }}</div>
            <div class="togc-items">
              <div class="togci-item" *ngFor="let item of t.items">
                <div class="togcii-name">{{ item.name }}</div>
                <div class="togcii-desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ── HERO ── */
    .page-hero {
      padding: 140px 0 80px;
      text-align: center;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,92,252,.13) 0%, transparent 70%);
      h1 { font-size: clamp(2rem,5vw,3.2rem); font-weight: 800; margin: 16px 0; }
      .hero-desc { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.8; margin-bottom: 24px; }
      code { font-family: 'JetBrains Mono', monospace; background: rgba(124,92,252,.15); color: #a78bfa; padding: 2px 7px; border-radius: 4px; }
    }
    .hero-meta {
      display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center;
      .hm-item { font-size: 0.82rem; color: var(--text-muted); }
      .hm-sep { color: var(--border-color); }
    }
    .gradient-text {
      background: linear-gradient(135deg,#7c5cfc,#5c8aff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }

    /* ── SECTION BASE ── */
    .section { padding: 80px 0; }
    .section-dark { background: var(--bg-secondary); padding: 80px 0; }
    .mt-40 { margin-top: 40px; }
    .section-header { text-align:center; margin-bottom: 56px;
      h2 { font-size: clamp(1.6rem,3vw,2.2rem); font-weight:800; margin:12px 0; }
      p { color:var(--text-secondary); max-width:600px; margin:0 auto; }
    }
    .section-tag {
      display:inline-block; padding:4px 14px;
      background:rgba(124,92,252,.15); border:1px solid rgba(124,92,252,.3);
      border-radius:100px; font-size:.75rem; font-weight:700; color:#7c5cfc; letter-spacing:.05em; text-transform:uppercase;
    }

    /* ── PHASE MAP ── */
    .phase-map {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(150px,1fr)); gap: 12px;
    }
    .pm-card {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px;
      padding: 20px 12px; cursor: pointer; transition: all .2s;
      &:hover { border-color: rgba(124,92,252,.5); transform: translateY(-3px); box-shadow: 0 6px 20px rgba(124,92,252,.15); }
      .pm-num { font-size: .65rem; color: var(--text-muted); font-weight:700; letter-spacing:.08em; }
      .pm-icon { font-size: 1.6rem; }
      .pm-title { font-size: .82rem; font-weight: 700; color: var(--text-primary); text-align:center; }
      .pm-time { font-size: .68rem; color: var(--text-muted); }
    }

    /* ── PHASE HEADER ── */
    .phase-section { scroll-margin-top: 80px; }
    .phase-header {
      display: flex; align-items: center; gap: 20px; margin-bottom: 48px;
      padding: 28px 32px; background: var(--bg-card); border: 1px solid var(--border-color);
      border-radius: 16px; flex-wrap: wrap;
      .ph-badge { font-size:.7rem; font-weight:800; color:#7c5cfc; background:rgba(124,92,252,.12); border:1px solid rgba(124,92,252,.3); padding:4px 12px; border-radius:100px; white-space:nowrap; }
      .ph-icon { font-size:2rem; flex-shrink:0; }
      .ph-body { flex:1; min-width:200px;
        h2 { font-size:clamp(1.3rem,2.5vw,1.8rem); font-weight:800; margin:0 0 6px; }
        p { font-size:.85rem; color:var(--text-secondary); margin:0; }
      }
      .ph-time { font-family:'JetBrains Mono',monospace; font-size:.78rem; color:#00d4aa; background:rgba(0,212,170,.1); border:1px solid rgba(0,212,170,.25); padding:6px 14px; border-radius:8px; white-space:nowrap; }
    }

    /* ── STEP TIMELINE ── */
    .step-timeline { display:flex; flex-direction:column; gap:24px; }
    .stb-arrow {
      text-align:center; font-size:.8rem; color:var(--text-muted); padding:4px 0;
      font-family:'JetBrains Mono',monospace;
    }
    .st-block {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:16px; overflow:hidden;
    }
    .stb-head {
      display:flex; align-items:center; gap:12px; padding:14px 20px;
      background:rgba(255,255,255,.02); border-bottom:1px solid var(--border-color); flex-wrap:wrap;
      .stb-file { font-family:'JetBrains Mono',monospace; font-size:.78rem; color:var(--text-secondary); }
    }
    .stb-badge {
      font-size:.65rem; font-weight:700; padding:2px 10px; border-radius:100px; border:1px solid;
      &.badge-purple { color:#7c5cfc; border-color:rgba(124,92,252,.4); background:rgba(124,92,252,.1); }
      &.badge-blue   { color:#5c8aff; border-color:rgba(92,138,255,.4); background:rgba(92,138,255,.1); }
      &.badge-teal   { color:#00d4aa; border-color:rgba(0,212,170,.4);  background:rgba(0,212,170,.1); }
      &.badge-orange { color:#ff8c42; border-color:rgba(255,140,66,.4); background:rgba(255,140,66,.1); }
    }
    .stb-steps { padding:0 20px 16px; display:flex; flex-direction:column; gap:0; }
    .ss-item {
      display:flex; gap:16px; align-items:flex-start; padding:16px 0;
      border-bottom:1px solid rgba(255,255,255,.04); animation:fadeInUp .4s ease both;
      &:last-child { border-bottom:none; }
    }
    @keyframes fadeInUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    .ss-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; margin-top:5px; }
    .ss-body { flex:1; }
    .ss-title { font-size:.9rem; font-weight:700; color:var(--text-primary); margin-bottom:4px; }
    .ss-desc  { font-size:.82rem; color:var(--text-secondary); line-height:1.6; margin-bottom:6px; }
    .ss-code  {
      font-family:'JetBrains Mono',monospace; font-size:.75rem; color:#a78bfa;
      background:rgba(124,92,252,.08); border:1px solid rgba(124,92,252,.2);
      padding:6px 12px; border-radius:6px; margin-top:6px; display:inline-block;
    }
    .ss-sub { margin-top:6px; display:flex; flex-direction:column; gap:3px; }
    .sub-item { font-size:.78rem; color:var(--text-secondary); display:flex; gap:6px; }
    .sub-arrow { color:var(--text-muted); }
    .ss-tech { display:flex; flex-direction:column; gap:4px; align-items:flex-end; min-width:80px; }
    .tech-tag {
      font-size:.65rem; font-weight:600; padding:2px 8px; border-radius:4px;
      background:rgba(92,138,255,.1); border:1px solid rgba(92,138,255,.25); color:#5c8aff; white-space:nowrap;
    }

    /* ── INSIGHT BOX ── */
    .insight-box {
      display:flex; gap:16px; align-items:flex-start; margin-top:32px;
      background:rgba(92,138,255,.06); border:1px solid rgba(92,138,255,.25); border-radius:14px; padding:20px 24px;
      .ib-icon { font-size:1.4rem; flex-shrink:0; }
      .ib-text { font-size:.85rem; color:var(--text-secondary); line-height:1.7;
        strong { color:var(--text-primary); }
        code { font-family:'JetBrains Mono',monospace; background:rgba(124,92,252,.15); color:#a78bfa; padding:1px 6px; border-radius:3px; }
      }
    }

    /* ── PROMPT ANATOMY ── */
    .prompt-anatomy { background:var(--bg-card); border:1px solid var(--border-color); border-radius:16px; padding:28px; }
    .pa-label { font-size:.75rem; color:var(--text-muted); text-align:center; margin-bottom:20px; text-transform:uppercase; letter-spacing:.06em; }
    .pa-blocks { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:14px; }
    .pa-block { border-radius:12px; border:1px solid; overflow:hidden; }
    .pab-header {
      display:flex; align-items:center; gap:8px; padding:10px 14px; border-bottom:1px solid inherit;
      .pab-icon { font-size:1.1rem; }
      .pab-name { font-size:.82rem; font-weight:700; flex:1; }
      .pab-size { font-size:.68rem; color:var(--text-muted); font-family:'JetBrains Mono',monospace; }
    }
    .pab-desc { font-size:.78rem; color:var(--text-secondary); padding:10px 14px 4px; line-height:1.5; }
    .pab-source { font-size:.7rem; color:var(--text-muted); padding:0 14px 10px;
      code { font-family:'JetBrains Mono',monospace; color:#a78bfa; }
    }

    /* ── REACT LOOP VISUAL ── */
    .react-loop-visual {
      display:flex; flex-direction:column; align-items:center; gap:32px;
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:20px; padding:40px;
    }
    .rlv-center { position:relative; }
    .rlv-core {
      width:120px; height:120px; border-radius:50%; background:rgba(124,92,252,.15);
      border:2px solid #7c5cfc; display:flex; align-items:center; justify-content:center; position:relative;
      z-index:1;
      .rlv-pulse {
        position:absolute; width:100%; height:100%; border-radius:50%;
        background:rgba(124,92,252,.2); animation:rlvPulse 2s ease infinite;
      }
      .rlv-label { font-size:.78rem; font-weight:700; color:#7c5cfc; text-align:center; font-family:'JetBrains Mono',monospace; z-index:1; }
    }
    @keyframes rlvPulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.3);opacity:0} }
    .rlv-nodes { display:flex; flex-wrap:wrap; gap:16px; justify-content:center; }
    .rlv-node {
      border-radius:14px; border:1px solid; padding:16px 20px; min-width:160px; text-align:center;
      animation:fadeInUp .5s ease both;
      .rvn-icon { font-size:1.6rem; margin-bottom:6px; }
      .rvn-name { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:4px; }
      .rvn-detail { font-size:.75rem; color:var(--text-secondary); }
    }

    /* ── EXIT CONDITIONS ── */
    .exit-conditions {
      margin-top:32px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; padding:24px;
      .ec-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:14px; }
      .ec-list { display:flex; flex-wrap:wrap; gap:10px; }
      .ec-item { display:flex; align-items:center; gap:8px; background:rgba(255,77,109,.08); border:1px solid rgba(255,77,109,.25); border-radius:8px; padding:7px 14px; font-size:.82rem; color:var(--text-secondary); }
      .ec-icon { font-size:1rem; }
    }

    /* ── PERMISSION FLOW ── */
    .perm-flow {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:16px; padding:28px; margin-bottom:32px;
      .pf-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:20px; }
    }
    .pf-pipeline { display:flex; align-items:stretch; flex-wrap:wrap; gap:8px; }
    .pfp-step { display:flex; align-items:center; gap:8px; }
    .pfps-num { font-size:.65rem; font-weight:800; color:var(--text-muted); width:20px; text-align:center; flex-shrink:0; }
    .pfps-box {
      border:1px solid; border-radius:12px; padding:14px 16px; min-width:130px; max-width:160px;
      .pfps-icon { font-size:1.3rem; margin-bottom:6px; }
      .pfps-title { font-size:.78rem; font-weight:700; margin-bottom:4px; color:var(--text-primary); }
      .pfps-desc { font-size:.7rem; color:var(--text-secondary); line-height:1.4; }
    }
    .pfps-arrow { font-size:1.2rem; color:var(--text-muted); flex-shrink:0; }

    /* ── PERM LAYERS ── */
    .perm-layers { margin-bottom:32px;
      .pl-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:16px; }
      .pl-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; }
    }
    .pl-card {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:18px;
      .plc-num { font-size:.65rem; color:var(--text-muted); font-weight:700; margin-bottom:6px; }
      .plc-icon { font-size:1.4rem; margin-bottom:6px; }
      .plc-name { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:4px; }
      .plc-desc { font-size:.75rem; color:var(--text-secondary); line-height:1.5; margin-bottom:8px; }
      .plc-source code { font-family:'JetBrains Mono',monospace; font-size:.65rem; color:#a78bfa; }
    }

    /* ── SAFETY CHECKS ── */
    .safety-checks { margin-bottom:32px;
      .sc-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:16px; }
      .sc-groups { display:flex; flex-direction:column; gap:20px; }
    }
    .scg-block { background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; overflow:hidden; }
    .scgb-header {
      display:flex; align-items:center; gap:8px; padding:12px 20px;
      background:rgba(255,255,255,.02); border-bottom:1px solid var(--border-color);
      font-size:.8rem; font-weight:700;
    }
    .scgb-items { padding:12px 20px; display:flex; flex-direction:column; gap:12px; }
    .scgi-item { display:flex; gap:12px; align-items:flex-start; }
    .scgi-num {
      font-size:.65rem; font-weight:800; color:#7c5cfc; background:rgba(124,92,252,.12);
      border:1px solid rgba(124,92,252,.25); padding:2px 7px; border-radius:4px; flex-shrink:0; margin-top:2px;
    }
    .scgi-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:3px; }
    .scgi-desc  { font-size:.78rem; color:var(--text-secondary); line-height:1.5; }
    .scgi-file code { font-family:'JetBrains Mono',monospace; font-size:.68rem; color:var(--text-muted); }

    /* ── PERMISSION MODES ── */
    .perm-modes { margin-top:32px;
      .pm-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:16px; }
      .pm-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px; }
    }
    .pmg-card {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:16px;
      .pmgc-name { font-family:'JetBrains Mono',monospace; font-size:.85rem; font-weight:700; margin-bottom:6px; }
      .pmgc-desc { font-size:.78rem; color:var(--text-secondary); margin-bottom:6px; line-height:1.5; }
      .pmgc-use  { font-size:.72rem; color:var(--text-muted); font-style:italic; }
    }

    /* ── CONCURRENCY VISUAL ── */
    .concurrency-visual {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:16px; padding:28px;
      .cv-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:20px; }
    }
    .cvt-lanes { display:flex; flex-direction:column; gap:10px; margin-bottom:16px; }
    .cvtl-lane { display:flex; align-items:center; gap:10px; }
    .lane-label { font-size:.72rem; font-weight:600; width:100px; flex-shrink:0; }
    .read-label { color:#5c8aff; }
    .write-label { color:#ff8c42; }
    .serial-lane { padding-left:0; }
    .lane-tool {
      padding:6px 14px; border-radius:6px; font-size:.78rem; font-weight:600;
      animation:toolPop .4s ease both;
      &.read-tool  { background:rgba(92,138,255,.15); border:1px solid rgba(92,138,255,.3); color:#5c8aff; }
      &.write-tool { background:rgba(255,140,66,.15); border:1px solid rgba(255,140,66,.3); color:#ff8c42; }
    }
    @keyframes toolPop { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
    .cvt-rule { font-size:.75rem; color:var(--text-muted);
      code { font-family:'JetBrains Mono',monospace; color:#a78bfa; background:rgba(124,92,252,.1); padding:1px 6px; border-radius:3px; }
    }

    /* ── TOOL CATEGORIES ── */
    .tool-categories { margin-top:32px;
      .tc-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:16px; }
      .tc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:12px; }
    }
    .tcg-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; overflow:hidden; }
    .tcgc-header {
      display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid;
      .tcgc-icon { font-size:1.1rem; }
      .tcgc-name { flex:1; font-size:.85rem; font-weight:700; }
      .tcgc-mode { font-size:.65rem; font-weight:700; padding:2px 8px; border-radius:4px; }
    }
    .tcgc-tools { padding:12px 16px; display:flex; flex-wrap:wrap; gap:6px; }
    .tct-tag {
      font-family:'JetBrains Mono',monospace; font-size:.7rem; padding:2px 8px; border-radius:4px;
      background:rgba(255,255,255,.04); border:1px solid var(--border-color); color:var(--text-secondary);
    }

    /* ── COMPACT STRATEGIES ── */
    .compact-strategies { margin-bottom:32px;
      .cs-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:16px; }
      .cs-list { display:flex; flex-direction:column; gap:12px; }
    }
    .cs-item {
      display:flex; gap:16px; align-items:flex-start; background:var(--bg-card);
      border:1px solid var(--border-color); border-radius:12px; padding:18px;
    }
    .csi-priority {
      width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center;
      font-size:.75rem; font-weight:800; flex-shrink:0;
    }
    .csi-body { flex:1; }
    .csi-name { font-size:.9rem; font-weight:700; color:var(--text-primary); margin-bottom:4px; }
    .csi-desc { font-size:.8rem; color:var(--text-secondary); line-height:1.5; margin-bottom:6px; }
    .csi-trigger { font-size:.75rem; color:var(--text-muted); margin-bottom:4px; }
    .csi-file code { font-family:'JetBrains Mono',monospace; font-size:.68rem; color:#a78bfa; }
    .csi-badge {
      font-size:.7rem; font-weight:700; padding:3px 10px; border-radius:6px; border:1px solid; white-space:nowrap; flex-shrink:0; align-self:flex-start; margin-top:4px;
    }

    .compact-flow {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; padding:24px;
      .cf-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:16px; }
      .cf-steps { display:flex; align-items:center; flex-wrap:wrap; gap:8px; }
    }
    .cfs-step { display:flex; align-items:center; gap:8px; }
    .cfss-num {
      width:24px; height:24px; border-radius:50%; background:rgba(124,92,252,.2); border:1px solid rgba(124,92,252,.4);
      display:flex; align-items:center; justify-content:center; font-size:.7rem; font-weight:800; color:#7c5cfc;
    }
    .cfss-text { font-size:.8rem; color:var(--text-secondary); }
    .cfss-arrow { color:var(--text-muted); font-size:.9rem; }

    /* ── ERROR GRID ── */
    .error-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; margin-bottom:32px; }
    .eg-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; overflow:hidden; }
    .egc-header {
      display:flex; align-items:center; gap:8px; padding:14px 18px; border-bottom:1px solid;
      .egc-icon { font-size:1.2rem; }
      .egc-type { flex:1; font-size:.85rem; font-weight:700; }
      .egc-recoverable { font-size:.65rem; font-weight:700; padding:2px 8px; border-radius:4px; }
    }
    .egc-examples { padding:10px 18px; display:flex; flex-wrap:wrap; gap:6px; }
    .egce-tag {
      font-family:'JetBrains Mono',monospace; font-size:.7rem; background:rgba(255,255,255,.04);
      border:1px solid var(--border-color); color:var(--text-muted); padding:2px 8px; border-radius:4px;
    }
    .egc-strategy { padding:0 18px 10px;
      .egcs-label { font-size:.7rem; color:var(--text-muted); margin-bottom:3px; }
      .egcs-text { font-size:.8rem; color:var(--text-secondary); line-height:1.5; }
    }
    .egc-detail { padding:0 18px 14px; font-size:.75rem; color:var(--text-muted); font-style:italic; }

    .retry-strategy {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; padding:24px;
      .rs-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:16px; }
      .rs-timeline { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px; }
      .rs-note { font-size:.78rem; color:var(--text-muted); }
    }
    .rst-step {
      background:rgba(124,92,252,.08); border:1px solid rgba(124,92,252,.25); border-radius:10px; padding:12px 16px;
      min-width:120px;
      .rsts-attempt { font-size:.75rem; font-weight:800; margin-bottom:4px; }
      .rsts-wait { font-family:'JetBrains Mono',monospace; font-size:.85rem; color:var(--text-primary); margin-bottom:3px; }
      .rsts-action { font-size:.72rem; color:var(--text-secondary); }
    }

    /* ── SESSION FILE ── */
    .session-file { margin-top:32px;
      .sf-title { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:12px; }
    }
    .sf-code {
      background:var(--bg-code); border:1px solid var(--border-color); border-radius:12px; padding:20px 24px;
      font-family:'JetBrains Mono',monospace; display:flex; flex-direction:column; gap:4px;
    }
    .sfc-line { font-size:.8rem; display:flex; gap:8px; }
    .sfc-key { color:#5c8aff; }
    .sfc-val { color:#00d4aa; }
    .sfc-comment { color:var(--text-muted); }
    .sfc-sep { height:8px; }

    /* ── TECH OVERVIEW ── */
    .tech-overview-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
    .tog-card {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; padding:22px;
      .togc-category { font-size:.7rem; font-weight:800; color:#7c5cfc; text-transform:uppercase; letter-spacing:.08em; margin-bottom:14px; }
      .togc-items { display:flex; flex-direction:column; gap:10px; }
    }
    .togci-item {
      .togcii-name { font-size:.85rem; font-weight:700; color:var(--text-primary); margin-bottom:2px; }
      .togcii-desc { font-size:.78rem; color:var(--text-secondary); line-height:1.5; }
    }

    /* ── RESPONSIVE ── */
    @media (max-width:768px) {
      .phase-map { grid-template-columns:repeat(2,1fr); }
      .phase-header { padding:20px; }
      .pf-pipeline { flex-direction:column; }
      .pfps-arrow { transform:rotate(90deg); }
      .rlv-nodes { flex-direction:column; }
      .cf-steps { flex-direction:column; }
    }
  `]
})
export class ExecutionComponent {

  private doc = inject(DOCUMENT);

  scrollTo(id: string) {
    this.doc.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  phases = [
    { num:'01', icon:'🚀', id:'phase-1', title:'Bootstrap 啟動',    time:'50~150ms' },
    { num:'02', icon:'📋', id:'phase-2', title:'System Prompt',     time:'10~50ms' },
    { num:'03', icon:'🔄', id:'phase-3', title:'ReAct 主循環',       time:'2~30s' },
    { num:'04', icon:'🛡️', id:'phase-4', title:'安全檢查',           time:'0~500ms' },
    { num:'05', icon:'⚙️', id:'phase-5', title:'工具執行',           time:'100ms~10s' },
    { num:'06', icon:'🧹', id:'phase-6', title:'Context 壓縮',       time:'觸發時1~5s' },
    { num:'07', icon:'🔧', id:'phase-7', title:'錯誤恢復',           time:'自動重試' },
    { num:'08', icon:'💾', id:'phase-8', title:'輸出與記錄',         time:'10~50ms' },
  ];

  phase1Steps = {
    cli: [
      { color:'#7c5cfc', title:'快速路徑判斷 (Fast Path)', tech:['Node.js','TypeScript'],
        desc:'在載入任何模組前，先判斷 --version、--dump-system-prompt 等特殊旗標，提前返回，避免不必要的模組載入耗時。',
        code:'if (args.includes("--version")) { printVersion(); process.exit(0); }' },
      { color:'#5c8aff', title:'Feature Gate 檢查', tech:['GrowthBook'],
        desc:'透過 feature("FLAG_NAME") 判斷功能旗標。在公開版本中所有特殊旗標皆返回 false，差異化功能在編譯期被 tree-shaken 移除。',
        code:null },
      { color:'#00d4aa', title:'動態載入主模組', tech:['Dynamic Import'],
        desc:'使用動態 import() 延遲載入 src/main.tsx，減少 CLI 啟動時的初始解析時間。',
        code:'const { cliMain } = await import("./main.tsx");' },
    ],
    init: [
      { color:'#7c5cfc', title:'enableConfigs() — 設定檔解析', tech:['JSON','~/.claude/'],
        desc:'讀取 ~/.claude/settings.json 與 ~/.anthropic/credentials.json，初始化全域設定物件。',
        code:'enableConfigs()  // 只執行一次，後續皆從快取讀取' },
      { color:'#ff8c42', title:'startMdmRawRead() — MDM 政策讀取', tech:['MDM','企業策略'],
        desc:'在背景子行程中平行讀取 MDM (Mobile Device Management) 企業安全政策，避免阻塞主流程。',
        code:null },
      { color:'#5c8aff', title:'preconnectAnthropicApi() — TCP 預熱', tech:['TLS','HTTP/2'],
        desc:'提前與 Anthropic API 建立 TCP/TLS 連線握手，與後續 100ms 的工作重疊執行，節省首次 API 呼叫延遲。',
        code:null },
      { color:'#00d4aa', title:'configureGlobalMTLS() — 雙向 TLS', tech:['mTLS','企業憑證'],
        desc:'載入自訂 CA 憑證，支援企業內網需要雙向 TLS 認證的 Proxy 環境。',
        code:'applyExtraCACertsFromConfig()' },
      { color:'#ffd166', title:'initializeGrowthBook() — 功能旗標', tech:['GrowthBook','Remote Config'],
        desc:'從遠端伺服器載入功能旗標配置，決定哪些實驗性功能對當前用戶啟用。',
        code:null },
    ]
  };

  promptBlocks = [
    { icon:'🎯', name:'Prompt Prefix', size:'~2K tokens', color:'#7c5cfc',
      desc:'模型角色定義、核心指令、回應格式規範',
      source:'src/constants/prompts.ts' },
    { icon:'📅', name:'系統上下文', size:'~500 tokens', color:'#5c8aff',
      desc:'當前日期時間、作業系統資訊、工作目錄',
      source:'src/context.ts · getSystemContext()' },
    { icon:'🌿', name:'Git 狀態', size:'~1K tokens', color:'#00d4aa',
      desc:'當前分支、最近 commit、已修改檔案清單',
      source:'src/context.ts · getGitContext()' },
    { icon:'📝', name:'CLAUDE.md 記憶', size:'~3K tokens', color:'#ff8c42',
      desc:'從當前目錄往上遞迴搜尋所有 CLAUDE.md，注入專案記憶與規範',
      source:'src/context.ts · getUserContext()' },
    { icon:'🔧', name:'工具定義', size:'~5K tokens', color:'#ff4d6d',
      desc:'所有可用工具的 JSON Schema：Bash、FileEdit、Glob、Grep 等',
      source:'src/tools.ts · getTools()' },
    { icon:'💬', name:'對話歷史', size:'動態', color:'#ffd166',
      desc:'壓縮後的對話記錄，受 Context Window 限制動態調整',
      source:'src/QueryEngine.ts' },
  ];

  phase2Steps = [
    { color:'#7c5cfc', title:'getSystemContext() — 系統資訊', tech:['Memoized','Git CLI'],
      desc:'讀取 git branch、git log、git status，組成結構化的「目前環境」說明，讓模型了解代碼庫狀態。',
      code:'export const getSystemContext = memoize(async () => { ... })' },
    { color:'#5c8aff', title:'getUserContext() — 用戶記憶注入', tech:['CLAUDE.md','fs.walk'],
      desc:'從 cwd 向上遞迴找所有 CLAUDE.md，讀取內容後合併。這是 Claude Code 的「長期記憶」機制。',
      code:'// 找出: ./CLAUDE.md, ../CLAUDE.md, ~/CLAUDE.md' },
    { color:'#00d4aa', title:'appendSystemContext() — 最終組裝', tech:['Template Literal'],
      desc:'將 Prompt Prefix + 系統上下文 + 用戶上下文組合成最終 system: [] 陣列，送給 API 的 system 參數。',
      code:null },
  ];

  reactNodes = [
    { icon:'📥', name:'準備訊息', detail:'壓縮 + 截斷 + 快取優化', color:'#7c5cfc' },
    { icon:'🌐', name:'呼叫 API', detail:'串流接收 token', color:'#5c8aff' },
    { icon:'🧠', name:'思考輸出', detail:'文字 + tool_use blocks', color:'#ff8c42' },
    { icon:'🛡️', name:'安全檢查', detail:'權限驗證 23+ 機制', color:'#ff4d6d' },
    { icon:'⚙️', name:'執行工具', detail:'並發/串列 執行', color:'#00d4aa' },
    { icon:'📊', name:'收集結果', detail:'tool_result → 下一輪', color:'#ffd166' },
  ];

  phase3Steps = [
    { color:'#7c5cfc', title:'訊息預處理 (Message Preparation)', tech:['Context Mgmt'],
      desc:'在每次 API 呼叫前，對歷史訊息進行多重處理：',
      sub:['取得壓縮邊界後的訊息 (getMessagesAfterCompactBoundary)',
           '工具結果大小截斷 (Tool Result Budget)',
           'Microcompaction：移除可快取的舊版編輯記錄',
           '若 Token 超限，觸發 Auto Compact'],
      code:null },
    { color:'#5c8aff', title:'API 呼叫 (callModel)', tech:['Anthropic SDK','Streaming'],
      desc:'組裝完整請求參數後，透過 SDK 建立串流連線。溫度固定為 1.0，max_tokens 依上下文動態調整（最高 16K）。',
      code:'for await (const event of callModel({ model, messages, tools, ... })) { ... }' },
    { color:'#ff8c42', title:'串流事件處理', tech:['AsyncGenerator','SSE'],
      desc:'逐一接收 content_block_start / content_block_delta / message_stop 事件，即時渲染文字輸出，同時蒐集 tool_use blocks。',
      code:null },
    { color:'#00d4aa', title:'工具批次執行', tech:['Concurrency','Hooks'],
      desc:'蒐集本輪所有 tool_use blocks，送入 toolOrchestration.ts 進行分批並發/串列執行（詳見 Phase 5）。',
      code:'const toolResults = await runTools(toolUseBatch, context)' },
    { color:'#ffd166', title:'結果合併繼續循環', tech:['MessageParam'],
      desc:'將工具結果包裝成 user message（type: tool_result），加入對話歷史，繼續下一輪 while 迴圈。',
      code:null },
  ];

  exitConditions = [
    { icon:'✅', text:'API 回應無 tool_use blocks（模型認為任務完成）' },
    { icon:'🛑', text:'stop_reason 為 end_turn 或 stop_sequence' },
    { icon:'🔢', text:'超過最大輪次限制 (maxTurns)' },
    { icon:'❌', text:'發生不可恢復錯誤（401、403、400）' },
    { icon:'⏹️', text:'收到 Abort Signal（用戶按 Ctrl+C）' },
  ];

  permFlow = [
    { icon:'🔧', color:'#7c5cfc', title:'Tool 自身驗證',
      desc:'每個工具實作 checkPermissions()，自行判斷 allow/deny/ask' },
    { icon:'📋', color:'#5c8aff', title:'規則比對',
      desc:'比對 5 個來源的 Allow/Deny/Ask 規則，Deny 最優先' },
    { icon:'🎛️', color:'#00d4aa', title:'Permission Mode',
      desc:'依 ask/auto/dontAsk/bypassPermissions 模式決定行為' },
    { icon:'🤖', color:'#ff8c42', title:'AI 分類器',
      desc:'auto 模式下送 classifyYoloAction() 進行 AI 安全評估' },
    { icon:'👤', color:'#ff4d6d', title:'互動提示',
      desc:'最終決策由用戶在終端機介面批准或拒絕' },
  ];

  permLayers = [
    { icon:'🚫', name:'Deny Rules（最高優先）',
      desc:'符合即拒絕，不論其他規則。來源：settings.json、CLI --denied-tools、/permissions deny',
      source:'permissions.ts:122' },
    { icon:'✅', name:'Allow Rules（自動批准）',
      desc:'符合即放行，跳過後續所有檢查。來源：settings.json、CLI --allowed-tools、session 暫時授權',
      source:'permissions.ts:200' },
    { icon:'❓', name:'Ask Rules（需要決策）',
      desc:'進入下一層判斷流程，根據目前的 Permission Mode 決定如何處理',
      source:'permissions.ts:280' },
    { icon:'🔍', name:'Safety Checks（工具專屬）',
      desc:'檔案路徑驗證、敏感目錄保護、危險指令模式偵測，由各工具自行實作',
      source:'filesystem.ts / BashTool.ts' },
    { icon:'🤖', name:'AI 分類器（Auto Mode）',
      desc:'classifyYoloAction() 呼叫獨立 Safety API，對危險操作進行 AI 評估',
      source:'permissions.ts:688' },
  ];

  safetyGroups = [
    {
      icon:'⚡', color:'#7c5cfc', category:'指令層安全 (permissionSetup.ts)',
      items: [
        { num:'01', title:'Bash(*) 萬用符封鎖', file:'permissionSetup.ts:94',
          desc:'禁止在 Allow 規則中使用 Bash(*) 或 Bash()，防止用戶意外授予所有 Bash 指令的永久權限。' },
        { num:'02', title:'Script Interpreter 偵測', file:'permissionSetup.ts:110',
          desc:'偵測 python:*、node:*、ruby:*、perl:* 等透過 Bash 呼叫的腳本解譯器，需要明確授權。' },
        { num:'03', title:'PowerShell 危險 Cmdlet', file:'permissionSetup.ts:157',
          desc:'封鎖 iex (Invoke-Expression)、Start-Process、Add-Type、wsl、cmd 等可執行任意程式碼的 PS 指令。' },
        { num:'04', title:'Agent Allow Rule 封鎖', file:'permissionSetup.ts:240',
          desc:'任何針對 Agent 工具的 Allow 規則都被視為危險，因為這將繞過子 Agent 的安全分類器。' },
      ]
    },
    {
      icon:'📁', color:'#5c8aff', category:'檔案系統安全 (filesystem.ts)',
      items: [
        { num:'05', title:'敏感目錄保護', file:'filesystem.ts',
          desc:'~/.aws/、~/.ssh/、~/.kube/、~/.claude/ 等目錄的寫入操作需要明確用戶確認，防止憑證洩露。' },
        { num:'06', title:'Symlink 解析防逃脫', file:'filesystem.ts',
          desc:'所有檔案路徑在處理前先 realpath() 解析符號連結，防止透過 symlink 繞過目錄限制。' },
        { num:'07', title:'路徑正規化（Windows）', file:'filesystem.ts',
          desc:'在 Windows 上進行大小寫不敏感的路徑比對，防止透過大小寫差異繞過白名單。' },
        { num:'08', title:'相對路徑展開', file:'filesystem.ts',
          desc:'移除 ./ 和 ../ 路徑穿越嘗試，確保所有操作都在授權目錄範圍內。' },
      ]
    },
    {
      icon:'🤖', color:'#00d4aa', category:'AI 安全分類器 (Auto Mode)',
      items: [
        { num:'09', title:'Non-Classifier 快速拒絕', file:'permissions.ts:532',
          desc:'部分操作繞過 AI 分類器，直接由硬規則拒絕，例如：操作敏感路徑、無互動介面的 pipe 模式。' },
        { num:'10', title:'acceptEdits 快速放行', file:'permissions.ts:600',
          desc:'純檔案編輯操作在 acceptEdits 模式下走快速路徑，不呼叫分類器，避免 300ms 延遲。' },
        { num:'11', title:'唯讀工具白名單', file:'permissions.ts:658',
          desc:'Read、Grep、Glob 等唯讀工具加入白名單，自動跳過分類器直接放行。' },
        { num:'12', title:'classifyYoloAction() AI 評估', file:'permissions.ts:688',
          desc:'對危險操作送至獨立安全模型評估，返回 shouldBlock、reason、stage 等詳細判斷結果。' },
        { num:'13', title:'連續拒絕限制 (5次)', file:'permissions.ts:878',
          desc:'連續被 AI 分類器拒絕 5 次後，自動回退到互動提示模式，防止無限拒絕循環阻塞任務。' },
        { num:'14', title:'累計拒絕限制 (20次)', file:'permissions.ts:901',
          desc:'整個 Session 累計 20 次拒絕後，強制回退互動模式，此計數在成功執行後不重置。' },
      ]
    },
    {
      icon:'🌐', color:'#ff8c42', category:'API 與網路安全',
      items: [
        { num:'15', title:'mTLS 憑證驗證', file:'init.ts:configureGlobalMTLS',
          desc:'支援自訂 CA 憑證的雙向 TLS，確保與 Anthropic API 的通訊在企業 Proxy 環境下的安全性。' },
        { num:'16', title:'HTTP Proxy 憑證注入', file:'init.ts',
          desc:'CCR (Claude Code Remote) 環境中，自動向上游 Proxy 注入認證標頭，防止未授權的 API 存取。' },
        { num:'17', title:'API 請求歸因標頭', file:'claude.ts',
          desc:'每個 API 請求附帶 commit hash 歸因標頭，用於追蹤哪個版本的 Claude Code 發出請求。' },
        { num:'18', title:'PowerShell Auto Mode 封鎖', file:'permissions.ts:572',
          desc:'PowerShell 指令在 auto 模式下預設需要明確用戶授權，除非設定 POWERSHELL_AUTO_MODE 旗標。' },
      ]
    },
    {
      icon:'🔒', color:'#ff4d6d', category:'執行環境安全',
      items: [
        { num:'19', title:'Headless 模式自動拒絕', file:'permissions.ts:929',
          desc:'在無 TTY 的 pipe/SDK 模式下，若沒有 Hook 提供授權決策，工具呼叫自動被拒絕，不進行互動提示。' },
        { num:'20', title:'Pre-Tool-Use Hooks 否決', file:'toolExecution.ts:487',
          desc:'在工具執行前，runPreToolUseHooks() 讓外部插件有機會否決本次執行，返回 deny 即中止。' },
        { num:'21', title:'工具結果大小限制', file:'query.ts',
          desc:'每個工具的回傳結果有 Token 預算上限，超過則截斷，防止單一工具結果佔滿整個 Context Window。' },
        { num:'22', title:'子 Agent 權限降級', file:'AgentTool.ts',
          desc:'子 Agent 只繼承父 Agent 權限的子集，無法取得比父 Agent 更高的授權，防止權限提升攻擊。' },
        { num:'23', title:'Session 隔離', file:'QueryEngine.ts',
          desc:'每個 Session 有獨立的 UUID 和狀態，不同 Session 的工具授權記錄完全隔離，不互相影響。' },
      ]
    },
  ];

  permModes = [
    { name:'ask', color:'#ffd166',
      desc:'每個工具呼叫都需要用戶明確批准',
      use:'預設模式，互動對話使用' },
    { name:'acceptEdits', color:'#5c8aff',
      desc:'自動接受檔案編輯，其他工具仍需詢問',
      use:'適合開發工作流程' },
    { name:'auto (yolo)', color:'#ff8c42',
      desc:'所有工具自動執行，但仍通過 AI 安全分類器',
      use:'CI/CD、自動化腳本' },
    { name:'plan', color:'#00d4aa',
      desc:'只允許唯讀操作，不執行任何修改',
      use:'規劃模式，review 用途' },
    { name:'dontAsk', color:'#a78bfa',
      desc:'遇到 ask 時直接拒絕，不彈出提示',
      use:'無人值守的背景 Agent' },
    { name:'bypassPermissions', color:'#ff4d6d',
      desc:'跳過所有權限檢查，需要特殊旗標才能啟用',
      use:'受信任的自動化環境' },
  ];

  concurrencyViz = {
    batch1: ['Grep', 'Glob', 'Read'],
    write1: 'FileEdit',
    batch2: ['Read', 'Grep'],
  };

  phase5Steps = [
    { color:'#7c5cfc', title:'Pre-Tool-Use Hooks', tech:['Plugin System'],
      desc:'呼叫所有已註冊的 PreToolUse Hook，讓外部插件（如 MCP Server）有機會修改輸入或否決執行。',
      sub:['返回 allow → 繼續執行', '返回 deny → 中止並回報原因', '返回 modify → 修改輸入後繼續'],
      code:'await runPreToolUseHooks(tool, input, context)' },
    { color:'#ff4d6d', title:'canUseTool() 安全閘門', tech:['Permission Engine'],
      desc:'通過 Phase 4 的完整 23+ 安全機制檢查。這是工具執行前的最後一道防線。',
      code:null },
    { color:'#ff8c42', title:'tool.call(input, context)', tech:['Tool Runtime'],
      desc:'呼叫工具的實際執行邏輯：BashTool 執行 shell 指令、FileEditTool 修改檔案、GrepTool 搜尋等。支援串流進度回報。',
      code:'const result = await tool.call(input, toolUseContext)' },
    { color:'#00d4aa', title:'Post-Tool-Use Hooks', tech:['Plugin System'],
      desc:'執行完畢後呼叫 PostToolUse Hook，讓插件能記錄結果、觸發側效應（如通知）。失敗時觸發 PostToolUseFailure Hook。',
      code:'await runPostToolUseHooks(tool, input, result, context)' },
    { color:'#5c8aff', title:'結果封裝為 ToolResultBlock', tech:['MessageParam'],
      desc:'將工具輸出封裝成 { type: "tool_result", tool_use_id, content } 格式，添加到 user message 中，供下一輪 API 呼叫使用。',
      code:null },
  ];

  toolCategories = [
    { icon:'📖', name:'唯讀工具', color:'#5c8aff', mode:'並發執行',
      tools:['Read', 'Glob', 'Grep', 'LS', 'WebFetch', 'WebSearch', 'TodoRead'] },
    { icon:'✏️', name:'寫入工具', color:'#ff8c42', mode:'串列執行',
      tools:['Edit', 'Write', 'NotebookEdit', 'TodoWrite'] },
    { icon:'⚡', name:'執行工具', color:'#ff4d6d', mode:'串列 + 安全審查',
      tools:['Bash', 'Task (Agent)'] },
    { icon:'🤖', name:'MCP 工具', color:'#7c5cfc', mode:'依 MCP Server 定義',
      tools:['mcp__server__tool', '自訂 Tool Schema', 'External APIs'] },
  ];

  compactStrategies = [
    { name:'Microcompaction（微壓縮）', color:'#00d4aa', badge:'每輪執行',
      desc:'掃描訊息歷史，刪除對同一檔案的舊版修改記錄（保留最新版本），無語意損失且幾乎零成本。',
      trigger:'每次 API 呼叫前自動執行', file:'src/query.ts · applyMicrocompaction()' },
    { name:'Snip Compact（片段截斷）', color:'#5c8aff', badge:'Feature Gated',
      desc:'刪除最舊的幾輪對話，保留最近的互動記錄。快速但會丟失早期對話脈絡。',
      trigger:'Context 使用率 > 80%', file:'src/query.ts · applySnipCompaction()' },
    { name:'Context Collapse（選擇性移除）', color:'#7c5cfc', badge:'Feature Gated',
      desc:'智能分析對話歷史，移除重複資訊或低重要性的訊息，保留關鍵決策點。',
      trigger:'特定 Token 預算閾值', file:'src/query.ts · applyContextCollapse()' },
    { name:'Auto Compaction（AI 摘要）', color:'#ff8c42', badge:'主要機制',
      desc:'呼叫獨立的 Claude API（task: summarize）將舊對話壓縮成摘要訊息，保留語意但大幅減少 Token 數量。',
      trigger:'Context 超過 AUTOCOMPACT_TRIGGER_THRESHOLD', file:'src/services/compact/autoCompact.ts' },
    { name:'手動 /compact', color:'#ff4d6d', badge:'用戶觸發',
      desc:'用戶主動執行 /compact 命令，立即觸發 AI 摘要壓縮，並在 REPL 中顯示壓縮邊界標記。',
      trigger:'用戶輸入 /compact', file:'src/screens/REPL.tsx' },
  ];

  compactFlow = [
    '偵測 Token 超過閾值',
    '選取最舊的 N 輪訊息',
    '呼叫 Claude API (summarize)',
    '生成摘要 SystemMessage',
    '替換原始訊息',
    '插入 system_compact_boundary',
    '繼續主循環',
  ];

  errorTypes = [
    { icon:'⏱️', color:'#ff8c42', type:'Rate Limit (429)', recoverable:true,
      examples:['429 Too Many Requests', 'X-RateLimit-*'],
      strategy:'指數退避重試：1s → 2s → 4s，最多重試 3-5 次',
      detail:'若所有重試耗盡，嘗試切換至備用模型（Fallback Model）' },
    { icon:'🌐', color:'#5c8aff', type:'網路/串流中斷', recoverable:true,
      examples:['ECONNRESET', 'Timeout', 'Stream Fallback'],
      strategy:'對已串流的部分訊息發送 Tombstone 事件，重新建立連線後用備用模型重試',
      detail:'部分 tool_use 輸入回填（Backfill）確保 SDK 相容性' },
    { icon:'📏', color:'#ffd166', type:'Max Output Tokens', recoverable:true,
      examples:['stop_reason: max_tokens', 'Incomplete Response'],
      strategy:'自動提高 max_tokens 上限重試，最多嘗試 3 次，每次遞增 token 上限',
      detail:'src/query.ts · maxOutputTokensRecoveryCount' },
    { icon:'📚', color:'#ff4d6d', type:'Prompt Too Long (413)', recoverable:true,
      examples:['Context window exceeded', 'prompt_too_long'],
      strategy:'觸發 Reactive Compact：立即執行 AI 摘要壓縮，然後重新發送 API 請求',
      detail:'若壓縮後仍超限，提示用戶手動 /compact 或開新 Session' },
    { icon:'🔒', color:'#ff4d6d', type:'認證失敗 (401/403)', recoverable:false,
      examples:['401 Unauthorized', '403 Forbidden', 'invalid_api_key'],
      strategy:'立即退出，顯示明確錯誤訊息，引導用戶重新執行 claude auth',
      detail:null },
    { icon:'❌', color:'#a78bfa', type:'無效請求 (400)', recoverable:false,
      examples:['400 Bad Request', 'invalid_request_error', 'model not found'],
      strategy:'記錄詳細錯誤至 transcript，顯示錯誤給用戶，不重試',
      detail:null },
  ];

  retrySteps = [
    { color:'#7c5cfc', wait:'立即', action:'主模型首次嘗試' },
    { color:'#5c8aff', wait:'~1s 後', action:'主模型重試 1' },
    { color:'#00d4aa', wait:'~2s 後', action:'主模型重試 2' },
    { color:'#ff8c42', wait:'~4s 後', action:'切換 Fallback Model' },
  ];

  phase8Steps = [
    { color:'#7c5cfc', title:'Transcript 持久化', tech:['JSONL','UUID'],
      desc:'將完整對話記錄（含工具呼叫、結果、費用）以 JSONL 格式寫入 ~/.claude/projects/[hash]/sessions/[uuid].jsonl。',
      code:'// 每行一個 JSON 事件，易於串流讀取' },
    { color:'#5c8aff', title:'Usage 統計記錄', tech:['OpenTelemetry'],
      desc:'記錄本次 Session 的 Token 用量、費用 (costUSD)、工具執行次數、API 呼叫次數等統計資料。',
      code:null },
    { color:'#00d4aa', title:'OpenTelemetry 遙測上報', tech:['OTLP','Spans'],
      desc:'將性能追蹤 Span（API 延遲、工具執行時間、啟動時間等）傳送至遠端遙測服務（opt-in）。',
      code:null },
    { color:'#ff8c42', title:'資源釋放', tech:['Cleanup'],
      desc:'關閉所有開啟的檔案控制代碼、取消待處理的 HTTP 請求、釋放 MCP 連線、清除臨時檔案。',
      code:'await gracefulShutdown()' },
  ];

  techOverview = [
    { category:'核心執行框架', items:[
      { name:'TypeScript + Node.js', desc:'整個 Claude Code 以 TypeScript 5.4 撰寫，執行於 Node.js 18+，strict mode 啟用' },
      { name:'React + Ink', desc:'終端機 UI 使用 React 元件模型，Ink 負責將 React 虛擬 DOM 渲染成 ANSI 終端輸出' },
      { name:'Commander.js', desc:'CLI 參數解析框架，負責 --version、--model、--allowed-tools 等旗標的定義與解析' },
    ]},
    { category:'AI 與 API', items:[
      { name:'Anthropic SDK', desc:'官方 TypeScript SDK，支援串流式訊息、Beta 功能旗標、Tool Use 等進階功能' },
      { name:'AWS Bedrock / Google Vertex', desc:'多雲 Provider 支援，企業用戶可透過 Bedrock 或 Vertex 呼叫 Claude，無需直接存取 Anthropic API' },
      { name:'Extended Thinking', desc:'claude-sonnet-4-5 的思考模式，透過 thinking: { budget_tokens } 參數控制推理深度' },
    ]},
    { category:'安全與權限', items:[
      { name:'GrowthBook', desc:'功能旗標服務，用於遠端控制實驗性功能的開關，支援 A/B 測試和漸進式部署' },
      { name:'classifyYoloAction()', desc:'獨立的 AI 安全分類器 API，對 Auto Mode 下的危險操作進行評估，耗時 300-500ms' },
      { name:'mTLS + Custom CA', desc:'雙向 TLS 支援，讓企業用戶在需要自訂 CA 的內網環境中安全使用 Claude Code' },
    ]},
    { category:'Context 管理', items:[
      { name:'Prompt Cache', desc:'Anthropic API 的快取機制，固定內容重複使用時費用降至 1/10，由 cache_control: ephemeral 標記控制' },
      { name:'Auto Compaction', desc:'超過閾值時自動呼叫 Claude 摘要舊對話，src/services/compact/autoCompact.ts 實作' },
      { name:'Token Counting API', desc:'在實際呼叫前預估 Token 用量，避免超出 Context Window 或造成意外高額費用' },
    ]},
    { category:'工具執行', items:[
      { name:'AsyncGenerator', desc:'ReAct 主循環和 API 呼叫都使用 async generator 實作，實現高效的背壓（backpressure）控制' },
      { name:'Concurrency Limiter', desc:'all() generator 搭配信號量限制並發數，預設最多 10 個工具同時執行' },
      { name:'MCP Protocol', desc:'Model Context Protocol，允許外部服務以標準介面向 Claude Code 提供自訂工具' },
    ]},
    { category:'觀測與除錯', items:[
      { name:'OpenTelemetry', desc:'延遲載入（避免增加 400KB 啟動開銷），收集 API 延遲、工具執行時間、Token 用量等 Span 資料' },
      { name:'JSONL Transcript', desc:'每個 Session 的完整對話以 JSONL 格式持久化，支援 /resume 恢復和歷史查詢' },
      { name:'Startup Profiler', desc:'profileCheckpoint() 在各啟動階段記錄時間戳，用於分析和優化冷啟動效能' },
    ]},
  ];
}
