import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compression',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 07</span>
      <h1>四層遞進壓縮體系</h1>
      <p>基於 src/services/compact/ 11 個源文件逆向分析。核心原則：盡可能用廉價的規則操作延遲昂貴的 LLM 呼叫，只在不得已時丟棄資訊。</p>
      <div class="hero-tags">
        <span class="htag">compact/</span>
        <span class="htag">SnipTool</span>
        <span class="htag">MicroCompact</span>
        <span class="htag">AutoCompact</span>
        <span class="htag">ReactiveCompact</span>
      </div>
    </div>

      <!-- 四級流程總覽 -->
      <section class="ch-section">
        <h2 class="ch-h2"><span class="ch-h2-icon">⚡</span>四級壓縮流程</h2>
        <p class="layer-desc">四個層級依次啟動，從最輕量的規則裁剪到最重量的緊急壓縮，代價逐級升高。</p>

        <div class="four-level-flow">
          <div class="flf-item" *ngFor="let lv of fourLevels; let i = index"
               [class.flf-active]="activeLv === i"
               (click)="activeLv = i">
            <div class="flf-circle" [style.borderColor]="lv.color" [style.color]="lv.color">{{ i+1 }}</div>
            <div class="flf-name" [style.color]="activeLv===i ? lv.color : ''">{{ lv.name }}</div>
            <div class="flf-sub">{{ lv.sub }}</div>
            <div class="flf-arrow" *ngIf="i < 3">▶</div>
          </div>
        </div>

        <div class="flf-detail" *ngIf="activeLv >= 0">
          <div class="flfd-num" [style.color]="fourLevels[activeLv].color">{{ activeLv+1 }}</div>
          <div class="flfd-body">
            <div class="flfd-title" [style.color]="fourLevels[activeLv].color">
              {{ fourLevels[activeLv].name }} — {{ fourLevels[activeLv].sub }}
            </div>
            <div class="flfd-desc">{{ fourLevels[activeLv].detail }}</div>
            <div class="flfd-strategies" *ngIf="fourLevels[activeLv].strategies">
              <span class="flfd-stag" *ngFor="let s of fourLevels[activeLv].strategies">{{ s }}</span>
            </div>
            <code class="flfd-file">{{ fourLevels[activeLv].file }}</code>
          </div>
        </div>
      </section>

      <!-- 壓縮後智能恢復 -->
      <section class="ch-section">
        <h2 class="ch-h2"><span class="ch-h2-icon">🔄</span>壓縮後智能恢復</h2>
        <p class="layer-desc">壓縮不是簡單地丟棄——壓縮完成後，系統按優先級恢復最關鍵的上下文，確保 Agent 仍能繼續有效工作。</p>

        <div class="smart-recovery">
          <div class="sr-left">
            <div class="sr-compress-icon">
              <div class="src-icon-inner">🗜️</div>
              <div class="src-label">壓縮上下文</div>
            </div>
            <div class="sr-arrow">···▶</div>
          </div>
          <div class="sr-right">
            <div class="sr-item" *ngFor="let r of recoveryItems">
              <div class="sri-num" [style.background]="r.color+'22'" [style.color]="r.color">{{ r.num }}</div>
              <div class="sri-body">
                <div class="sri-title">{{ r.title }}</div>
                <div class="sri-tags">
                  <span class="sri-token-tag">{{ r.budget }}</span>
                  <span class="sri-restored">RESTORED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sr-note">智能地先壓縮、再恢復最重要的東西</div>
      </section>

      <!-- Architecture Overview -->
      <section class="ch-section">
        <h2 class="ch-h2">
          <span class="ch-h2-icon">🏗️</span>
          整體架構總覽
        </h2>

        <div class="arch-overview-diagram">
          <div class="aod-inner" [innerHTML]="overviewDiagram"></div>
        </div>

        <div class="source-table">
          <div class="st-title">源文件清單（共 11 個）</div>
          <div class="st-grid">
            <div class="st-row" *ngFor="let f of sourceFiles">
              <code class="st-file">{{ f.file }}</code>
              <span class="st-lines">{{ f.lines }}</span>
              <span class="st-desc">{{ f.desc }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Layer 1: Microcompact -->
      <section class="ch-section layer-section layer-1">
        <div class="layer-badge-wrap">
          <div class="layer-badge lb-1">L1</div>
          <div class="layer-meta">
            <h2>微壓縮（Microcompact）</h2>
            <div class="layer-specs">
              <span class="lspec">⚡ &lt;1ms</span>
              <span class="lspec">🚫 無 LLM 呼叫</span>
              <span class="lspec">📁 microCompact.ts</span>
            </div>
          </div>
        </div>

        <p class="layer-desc">不調用 LLM，純規則操作——清理舊的、大塊的工具輸出結果，保留語義資訊。這是每輪查詢前都會執行的最輕量操作。</p>

        <div class="two-col">
          <div class="info-card">
            <h4>可壓縮工具白名單</h4>
            <p>只有以下工具的輸出會被微壓縮，其餘（Agent、Skill、MCP等）不受影響：</p>
            <div class="tool-whitelist">
              <code *ngFor="let t of microCompactTools">{{ t }}</code>
            </div>
          </div>
          <div class="info-card">
            <h4>Token 估算輔助</h4>
            <pre class="mini-code">// 粗略估算（每輪前）
roughTokenCount(text) = text.length / 4

// 圖片/文件 → 固定 2000 tokens
// thinking 塊 → 文字估算
// tool_use → name + JSON(input)

// 保守填充 × 4/3
return Math.ceil(total * (4/3))</pre>
          </div>
        </div>

        <!-- Sub-path A -->
        <div class="sub-path">
          <div class="sp-header sp-header--a">
            <span class="sp-label">子路徑 A</span>
            <h4>時間觸發微壓縮</h4>
            <span class="sp-trigger">觸發條件：距上次 assistant 訊息的時間間隔超過快取 TTL</span>
          </div>
          <div class="sp-flow">
            <div class="spf-step" *ngFor="let s of subpathA; let last = last">
              <div class="spfs-content">
                <strong>{{ s.step }}</strong>
                <code *ngIf="s.code">{{ s.code }}</code>
                <span>{{ s.desc }}</span>
              </div>
              <span class="spfs-arrow" *ngIf="!last">↓</span>
            </div>
          </div>
          <div class="sp-note">
            快取已過期，無需保護快取命中率，直接修改本地訊息內容，減少重傳時的 Token 消耗。
          </div>
        </div>

        <!-- Sub-path B -->
        <div class="sub-path">
          <div class="sp-header sp-header--b">
            <span class="sp-label">子路徑 B</span>
            <h4>快取感知微壓縮（Cached MC）</h4>
            <span class="sp-trigger">觸發條件：CACHED_MICROCOMPACT 開啟 & 模型支援 cache_edits API</span>
          </div>
          <div class="sp-flow">
            <div class="spf-step" *ngFor="let s of subpathB; let last = last">
              <div class="spfs-content">
                <strong>{{ s.step }}</strong>
                <code *ngIf="s.code">{{ s.code }}</code>
                <span>{{ s.desc }}</span>
              </div>
              <span class="spfs-arrow" *ngIf="!last">↓</span>
            </div>
          </div>
          <div class="sp-note sp-note--key">
            <strong>關鍵區別：</strong>不修改本地訊息內容！透過 API 的 <code>cache_edits</code> 字段告訴服務端刪除特定工具結果的快取，維持 prompt cache 命中率。
          </div>
          <div class="state-box">
            <h5>快取編輯的狀態管理</h5>
            <pre class="mini-code">// 全局狀態
let cachedMCState: CachedMCState | null = null
let pendingCacheEdits: CacheEditsBlock | null = null

// consumePendingCacheEdits()
//   返回待插入的快取編輯塊，然後清空 pending 狀態
//   呼叫者在 API 請求後必須呼叫 pinCacheEdits() 固定它們

// getPinnedCacheEdits()
//   返回之前已固定的快取編輯，需要在後續請求中重新發送

// markToolsSentToAPIState()
//   標記工具已發送給 API（成功回應後呼叫）</pre>
          </div>
        </div>

        <div class="code-loc-bar">
          <span class="clb-icon">📄</span>
          <code>src/services/compact/microCompact.ts</code>
          <span>~400 行</span>
          <code>src/services/compact/apiMicrocompact.ts</code>
          <code>src/services/compact/timeBasedMCConfig.ts</code>
        </div>
      </section>

      <!-- Layer 2: Auto-Compact -->
      <section class="ch-section layer-section layer-2">
        <div class="layer-badge-wrap">
          <div class="layer-badge lb-2">L2</div>
          <div class="layer-meta">
            <h2>自動壓縮觸發（Auto-Compact）</h2>
            <div class="layer-specs">
              <span class="lspec">📊 閾值計算</span>
              <span class="lspec">🔌 斷路器</span>
              <span class="lspec">📁 autoCompact.ts</span>
            </div>
          </div>
        </div>

        <p class="layer-desc">L2 本身不執行壓縮，而是決定「何時觸發壓縮」。它計算動態閾值，並防止壓縮失敗的無限循環（斷路器機制）。</p>

        <div class="threshold-calc">
          <h4>閾值計算公式</h4>
          <div class="threshold-steps">
            <div class="ts-row">
              <span class="ts-label">模型上下文窗口</span>
              <span class="ts-value">200,000 tokens（Claude Opus 為例）</span>
            </div>
            <div class="ts-arrow">−</div>
            <div class="ts-row">
              <span class="ts-label">摘要輸出預留</span>
              <span class="ts-value">min(maxOutputTokens, 20,000) = 20,000 tokens</span>
            </div>
            <div class="ts-arrow">=</div>
            <div class="ts-row ts-row--mid">
              <span class="ts-label">有效上下文窗口</span>
              <span class="ts-value ts-em">180,000 tokens</span>
            </div>
            <div class="ts-arrow">−</div>
            <div class="ts-row">
              <span class="ts-label">安全緩衝</span>
              <span class="ts-value">AUTOCOMPACT_BUFFER_TOKENS = 13,000 tokens</span>
            </div>
            <div class="ts-arrow">=</div>
            <div class="ts-row ts-row--result">
              <span class="ts-label">自動壓縮閾值</span>
              <span class="ts-value ts-em">167,000 tokens → 觸發壓縮</span>
            </div>
          </div>
          <p class="ts-note">p99.99 的摘要輸出是 17,387 tokens，因此預留 20,000 有足夠安全邊際。</p>
        </div>

        <div class="other-thresholds">
          <div class="ot-item" *ngFor="let t of thresholds">
            <code class="ot-const">{{ t.const }}</code>
            <span class="ot-val">{{ t.val }}</span>
            <span class="ot-desc">{{ t.desc }}</span>
          </div>
        </div>

        <div class="circuit-breaker">
          <h4>
            <span>🔌</span>
            斷路器機制
          </h4>
          <div class="cb-content">
            <div class="cb-code">
              <pre class="mini-code">MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES = 3

// BQ 數據分析發現：1,279 個會話連續失敗 50+ 次
// （最多 3,272 次），每天浪費約 250K 次 API 呼叫。
// 所以加了斷路器。

if (tracking.consecutiveFailures >= 3) &#123;
  return &#123; wasCompacted: false &#125;  // 直接跳過
&#125;</pre>
            </div>
            <div class="cb-note">
              <p>斷路器防止壓縮進入死循環：若連續失敗 3 次，本次會話不再嘗試自動壓縮，避免浪費大量 API 呼叫。</p>
            </div>
          </div>
        </div>

        <div class="decision-tree">
          <h4>shouldAutoCompact 決策樹</h4>
          <div class="dt-steps">
            <div class="dt-step" *ngFor="let d of autoCompactDecisions">
              <div class="dt-check">{{ d.check }}</div>
              <div class="dt-result" [class.dt-result--no]="d.result === 'false'">→ {{ d.result === 'false' ? '不壓縮' : d.result }}</div>
              <div class="dt-reason">{{ d.reason }}</div>
            </div>
          </div>
        </div>

        <div class="code-loc-bar">
          <span class="clb-icon">📄</span>
          <code>src/services/compact/autoCompact.ts</code>
          <span>~350 行</span>
          <code>src/services/compact/compactWarningHook.ts</code>
          <code>src/services/compact/compactWarningState.ts</code>
        </div>
      </section>

      <!-- Layer 3: Full Compact -->
      <section class="ch-section layer-section layer-3">
        <div class="layer-badge-wrap">
          <div class="layer-badge lb-3">L3</div>
          <div class="layer-meta">
            <h2>全量摘要壓縮（Full Compact）</h2>
            <div class="layer-specs">
              <span class="lspec">🤖 Fork Agent</span>
              <span class="lspec">⏱️ 5-30 秒</span>
              <span class="lspec">📁 compact.ts + prompt.ts</span>
            </div>
          </div>
        </div>

        <p class="layer-desc">使用 Fork Agent 生成結構化摘要——創建當前會話的一個分支，讓它生成摘要。關鍵優勢是<strong>共享主會話的 prompt cache</strong>，降低摘要生成成本。</p>

        <!-- Pre-processing pipeline -->
        <div class="pipeline">
          <h4>預處理管線</h4>
          <div class="pipeline-steps">
            <div class="ps-item" *ngFor="let s of preprocessPipeline; let last = last">
              <div class="psi-content">
                <code>{{ s.fn }}</code>
                <span>{{ s.desc }}</span>
              </div>
              <span class="psi-arrow" *ngIf="!last">↓</span>
            </div>
          </div>
        </div>

        <!-- Summary format -->
        <div class="summary-format">
          <h4>摘要輸出格式（9個章節）</h4>
          <div class="sf-xml">
            <div class="xml-block xml-block--analysis">
              <span class="xml-tag">&lt;analysis&gt;</span>
              <span class="xml-desc">思考草稿 — 提高摘要品質的中間推理過程<br>最終由 formatCompactSummary() 刪除，不進入壓縮後的上下文</span>
              <span class="xml-tag">&lt;/analysis&gt;</span>
            </div>
            <div class="xml-block xml-block--summary">
              <span class="xml-tag">&lt;summary&gt;</span>
              <div class="xml-sections">
                <div class="xs-item" *ngFor="let s of summaryChapters">
                  <span class="xs-num">{{ s.num }}</span>
                  <div>
                    <strong>{{ s.title }}</strong>
                    <span>{{ s.desc }}</span>
                  </div>
                </div>
              </div>
              <span class="xml-tag">&lt;/summary&gt;</span>
            </div>
          </div>
        </div>

        <!-- No-tools preamble -->
        <div class="preamble-box">
          <h4>防止工具呼叫的強力前導詞</h4>
          <pre class="mini-code">CRITICAL: Respond with TEXT ONLY. Do NOT call any tools.

- Do NOT use Read, Bash, Grep, Glob, Edit, Write, or ANY other tool.
- You already have all the context you need in the conversation above.
- Tool calls will be REJECTED and will waste your only turn — you will fail the task.
- Your entire response must be plain text: an &lt;analysis&gt; block followed by a &lt;summary&gt; block.</pre>
          <p class="pb-note">Sonnet 4.6+ 自適應思考模型有時會忽略較弱的尾部指令並嘗試呼叫工具。在 maxTurns: 1 的情況下，被拒絕的工具呼叫意味著沒有文字輸出，因此需要強力前導詞。</p>
        </div>

        <!-- PTL retry -->
        <div class="ptl-section">
          <h4>Prompt-Too-Long 重試機制（最多 3 次）</h4>
          <div class="ptl-steps">
            <div class="ptl-step" *ngFor="let s of ptlSteps; let last = last">
              <div class="ptl-content">
                <strong>{{ s.name }}</strong>
                <span>{{ s.desc }}</span>
                <code *ngIf="s.code">{{ s.code }}</code>
              </div>
              <span class="ptl-arrow" *ngIf="!last">→</span>
            </div>
          </div>
        </div>

        <!-- Partial compact -->
        <div class="partial-section">
          <h4>部分壓縮（Partial Compact）— 兩個方向</h4>
          <div class="partial-table">
            <div class="pt-header">
              <span>方向</span><span>提示詞變量</span><span>說明</span>
            </div>
            <div class="pt-row" *ngFor="let p of partialModes">
              <code>{{ p.dir }}</code>
              <code>{{ p.prompt }}</code>
              <span>{{ p.desc }}</span>
            </div>
          </div>
        </div>

        <!-- Post-compact message sequence -->
        <div class="post-compact">
          <h4>壓縮後訊息序列</h4>
          <div class="pc-sequence">
            <div class="pcs-item" *ngFor="let m of postCompactMessages; let i = index">
              <div class="pcs-index">{{ i }}</div>
              <div class="pcs-content">
                <code>{{ m.name }}</code>
                <span>{{ m.desc }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="code-loc-bar">
          <span class="clb-icon">📄</span>
          <code>src/services/compact/compact.ts</code>
          <span>600+ 行</span>
          <code>src/services/compact/prompt.ts</code>
          <span>~375 行</span>
          <code>src/services/compact/postCompactCleanup.ts</code>
        </div>
      </section>

      <!-- Layer 4: Session Memory Compact -->
      <section class="ch-section layer-section layer-4">
        <div class="layer-badge-wrap">
          <div class="layer-badge lb-4">L4</div>
          <div class="layer-meta">
            <h2>Session Memory 壓縮</h2>
            <div class="layer-specs">
              <span class="lspec">⚡ &lt;10ms</span>
              <span class="lspec">🚫 無 LLM 呼叫</span>
              <span class="lspec">📁 sessionMemoryCompact.ts</span>
            </div>
          </div>
        </div>

        <p class="layer-desc">不呼叫 LLM 生成新摘要，而是直接使用已通過後台記憶提取（<code>extractMemories</code>）漸進積累的 Session Memory 作為「摘要」。速度快且品質可預測。</p>

        <div class="sm-config">
          <h4>配置參數（可通過 GrowthBook 遠端動態調整）</h4>
          <div class="smc-grid">
            <div class="smc-item" *ngFor="let c of smConfig">
              <code>{{ c.key }}</code>
              <div class="smc-val">{{ c.val }}</div>
              <div class="smc-desc">{{ c.desc }}</div>
            </div>
          </div>
        </div>

        <!-- calculateMessagesToKeepIndex -->
        <div class="algo-box">
          <h4>
            <code>calculateMessagesToKeepIndex()</code>
            核心算法
          </h4>
          <div class="algo-steps">
            <div class="as-step" *ngFor="let s of calcKeepAlgo; let i = index">
              <div class="as-num">{{ i + 1 }}</div>
              <div class="as-content">
                <strong>{{ s.step }}</strong>
                <code *ngIf="s.code">{{ s.code }}</code>
                <span>{{ s.desc }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- adjustIndexToPreserveAPIInvariants -->
        <div class="algo-box algo-box--warn">
          <h4>
            <code>adjustIndexToPreserveAPIInvariants()</code>
            — 處理棘手的 API 一致性問題
          </h4>
          <p>流式傳輸時，一個 API 回應會產生多條訊息（thinking、tool_use 等），它們共享同一個 <code>message.id</code>。若在中間切斷，<code>normalizeMessagesForAPI</code> 合併時會丟失 thinking 塊。</p>

          <div class="bug-scenario">
            <h5>源碼中記錄的真實 Bug 場景：</h5>
            <pre class="mini-code">// Session 存儲（壓縮前）：
Index N:   assistant, message.id: X, content: [thinking]
Index N+1: assistant, message.id: X, content: [tool_use: ORPHAN_ID]
Index N+2: assistant, message.id: X, content: [tool_use: VALID_ID]
Index N+3: user, content: [tool_result: ORPHAN_ID, tool_result: VALID_ID]

// 如果 startIndex = N+2：
// 舊代碼：只檢查 N+2 的 tool_results，找不到，返回 N+2
// normalizeMessagesForAPI 合併後：
//   msg[1]: assistant with [tool_use: VALID_ID]  ← ORPHAN tool_use 被排除！
//   msg[2]: user with [tool_result: ORPHAN_ID, tool_result: VALID_ID]
// API 報錯：孤立的 tool_result 引用了不存在的 tool_use</pre>
          </div>

          <div class="fix-steps">
            <h5>修復算法兩步驟：</h5>
            <div class="fs-step">
              <span class="fs-num">步驟 1</span>
              <strong>修復 tool_use/tool_result 配對</strong>
              <span>收集範圍內缺失的 tool_use_id → 向前搜索，把包含缺失 tool_use 的 assistant 訊息納入範圍</span>
            </div>
            <div class="fs-step">
              <span class="fs-num">步驟 2</span>
              <strong>修復 thinking 塊分離</strong>
              <span>收集範圍內所有 message.id → 向前搜索，把共享同一 message.id 的 assistant 訊息納入範圍</span>
            </div>
          </div>
        </div>

        <!-- trySessionMemoryCompaction flow -->
        <div class="sm-flow">
          <h4>trySessionMemoryCompaction 完整流程（12 個步驟）</h4>
          <div class="smf-steps">
            <div class="smf-step" *ngFor="let s of smCompactionFlow; let i = index">
              <div class="smfs-num" [class.smfs-num--check]="s.isCheck">{{ i + 1 }}</div>
              <div class="smfs-content">
                <strong>{{ s.step }}</strong>
                <span>{{ s.desc }}</span>
                <code *ngIf="s.code">{{ s.code }}</code>
                <div class="smfs-result" *ngIf="s.result">{{ s.result }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="code-loc-bar">
          <span class="clb-icon">📄</span>
          <code>src/services/compact/sessionMemoryCompact.ts</code>
          <span>~630 行</span>
          <code>src/services/compact/grouping.ts</code>
          <span>~63 行</span>
        </div>
      </section>

      <!-- Supporting Algorithms -->
      <section class="ch-section">
        <h2 class="ch-h2">
          <span class="ch-h2-icon">⚙️</span>
          支撐算法
        </h2>

        <div class="two-col">
          <!-- Message Grouping -->
          <div class="info-card">
            <h4>消息分組算法（grouping.ts）</h4>
            <p>按 API 輪次分組，同一 API 請求的流式塊共享同一個 <code>message.id</code>：</p>
            <pre class="mini-code">// 當出現新的 assistant message.id 時，開始新的一組
// StreamingToolExecutor 在流式輸出期間交錯插入 tool_result，
// 但它們屬於同一輪次（同 message.id）
// 不跟踪未解決的 tool_use ID，讓分組邊界自然形成</pre>
          </div>

          <!-- Token Estimation -->
          <div class="info-card">
            <h4>Token 估算策略</h4>
            <div class="te-strategies">
              <div class="tes-item" *ngFor="let t of tokenStrategies">
                <strong>{{ t.name }}</strong>
                <code>{{ t.formula }}</code>
                <span>{{ t.when }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Comparison Table -->
      <section class="ch-section">
        <h2 class="ch-h2">
          <span class="ch-h2-icon">📊</span>
          各層對比
        </h2>

        <div class="comparison-table">
          <div class="ct-header">
            <span>層級</span>
            <span>速度</span>
            <span>LLM</span>
            <span>資訊保留</span>
            <span>適用場景</span>
          </div>
          <div class="ct-row" *ngFor="let r of comparisonRows" [class]="'ct-row--' + r.cls">
            <div class="ctr-layer">
              <span class="ctr-badge">{{ r.layer }}</span>
              <span>{{ r.name }}</span>
            </div>
            <span>{{ r.speed }}</span>
            <span>{{ r.llm }}</span>
            <span>{{ r.retention }}</span>
            <span>{{ r.when }}</span>
          </div>
        </div>
      </section>
  `,
  styles: [`
    :host { display: block; }
    .chapter-hero {
      padding:48px 40px 40px; border-bottom:1px solid var(--border-color);
      background:radial-gradient(ellipse 70% 50% at 30% 50%, rgba(255,209,102,.08) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#ffd166; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#ffd166,#ff8c42); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(255,209,102,.1); border:1px solid rgba(255,209,102,.25); color:#ffd166; padding:3px 10px; border-radius:4px; }

    /* ===== Chapter Header (legacy compat) ===== */
    .chapter-header {
      display: none; /* replaced by .chapter-hero */
      .ch-summary {
        code { font-family: var(--font-mono); font-size: 0.85em; color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 1px 6px; border-radius: 3px; }
        strong { color: var(--text-primary); }
      }
    }

    .correction-banner {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: rgba(255,209,102,0.08);
      border: 1px solid rgba(255,209,102,0.3);
      border-radius: var(--radius-md);
      padding: 14px 18px;

      .cb-icon { font-size: 1.2rem; flex-shrink: 0; }
      div { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; }
      strong { color: var(--accent-yellow); }
    }

    /* ===== Section ===== */
    .ch-section {
      padding: 48px 40px;
      border-bottom: 1px solid var(--border-color);
    }

    .ch-h2 {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.4rem;
      font-weight: 800;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-color);

      .ch-h2-icon { font-size: 1.2rem; }
    }

    /* ===== Layer Sections ===== */
    .layer-section {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 32px;
      margin-bottom: 24px;

      &.layer-1 { border-left: 4px solid #00d4aa; }
      &.layer-2 { border-left: 4px solid #ffd166; }
      &.layer-3 { border-left: 4px solid #ff8c42; }
      &.layer-4 { border-left: 4px solid #7c5cfc; }
    }

    .layer-badge-wrap {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 16px;
    }

    .layer-badge {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 900;
      flex-shrink: 0;

      &.lb-1 { background: rgba(0,212,170,0.15); color: #00d4aa; border: 1px solid rgba(0,212,170,0.3); }
      &.lb-2 { background: rgba(255,209,102,0.15); color: #ffd166; border: 1px solid rgba(255,209,102,0.3); }
      &.lb-3 { background: rgba(255,140,66,0.15); color: #ff8c42; border: 1px solid rgba(255,140,66,0.3); }
      &.lb-4 { background: rgba(124,92,252,0.15); color: #7c5cfc; border: 1px solid rgba(124,92,252,0.3); }
    }

    .layer-meta {
      h2 { font-size: 1.2rem; font-weight: 800; margin-bottom: 8px; }
    }

    .layer-specs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .lspec {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        color: var(--text-secondary);
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        padding: 3px 10px;
        border-radius: 100px;
      }
    }

    .layer-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 24px;

      code { font-family: var(--font-mono); font-size: 0.85em; color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 1px 6px; border-radius: 3px; }
      strong { color: var(--text-primary); }
    }

    /* ===== Two-col ===== */
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    .info-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 10px; }
      p { font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px; }
    }

    /* ===== Tool Whitelist ===== */
    .tool-whitelist {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      code {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--accent-green);
        background: rgba(0,212,170,0.08);
        border: 1px solid rgba(0,212,170,0.2);
        padding: 3px 10px;
        border-radius: 100px;
      }
    }

    /* ===== Mini Code ===== */
    .mini-code {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-code);
      background: var(--bg-code);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 12px 16px;
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.6;
      margin: 0;
    }

    /* ===== Sub-paths ===== */
    .sub-path {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 16px;
    }

    .sp-header {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;

      .sp-label {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 100px;
      }

      h4 { font-size: 0.95rem; font-weight: 700; margin: 0; }

      .sp-trigger {
        font-size: 0.75rem;
        color: var(--text-muted);
        font-style: italic;
      }

    }

    .sp-header--a .sp-label { background: rgba(0,212,170,0.15); color: #00d4aa; border: 1px solid rgba(0,212,170,0.3); }
    .sp-header--b .sp-label { background: rgba(255,209,102,0.15); color: #ffd166; border: 1px solid rgba(255,209,102,0.3); }

    .sp-flow {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }

    .spf-step {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .spfs-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 10px 14px;

      strong { font-size: 0.82rem; font-weight: 700; }
      code { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-primary); }
      span { font-size: 0.78rem; color: var(--text-secondary); }
    }

    .spfs-arrow { color: var(--accent-primary); font-weight: 700; }

    .sp-note {
      font-size: 0.82rem;
      color: var(--text-secondary);
      background: rgba(255,255,255,0.02);
      border-left: 2px solid var(--border-color);
      padding: 8px 12px;
      border-radius: 0 4px 4px 0;

    }

    .sp-note--key {
      border-left-color: var(--accent-orange);
      strong { color: var(--accent-orange); }
      code { font-family: var(--font-mono); font-size: 0.85em; color: var(--accent-green); }
    }

    .state-box {
      margin-top: 12px;
      background: var(--bg-code);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 16px;

      h5 { font-size: 0.82rem; font-weight: 700; margin-bottom: 10px; }
    }

    /* ===== Threshold Calc ===== */
    .threshold-calc {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 20px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 16px; }
    }

    .threshold-steps {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .ts-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-radius: 6px;
      background: rgba(255,255,255,0.02);

      .ts-label { font-size: 0.82rem; color: var(--text-secondary); }
      .ts-value { font-size: 0.82rem; font-family: var(--font-mono); color: var(--text-primary); }
      .ts-em { color: var(--accent-orange); font-weight: 700; }
    }

    .ts-row--mid { background: rgba(255,209,102,0.06); }
    .ts-row--result { background: rgba(255,77,109,0.06); border: 1px solid rgba(255,77,109,0.2); }

    .ts-arrow { text-align: center; color: var(--accent-primary); font-size: 1rem; padding: 2px 0; }

    .ts-note { font-size: 0.78rem; color: var(--text-muted); margin-top: 12px; font-style: italic; margin-bottom: 0; }

    /* ===== Other Thresholds ===== */
    .other-thresholds {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    .ot-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 0.82rem;

      .ot-const { font-family: var(--font-mono); color: var(--accent-primary); min-width: 200px; }
      .ot-val { font-family: var(--font-mono); color: var(--accent-orange); font-weight: 700; min-width: 80px; }
      .ot-desc { color: var(--text-secondary); }
    }

    /* ===== Circuit Breaker ===== */
    .circuit-breaker {
      background: rgba(255,77,109,0.04);
      border: 1px solid rgba(255,77,109,0.2);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 20px;

      h4 { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 700; margin-bottom: 14px; }
    }

    .cb-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      align-items: start;
    }

    .cb-note {
      p { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }
    }

    /* ===== Decision Tree ===== */
    .decision-tree {
      margin-bottom: 20px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; }
    }

    .dt-steps { display: flex; flex-direction: column; gap: 6px; }

    .dt-step {
      display: grid;
      grid-template-columns: 2fr auto 2fr;
      gap: 12px;
      align-items: center;
      padding: 8px 14px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 0.8rem;

      .dt-check { color: var(--text-secondary); }
      .dt-result { color: var(--accent-green); font-family: var(--font-mono); font-size: 0.72rem; white-space: nowrap; }
      .dt-result--no { color: var(--accent-red); }
      .dt-reason { color: var(--text-muted); font-style: italic; }
    }

    /* ===== Pipeline ===== */
    .pipeline {
      margin-bottom: 24px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 14px; }
    }

    .pipeline-steps { display: flex; align-items: stretch; flex-wrap: wrap; gap: 8px; }

    .ps-item { display: flex; align-items: center; gap: 8px; }

    .psi-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 12px 16px;

      code { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary); }
      span { font-size: 0.75rem; color: var(--text-secondary); }
    }

    .psi-arrow { color: var(--accent-primary); font-weight: 700; }

    /* ===== Summary Format ===== */
    .summary-format {
      margin-bottom: 24px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 14px; }
    }

    .sf-xml { background: var(--bg-code); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; }

    .xml-block { margin-bottom: 12px; }

    .xml-tag {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--accent-secondary);
      margin-bottom: 6px;
    }

    .xml-desc {
      display: block;
      font-size: 0.78rem;
      color: var(--text-secondary);
      padding: 8px 16px;
      border-left: 2px solid rgba(92,138,255,0.3);
      margin-bottom: 6px;
    }

    .xml-block--summary .xml-tag { color: var(--accent-green); }

    .xml-sections { padding: 8px 16px; }

    .xs-item {
      display: flex;
      gap: 10px;
      padding: 5px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
      font-size: 0.78rem;

      &:last-child { border-bottom: none; }

      .xs-num { font-family: var(--font-mono); color: var(--accent-green); min-width: 24px; font-weight: 700; }
      strong { color: var(--text-primary); font-weight: 600; min-width: 160px; }
      span { color: var(--text-secondary); }
    }

    /* ===== Preamble Box ===== */
    .preamble-box {
      background: rgba(255,77,109,0.04);
      border: 1px solid rgba(255,77,109,0.2);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 24px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; }

      .pb-note {
        font-size: 0.78rem;
        color: var(--text-muted);
        margin-top: 10px;
        font-style: italic;
        margin-bottom: 0;
      }
    }

    /* ===== PTL Retry ===== */
    .ptl-section {
      margin-bottom: 24px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 14px; }
    }

    .ptl-steps { display: flex; align-items: stretch; flex-wrap: wrap; gap: 8px; }

    .ptl-step { display: flex; align-items: center; gap: 8px; }

    .ptl-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 12px 16px;

      strong { font-size: 0.82rem; font-weight: 700; }
      span { font-size: 0.75rem; color: var(--text-secondary); }
      code { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-orange); }
    }

    .ptl-arrow { color: var(--accent-orange); font-weight: 700; }

    /* ===== Partial Compact ===== */
    .partial-section {
      margin-bottom: 24px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; }
    }

    .partial-table {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .pt-header {
      display: grid;
      grid-template-columns: 1fr 1.5fr 2fr;
      gap: 16px;
      padding: 10px 16px;
      background: rgba(255,255,255,0.03);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .pt-row {
      display: grid;
      grid-template-columns: 1fr 1.5fr 2fr;
      gap: 16px;
      padding: 12px 16px;
      border-top: 1px solid var(--border-color);
      font-size: 0.82rem;
      align-items: center;

      code { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary); }
      span { color: var(--text-secondary); }
    }

    /* ===== Post Compact ===== */
    .post-compact {
      margin-bottom: 20px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; }
    }

    .pc-sequence { display: flex; flex-direction: column; gap: 6px; }

    .pcs-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 16px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 6px;

      .pcs-index {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        color: var(--text-muted);
        min-width: 16px;
      }

      .pcs-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;

        code { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-primary); min-width: 200px; }
        span { font-size: 0.78rem; color: var(--text-secondary); }
      }
    }

    /* ===== SM Config ===== */
    .sm-config {
      margin-bottom: 24px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 14px; }
    }

    .smc-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    .smc-item {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;
      text-align: center;

      code { display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-primary); margin-bottom: 8px; }
      .smc-val { font-family: var(--font-mono); font-size: 1.4rem; font-weight: 900; color: var(--accent-purple, #7c5cfc); margin-bottom: 4px; }
      .smc-desc { font-size: 0.75rem; color: var(--text-secondary); }
    }

    /* ===== Algo Box ===== */
    .algo-box {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 20px;

      h4 {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.88rem;
        font-weight: 700;
        margin-bottom: 14px;

        code { font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-primary); }
      }

      p { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px; }
    }

    .algo-box--warn {
      border-color: rgba(255,209,102,0.3);
      background: rgba(255,209,102,0.03);
    }

    .algo-steps { display: flex; flex-direction: column; gap: 8px; }

    .as-step {
      display: flex;
      gap: 12px;

      .as-num {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(124,92,252,0.15);
        color: var(--accent-primary);
        font-family: var(--font-mono);
        font-size: 0.7rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .as-content {
        flex: 1;
        strong { display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 3px; }
        code { display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-green); background: rgba(0,212,170,0.08); padding: 2px 8px; border-radius: 3px; margin-bottom: 3px; }
        span { font-size: 0.8rem; color: var(--text-secondary); }
      }
    }

    /* ===== Bug Scenario ===== */
    .bug-scenario {
      margin: 14px 0;
      h5 { font-size: 0.8rem; font-weight: 700; margin-bottom: 8px; }
    }

    .fix-steps { display: flex; flex-direction: column; gap: 8px; }

    .fs-step {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.82rem;

      .fs-num { font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; color: var(--accent-primary); min-width: 50px; }
      strong { color: var(--text-primary); font-weight: 700; }
      span { color: var(--text-secondary); display: block; }
    }

    /* ===== SM Flow ===== */
    .sm-flow {
      margin-bottom: 20px;

      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 14px; }
    }

    .smf-steps { display: flex; flex-direction: column; gap: 6px; }

    .smf-step {
      display: flex;
      gap: 12px;
      align-items: flex-start;

      .smfs-num {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(124,92,252,0.12);
        color: var(--text-muted);
        font-family: var(--font-mono);
        font-size: 0.65rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 10px;

      }

    .smfs-num--check { background: rgba(255,77,109,0.12); color: var(--accent-red); }

      .smfs-content {
        flex: 1;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        padding: 10px 14px;

        strong { display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 3px; }
        span { display: block; font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 3px; }
        code { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-green); }
        .smfs-result { font-size: 0.72rem; color: var(--accent-red); font-style: italic; margin-top: 4px; }
      }
    }

    /* ===== Token Strategies ===== */
    .te-strategies { display: flex; flex-direction: column; gap: 10px; }

    .tes-item {
      strong { display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 2px; }
      code { display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-primary); background: rgba(124,92,252,0.08); padding: 2px 8px; border-radius: 3px; margin-bottom: 2px; }
      span { font-size: 0.75rem; color: var(--text-secondary); }
    }

    /* ===== Arch Overview ===== */
    .arch-overview-diagram {
      background: var(--bg-code);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 24px;
      overflow-x: auto;
    }

    /* ===== Source Table ===== */
    .source-table {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;

      .st-title {
        padding: 12px 16px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border-color);
        background: rgba(255,255,255,0.02);
      }

      .st-grid { display: flex; flex-direction: column; }

      .st-row {
        display: grid;
        grid-template-columns: 2fr 60px 3fr;
        gap: 16px;
        padding: 10px 16px;
        border-bottom: 1px solid var(--border-color);
        align-items: center;
        font-size: 0.8rem;

        &:last-child { border-bottom: none; }

        .st-file { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary); }
        .st-lines { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-align: right; }
        .st-desc { color: var(--text-secondary); }
      }
    }

    /* ===== Comparison Table ===== */
    .comparison-table {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .ct-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
      gap: 12px;
      padding: 10px 16px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      background: rgba(255,255,255,0.02);
      border-bottom: 1px solid var(--border-color);
    }

    .ct-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-color);
      font-size: 0.8rem;
      align-items: center;
      color: var(--text-secondary);

      &:last-child { border-bottom: none; }

      .ctr-layer {
        display: flex;
        align-items: center;
        gap: 8px;
        .ctr-badge { font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 100px; background: rgba(255,255,255,0.06); }
        span { color: var(--text-primary); font-weight: 600; }
      }
    }

    .ct-row--l1 { border-left: 3px solid #00d4aa; }
    .ct-row--l2 { border-left: 3px solid #ffd166; }
    .ct-row--l3 { border-left: 3px solid #ff8c42; }
    .ct-row--l4 { border-left: 3px solid #7c5cfc; }

    /* ===== Code Loc Bar ===== */
    .code-loc-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 10px 16px;
      margin-top: 20px;

      .clb-icon { font-size: 0.9rem; }
      code { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary); background: rgba(124,92,252,0.08); padding: 2px 8px; border-radius: 3px; }
      span { font-size: 0.72rem; color: var(--text-muted); }
    }

    /* ===== Chapter Nav ===== */
    .chapter-nav {
      display: flex;
      justify-content: space-between;
      padding-top: 40px;
      border-top: 1px solid var(--border-color);
    }

    .cnav-btn {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-decoration: none;
      padding: 10px 20px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      transition: all 0.2s;

      &:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
    }

    .cnav-btn--next {
      background: var(--gradient-primary);
      color: white;
      border: none;
      &:hover { color: white; box-shadow: var(--shadow-glow); }
    }

    @media (max-width: 640px) {
      .chapter-hero { padding-left: 20px; padding-right: 20px; }
      .two-col { grid-template-columns: 1fr; }
      .smc-grid { grid-template-columns: 1fr; }
      .cb-content { grid-template-columns: 1fr; }
      .ct-header, .ct-row { grid-template-columns: 1fr 1fr; }
      .pt-header, .pt-row { grid-template-columns: 1fr; gap: 4px; }
    }

    /* ── Four Level Flow ── */
    .four-level-flow { display: flex; align-items: center; gap: 0; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px; padding: 24px 20px; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; justify-content: center; }
    .flf-item { display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; padding: 12px 16px; border-radius: 10px; transition: background .2s; position: relative; &:hover { background: rgba(255,255,255,.04); } }
    .flf-active { background: rgba(255,255,255,.06) !important; }
    .flf-circle { width: 44px; height: 44px; border-radius: 50%; border: 2px solid; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 1rem; font-weight: 800; transition: all .2s; }
    .flf-name { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
    .flf-sub { font-size: 0.72rem; color: var(--text-muted); }
    .flf-arrow { position: absolute; right: -12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.7rem; z-index: 1; }
    .flf-detail { display: flex; gap: 16px; background: var(--bg-card); border: 1px solid var(--border-accent); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .flfd-num { font-family: var(--font-mono); font-size: 2rem; font-weight: 900; line-height: 1; flex-shrink: 0; }
    .flfd-body { flex: 1; .flfd-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 8px; } .flfd-desc { font-size: 0.83rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 10px; } }
    .flfd-strategies { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
    .flfd-stag { font-size: 0.75rem; background: rgba(124,92,252,.1); border: 1px solid rgba(124,92,252,.3); color: #a78bfa; padding: 3px 10px; border-radius: 6px; }
    .flfd-file { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); background: var(--bg-tertiary); border: 1px solid var(--border-color); padding: 3px 10px; border-radius: 4px; display: inline-block; }

    /* ── Smart Recovery ── */
    .smart-recovery { display: flex; align-items: center; gap: 24px; background: var(--bg-card); border: 1px solid rgba(124,92,252,.2); border-radius: 14px; padding: 24px; margin-bottom: 12px; }
    .sr-left { display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0; }
    .sr-compress-icon { width: 80px; height: 80px; background: rgba(124,92,252,.1); border: 1px solid rgba(124,92,252,.3); border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; .src-icon-inner { font-size: 1.8rem; } .src-label { font-size: 0.65rem; color: var(--text-muted); text-align: center; } }
    .sr-arrow { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); writing-mode: horizontal-tb; }
    .sr-right { flex: 1; display: flex; flex-direction: column; gap: 10px; }
    .sr-item { display: flex; align-items: center; gap: 12px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 10px; padding: 12px 16px; }
    .sri-num { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; flex-shrink: 0; }
    .sri-body { flex: 1; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; .sri-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); } }
    .sri-tags { display: flex; align-items: center; gap: 8px; }
    .sri-token-tag { font-family: var(--font-mono); font-size: 0.72rem; background: rgba(92,138,255,.1); border: 1px solid rgba(92,138,255,.3); color: #5c8aff; padding: 2px 8px; border-radius: 4px; }
    .sri-restored { font-size: 0.68rem; font-weight: 800; color: #00d4aa; background: rgba(0,212,170,.1); border: 1px solid rgba(0,212,170,.3); padding: 2px 8px; border-radius: 4px; }
    .sr-note { text-align: center; font-size: 0.84rem; font-weight: 700; color: var(--text-secondary); padding: 12px; }
  `]
})
export class CompressionComponent {

  activeLv = 0;

  fourLevels = [
    {
      name: 'Snip', sub: '輕量裁剪', color: '#5c8aff',
      detail: '每輪 API 呼叫前執行，清理對話中過舊的訊息片段（Snip Boundary 以前的部分），不調用 LLM，執行時間 <1ms。UI 保留完整滾動記錄，API 請求只看裁剪後的版本。',
      strategies: null,
      file: 'snipCompact.ts'
    },
    {
      name: 'Micro', sub: '三種策略', color: '#7c5cfc',
      detail: 'Microcompact 有三條路徑，依序嘗試：① 緩存感知壓縮（CachedMC）利用 cache_edits API 差量更新已快取的工具結果；② 基於時間壓縮（TimeBased）移除超過時間窗口的舊結果；③ API 級壓縮（ApiMC）直接向 API 請求壓縮特定工具輸出。',
      strategies: ['緩存感知', '基於時間', 'API 級'],
      file: 'microCompact.ts / cachedMicrocompact.ts / timeBasedMCConfig.ts'
    },
    {
      name: 'Auto', sub: '全量摘要', color: '#ffd166',
      detail: '當 Token 佔用超過設定閾值（預設 95%）時觸發，啟動獨立 Fork Agent 對整段對話做全量 AI 摘要，生成結構化的 SessionMemory。耗時 5-30 秒，換取大量 Token 空間。',
      strategies: null,
      file: 'autoCompact.ts / compact.ts'
    },
    {
      name: 'Reactive', sub: '緊急壓縮', color: '#ff4d6d',
      detail: '收到真實的 API 413（Context Too Long）錯誤時觸發，屬於最後防線。採用多階段折疊：先嘗試 collapse drain，再執行 reactiveCompact，壓縮完成後自動重試原請求，最多重試 3 次。',
      strategies: null,
      file: 'reactiveCompact.ts'
    },
  ];

  recoveryItems = [
    { num: '1', title: '最近讀取的文件', budget: '50K tokens', color: '#7c5cfc' },
    { num: '2', title: '當前 Plan 文件', budget: '5 files max', color: '#5c8aff' },
    { num: '3', title: '已調用的技能', budget: '25K tokens', color: '#00d4aa' },
  ];

  overviewDiagram = `<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
    <defs>
      <marker id="ca" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4a5568"/></marker>
      <marker id="ca2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#7c5cfc"/></marker>
    </defs>
    <rect x="10" y="80" width="90" height="44" rx="8" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.4)" stroke-width="1.5"/>
    <text x="55" y="99" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#e8eaf6">用戶訊息</text>
    <text x="55" y="115" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#8892b0">每輪觸發</text>
    <line x1="100" y1="102" x2="130" y2="102" stroke="#4a5568" stroke-width="1.5" marker-end="url(#ca)"/>
    <rect x="132" y="70" width="130" height="64" rx="8" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.5)" stroke-width="2"/>
    <text x="197" y="94" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#00d4aa" font-weight="700">L1 微壓縮</text>
    <text x="197" y="109" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#8892b0">規則清理舊工具輸出</text>
    <text x="197" y="124" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#00d4aa">不丟語義 / &lt;1ms</text>
    <line x1="262" y1="102" x2="292" y2="102" stroke="#4a5568" stroke-width="1.5" marker-end="url(#ca)"/>
    <rect x="294" y="70" width="150" height="64" rx="8" fill="rgba(255,209,102,0.1)" stroke="rgba(255,209,102,0.5)" stroke-width="2"/>
    <text x="369" y="94" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#ffd166" font-weight="700">L2 自動壓縮觸發</text>
    <text x="369" y="109" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#8892b0">閾值判斷 + 斷路器</text>
    <text x="369" y="124" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#ffd166">決定「何時」壓縮</text>
    <line x1="444" y1="102" x2="474" y2="102" stroke="#4a5568" stroke-width="1.5" marker-end="url(#ca)"/>
    <text x="480" y="60" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#4a5568">優先嘗試</text>
    <line x1="480" y1="102" x2="480" y2="40" stroke="#7c5cfc" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="480" y1="40" x2="590" y2="40" stroke="#7c5cfc" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#ca2)"/>
    <rect x="592" y="10" width="140" height="56" rx="8" fill="rgba(124,92,252,0.1)" stroke="rgba(124,92,252,0.4)" stroke-width="1.5"/>
    <text x="662" y="32" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#7c5cfc" font-weight="700">L4 SM 壓縮</text>
    <text x="662" y="48" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#8892b0">用已有摘要 / &lt;10ms</text>
    <text x="662" y="62" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#7c5cfc">Session Memory</text>
    <text x="548" y="120" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#4a5568">SM失敗則回退</text>
    <line x1="480" y1="102" x2="480" y2="150" stroke="#ff8c42" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="480" y1="150" x2="590" y2="150" stroke="#ff8c42" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#ca)"/>
    <rect x="592" y="130" width="140" height="56" rx="8" fill="rgba(255,140,66,0.1)" stroke="rgba(255,140,66,0.4)" stroke-width="1.5"/>
    <text x="662" y="152" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#ff8c42" font-weight="700">L3 全量摘要</text>
    <text x="662" y="168" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#8892b0">Fork Agent / 5-30s</text>
    <text x="662" y="182" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#ff8c42">LLM 生成結構摘要</text>
    <line x1="732" y1="38" x2="790" y2="38" stroke="#4a5568" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="732" y1="160" x2="790" y2="160" stroke="#4a5568" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="790" y1="38" x2="790" y2="160" stroke="#4a5568" stroke-width="1" stroke-dasharray="3,2"/>
    <text x="800" y="100" font-family="JetBrains Mono,monospace" font-size="8" fill="#4a5568">→</text>
    <text x="808" y="96" font-family="JetBrains Mono,monospace" font-size="8" fill="#8892b0">繼</text>
    <text x="808" y="108" font-family="JetBrains Mono,monospace" font-size="8" fill="#8892b0">續</text>
  </svg>`;

  sourceFiles = [
    { file: 'microCompact.ts', lines: '~400行', desc: '微壓縮：規則清理舊工具結果（兩條子路徑）' },
    { file: 'apiMicrocompact.ts', lines: '—', desc: 'API 層快取編輯集成（子路徑 B）' },
    { file: 'timeBasedMCConfig.ts', lines: '—', desc: '時間觸發微壓縮配置（子路徑 A）' },
    { file: 'autoCompact.ts', lines: '~350行', desc: '自動壓縮：閾值判斷 + 斷路器機制' },
    { file: 'compact.ts', lines: '600+行', desc: '全量壓縮：Fork Agent 摘要核心邏輯' },
    { file: 'prompt.ts', lines: '~375行', desc: '壓縮提示詞模板（三種 + NO_TOOLS_PREAMBLE）' },
    { file: 'sessionMemoryCompact.ts', lines: '~630行', desc: 'Session Memory 壓縮路徑' },
    { file: 'grouping.ts', lines: '~63行', desc: '消息按 API 輪次分組算法' },
    { file: 'postCompactCleanup.ts', lines: '—', desc: '壓縮後清理' },
    { file: 'compactWarningHook.ts', lines: '—', desc: '壓縮警告鉤子' },
    { file: 'compactWarningState.ts', lines: '—', desc: '壓縮警告狀態管理' },
  ];

  microCompactTools = ['Read', 'Bash', 'Grep', 'Glob', 'WebSearch', 'WebFetch', 'Edit', 'Write'];

  subpathA = [
    { step: '計算時間間隔', code: 'timeSinceLastAssistant()', desc: '判斷是否超過快取 TTL' },
    { step: '收集可壓縮 ID', code: 'collectCompactableToolIds()', desc: '找出白名單工具的 tool_use IDs' },
    { step: '保留最近 N 個', code: 'keep = config.keepRecent', desc: '較新的結果維持不變' },
    { step: '替換舊結果', code: '"[Old tool result content cleared]"', desc: '直接修改本地訊息內容' },
  ];

  subpathB = [
    { step: '特性開關確認', code: 'CACHED_MICROCOMPACT && supportsCache', desc: '必須模型支援 cache_edits API' },
    { step: '收集可壓縮 ID', code: 'collectCompactableToolIds()', desc: '按用戶訊息分組' },
    { step: '決定刪除哪些', code: 'getToolResultsToDelete(count, keep)', desc: '根據 count/keep 閾值' },
    { step: '生成 cache_edits', code: 'createCacheEditsBlock()', desc: '告知服務端刪除特定快取' },
    { step: '傳遞給 API 請求', code: 'consumePendingCacheEdits()', desc: '下次 API 請求攜帶此塊' },
  ];

  thresholds = [
    { const: 'WARNING_THRESHOLD_BUFFER_TOKENS', val: '20,000', desc: '觸發壓縮警告提示用戶' },
    { const: 'ERROR_THRESHOLD_BUFFER_TOKENS', val: '20,000', desc: '觸發錯誤級別警告' },
    { const: 'MANUAL_COMPACT_BUFFER_TOKENS', val: '3,000', desc: '手動 /compact 的阻塞限制' },
  ];

  autoCompactDecisions = [
    { check: 'querySource === "session_memory" 或 "compact"？', result: 'false', reason: '防止壓縮代理自己觸發壓縮（遞歸死鎖）' },
    { check: 'querySource === "marble_origami"？', result: 'false', reason: '上下文折疊代理，防止破壞主線程提交日誌' },
    { check: 'isAutoCompactEnabled() 返回 false？', result: 'false', reason: '檢查 DISABLE_AUTO_COMPACT 環境變量和用戶配置' },
    { check: '響應式壓縮模式開啟？', result: 'false', reason: '讓 API 的 prompt-too-long 錯誤觸發響應式壓縮' },
    { check: '上下文折疊模式開啟？', result: 'false', reason: '上下文折疊在 90%/95% 處理，避免干擾' },
    { check: 'tokenCount(messages) >= threshold？', result: '觸發壓縮', reason: '超過 167K tokens 閾值，開始壓縮流程' },
  ];

  preprocessPipeline = [
    { fn: 'stripImagesFromMessages()', desc: '圖片→"[image]"，文件→"[document]"（防止壓縮請求自身超限）' },
    { fn: 'stripReinjectedAttachments()', desc: '刪除技能發現/列表附件（壓縮後會自動重新注入）' },
    { fn: 'normalizeMessagesForAPI()', desc: '規範化訊息格式，確保 API 格式合規' },
    { fn: '發送給 Fork Agent', desc: '共享主會話的 prompt cache，單輪生成摘要' },
  ];

  summaryChapters = [
    { num: '1.', title: 'Primary Request and Intent', desc: '詳細描述用戶的所有請求和意圖' },
    { num: '2.', title: 'Key Technical Concepts', desc: '關鍵技術概念列表' },
    { num: '3.', title: 'Files and Code Sections', desc: '涉及的文件名與重要代碼片段' },
    { num: '4.', title: 'Errors and fixes', desc: '遇到的錯誤與修復方式及用戶反饋' },
    { num: '5.', title: 'Problem Solving', desc: '問題解決的完整過程' },
    { num: '6.', title: 'All user messages', desc: '逐條列出所有非工具結果的用戶訊息' },
    { num: '7.', title: 'Pending Tasks', desc: '待辦事項清單' },
    { num: '8.', title: 'Current Work', desc: '精確描述當前工作內容（含文件名和代碼片段）' },
    { num: '9.', title: 'Optional Next Step', desc: '下一步計劃，包含最近對話的直接引用' },
  ];

  ptlSteps = [
    { name: '壓縮請求超限', desc: '壓縮請求本身 Token 數超過上下文', code: undefined },
    { name: '解析 Token 缺口', desc: '嘗試從錯誤訊息解析 tokenGap', code: 'getPromptTooLongTokenGap()' },
    { name: '精確刪除（有缺口）', desc: '按組累加 Token 直到覆蓋缺口', code: 'groupMessagesByApiRound()' },
    { name: '保守刪除（無缺口）', desc: '刪除最舊的 20% 訊息組', code: 'Math.floor(groups.length * 0.2)' },
    { name: '最多重試 3 次', desc: 'MAX_PTL_RETRIES = 3，超過則放棄', code: 'ptlRetryCount < 3' },
  ];

  partialModes = [
    { dir: 'from（默認）', prompt: 'PARTIAL_COMPACT_PROMPT', desc: '保留舊訊息，僅摘要「最近的訊息」' },
    { dir: 'up_to', prompt: 'PARTIAL_COMPACT_UP_TO_PROMPT', desc: '摘要舊訊息，保留新訊息。摘要放在開頭，包含特殊第 9 章節 "Context for Continuing Work"' },
  ];

  postCompactMessages = [
    { name: '[CompactBoundaryMessage]', desc: '標記壓縮邊界，含 token 統計和 trigger 類型' },
    { name: '[SummaryUserMessage]', desc: '格式化後的摘要（已刪除 analysis 塊）' },
    { name: '[messagesToKeep]', desc: '保留的最近訊息（可選）' },
    { name: '[Attachments]', desc: '最近讀取文件（前5個/≤5K tokens/總預算50K）+ Plan 文件 + MCP 指令增量' },
    { name: '[HookResults]', desc: 'PreCompact/PostCompact 鉤子執行結果' },
  ];

  smConfig = [
    { key: 'minTokens', val: '10,000', desc: '至少保留 10K tokens 的最近訊息' },
    { key: 'minTextBlockMessages', val: '5', desc: '至少保留 5 條含文字的訊息' },
    { key: 'maxTokens', val: '40,000', desc: '最多保留 40K tokens（硬上限）' },
  ];

  calcKeepAlgo = [
    { step: 'startIndex = lastSummarizedIndex + 1', code: undefined, desc: '從 Session Memory 尚未覆蓋的訊息開始' },
    { step: '計算 [startIndex, end] 的 token 總量和含文字訊息數', code: 'estimateMessageTokens()', desc: '' },
    { step: '若已超過 maxTokens (40K)', code: '> 40,000', desc: '直接返回，不再擴展範圍' },
    { step: '若同時滿足 ≥ minTokens (10K) AND ≥ minTextBlockMessages (5)', code: '>= 10K && >= 5', desc: '已足夠，直接返回' },
    { step: '否則從 startIndex 往前逐條擴展', code: 'startIndex--', desc: '停止條件：達到 maxTokens、滿足 min 條件、遇到舊的 CompactBoundary' },
    { step: 'adjustIndexToPreserveAPIInvariants()', code: undefined, desc: '確保不切斷 tool_use/tool_result 配對，不分離 thinking 塊' },
  ];

  smCompactionFlow = [
    { step: 'shouldUseSessionMemoryCompaction()？', desc: '檢查 tengu_session_memory AND tengu_sm_compact 特性開關', code: undefined, result: undefined, isCheck: true },
    { step: '初始化遠端配置', desc: '僅首次初始化 GrowthBook 遠端配置', code: undefined, result: undefined, isCheck: false },
    { step: '等待 SM 提取完成', desc: '等待正在進行的 Session Memory 提取（帶超時）', code: undefined, result: undefined, isCheck: false },
    { step: '獲取 SM 內容', desc: '讀取 lastSummarizedMessageId 和 sessionMemory 文件內容', code: undefined, result: undefined, isCheck: false },
    { step: 'SM 文件不存在？', desc: '返回 null，回退到傳統壓縮', code: undefined, result: '→ 返回 null', isCheck: true },
    { step: 'SM 是空模板？', desc: '返回 null，避免使用無效摘要', code: undefined, result: '→ 返回 null', isCheck: true },
    { step: '確定 lastSummarizedIndex', desc: '正常：查找 lastSummarizedMessageId 索引；恢復的會話：設為 messages.length - 1', code: undefined, result: undefined, isCheck: false },
    { step: 'calculateMessagesToKeepIndex()', desc: '計算需要保留的訊息起始索引', code: 'startIndex', result: undefined, isCheck: false },
    { step: '過濾舊 CompactBoundary', desc: '從 messagesToKeep 中移除舊的壓縮邊界標記', code: undefined, result: undefined, isCheck: false },
    { step: '執行 SessionStart 鉤子', desc: '恢復 CLAUDE.md 等上下文', code: undefined, result: undefined, isCheck: false },
    { step: '創建壓縮結果', desc: '截斷過大的 SM 章節 + 生成摘要用戶訊息 + 附加 Plan 文件', code: undefined, result: undefined, isCheck: false },
    { step: '驗證壓縮效果', desc: '若壓縮後 token 仍超過閾值，返回 null 回退到傳統壓縮', code: undefined, result: '→ 返回 null 或 CompactionResult', isCheck: true },
  ];

  tokenStrategies = [
    { name: '粗略估算', formula: 'text.length / 4', when: '每輪前快速估算，用於閾值判斷' },
    { name: '精確計算', formula: 'usage.input_tokens（API 回應）', when: '有 API 回應時使用，最準確' },
    { name: '混合策略', formula: 'tokenCountWithEstimation()', when: '優先精確值，不可用時回退估算' },
    { name: '保守填充', formula: 'Math.ceil(total * (4/3))', when: '估算完後乘 4/3，確保安全邊際' },
  ];

  comparisonRows = [
    { layer: 'L1', cls: 'l1', name: '微壓縮', speed: '< 1ms', llm: '❌ 無', retention: '⭐⭐⭐⭐', when: '每輪查詢前，自動執行' },
    { layer: 'L4', cls: 'l4', name: 'SM 壓縮', speed: '< 10ms', llm: '❌ 無', retention: '⭐⭐⭐⭐', when: 'Token 超限，SM 存在時優先' },
    { layer: 'L2', cls: 'l2', name: '自動觸發', speed: '決策用', llm: '⚖️ 協調', retention: 'N/A（觸發器）', when: 'Token 超過閾值時協調' },
    { layer: 'L3', cls: 'l3', name: '全量摘要', speed: '5-30 秒', llm: '✅ 有', retention: '⭐⭐⭐⭐⭐', when: 'SM 壓縮失敗或不可用時' },
  ];
}
