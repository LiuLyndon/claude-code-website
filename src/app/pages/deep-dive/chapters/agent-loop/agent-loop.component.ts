import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-loop',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 01</span>
      <h1>Agent 循環機制</h1>
      <p>QueryEngine + query() 的主循環：用戶輸入 → API 呼叫 → 工具執行 → 結果回饋的完整 Agent Turn。</p>
      <div class="hero-tags">
        <span class="htag">QueryEngine.ts</span>
        <span class="htag">query.ts</span>
        <span class="htag">toolOrchestration.ts</span>
        <span class="htag">七層恢復策略</span>
        <span class="htag">AsyncGenerator</span>
      </div>
    </div>

      <!-- Architecture Overview -->
      <section class="ch-section">
        <h2>Agent 循環架構</h2>
        <div class="diagram-box">
          <svg viewBox="0 0 800 420" class="arch-svg">
            <!-- Background -->
            <rect width="800" height="420" fill="#0d1117" rx="12"/>

            <!-- Title -->
            <text x="400" y="32" text-anchor="middle" fill="#7c5cfc" font-size="13" font-weight="700" font-family="monospace">Claude Code — Agent Loop (query.ts)</text>

            <!-- User Input -->
            <rect x="30" y="60" width="140" height="50" rx="8" fill="rgba(124,92,252,0.15)" stroke="rgba(124,92,252,0.5)" stroke-width="1.5"/>
            <text x="100" y="82" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700">User Input</text>
            <text x="100" y="98" text-anchor="middle" fill="#b8c8e0" font-size="9">UserMessage / command</text>

            <!-- QueryEngine -->
            <rect x="220" y="50" width="160" height="70" rx="8" fill="rgba(92,138,255,0.15)" stroke="rgba(92,138,255,0.5)" stroke-width="1.5"/>
            <text x="300" y="76" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700">QueryEngine</text>
            <text x="300" y="92" text-anchor="middle" fill="#b8c8e0" font-size="9">query.ts · prepareMessages()</text>
            <text x="300" y="106" text-anchor="middle" fill="#b8c8e0" font-size="9">buildSystemPrompt()</text>

            <!-- Anthropic API -->
            <rect x="440" y="50" width="140" height="70" rx="8" fill="rgba(0,212,170,0.12)" stroke="rgba(0,212,170,0.4)" stroke-width="1.5"/>
            <text x="510" y="76" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700">Anthropic API</text>
            <text x="510" y="92" text-anchor="middle" fill="#b8c8e0" font-size="9">claude.ts · streamQuery()</text>
            <text x="510" y="106" text-anchor="middle" fill="#b8c8e0" font-size="9">cache_control blocks</text>

            <!-- Tool Executor -->
            <rect x="630" y="50" width="140" height="70" rx="8" fill="rgba(255,140,66,0.12)" stroke="rgba(255,140,66,0.4)" stroke-width="1.5"/>
            <text x="700" y="76" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700">Tool Executor</text>
            <text x="700" y="92" text-anchor="middle" fill="#b8c8e0" font-size="9">StreamingToolExecutor.ts</text>
            <text x="700" y="106" text-anchor="middle" fill="#b8c8e0" font-size="9">partitionToolCalls()</text>

            <!-- Arrows top row -->
            <defs>
              <marker id="arrowA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#7c5cfc"/>
              </marker>
              <marker id="arrowB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#5c8aff"/>
              </marker>
              <marker id="arrowC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#00d4aa"/>
              </marker>
              <marker id="arrowD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#ff8c42"/>
              </marker>
            </defs>
            <line x1="170" y1="85" x2="218" y2="85" stroke="#7c5cfc" stroke-width="1.5" marker-end="url(#arrowA)"/>
            <line x1="380" y1="85" x2="438" y2="85" stroke="#5c8aff" stroke-width="1.5" marker-end="url(#arrowB)"/>
            <line x1="580" y1="85" x2="628" y2="85" stroke="#00d4aa" stroke-width="1.5" marker-end="url(#arrowC)"/>

            <!-- Loop label -->
            <text x="400" y="168" text-anchor="middle" fill="#ff8c42" font-size="10" font-weight="700">↻  Agent Turn Loop — repeats until no tool calls remain</text>

            <!-- Loop arrow back -->
            <path d="M700,122 L700,180 L100,180 L100,112" fill="none" stroke="#ff8c42" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arrowD)"/>

            <!-- Phase boxes -->
            <rect x="30" y="210" width="160" height="80" rx="8" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.3)" stroke-width="1"/>
            <text x="110" y="232" text-anchor="middle" fill="#7c5cfc" font-size="10" font-weight="700">Phase 1: Prepare</text>
            <text x="110" y="250" text-anchor="middle" fill="#b8c8e0" font-size="9">addUserMessage()</text>
            <text x="110" y="264" text-anchor="middle" fill="#b8c8e0" font-size="9">maybeAutoCompact()</text>
            <text x="110" y="278" text-anchor="middle" fill="#b8c8e0" font-size="9">buildMessages()</text>

            <rect x="210" y="210" width="160" height="80" rx="8" fill="rgba(92,138,255,0.08)" stroke="rgba(92,138,255,0.3)" stroke-width="1"/>
            <text x="290" y="232" text-anchor="middle" fill="#5c8aff" font-size="10" font-weight="700">Phase 2: Stream</text>
            <text x="290" y="250" text-anchor="middle" fill="#b8c8e0" font-size="9">streamQuery() SSE</text>
            <text x="290" y="264" text-anchor="middle" fill="#b8c8e0" font-size="9">processStreamEvents()</text>
            <text x="290" y="278" text-anchor="middle" fill="#b8c8e0" font-size="9">emit partial text</text>

            <rect x="390" y="210" width="160" height="80" rx="8" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
            <text x="470" y="232" text-anchor="middle" fill="#00d4aa" font-size="10" font-weight="700">Phase 3: Tool Exec</text>
            <text x="470" y="250" text-anchor="middle" fill="#b8c8e0" font-size="9">executeToolCall()</text>
            <text x="470" y="264" text-anchor="middle" fill="#b8c8e0" font-size="9">concurrentRead / serial</text>
            <text x="470" y="278" text-anchor="middle" fill="#b8c8e0" font-size="9">Write tools</text>

            <rect x="570" y="210" width="160" height="80" rx="8" fill="rgba(255,209,102,0.08)" stroke="rgba(255,209,102,0.3)" stroke-width="1"/>
            <text x="650" y="232" text-anchor="middle" fill="#ffd166" font-size="10" font-weight="700">Phase 4: Feedback</text>
            <text x="650" y="250" text-anchor="middle" fill="#b8c8e0" font-size="9">addToolResult()</text>
            <text x="650" y="264" text-anchor="middle" fill="#b8c8e0" font-size="9">updateConversation()</text>
            <text x="650" y="278" text-anchor="middle" fill="#b8c8e0" font-size="9">→ loop or exit</text>

            <!-- Termination -->
            <rect x="280" y="330" width="240" height="50" rx="8" fill="rgba(255,77,109,0.1)" stroke="rgba(255,77,109,0.4)" stroke-width="1.5"/>
            <text x="400" y="352" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700">Exit Conditions</text>
            <text x="400" y="368" text-anchor="middle" fill="#b8c8e0" font-size="9">no tool_use blocks · maxTurns · user abort · error</text>

            <line x1="650" y1="290" x2="510" y2="328" stroke="#ff4d6d" stroke-width="1.2" stroke-dasharray="4,3"/>
            <line x1="110" y1="290" x2="290" y2="328" stroke="#ff4d6d" stroke-width="1.2" stroke-dasharray="4,3"/>
          </svg>
        </div>
      </section>

      <!-- Core Flow -->
      <section class="ch-section">
        <h2>核心 query() 流程</h2>
        <div class="flow-steps">
          <div class="flow-step">
            <div class="step-num">1</div>
            <div class="step-body">
              <h4>訊息準備</h4>
              <p>將用戶輸入包裝為 <code>UserMessage</code>，呼叫 <code>addUserMessage()</code>，觸發 <code>maybeAutoCompact()</code> 檢查上下文是否需壓縮，再呼叫 <code>buildMessages()</code> 組裝完整訊息陣列。</p>
              <div class="code-ref">📁 query.ts → prepareMessages()</div>
            </div>
          </div>
          <div class="flow-step">
            <div class="step-num">2</div>
            <div class="step-body">
              <h4>API 串流呼叫</h4>
              <p>呼叫 <code>streamQuery()</code> 通過 SSE 接收 Claude 的 token 流。工具定義以 <code>cache_control: ephemeral</code> 標記，使用 <strong>Prompt Cache</strong> 減少費用。</p>
              <div class="code-ref">📁 claude.ts → streamQuery() · cache_control 塊</div>
            </div>
          </div>
          <div class="flow-step">
            <div class="step-num">3</div>
            <div class="step-body">
              <h4>工具執行</h4>
              <p>對 API 回應中的 <code>tool_use</code> 塊，呼叫 <code>partitionToolCalls()</code> 分離讀寫工具：只讀工具最多 10 個並發，寫入工具嚴格串行。</p>
              <div class="code-ref">📁 StreamingToolExecutor.ts · toolOrchestration.ts</div>
            </div>
          </div>
          <div class="flow-step">
            <div class="step-num">4</div>
            <div class="step-body">
              <h4>結果回饋</h4>
              <p>將所有工具結果以 <code>tool_result</code> 訊息追加到對話歷史，更新 Conversation History，然後判斷是否繼續循環或退出。</p>
              <div class="code-ref">📁 query.ts → addToolResult() · updateConversation()</div>
            </div>
          </div>
          <div class="flow-step">
            <div class="step-num">5</div>
            <div class="step-body">
              <h4>退出條件</h4>
              <p>當 API 回應不含 <code>tool_use</code> 塊、達到 <code>maxTurns</code> 上限、用戶中斷、或發生不可恢復錯誤時，循環終止，結果渲染至 Terminal UI。</p>
              <div class="code-ref">📁 query.ts → shouldContinueLoop()</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 七層恢復策略 -->
      <section class="ch-section">
        <h2>七層恢復策略（Recovery Defense Layers）</h2>
        <p class="section-lead">Claude Code 在各種異常情境下不會直接崩潰，而是依序啟動七道防線自我恢復，最終防禦強度達 98%。</p>

        <div class="recovery-stats">
          <div class="rs-badge"><span class="rs-num">5</span><span class="rs-label">最大退避<br>min</span></div>
          <div class="rs-badge rs-badge--green"><span class="rs-num">6</span><span class="rs-label">重置上限<br>h</span></div>
          <div class="rs-badge rs-badge--purple"><span class="rs-num">7</span><span class="rs-label">恢復層數<br>層</span></div>
        </div>

        <div class="recovery-layers">
          <div class="rl-item" *ngFor="let layer of recoveryLayers">
            <div class="rl-num" [class]="'rl-num--'+layer.color">{{ layer.num }}</div>
            <div class="rl-body">
              <div class="rl-title">{{ layer.title }}</div>
              <div class="rl-desc">{{ layer.desc }}</div>
            </div>
            <div class="rl-check">✓</div>
          </div>
        </div>

        <div class="recovery-scenarios">
          <div class="rs-title">異常場景 → 自我恢復</div>
          <div class="rs-list">
            <div class="rs-item" *ngFor="let s of errorScenarios">
              <span class="rs-dot" [style.background]="s.color"></span>
              <span class="rs-cause">{{ s.cause }}</span>
              <span class="rs-arrow">→</span>
              <span class="rs-result">自我恢復</span>
              <span class="rs-tag">{{ s.tag }}</span>
            </div>
            <div class="rs-item rs-item--highlight">
              <span class="rs-dot" style="background:#00d4aa"></span>
              <span class="rs-cause">生產級設計</span>
              <span class="rs-arrow">→</span>
              <span class="rs-result">防禦強度 98%</span>
            </div>
          </div>
        </div>
      </section>

      <!-- AsyncGenerator yield -->
      <section class="ch-section">
        <h2>AsyncGenerator &lt;yield&gt; — 流式交互架構</h2>
        <p class="section-lead">Agent 循環以 <code>async function*</code> 實現，每條消息、每個進度更新都透過 <code>yield</code> 即時推送到 UI，實現真正的流式交互體驗。</p>

        <div class="generator-layout">

          <div class="gen-code">
            <div class="gc-title">query.ts</div>
            <pre class="gc-pre"><span class="kw">async function</span><span class="op">*</span> <span class="fn">agentLoop</span>() &#123;
  <span class="kw">while</span> (shouldContinue) &#123;
    <span class="cm">// Phase 1: 準備上下文</span>
    <span class="kw">yield</span> &#123; type: <span class="str">'progress'</span>, ... &#125;;

    <span class="cm">// Phase 2: 串流 API 回應</span>
    <span class="kw">for await</span> (<span class="kw">const</span> chunk <span class="kw">of</span> stream) &#123;
      <span class="kw">yield</span> &#123; type: <span class="str">'message'</span>, chunk &#125;;
    &#125;

    <span class="cm">// Phase 3: 工具執行結果</span>
    <span class="kw">yield</span> &#123; type: <span class="str">'tool_result'</span>, ... &#125;;
  &#125;
