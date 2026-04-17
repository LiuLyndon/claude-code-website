import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- HERO -->
    <div class="page-hero">
      <div class="container">
        <span class="section-tag">Token 解析</span>
        <h1>什麼是 <span class="gradient-text">Token</span>？</h1>
        <p class="hero-desc">
          AI 模型看到的不是文字，而是 Token<br>
          深入理解 Token 的本質、計算方式與 Claude 如何高效運用
        </p>
        <div class="hero-chips">
          <span class="chip chip-purple">文字切割單位</span>
          <span class="chip chip-blue">200K 上下文視窗</span>
          <span class="chip chip-teal">輸入 / 輸出計費</span>
          <span class="chip chip-orange">Prompt 快取優化</span>
          <span class="chip chip-red">BPE 分詞演算法</span>
        </div>
      </div>
    </div>

    <!-- ① WHAT IS A TOKEN -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">基本概念</span>
          <h2>Token 不是字，也不是詞</h2>
          <p>AI 模型使用「位元組對編碼 (BPE)」將文字切割成比詞更小的片段</p>
        </div>

        <div class="token-demo-box">
          <div class="demo-label">互動範例 — 觀察文字如何被切割成 Token</div>
          <div class="demo-examples">
            <div class="demo-item" *ngFor="let ex of tokenExamples; let i = index"
                 [class.active]="activeDemo() === i"
                 (click)="setActiveDemo(i)">
              <span class="demo-text">{{ ex.label }}</span>
            </div>
          </div>

          <div class="token-visual">
            <div class="original-text">
              <span class="tv-label">原始文字</span>
              <span class="tv-content">{{ tokenExamples[activeDemo()].text }}</span>
            </div>
            <div class="arrow-down">▼ 分詞器 (Tokenizer)</div>
            <div class="tokens-row">
              <span class="tv-label">Token 片段</span>
              <div class="tokens-list">
                <span
                  class="token-chip"
                  *ngFor="let t of tokenExamples[activeDemo()].tokens; let ti = index"
                  [style.animationDelay]="ti * 80 + 'ms'"
                  [style.background]="tokenColors[ti % tokenColors.length] + '33'"
                  [style.borderColor]="tokenColors[ti % tokenColors.length]"
                  [style.color]="tokenColors[ti % tokenColors.length]">{{ t }}</span>
              </div>
            </div>
            <div class="token-count-row">
              <div class="tc-box">
                <span class="tc-num">{{ tokenExamples[activeDemo()].tokens.length }}</span>
                <span class="tc-label">Tokens</span>
              </div>
              <div class="tc-box">
                <span class="tc-num">{{ tokenExamples[activeDemo()].text.length }}</span>
                <span class="tc-label">字元數</span>
              </div>
              <div class="tc-box">
                <span class="tc-num">{{ (tokenExamples[activeDemo()].text.length / tokenExamples[activeDemo()].tokens.length).toFixed(1) }}</span>
                <span class="tc-label">字元/Token</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ② ANIMATED TOKEN FLOW -->
    <section class="section section-dark">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">處理流程動畫</span>
          <h2>Token 如何流過 Claude？</h2>
          <p>從你的輸入到 Claude 的回應，每個環節都以 Token 為單位傳遞</p>
        </div>

        <div class="flow-wrapper">
          <!-- Step 1: User Input -->
          <div class="flow-stage stage-input">
            <div class="stage-icon">✏️</div>
            <div class="stage-title">使用者輸入</div>
            <div class="stage-desc">你輸入的問題或指令</div>
            <div class="stage-example">"幫我寫一個 Python 排序函式"</div>
          </div>

          <div class="flow-arrow">
            <div class="arrow-line"></div>
            <div class="arrow-label">Tokenize</div>
            <div class="flowing-tokens">
              <span class="ft" *ngFor="let t of flowTokens1; let i = index" [style.animationDelay]="i * 0.15 + 's'">{{ t }}</span>
            </div>
          </div>

          <!-- Step 2: Encoding -->
          <div class="flow-stage stage-encode">
            <div class="stage-icon">🔢</div>
            <div class="stage-title">Token ID 轉換</div>
            <div class="stage-desc">每個 Token 對應整數 ID</div>
            <div class="stage-ids">
              <span class="sid" *ngFor="let id of tokenIds">{{ id }}</span>
            </div>
          </div>

          <div class="flow-arrow">
            <div class="arrow-line"></div>
            <div class="arrow-label">Embedding</div>
          </div>

          <!-- Step 3: Model -->
          <div class="flow-stage stage-model">
            <div class="stage-icon">🧠</div>
            <div class="stage-title">Transformer 模型</div>
            <div class="stage-desc">多層 Attention 機制<br>理解上下文關係</div>
            <div class="model-layers">
              <div class="ml" *ngFor="let l of modelLayers; let i = index" [style.animationDelay]="i * 0.2 + 's'">
                <span>Layer {{ l }}</span>
                <div class="ml-bar"></div>
              </div>
            </div>
          </div>

          <div class="flow-arrow">
            <div class="arrow-line"></div>
            <div class="arrow-label">Auto-regressive</div>
            <div class="flowing-tokens out-tokens">
              <span class="ft ft-out" *ngFor="let t of flowTokens2; let i = index" [style.animationDelay]="i * 0.2 + 's'">{{ t }}</span>
            </div>
          </div>

          <!-- Step 4: Output -->
          <div class="flow-stage stage-output">
            <div class="stage-icon">💬</div>
            <div class="stage-title">逐 Token 輸出</div>
            <div class="stage-desc">模型每次預測下一個 Token<br>直到生成完整回應</div>
            <div class="stage-example out-example">
              <span class="typing-text">def sort_list(arr):...</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ CONTEXT WINDOW -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">上下文視窗</span>
          <h2>Claude 的記憶容量 — 200K Tokens</h2>
          <p>上下文視窗是模型在一次對話中能「看見」的最大 Token 數量</p>
        </div>

        <div class="context-visual">
          <div class="ctx-window">
            <div class="ctx-header">
              <span class="ctx-title">Context Window  · 200,000 tokens</span>
              <span class="ctx-usage">目前使用: {{ ctxUsedPercent }}%</span>
            </div>
            <div class="ctx-bar-outer">
              <div class="ctx-bar-system" [style.width]="'5%'" title="系統提示">
                <span class="ctx-seg-label">System</span>
              </div>
              <div class="ctx-bar-history" [style.width]="'30%'" title="對話歷史">
                <span class="ctx-seg-label">History</span>
              </div>
              <div class="ctx-bar-tools" [style.width]="'10%'" title="工具定義">
                <span class="ctx-seg-label">Tools</span>
              </div>
              <div class="ctx-bar-user" [style.width]="'15%'" title="當前提問">
                <span class="ctx-seg-label">User</span>
              </div>
              <div class="ctx-bar-free" [style.width]="'40%'">
                <span class="ctx-seg-label free-label">剩餘可用</span>
              </div>
            </div>
            <div class="ctx-legend">
              <div class="cl-item"><span class="cl-dot" style="background:#7c5cfc"></span>系統提示 (~10K)</div>
              <div class="cl-item"><span class="cl-dot" style="background:#5c8aff"></span>對話歷史 (~60K)</div>
              <div class="cl-item"><span class="cl-dot" style="background:#00d4aa"></span>工具定義 (~20K)</div>
              <div class="cl-item"><span class="cl-dot" style="background:#ff8c42"></span>當前輸入 (~30K)</div>
              <div class="cl-item"><span class="cl-dot" style="background:#1a2540"></span>剩餘空間 (~80K)</div>
            </div>
          </div>

          <div class="ctx-compare">
            <div class="cc-card" *ngFor="let m of modelCompare">
              <div class="cc-name">{{ m.name }}</div>
              <div class="cc-bar-wrap">
                <div class="cc-bar" [style.width]="m.percent + '%'" [style.background]="m.color"></div>
              </div>
              <div class="cc-tokens">{{ m.tokens }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ PRICING & TYPES -->
    <section class="section section-dark">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">計費模型</span>
          <h2>Input Token vs Output Token</h2>
          <p>輸入與輸出的 Token 使用不同定價，理解差異有助於優化成本</p>
        </div>

        <div class="pricing-grid">
          <div class="price-card input-card">
            <div class="pc-icon">📥</div>
            <div class="pc-title">Input Tokens</div>
            <div class="pc-subtitle">你送給模型的所有內容</div>
            <ul class="pc-list">
              <li>系統提示 (System Prompt)</li>
              <li>對話歷史 (History)</li>
              <li>當前用戶訊息</li>
              <li>工具定義 (Tool Schemas)</li>
              <li>工具執行結果 (Tool Results)</li>
            </ul>
            <div class="pc-price">
              <span class="pp-model">Claude Sonnet 4.5</span>
              <span class="pp-rate">$3 / 1M tokens</span>
            </div>
          </div>

          <div class="vs-divider">
            <div class="vs-line"></div>
            <span class="vs-text">VS</span>
            <div class="vs-line"></div>
          </div>

          <div class="price-card output-card">
            <div class="pc-icon">📤</div>
            <div class="pc-title">Output Tokens</div>
            <div class="pc-subtitle">模型生成的回應內容</div>
            <ul class="pc-list">
              <li>思考過程 (Thinking / CoT)</li>
              <li>工具呼叫請求 (Tool Use)</li>
              <li>最終文字回應</li>
              <li>程式碼生成</li>
              <li>結構化 JSON 輸出</li>
            </ul>
            <div class="pc-price">
              <span class="pp-model">Claude Sonnet 4.5</span>
              <span class="pp-rate out-rate">$15 / 1M tokens</span>
            </div>
          </div>
        </div>

        <div class="cache-highlight">
          <div class="ch-icon">⚡</div>
          <div class="ch-content">
            <div class="ch-title">Prompt Cache 快取節省 90% 輸入費用</div>
            <div class="ch-desc">Claude Code 將系統提示、工具定義等固定內容快取起來。重複使用時，快取命中只需 <strong>$0.30 / 1M tokens</strong>（原價的 1/10），大幅降低多輪對話成本。</div>
          </div>
          <div class="ch-badge">Cache Hit<br><span class="ch-save">省 90%</span></div>
        </div>
      </div>
    </section>

    <!-- ⑤ ANIMATED: HOW CLAUDE CODE USES TOKENS -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Claude Code 的 Token 策略</span>
          <h2>多輪對話中的 Token 管理</h2>
          <p>Claude Code 使用多種策略在有限的 Token 預算內最大化效能</p>
        </div>

        <div class="strategy-timeline">
          <div class="st-item" *ngFor="let s of strategies; let i = index" [style.animationDelay]="i * 0.1 + 's'">
            <div class="st-step">{{ i + 1 }}</div>
            <div class="st-content">
              <div class="st-icon">{{ s.icon }}</div>
              <div class="st-body">
                <div class="st-title">{{ s.title }}</div>
                <div class="st-desc">{{ s.desc }}</div>
                <div class="st-tag" [style.color]="s.color" [style.borderColor]="s.color + '44'" [style.background]="s.color + '11'">{{ s.tag }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑥ TOKEN MATH -->
    <section class="section section-dark">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">快速估算</span>
          <h2>Token 數量估算指南</h2>
          <p>不同語言的 Token 密度不同，以下是常見參考數據</p>
        </div>

        <div class="math-grid">
          <div class="math-card" *ngFor="let m of mathCards">
            <div class="mc-emoji">{{ m.emoji }}</div>
            <div class="mc-title">{{ m.title }}</div>
            <div class="mc-rule">{{ m.rule }}</div>
            <div class="mc-example">{{ m.example }}</div>
            <div class="mc-visual">
              <div class="mv-bar" *ngFor="let b of m.bars; let bi = index"
                   [style.width]="b + '%'"
                   [style.animationDelay]="bi * 0.1 + 's'">
              </div>
            </div>
          </div>
        </div>

        <div class="reference-table">
          <div class="rt-header">
            <span>內容類型</span>
            <span>估算 Tokens</span>
            <span>Claude 費用 (Sonnet)</span>
          </div>
          <div class="rt-row" *ngFor="let r of refRows">
            <span class="rr-name">{{ r.name }}</span>
            <span class="rr-tokens">{{ r.tokens }}</span>
            <span class="rr-cost">{{ r.cost }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑦ BPE ANIMATION -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">技術深入</span>
          <h2>BPE 分詞演算法動畫</h2>
          <p>Byte Pair Encoding — Claude 使用的分詞技術，透過反覆合併最常見的字元對</p>
        </div>

        <div class="bpe-demo">
          <div class="bpe-steps">
            <div class="bpe-step" *ngFor="let step of bpeSteps; let i = index" [style.animationDelay]="i * 0.3 + 's'">
              <div class="bs-round">Round {{ step.round }}</div>
              <div class="bs-tokens">
                <span class="bt"
                  *ngFor="let t of step.tokens"
                  [class.bt-merged]="step.merged && step.merged.includes(t)"
                  [class.bt-new]="step.newToken === t">{{ t }}</span>
              </div>
              <div class="bs-action" *ngIf="step.action">
                <span class="ba-arrow">↓</span>
                <span class="ba-text">合併最高頻對: <strong>{{ step.action }}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑧ TIPS -->
    <section class="section section-dark">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">最佳實踐</span>
          <h2>如何有效控制 Token 用量</h2>
          <p>善用以下技巧，降低成本並提升回應速度</p>
        </div>

        <div class="tips-grid">
          <div class="tip-card" *ngFor="let t of tips; let i = index">
            <div class="tip-num">{{ (i + 1).toString().padStart(2, '0') }}</div>
            <div class="tip-icon">{{ t.icon }}</div>
            <div class="tip-title">{{ t.title }}</div>
            <div class="tip-desc">{{ t.desc }}</div>
            <div class="tip-saving" *ngIf="t.saving">
              <span class="ts-label">可節省</span>
              <span class="ts-val">{{ t.saving }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ====== HERO ====== */
    .page-hero {
      padding: 140px 0 80px;
      text-align: center;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,92,252,0.15) 0%, transparent 70%);
      h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; margin: 16px 0; }
      .hero-desc { color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 32px; }
    }
    .hero-chips { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
    .chip {
      padding: 6px 16px; border-radius: 100px; font-size: 0.8rem; font-weight: 600; border: 1px solid;
      &.chip-purple { color: #7c5cfc; border-color: rgba(124,92,252,.4); background: rgba(124,92,252,.1); }
      &.chip-blue   { color: #5c8aff; border-color: rgba(92,138,255,.4); background: rgba(92,138,255,.1); }
      &.chip-teal   { color: #00d4aa; border-color: rgba(0,212,170,.4);  background: rgba(0,212,170,.1); }
      &.chip-orange { color: #ff8c42; border-color: rgba(255,140,66,.4); background: rgba(255,140,66,.1); }
      &.chip-red    { color: #ff4d6d; border-color: rgba(255,77,109,.4); background: rgba(255,77,109,.1); }
    }

    /* ====== SECTION BASE ====== */
    .section { padding: 80px 0; }
    .section-dark { background: var(--bg-secondary); padding: 80px 0; }
    .section-header {
      text-align: center; margin-bottom: 56px;
      h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; margin: 12px 0; }
      p { color: var(--text-secondary); max-width: 600px; margin: 0 auto; }
    }
    .section-tag {
      display: inline-block; padding: 4px 14px; background: rgba(124,92,252,.15);
      border: 1px solid rgba(124,92,252,.3); border-radius: 100px;
      font-size: 0.75rem; font-weight: 700; color: #7c5cfc; letter-spacing: .05em; text-transform: uppercase;
    }
    .gradient-text {
      background: linear-gradient(135deg, #7c5cfc, #5c8aff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    /* ====== TOKEN DEMO BOX ====== */
    .token-demo-box {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px;
      padding: 40px; max-width: 860px; margin: 0 auto;
    }
    .demo-label {
      font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px; text-align: center; letter-spacing: .05em;
    }
    .demo-examples {
      display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 32px;
    }
    .demo-item {
      padding: 8px 20px; border-radius: 10px; border: 1px solid var(--border-color);
      cursor: pointer; transition: all .2s; font-size: 0.85rem; color: var(--text-secondary);
      &:hover { border-color: #7c5cfc; color: var(--text-primary); }
      &.active { background: rgba(124,92,252,.15); border-color: #7c5cfc; color: var(--text-primary); }
    }
    .token-visual { display: flex; flex-direction: column; gap: 20px; align-items: center; }
    .original-text, .tokens-row {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: center;
    }
    .tv-label {
      font-size: 0.75rem; color: var(--text-muted); font-weight: 600; white-space: nowrap;
      text-transform: uppercase; letter-spacing: .05em; width: 80px; text-align: right;
    }
    .tv-content {
      font-family: 'JetBrains Mono', monospace; font-size: 1rem; color: var(--text-primary);
      background: var(--bg-code); padding: 10px 20px; border-radius: 8px;
    }
    .arrow-down {
      font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px;
      &::before, &::after { content: ''; flex: 1; height: 1px; background: var(--border-color); width: 40px; }
    }
    .tokens-list { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
    .token-chip {
      font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; font-weight: 600;
      padding: 5px 12px; border-radius: 6px; border: 1px solid;
      animation: popIn .3s ease both;
    }
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.7) translateY(8px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    .token-count-row {
      display: flex; gap: 24px; margin-top: 16px;
    }
    .tc-box {
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      background: var(--bg-secondary); border: 1px solid var(--border-color);
      border-radius: 12px; padding: 14px 24px;
      .tc-num { font-size: 1.8rem; font-weight: 800; color: #7c5cfc; }
      .tc-label { font-size: 0.75rem; color: var(--text-muted); }
    }

    /* ====== TOKEN FLOW ====== */
    .flow-wrapper {
      display: flex; align-items: center; gap: 0; overflow-x: auto; padding: 20px 0;
    }
    .flow-stage {
      min-width: 160px; max-width: 200px; background: var(--bg-card);
      border: 1px solid var(--border-color); border-radius: 16px; padding: 24px 20px;
      text-align: center; flex-shrink: 0;
      .stage-icon { font-size: 2rem; margin-bottom: 8px; }
      .stage-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
      .stage-desc { font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px; }
      .stage-example {
        font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
        color: #00d4aa; background: rgba(0,212,170,.08); padding: 8px; border-radius: 6px;
      }
    }
    .stage-input { border-color: rgba(124,92,252,.4); }
    .stage-encode { border-color: rgba(92,138,255,.4); }
    .stage-model { border-color: rgba(255,140,66,.4); }
    .stage-output { border-color: rgba(0,212,170,.4); }

    .stage-ids { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; margin-top: 8px; }
    .sid {
      font-family: 'JetBrains Mono', monospace; font-size: 0.68rem;
      background: rgba(92,138,255,.15); border: 1px solid rgba(92,138,255,.3);
      color: #5c8aff; padding: 2px 6px; border-radius: 4px;
    }

    .model-layers { display: flex; flex-direction: column; gap: 5px; margin-top: 8px; }
    .ml {
      display: flex; align-items: center; gap: 8px; font-size: 0.68rem; color: var(--text-muted);
      animation: mlSlide .5s ease both;
      .ml-bar {
        flex: 1; height: 4px; background: linear-gradient(90deg, #ff8c42, rgba(255,140,66,.2));
        border-radius: 2px; animation: mlGrow 1s ease both infinite alternate;
      }
    }
    @keyframes mlSlide { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes mlGrow { from { opacity: .4; } to { opacity: 1; } }

    .flow-arrow {
      flex-shrink: 0; width: 80px; display: flex; flex-direction: column; align-items: center; gap: 6px;
      position: relative;
      .arrow-line {
        width: 100%; height: 2px; background: linear-gradient(90deg, var(--border-color), #7c5cfc);
        position: relative;
        &::after { content: '▶'; position: absolute; right: -8px; top: -8px; color: #7c5cfc; font-size: 10px; }
      }
      .arrow-label { font-size: 0.65rem; color: var(--text-muted); letter-spacing: .04em; }
    }
    .flowing-tokens {
      display: flex; gap: 4px; flex-wrap: wrap; justify-content: center; margin-top: 4px;
    }
    .ft {
      font-size: 0.6rem; background: rgba(124,92,252,.2); border: 1px solid rgba(124,92,252,.4);
      color: #7c5cfc; padding: 2px 5px; border-radius: 4px;
      animation: ftFlow .8s ease both infinite;
    }
    .ft-out {
      background: rgba(0,212,170,.15); border-color: rgba(0,212,170,.4); color: #00d4aa;
    }
    @keyframes ftFlow {
      0%,100% { opacity: .4; transform: translateX(-3px); }
      50% { opacity: 1; transform: translateX(3px); }
    }
    .out-example { animation: typeReveal 2s steps(20) infinite; overflow: hidden; white-space: nowrap; }
    .typing-text { color: #00d4aa; }

    /* ====== CONTEXT WINDOW ====== */
    .context-visual { display: flex; flex-direction: column; gap: 40px; max-width: 900px; margin: 0 auto; }
    .ctx-window {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 28px;
    }
    .ctx-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
      .ctx-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
      .ctx-usage { font-size: 0.8rem; color: var(--text-muted); }
    }
    .ctx-bar-outer {
      display: flex; height: 48px; border-radius: 10px; overflow: hidden; border: 1px solid var(--border-color);
      margin-bottom: 20px;
    }
    .ctx-bar-system  { background: rgba(124,92,252,.6); display: flex; align-items: center; justify-content: center; }
    .ctx-bar-history { background: rgba(92,138,255,.5); display: flex; align-items: center; justify-content: center; }
    .ctx-bar-tools   { background: rgba(0,212,170,.5);  display: flex; align-items: center; justify-content: center; }
    .ctx-bar-user    { background: rgba(255,140,66,.5); display: flex; align-items: center; justify-content: center; }
    .ctx-bar-free    { background: rgba(255,255,255,.04); display: flex; align-items: center; justify-content: center; flex: 1; }
    .ctx-seg-label   { font-size: 0.65rem; font-weight: 700; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 4px; }
    .free-label { color: var(--text-muted); }
    .ctx-legend { display: flex; flex-wrap: wrap; gap: 16px; }
    .cl-item { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--text-secondary); }
    .cl-dot { width: 10px; height: 10px; border-radius: 3px; }

    .ctx-compare { display: flex; flex-direction: column; gap: 12px; }
    .cc-card {
      display: flex; align-items: center; gap: 16px;
      .cc-name { font-size: 0.85rem; color: var(--text-secondary); width: 180px; flex-shrink: 0; }
      .cc-bar-wrap { flex: 1; height: 10px; background: rgba(255,255,255,.05); border-radius: 5px; overflow: hidden; }
      .cc-bar { height: 100%; border-radius: 5px; transition: width 1s ease; animation: barGrow 1s ease both; }
      .cc-tokens { font-size: 0.8rem; color: var(--text-muted); width: 100px; text-align: right; }
    }
    @keyframes barGrow { from { width: 0 !important; } }

    /* ====== PRICING ====== */
    .pricing-grid {
      display: flex; align-items: stretch; gap: 0; max-width: 800px; margin: 0 auto 40px;
    }
    .price-card {
      flex: 1; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 32px;
      .pc-icon { font-size: 2.5rem; margin-bottom: 12px; }
      .pc-title { font-size: 1.2rem; font-weight: 800; margin-bottom: 6px; }
      .pc-subtitle { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px; }
      .pc-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 8px;
        li { font-size: 0.85rem; color: var(--text-secondary); padding-left: 16px; position: relative;
          &::before { content: '→'; position: absolute; left: 0; color: var(--text-muted); } } }
      .pc-price { border-top: 1px solid var(--border-color); padding-top: 16px; display: flex; flex-direction: column; gap: 4px; }
      .pp-model { font-size: 0.75rem; color: var(--text-muted); }
      .pp-rate { font-size: 1.1rem; font-weight: 800; color: #5c8aff; }
      .out-rate { color: #ff8c42; }
    }
    .input-card { border-color: rgba(92,138,255,.3); }
    .output-card { border-color: rgba(255,140,66,.3); }
    .vs-divider {
      display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 0 20px;
      .vs-line { flex: 1; width: 1px; background: var(--border-color); }
      .vs-text { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); white-space: nowrap; }
    }
    .cache-highlight {
      display: flex; align-items: center; gap: 20px; background: rgba(0,212,170,.08);
      border: 1px solid rgba(0,212,170,.3); border-radius: 16px; padding: 24px 28px;
      .ch-icon { font-size: 2rem; flex-shrink: 0; }
      .ch-content { flex: 1; }
      .ch-title { font-size: 1rem; font-weight: 700; color: #00d4aa; margin-bottom: 6px; }
      .ch-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }
      .ch-badge { text-align: center; font-size: 0.75rem; color: #00d4aa; font-weight: 700; flex-shrink: 0;
        .ch-save { display: block; font-size: 1.5rem; font-weight: 900; } }
    }

    /* ====== STRATEGY TIMELINE ====== */
    .strategy-timeline { display: flex; flex-direction: column; gap: 0; max-width: 760px; margin: 0 auto; position: relative;
      &::before { content: ''; position: absolute; left: 28px; top: 28px; bottom: 28px; width: 2px; background: linear-gradient(180deg, #7c5cfc, #5c8aff, #00d4aa); }
    }
    .st-item {
      display: flex; gap: 24px; align-items: flex-start; padding: 20px 0;
      animation: fadeInUp .5s ease both;
    }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .st-step {
      width: 56px; height: 56px; border-radius: 50%; background: var(--bg-card);
      border: 2px solid #7c5cfc; display: flex; align-items: center; justify-content: center;
      font-size: 0.9rem; font-weight: 800; color: #7c5cfc; flex-shrink: 0; z-index: 1;
    }
    .st-content { display: flex; gap: 16px; align-items: flex-start; flex: 1; padding-top: 4px; }
    .st-icon { font-size: 1.5rem; flex-shrink: 0; }
    .st-title { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
    .st-desc { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px; }
    .st-tag {
      display: inline-block; padding: 2px 10px; border-radius: 100px; border: 1px solid; font-size: 0.7rem; font-weight: 700;
    }

    /* ====== MATH GRID ====== */
    .math-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .math-card {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px;
      .mc-emoji { font-size: 2rem; margin-bottom: 10px; }
      .mc-title { font-size: 0.9rem; font-weight: 700; margin-bottom: 4px; }
      .mc-rule { font-size: 0.8rem; color: #7c5cfc; font-weight: 600; margin-bottom: 4px; }
      .mc-example { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 12px; }
      .mc-visual { display: flex; flex-direction: column; gap: 4px; }
      .mv-bar {
        height: 6px; border-radius: 3px; background: linear-gradient(90deg, #7c5cfc, #5c8aff);
        animation: barGrow .8s ease both;
      }
    }
    .reference-table {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden;
    }
    .rt-header {
      display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 14px 24px;
      background: rgba(124,92,252,.1); border-bottom: 1px solid var(--border-color);
      font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: .05em;
    }
    .rt-row {
      display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 14px 24px;
      border-bottom: 1px solid rgba(255,255,255,.04); font-size: 0.85rem;
      &:last-child { border-bottom: none; }
      &:hover { background: rgba(255,255,255,.02); }
    }
    .rr-name { color: var(--text-primary); }
    .rr-tokens { color: #5c8aff; font-family: 'JetBrains Mono', monospace; }
    .rr-cost { color: #00d4aa; font-family: 'JetBrains Mono', monospace; }

    /* ====== BPE DEMO ====== */
    .bpe-demo { max-width: 700px; margin: 0 auto; }
    .bpe-steps { display: flex; flex-direction: column; gap: 24px; }
    .bpe-step {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px; padding: 20px 24px;
      animation: fadeInUp .5s ease both;
    }
    .bs-round { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 12px; }
    .bs-tokens { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
    .bt {
      font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;
      padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,.05);
      border: 1px solid var(--border-color); color: var(--text-secondary);
      transition: all .3s;
      &.bt-merged { background: rgba(255,140,66,.15); border-color: rgba(255,140,66,.4); color: #ff8c42; }
      &.bt-new { background: rgba(0,212,170,.15); border-color: rgba(0,212,170,.4); color: #00d4aa; font-weight: 700; }
    }
    .bs-action { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
    .ba-arrow { color: #ff8c42; font-size: 1.1rem; }
    .ba-text { font-size: 0.8rem; color: var(--text-secondary); }

    /* ====== TIPS ====== */
    .tips-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
    .tip-card {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px;
      transition: all .2s;
      &:hover { transform: translateY(-4px); border-color: rgba(124,92,252,.4); box-shadow: 0 8px 32px rgba(124,92,252,.15); }
      .tip-num { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); margin-bottom: 10px; letter-spacing: .1em; }
      .tip-icon { font-size: 1.8rem; margin-bottom: 10px; }
      .tip-title { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
      .tip-desc { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px; }
      .tip-saving { display: flex; align-items: center; gap: 8px;
        .ts-label { font-size: 0.7rem; color: var(--text-muted); }
        .ts-val { font-size: 0.85rem; font-weight: 700; color: #00d4aa; } }
    }

    /* ====== RESPONSIVE ====== */
    @media (max-width: 768px) {
      .flow-wrapper { flex-direction: column; }
      .flow-arrow { width: 100%; flex-direction: row; height: 40px;
        .arrow-line { flex: 1; height: 2px; width: auto;
          &::after { right: -8px; top: -8px; }
        }
      }
      .pricing-grid { flex-direction: column; }
      .vs-divider { flex-direction: row; .vs-line { width: 40px; height: 1px; } }
      .cache-highlight { flex-direction: column; text-align: center; }
      .token-count-row { gap: 12px; }
      .tc-box { padding: 10px 16px; }
    }
  `]
})
export class TokenComponent implements OnInit, OnDestroy {
  activeDemo = signal(0);
  ctxUsedPercent = 60;

  tokenColors = ['#7c5cfc', '#5c8aff', '#00d4aa', '#ff8c42', '#ff4d6d', '#ffd166', '#a78bfa', '#38bdf8'];

  tokenExamples = [
    {
      label: '英文句子',
      text: 'Hello, Claude!',
      tokens: ['Hello', ',', ' Cl', 'aude', '!']
    },
    {
      label: '中文句子',
      text: '你好，克勞德！',
      tokens: ['你', '好', '，', '克', '勞', '德', '！']
    },
    {
      label: 'Python 程式碼',
      text: 'def sort(arr):',
      tokens: ['def', ' sort', '(', 'arr', '):']
    },
    {
      label: '數字與符號',
      text: 'Claude 200K context',
      tokens: ['Cl', 'aude', ' 200', 'K', ' context']
    },
    {
      label: '日文',
      text: 'こんにちは',
      tokens: ['こん', 'にち', 'は']
    }
  ];

  flowTokens1 = ['幫', '我', '寫', 'Py', 'thon'];
  flowTokens2 = ['def', ' sort', '(', 'arr', '):'];
  tokenIds = [2525, 891, 5032, 29, 11, 4102];
  modelLayers = [1, 2, 3, 4, 5];

  modelCompare = [
    { name: 'GPT-3.5 (OpenAI)', tokens: '16K tokens', percent: 8, color: '#10b981' },
    { name: 'GPT-4o (OpenAI)', tokens: '128K tokens', percent: 64, color: '#10b981' },
    { name: 'Gemini 1.5 Pro', tokens: '1M tokens', percent: 100, color: '#f59e0b' },
    { name: 'Claude 3 Haiku', tokens: '200K tokens', percent: 100, color: '#7c5cfc' },
    { name: 'Claude Sonnet 4.5', tokens: '200K tokens', percent: 100, color: '#7c5cfc' },
    { name: 'Claude Opus 4.6', tokens: '200K tokens', percent: 100, color: '#5c8aff' }
  ];

  strategies = [
    {
      icon: '📦', color: '#7c5cfc', tag: 'Prompt Caching',
      title: 'Prompt Cache 固定內容快取',
      desc: '系統提示、工具定義等不變的部分會被快取，後續對話直接命中快取，輸入 Token 費用降至 1/10。'
    },
    {
      icon: '✂️', color: '#5c8aff', tag: 'Context Compression',
      title: '對話歷史壓縮與截斷',
      desc: '當對話歷史超過一定長度，Claude Code 會自動摘要或截斷舊有內容，保留最近與最重要的資訊。'
    },
    {
      icon: '🔍', color: '#00d4aa', tag: 'Retrieval (RAG)',
      title: '按需檢索，不全量載入',
      desc: '透過 Grep、Glob 等工具精準定位程式碼片段，只將相關部分加入上下文，避免浪費 Token 載入整個代碼庫。'
    },
    {
      icon: '🧠', color: '#ff8c42', tag: 'Extended Thinking',
      title: 'Extended Thinking Token 預算控制',
      desc: 'claude-sonnet-4-5 的思考 (Thinking) 模式消耗額外 Output Token，Claude Code 會根據任務複雜度動態分配預算上限。'
    },
    {
      icon: '⚡', color: '#ff4d6d', tag: 'Parallel Tool Calls',
      title: '並發工具呼叫，減少往返',
      desc: '多個獨立工具在同一輪並發執行，結果一次性回傳給模型，避免多輪對話產生重複的 System Prompt Token。'
    },
    {
      icon: '📊', color: '#ffd166', tag: 'Token Counting API',
      title: '即時 Token 計數監控',
      desc: '在正式呼叫前使用 Token Counting API 預估用量，避免超出 Context Window 或造成意外高額費用。'
    }
  ];

  mathCards = [
    {
      emoji: '🇬🇧', title: '英文', rule: '約 1 token = 4 字元',
      example: '"Hello world" ≈ 3 tokens',
      bars: [75, 60, 80, 55, 70]
    },
    {
      emoji: '🇹🇼', title: '中文 (繁體/簡體)', rule: '約 1 token = 1~2 字',
      example: '"你好世界" ≈ 4~6 tokens',
      bars: [90, 85, 95, 80, 90]
    },
    {
      emoji: '💻', title: '程式碼', rule: '約 1 token = 3~5 字元',
      example: '"def func():" ≈ 4 tokens',
      bars: [60, 70, 65, 55, 75]
    },
    {
      emoji: '📄', title: '純文字文件', rule: '750 words ≈ 1,000 tokens',
      example: '一頁 A4 ≈ 700 tokens',
      bars: [50, 55, 45, 60, 50]
    }
  ];

  refRows = [
    { name: '一則 Tweet (280字元)', tokens: '~70 tokens', cost: '$0.0002' },
    { name: '一頁 A4 文件', tokens: '~700 tokens', cost: '$0.002' },
    { name: '短篇小說 (5萬字)', tokens: '~25K tokens', cost: '$0.075' },
    { name: '一本書 (10萬字)', tokens: '~50K tokens', cost: '$0.15' },
    { name: '整個中型專案程式碼', tokens: '~80K tokens', cost: '$0.24' },
    { name: '完整 Claude 上下文 (200K)', tokens: '200K tokens', cost: '$0.60' }
  ];

  bpeSteps: { round: string; tokens: string[]; action: string | null; merged: string[]; newToken: string | null }[] = [
    {
      round: '初始', tokens: ['u', 'n', 'i', 'c', 'o', 'r', 'n'],
      action: null, merged: [], newToken: null
    },
    {
      round: 'Round 1', tokens: ['u', 'n', 'i', 'c', 'or', 'n'],
      action: '"o" + "r" → "or"', merged: ['or'], newToken: 'or'
    },
    {
      round: 'Round 2', tokens: ['u', 'ni', 'c', 'or', 'n'],
      action: '"n" + "i" → "ni"', merged: ['ni'], newToken: 'ni'
    },
    {
      round: 'Round 3', tokens: ['u', 'nic', 'or', 'n'],
      action: '"ni" + "c" → "nic"', merged: ['nic'], newToken: 'nic'
    },
    {
      round: '最終', tokens: ['unicorn'],
      action: null, merged: [], newToken: 'unicorn'
    }
  ];

  tips = [
    {
      icon: '🎯', title: '精簡系統提示',
      desc: '移除不必要的說明與範例，使用條列式指令代替長段落。系統提示每次都計費，精簡每字都值得。',
      saving: '20~40% Input Token'
    },
    {
      icon: '📌', title: '善用 Prompt Cache',
      desc: '將固定的工具定義、角色設定、少樣本範例放在對話最前面，啟用快取後重複使用費用降 90%。',
      saving: '高達 90% 快取部分'
    },
    {
      icon: '🔬', title: '精準指定需要的檔案',
      desc: '避免讓模型自行搜尋整個代碼庫，告訴 Claude 具體的檔案路徑，減少不必要的 Tool Call 往返。',
      saving: '30~50% Tool Result Token'
    },
    {
      icon: '📝', title: '要求簡潔的輸出格式',
      desc: '如果不需要 Markdown 或詳細說明，明確告訴模型「只回覆程式碼」或「簡短回答」。',
      saving: '40~60% Output Token'
    },
    {
      icon: '🔄', title: '長對話定期摘要',
      desc: '在長時間開發會話中，主動請 Claude 摘要目前進度，清除舊歷史後繼續對話，避免 Context 溢位。',
      saving: '避免超出 200K 限制'
    },
    {
      icon: '⚡', title: '選對模型',
      desc: '簡單任務使用 claude-haiku-4-5（最便宜），複雜任務才使用 Sonnet 或 Opus，根據需求選擇性價比最高的模型。',
      saving: '最高 95% 成本差異'
    }
  ];

  private demoInterval?: ReturnType<typeof setInterval>;

  setActiveDemo(i: number) {
    this.activeDemo.set(i);
  }

  ngOnInit() {
    this.demoInterval = setInterval(() => {
      this.activeDemo.update(v => (v + 1) % this.tokenExamples.length);
    }, 3000);
  }

  ngOnDestroy() {
    if (this.demoInterval) clearInterval(this.demoInterval);
  }
}