&#125;</pre>
          </div>

          <div class="gen-flow">
            <div class="gf-title">AgentLoop 推送流</div>
            <div class="gf-pipeline">
              <div class="gf-node gf-node--entry">AgentLoop *</div>
              <div class="gf-arrow">↓ yield</div>
              <div class="gf-events">
                <div class="gf-event gf-event--progress">進度</div>
                <div class="gf-event gf-event--message">消息</div>
              </div>
              <div class="gf-arrow">↓ yield</div>
              <div class="gf-events">
                <div class="gf-event gf-event--tool">工具結果</div>
              </div>
              <div class="gf-arrow">↓ yield</div>
              <div class="gf-events">
                <div class="gf-event gf-event--progress">進度</div>
                <div class="gf-event gf-event--message">消息</div>
              </div>
              <div class="gf-arrow">↓</div>
              <div class="gf-node gf-node--ui">UI / 流式交互</div>
            </div>
          </div>
        </div>

        <div class="generator-why">
          <div class="gw-item" *ngFor="let w of generatorWhys">
            <div class="gw-icon">{{ w.icon }}</div>
            <div class="gw-body">
              <div class="gw-title">{{ w.title }}</div>
              <div class="gw-desc">{{ w.desc }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Source Table -->
      <section class="ch-section">
        <h2>原始碼位置</h2>
        <div class="src-table-wrap">
          <table class="src-table">
            <thead><tr><th>檔案</th><th>關鍵函式 / 職責</th></tr></thead>
            <tbody>
              <tr><td><code>query.ts</code></td><td>主循環入口、prepareMessages、shouldContinueLoop</td></tr>
              <tr><td><code>QueryEngine.ts</code></td><td>QueryEngine 類別、狀態管理、對話歷史維護</td></tr>
              <tr><td><code>toolOrchestration.ts</code></td><td>工具呼叫排程、partitionToolCalls</td></tr>
              <tr><td><code>StreamingToolExecutor.ts</code></td><td>並發/串行執行、結果聚合</td></tr>
              <tr><td><code>claude.ts</code></td><td>API 介面、streamQuery、cache_control 塊</td></tr>
              <tr><td><code>messages.ts</code></td><td>UserMessage / AssistantMessage 型別定義</td></tr>
            </tbody>
          </table>
        </div>
      </section>
  `,
  styles: [`
    :host { display: block; }
    .chapter-hero {
      padding:48px 40px 40px; border-bottom:1px solid var(--border-color);
      background:radial-gradient(ellipse 70% 50% at 30% 50%, rgba(124,92,252,.08) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#7c5cfc; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#7c5cfc,#5c8aff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(124,92,252,.1); border:1px solid rgba(124,92,252,.25); color:#7c5cfc; padding:3px 10px; border-radius:4px; }
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .ch-section--dark { background:rgba(255,255,255,.01); }
    .ch-section-header { display:flex; gap:20px; align-items:flex-start; margin-bottom:32px; }
    .csh-num { font-family:var(--font-mono); font-size:.65rem; font-weight:800; color:var(--text-muted); background:rgba(255,255,255,.04); border:1px solid var(--border-color); padding:4px 10px; border-radius:6px; flex-shrink:0; margin-top:4px; }
    .ch-section-header h2 { font-size:1.3rem; font-weight:800; margin-bottom:4px; }
    .ch-section-header p { font-size:.85rem; color:var(--text-secondary); margin:0; }
    .ch-section h2 { font-size:1.3rem; font-weight:800; margin-bottom:24px; }

    .diagram-box { background: #0d1117; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 4px; overflow: hidden; }
    .arch-svg { width: 100%; height: auto; display: block; }

    .flow-steps { display: flex; flex-direction: column; gap: 16px; }
    .flow-step {
      display: flex; gap: 16px; align-items: flex-start;
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px;

      .step-num { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 800; color: var(--accent-primary); background: rgba(124,92,252,0.12); border: 1px solid rgba(124,92,252,0.3); width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .step-body { flex: 1; min-width: 0; h4 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; } p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 8px; } }
      .code-ref { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 4px 10px; border-radius: 4px; display: inline-block; }
      code { font-family: var(--font-mono); font-size: 0.82em; color: var(--accent-secondary); background: rgba(92,138,255,0.1); padding: 1px 5px; border-radius: 3px; }
    }

    .src-table-wrap { overflow-x: auto; }
    .src-table { width: 100%; border-collapse: collapse; font-size: 0.85rem;
      thead tr { background: rgba(124,92,252,0.1); }
      th { padding: 10px 16px; text-align: left; font-weight: 700; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
      td { padding: 10px 16px; color: var(--text-secondary); border-bottom: 1px solid rgba(255,255,255,0.04); }
      tr:hover td { background: rgba(255,255,255,0.02); }
      code { font-family: var(--font-mono); font-size: 0.82em; color: var(--accent-secondary); }
    }

    .section-lead { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px; code { font-family: var(--font-mono); font-size: 0.85em; color: var(--accent-secondary); background: rgba(92,138,255,.1); padding: 1px 5px; border-radius: 3px; } }

    /* ── Recovery Stats ── */
    .recovery-stats { display: flex; gap: 16px; margin-bottom: 24px; }
    .rs-badge { display: flex; align-items: center; gap: 12px; background: var(--bg-card); border: 1px solid rgba(255,140,66,.3); border-radius: 12px; padding: 14px 20px; .rs-num { font-size: 2rem; font-weight: 900; color: #ff8c42; font-family: var(--font-mono); } .rs-label { font-size: 0.72rem; color: var(--text-muted); line-height: 1.4; } }
    .rs-badge--green { border-color: rgba(0,212,170,.3); .rs-num { color: #00d4aa; } }
    .rs-badge--purple { border-color: rgba(124,92,252,.3); .rs-num { color: #7c5cfc; } }

    /* ── Recovery Layers ── */
    .recovery-layers { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
    .rl-item { display: flex; align-items: center; gap: 14px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px 18px; transition: border-color .2s; &:hover { border-color: var(--border-accent); } }
    .rl-num { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 800; flex-shrink: 0; }
    .rl-num--purple { background: rgba(124,92,252,.2); color: #7c5cfc; border: 1px solid rgba(124,92,252,.4); }
    .rl-num--blue   { background: rgba(92,138,255,.2);  color: #5c8aff; border: 1px solid rgba(92,138,255,.4); }
    .rl-num--teal   { background: rgba(0,212,170,.2);   color: #00d4aa; border: 1px solid rgba(0,212,170,.4); }
    .rl-num--yellow { background: rgba(255,209,102,.2); color: #ffd166; border: 1px solid rgba(255,209,102,.4); }
    .rl-num--orange { background: rgba(255,140,66,.2);  color: #ff8c42; border: 1px solid rgba(255,140,66,.4); }
    .rl-num--red    { background: rgba(255,77,109,.2);  color: #ff4d6d; border: 1px solid rgba(255,77,109,.4); }
    .rl-num--gray   { background: rgba(180,180,180,.1); color: #aaa;    border: 1px solid rgba(180,180,180,.2); }
    .rl-body { flex: 1; .rl-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; } .rl-desc { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; } }
    .rl-check { color: rgba(0,212,170,.7); font-size: 1rem; flex-shrink: 0; }

    /* ── Recovery Scenarios ── */
    .recovery-scenarios { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px 24px; }
    .rs-title { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 14px; }
    .rs-list { display: flex; flex-direction: column; gap: 10px; }
    .rs-item { display: flex; align-items: center; gap: 10px; font-size: 0.83rem; .rs-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; } .rs-cause { color: var(--text-primary); font-weight: 600; } .rs-arrow { color: var(--text-muted); } .rs-result { color: var(--text-secondary); } .rs-tag { margin-left: auto; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); } }
    .rs-item--highlight { .rs-cause { color: #00d4aa; } .rs-result { color: #00d4aa; font-weight: 700; } }

    /* ── AsyncGenerator ── */
    .generator-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
    .gen-code { background: #0d1117; border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; .gc-title { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); padding: 10px 16px; border-bottom: 1px solid var(--border-color); background: rgba(255,255,255,.02); } }
    .gc-pre { margin: 0; padding: 16px; font-family: var(--font-mono); font-size: 0.78rem; line-height: 1.8; color: #e2e8f0; overflow-x: auto; white-space: pre; .kw { color: #7c5cfc; } .op { color: #ff4d6d; } .fn { color: #5c8aff; } .str { color: #00d4aa; } .cm { color: #555; } }
    .gen-flow { background: var(--bg-card); border: 1px solid rgba(124,92,252,.2); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; .gf-title { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 16px; } }
    .gf-pipeline { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .gf-node { padding: 10px 20px; border-radius: 8px; font-size: 0.82rem; font-weight: 700; font-family: var(--font-mono); }
    .gf-node--entry { background: rgba(0,212,170,.15); border: 1px solid rgba(0,212,170,.4); color: #00d4aa; }
    .gf-node--ui { background: rgba(0,212,170,.15); border: 2px solid rgba(0,212,170,.5); color: #00d4aa; }
    .gf-arrow { font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); }
    .gf-events { display: flex; gap: 8px; }
    .gf-event { padding: 6px 14px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
    .gf-event--progress { background: rgba(124,92,252,.15); border: 1px solid rgba(124,92,252,.3); color: #a78bfa; }
    .gf-event--message  { background: rgba(92,138,255,.15);  border: 1px solid rgba(92,138,255,.3);  color: #5c8aff; }
    .gf-event--tool     { background: rgba(255,140,66,.15);  border: 1px solid rgba(255,140,66,.3);  color: #ff8c42; }
    .generator-why { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
    .gw-item { display: flex; gap: 12px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 16px; .gw-icon { font-size: 1.4rem; flex-shrink: 0; } .gw-title { font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 5px; } .gw-desc { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.6; } }

    @media (max-width: 640px) {
      .chapter-hero, .ch-section { padding-left: 20px; padding-right: 20px; }
      .recovery-stats { flex-direction: column; }
      .generator-layout { grid-template-columns: 1fr; }
      .generator-why { grid-template-columns: 1fr; }
    }
  `]
})
export class AgentLoopComponent {

  recoveryLayers = [
    { num: '1', color: 'purple', title: 'API 級指數退避重試', desc: 'BASE_DELAY=500ms，每次失敗翻倍退避，最多重試 10 次，上限 5 分鐘。' },
    { num: '2', color: 'blue',   title: '529 過載處理', desc: '前台模式：退避 3 次後放棄並通知用戶；後台模式：立即放棄，避免阻塞。' },
    { num: '3', color: 'teal',   title: '輸出 Token 恢復', desc: '輸出被截斷時，自動將 max_tokens 從 8K 升級到 64K，並注入最多 3 次恢復提示。' },
    { num: '4', color: 'yellow', title: '響應式壓縮', desc: '收到 413 Context Too Long 錯誤時，立即觸發全量 AI 摘要壓縮，壓縮完後自動重試。' },
    { num: '5', color: 'orange', title: '上下文排空', desc: '若壓縮仍無法縮小到限制以下，則排空舊上下文（保留最近 N 條），強制繼續。' },
    { num: '6', color: 'red',    title: '模型 Fallback', desc: '連續多次 529 後，自動切換到備用模型（如 claude-3-haiku），確保服務可用性。' },
    { num: '7', color: 'gray',   title: '無人值守持久重試', desc: '後台任務最大退避 5 分鐘，Session 重置上限 6 小時，適合長時間自主執行場景。' },
  ];

  errorScenarios = [
    { color: '#7c5cfc', cause: '網路抖動',   tag: '→ Layer 1 退避重試' },
    { color: '#ff8c42', cause: 'API 過載',   tag: '→ Layer 2/6 過載 + Fallback' },
    { color: '#ff4d6d', cause: '上下文爆炸', tag: '→ Layer 4/5 壓縮 + 排空' },
  ];

  generatorWhys = [
    { icon: '⚡', title: '真正的流式體驗', desc: '模型輸出 token 的同時，UI 就即時渲染，不需等待整段回應完成，延遲從秒級降至毫秒級。' },
    { icon: '🔗', title: '背壓（Backpressure）控制', desc: 'Generator 的 yield 天然提供背壓機制，UI 消費速度決定 Agent 推送速度，不會 OOM。' },
    { icon: '🔄', title: '可組合的管道', desc: '每個 yield 值都可被中間件攔截（如 Hook System），在不修改主循環的情況下注入自訂邏輯。' },
    { icon: '❌', title: '可取消的循環', desc: 'Generator 可隨時在任意 yield 點被外部 .return() 中止，實現精確的用戶中斷與清理。' },
  ];
}
