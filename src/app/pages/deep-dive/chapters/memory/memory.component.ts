import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 06</span>
      <h1>三層記憶架構</h1>
      <p>Claude Code 的記憶系統分為兩個獨立機制：持久化跨對話記憶（三層 Hot/Warm/Cold 分級）與對話內壓縮管理（SessionMemory Compaction）。核心設計哲學：用 Agentic Search 取代 RAG。</p>
      <div class="hero-tags">
        <span class="htag">memdir/memdir.ts</span>
        <span class="htag">findRelevantMemories.ts</span>
        <span class="htag">sessionMemoryCompact.ts</span>
        <span class="htag">Agentic Search</span>
        <span class="htag">Hot/Warm/Cold</span>
      </div>
    </div>

      <!-- Distinction Callout -->
      <section class="ch-section">
        <h2>兩套獨立記憶機制</h2>
        <div class="two-sys">
          <div class="sys-card sys-card-a">
            <div class="sys-num">系統 A</div>
            <div class="sys-title">持久化跨對話記憶</div>
            <div class="sys-sub">三層 Hot / Warm / Cold 分級</div>
            <p>跨對話長期保存的知識庫。由 <code>/memory</code> 指令觸發寫入，存儲於 <code>~/.claude/projects/</code> 目錄下的 Markdown 檔案。每次新對話啟動時按需載入，不受 Session 重啟影響。</p>
            <div class="sys-layers">
              <span class="sl sl-hot">🔥 MEMORY.md（索引）</span>
              <span class="sl sl-warm">🌡️ 主題檔（按需）</span>
              <span class="sl sl-cold">🧊 歷史 .jsonl（Grep）</span>
            </div>
          </div>
          <div class="sys-divider">+</div>
          <div class="sys-card sys-card-b">
            <div class="sys-num">系統 B</div>
            <div class="sys-title">對話內壓縮管理</div>
            <div class="sys-sub">SessionMemory Compaction</div>
            <p>單次對話期間的 Token 管理機制。當對話超過閾值（10K tokens + 5 則訊息）時，自動將舊訊息壓縮為摘要，為新訊息騰出 context window 空間。對話結束後不保留。</p>
            <div class="sys-layers">
              <span class="sl sl-gray">⚙️ trySessionMemoryCompaction()</span>
              <span class="sl sl-gray">📊 maxTokens 40K</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Three-Layer Overview SVG -->
      <section class="ch-section">
        <h2>系統 A：三層記憶架構全覽</h2>
        <div class="diagram-box">
          <svg viewBox="0 0 860 480" class="arch-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="860" height="480" fill="#0d1117" rx="12"/>

            <!-- Temperature gradient bar -->
            <defs>
              <linearGradient id="temp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   style="stop-color:#7c5cfc"/>
                <stop offset="50%"  style="stop-color:#00d4aa"/>
                <stop offset="100%" style="stop-color:#5c8aff"/>
              </linearGradient>
            </defs>
            <rect x="40" y="18" width="780" height="5" rx="3" fill="url(#temp-grad)" opacity="0.6"/>
            <text x="40"  y="14" fill="#a78bfa" font-size="9" font-family="monospace" font-weight="700">🔥 HOT</text>
            <text x="390" y="14" fill="#00d4aa" font-size="9" font-family="monospace" font-weight="700" text-anchor="middle">🌡️ WARM</text>
            <text x="820" y="14" fill="#5c8aff" font-size="9" font-family="monospace" font-weight="700" text-anchor="end">🧊 COLD</text>

            <!-- Layer 1: MEMORY.md -->
            <rect x="20" y="36" width="258" height="380" rx="10" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.5)" stroke-width="1.8"/>
            <text x="149" y="62" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="900" font-family="monospace">Layer 1</text>
            <text x="149" y="78" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="700" font-family="monospace">MEMORY.md</text>
            <text x="149" y="92" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">索引檔 · 每次對話自動載入</text>

            <rect x="36" y="106" width="226" height="56" rx="7" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.3)" stroke-width="1"/>
            <text x="149" y="124" text-anchor="middle" fill="#c4b5fd" font-size="9" font-weight="700" font-family="monospace">size constraints</text>
            <text x="149" y="139" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">MAX_ENTRYPOINT_LINES = 200</text>
            <text x="149" y="152" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">MAX_ENTRYPOINT_BYTES = 25,000</text>

            <text x="36" y="180" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 不存實際內容，只存指針</text>
            <text x="36" y="196" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 每行限制約 150 字元</text>
            <text x="36" y="212" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 超限自動截斷並附 WARNING</text>
            <text x="36" y="228" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 消耗每次請求的 context</text>

            <rect x="36" y="244" width="226" height="40" rx="6" fill="rgba(255,77,109,0.08)" stroke="rgba(255,77,109,0.3)" stroke-width="1"/>
            <text x="149" y="260" text-anchor="middle" fill="#ff4d6d" font-size="8.5" font-weight="700" font-family="monospace">⚠ 設計意圖</text>
            <text x="149" y="274" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">越小越好，過大浪費對話空間</text>

            <rect x="36" y="298" width="226" height="36" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
            <text x="149" y="315" text-anchor="middle" fill="#7c5cfc" font-size="8.5" font-weight="700" font-family="monospace">memdir/memdir.ts</text>
            <text x="149" y="328" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">位置: ~/.claude/projects/.../MEMORY.md</text>

            <text x="149" y="368" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="monospace" font-weight="700">ALWAYS LOADED</text>
            <text x="149" y="384" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">注入 System Prompt Block</text>
            <text x="149" y="400" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">每次對話皆消耗 token</text>

            <!-- Layer 2: Topic Files -->
            <rect x="301" y="36" width="258" height="380" rx="10" fill="rgba(0,212,170,0.06)" stroke="rgba(0,212,170,0.5)" stroke-width="1.8"/>
            <text x="430" y="62" text-anchor="middle" fill="#00d4aa" font-size="12" font-weight="900" font-family="monospace">Layer 2</text>
            <text x="430" y="78" text-anchor="middle" fill="#00d4aa" font-size="11" font-weight="700" font-family="monospace">Topic Files</text>
            <text x="430" y="92" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">主題檔 · 語義相關時按需載入</text>

            <rect x="317" y="106" width="226" height="40" rx="7" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
            <text x="430" y="122" text-anchor="middle" fill="#5eead4" font-size="9" font-weight="700" font-family="monospace">檔案範例</text>
            <text x="430" y="136" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">user.md · feedback.md · project.md · reference.md</text>

            <text x="317" y="162" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 小型 Sonnet 模型判斷相關性</text>
            <text x="317" y="178" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 最多載入 5 個檔案</text>
            <text x="317" y="194" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 刻意不存代碼片段</text>
            <text x="317" y="210" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 優先: warnings · gotchas · 規則</text>

            <rect x="317" y="228" width="226" height="52" rx="6" fill="rgba(255,209,102,0.06)" stroke="rgba(255,209,102,0.3)" stroke-width="1"/>
            <text x="430" y="246" text-anchor="middle" fill="#ffd166" font-size="9" font-weight="700" font-family="monospace">為何不存代碼片段？</text>
            <text x="430" y="261" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">源碼會改變，但記憶不會自動更新</text>
            <text x="430" y="272" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">→ 不一致會誤導 AI</text>

            <rect x="317" y="298" width="226" height="36" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
            <text x="430" y="315" text-anchor="middle" fill="#00d4aa" font-size="8.5" font-weight="700" font-family="monospace">findRelevantMemories.ts</text>
            <text x="430" y="328" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">位置: ~/.claude/projects/.../</text>

            <text x="430" y="368" text-anchor="middle" fill="#00d4aa" font-size="8" font-family="monospace" font-weight="700">ON-DEMAND LOAD</text>
            <text x="430" y="384" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">語義相關才載入</text>
            <text x="430" y="400" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">減少不必要的 token 消耗</text>

            <!-- Layer 3: Historical .jsonl -->
            <rect x="582" y="36" width="258" height="380" rx="10" fill="rgba(92,138,255,0.06)" stroke="rgba(92,138,255,0.4)" stroke-width="1.8" stroke-dasharray="5,3"/>
            <text x="711" y="62" text-anchor="middle" fill="#5c8aff" font-size="12" font-weight="900" font-family="monospace">Layer 3</text>
            <text x="711" y="78" text-anchor="middle" fill="#5c8aff" font-size="11" font-weight="700" font-family="monospace">Historical .jsonl</text>
            <text x="711" y="92" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">歷史對話 · Grep 按需搜尋</text>

            <rect x="598" y="106" width="226" height="56" rx="7" fill="rgba(92,138,255,0.1)" stroke="rgba(92,138,255,0.25)" stroke-width="1"/>
            <text x="711" y="124" text-anchor="middle" fill="#93c5fd" font-size="9" font-weight="700" font-family="monospace">Agentic Search 指令</text>
            <text x="711" y="139" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">grep -rn "query"</text>
            <text x="711" y="152" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">$PROJECT_DIR/ --include="*.jsonl"</text>

            <text x="598" y="178" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 儲存所有歷史對話紀錄</text>
            <text x="598" y="194" fill="#b8c8e0" font-size="8.5" font-family="monospace">• AI 自己決定搜索什麼</text>
            <text x="598" y="210" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 不需要 embedding / 向量索引</text>
            <text x="598" y="226" fill="#b8c8e0" font-size="8.5" font-family="monospace">• 精確字串比對，速度快</text>

            <rect x="598" y="244" width="226" height="40" rx="6" fill="rgba(0,212,170,0.06)" stroke="rgba(0,212,170,0.2)" stroke-width="1"/>
            <text x="711" y="260" text-anchor="middle" fill="#00d4aa" font-size="8.5" font-weight="700" font-family="monospace">vs RAG</text>
            <text x="711" y="274" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">AI 選擇關鍵字 &gt; 預先向量化</text>

            <rect x="598" y="298" width="226" height="36" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
            <text x="711" y="315" text-anchor="middle" fill="#5c8aff" font-size="8.5" font-weight="700" font-family="monospace">conversation-*.jsonl</text>
            <text x="711" y="328" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">位置: ~/.claude/projects/.../</text>

            <text x="711" y="368" text-anchor="middle" fill="#5c8aff" font-size="8" font-family="monospace" font-weight="700">GREP ON DEMAND</text>
            <text x="711" y="384" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">AI 主動發起搜索</text>
            <text x="711" y="400" text-anchor="middle" fill="#b8c8e0" font-size="8" font-family="monospace">冷數據 · 零 token 成本（不搜不耗）</text>

            <!-- Arrows between layers -->
            <text x="288" y="220" text-anchor="middle" fill="#b8c8e0" font-size="8.5" font-family="monospace">指針</text>
            <line x1="278" y1="226" x2="302" y2="226" stroke="rgba(124,92,252,0.5)" stroke-width="1.2" marker-end="url(#a-right)"/>
            <defs>
              <marker id="a-right" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(124,92,252,0.8)"/>
              </marker>
            </defs>

            <!-- Bottom label -->
            <text x="430" y="450" text-anchor="middle" fill="#b8c8e0" font-size="9" font-family="monospace">
              MEMORY.md 作為索引，指向各 Topic Files；歷史對話在需要時由 AI 主動 grep 搜索
            </text>
          </svg>
        </div>
      </section>

      <!-- Layer 1 Detail -->
      <section class="ch-section">
        <h2>Layer 1 — MEMORY.md：索引設計邏輯</h2>
        <div class="detail-grid">
          <div class="detail-card dc-purple">
            <h3>為什麼是索引而非內容？</h3>
            <p>MEMORY.md 在<strong>每次對話</strong>都會被自動注入 System Prompt，因此它消耗的是永久性的 context 空間。若直接存儲大量內容，會嚴重壓縮可用對話空間。所以它只存「指針」——記錄有哪些主題檔，讓 Layer 2 按需載入真正的內容。</p>
          </div>
          <div class="detail-card dc-purple">
            <h3>硬性限制的設計意義</h3>
            <p><code>MAX_ENTRYPOINT_LINES = 200</code>、<code>MAX_ENTRYPOINT_BYTES = 25,000</code>。超出限制時自動截斷並追加 <code>WARNING</code>，讓 Claude 知道檔案不完整。每行限制約 150 字元，強迫寫出簡潔的指針條目，不允許堆砌內容。</p>
          </div>
          <div class="detail-card dc-purple">
            <h3>MEMORY.md 的理想格式</h3>
            <p>每個條目應為一行簡短描述 + 指向對應主題檔的連結。例如：<code>- [用戶角色](user.md) — 資深後端開發者，偏好 TypeScript</code>。描述越精確，Layer 2 的相關性篩選效果越好，AI 能更快定位需要載入哪些主題檔。</p>
          </div>
          <div class="detail-card dc-purple">
            <h3>對話間的持久性</h3>
            <p>MEMORY.md 存儲在 <code>~/.claude/projects/[project-hash]/MEMORY.md</code>，跨越所有對話持久保存。即使重啟 Claude Code，下次對話時依然自動載入，這是區別於 Session 記憶的核心優勢。</p>
          </div>
        </div>
      </section>

      <!-- Layer 2 Detail -->
      <section class="ch-section">
        <h2>Layer 2 — Topic Files：語義相關性載入</h2>
        <div class="topic-layout">
          <div class="topic-types">
            <h3>四種記憶類型</h3>
            <div class="type-list">
              <div class="type-item" *ngFor="let t of memoryTypes">
                <div class="ti-name" [style.color]="t.color" [style.border-color]="t.color + '44'" [style.background]="t.color + '12'">{{ t.name }}</div>
                <div class="ti-desc">{{ t.desc }}</div>
                <div class="ti-example"><code>{{ t.file }}</code></div>
              </div>
            </div>
          </div>

          <div class="topic-rules">
            <h3>findRelevantMemories.ts 選擇邏輯</h3>
            <div class="rule-list">
              <div class="rule-item" *ngFor="let r of relevanceRules">
                <div class="ri-num" [style.color]="r.color">{{ r.num }}</div>
                <div class="ri-body">
                  <div class="ri-title">{{ r.title }}</div>
                  <div class="ri-desc">{{ r.desc }}</div>
                </div>
              </div>
            </div>
            <div class="no-code-note">
              <span class="ncn-icon">⚠️</span>
              <div>
                <strong>刻意不存代碼片段</strong>
                <p>原始碼會隨開發持續變更，但記憶檔不會自動同步更新。過時的代碼片段會誤導 AI 產生錯誤建議。記憶應存「規則與原則」，代碼本身留給 Glob/Grep/Read 即時讀取。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Layer 3 Detail + Agentic Search vs RAG -->
      <section class="ch-section">
        <h2>Layer 3 — 歷史對話：Agentic Search vs RAG</h2>
        <div class="rag-compare">
          <div class="rc-panel rc-rag">
            <div class="rc-head">
              <span class="rc-icon">❌</span>
              <div>
                <div class="rc-title">傳統 RAG 方案</div>
                <div class="rc-sub">Claude Code 為何不採用</div>
              </div>
            </div>
            <div class="rc-steps">
              <div class="rcs-item" *ngFor="let s of ragSteps">
                <div class="rcs-arrow">→</div>
                <div class="rcs-text">{{ s }}</div>
              </div>
            </div>
            <div class="rc-problems">
              <div class="rcp" *ngFor="let p of ragProblems">△ {{ p }}</div>
            </div>
          </div>

          <div class="rc-vs">vs</div>

          <div class="rc-panel rc-agentic">
            <div class="rc-head">
              <span class="rc-icon">✅</span>
              <div>
                <div class="rc-title">Agentic Search 方案</div>
                <div class="rc-sub">Claude Code 實際採用</div>
              </div>
            </div>
            <div class="rc-steps">
              <div class="rcs-item" *ngFor="let s of agentSteps">
                <div class="rcs-arrow" style="color:#00d4aa">→</div>
                <div class="rcs-text">{{ s }}</div>
              </div>
            </div>
            <div class="rc-advantages">
              <div class="rca" *ngFor="let a of agentAdvantages">✓ {{ a }}</div>
            </div>
          </div>
        </div>

        <div class="key-insight">
          <div class="ki-icon">💡</div>
          <div class="ki-body">
            <strong>核心洞察（來源：掘金技術分析）</strong>
            <p>「讓 AI 自己決定搜什麼、怎麼搜，效果遠遠好於 RAG」。AI 理解當前對話的完整語義，能選擇最精確的關鍵字；而 RAG 的向量相似度計算是靜態的，無法感知查詢的真實意圖。歷史對話用 <code>grep -rn "query" ~/.claude/projects/**/*.jsonl</code> 搜索，零 embedding 成本，AI 主導搜索策略。</p>
          </div>
        </div>
      </section>

      <!-- System B: Session Compaction -->
      <section class="ch-section">
        <h2>系統 B：對話內 SessionMemory 壓縮</h2>
        <div class="compact-layout">
          <div class="compact-flow">
            <div class="cf-step" *ngFor="let s of compactSteps; let last = last">
              <div class="cfs-box" [style.border-color]="s.color + '55'" [style.background]="s.color + '0e'">
                <div class="cfs-title" [style.color]="s.color">{{ s.title }}</div>
                <div class="cfs-desc">{{ s.desc }}</div>
              </div>
              <div class="cfs-arrow" *ngIf="!last">↓</div>
            </div>
          </div>
          <div class="compact-params">
            <h3>關鍵參數</h3>
            <div class="param-list">
              <div class="param-item" *ngFor="let p of compactParams">
                <code class="param-key">{{ p.key }}</code>
                <span class="param-val">{{ p.val }}</span>
                <span class="param-note">{{ p.note }}</span>
              </div>
            </div>
            <div class="compact-note">
              <strong>注意：</strong>系統 B 與系統 A 完全獨立。Session 壓縮只影響當前對話的 token 管理，壓縮摘要不會寫入持久化記憶檔，對話結束後消失。
            </div>
          </div>
        </div>
      </section>

      <!-- Memory Write Flow -->
      <section class="ch-section">
        <h2>記憶寫入完整流程</h2>
        <div class="write-flow">
          <div class="wf-step" *ngFor="let s of writeFlow; let i = index; let last = last">
            <div class="wfs-num" [style.color]="s.color" [style.background]="s.color + '15'" [style.border-color]="s.color + '44'">{{ i + 1 }}</div>
            <div class="wfs-body">
              <div class="wfs-title">{{ s.title }}</div>
              <div class="wfs-desc">{{ s.desc }}</div>
            </div>
            <div class="wfs-arrow" *ngIf="!last" [style.color]="s.color">→</div>
          </div>
        </div>
      </section>

      <!-- Source Table -->
      <section class="ch-section">
        <h2>原始碼位置</h2>
        <div class="src-table-wrap">
          <table class="src-table">
            <thead>
              <tr><th>檔案</th><th>所屬系統</th><th>職責</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of srcTable">
                <td><code>{{ r.file }}</code></td>
                <td><span class="sys-badge" [style.color]="r.sysColor" [style.background]="r.sysColor + '15'" [style.border-color]="r.sysColor + '44'">{{ r.sys }}</span></td>
                <td>{{ r.role }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
  `,
  styles: [`
    :host { display: block; }
    .chapter-hero {
      padding:48px 40px 40px; border-bottom:1px solid var(--border-color);
      background:radial-gradient(ellipse 70% 50% at 30% 50%, rgba(167,139,250,.08) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#a78bfa; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#a78bfa,#7c5cfc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(167,139,250,.1); border:1px solid rgba(167,139,250,.25); color:#a78bfa; padding:3px 10px; border-radius:4px; }
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .ch-section h2 { font-size:1.25rem; font-weight:800; margin-bottom:24px; }
    .ch-section h3 { font-size:.95rem; font-weight:700; margin-bottom:14px; }

    /* ===== Two Systems ===== */
    .two-sys {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 0;
      align-items: stretch;
    }

    .sys-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 24px;

      .sys-num { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px; }
      .sys-title { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
      .sys-sub { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-bottom: 12px; }
      p { font-size: 0.83rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px; code { font-family: var(--font-mono); font-size: 0.82em; color: #00d4aa; background: rgba(0,212,170,0.08); padding: 1px 5px; border-radius: 3px; } }
    }

    .sys-card-a { border-color: rgba(124,92,252,0.3); }
    .sys-card-b { border-color: rgba(0,212,170,0.2); }

    .sys-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      font-size: 1.2rem;
      font-weight: 900;
      color: var(--text-muted);
    }

    .sys-layers { display: flex; flex-direction: column; gap: 6px; }

    .sl {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 5px;
      border: 1px solid;
      display: inline-block;
    }

    .sl-hot  { color: #a78bfa; background: rgba(124,92,252,0.1); border-color: rgba(124,92,252,0.3); }
    .sl-warm { color: #00d4aa; background: rgba(0,212,170,0.08); border-color: rgba(0,212,170,0.25); }
    .sl-cold { color: #5c8aff; background: rgba(92,138,255,0.08); border-color: rgba(92,138,255,0.25); }
    .sl-gray { color: var(--text-muted); background: rgba(255,255,255,0.04); border-color: var(--border-color); }

    /* ===== Diagram ===== */
    .diagram-box { background: #0d1117; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 4px; overflow: hidden; }
    .arch-svg { width: 100%; height: auto; display: block; }

    /* ===== Detail Cards ===== */
    .detail-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }

    .detail-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;

      h3 { font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
      p { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.7; margin: 0; }
      strong { color: var(--text-primary); }
      code { font-family: var(--font-mono); font-size: 0.8em; color: #a78bfa; background: rgba(124,92,252,0.1); padding: 1px 5px; border-radius: 3px; }
    }

    .dc-purple { border-left: 3px solid rgba(124,92,252,0.6); }

    /* ===== Topic Files Layout ===== */
    .topic-layout {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 20px;
    }

    .type-list { display: flex; flex-direction: column; gap: 10px; }

    .type-item {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .ti-name { font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; border: 1px solid; display: inline-block; width: fit-content; }
      .ti-desc { font-size: 0.8rem; color: var(--text-secondary); }
      .ti-example { code { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); } }
    }

    .rule-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }

    .rule-item {
      display: flex;
      gap: 14px;
      align-items: flex-start;

      .ri-num { font-family: var(--font-mono); font-size: 1rem; font-weight: 900; flex-shrink: 0; min-width: 20px; }
      .ri-title { font-size: 0.84rem; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
      .ri-desc { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; }
    }

    .no-code-note {
      display: flex;
      gap: 12px;
      background: rgba(255,209,102,0.06);
      border: 1px solid rgba(255,209,102,0.2);
      border-radius: var(--radius-sm);
      padding: 14px;

      .ncn-icon { font-size: 1.1rem; flex-shrink: 0; }
      strong { display: block; font-size: 0.84rem; color: #ffd166; margin-bottom: 4px; }
      p { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }
    }

    /* ===== RAG Compare ===== */
    .rag-compare {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 0;
      margin-bottom: 20px;
    }

    .rc-panel {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;

      .rc-head {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 16px;

        .rc-icon { font-size: 1.4rem; }
        .rc-title { font-size: 0.9rem; font-weight: 800; color: var(--text-primary); }
        .rc-sub { font-size: 0.75rem; color: var(--text-muted); }
      }
    }

    .rc-rag { border-color: rgba(255,77,109,0.2); }
    .rc-agentic { border-color: rgba(0,212,170,0.2); }

    .rc-steps { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }

    .rcs-item {
      display: flex;
      gap: 8px;
      font-size: 0.8rem;
      color: var(--text-secondary);

      .rcs-arrow { color: var(--text-muted); flex-shrink: 0; }
    }

    .rc-problems { display: flex; flex-direction: column; gap: 4px; }
    .rcp { font-size: 0.77rem; color: #ff4d6d; }

    .rc-advantages { display: flex; flex-direction: column; gap: 4px; }
    .rca { font-size: 0.77rem; color: #00d4aa; }

    .rc-vs {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-muted);
    }

    .key-insight {
      display: flex;
      gap: 16px;
      background: rgba(0,212,170,0.06);
      border: 1px solid rgba(0,212,170,0.2);
      border-radius: var(--radius-md);
      padding: 20px 24px;

      .ki-icon { font-size: 1.4rem; flex-shrink: 0; }
      strong { display: block; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 6px; }
      p { font-size: 0.83rem; color: var(--text-secondary); line-height: 1.7; margin: 0; }
      code { font-family: var(--font-mono); font-size: 0.82em; color: #00d4aa; background: rgba(0,212,170,0.1); padding: 1px 5px; border-radius: 3px; }
    }

    /* ===== Session Compaction ===== */
    .compact-layout {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 20px;
    }

    .compact-flow { display: flex; flex-direction: column; align-items: flex-start; gap: 0; }

    .cf-step { display: flex; flex-direction: column; align-items: flex-start; }

    .cfs-box {
      border: 1px solid;
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      width: 100%;

      .cfs-title { font-size: 0.84rem; font-weight: 700; margin-bottom: 4px; }
      .cfs-desc { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; }
    }

    .cfs-arrow { color: var(--text-muted); font-size: 1rem; padding: 4px 16px; }

    .param-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }

    .param-item {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 8px 12px;
      flex-wrap: wrap;

      .param-key { font-family: var(--font-mono); font-size: 0.78rem; color: #a78bfa; background: rgba(124,92,252,0.1); padding: 2px 6px; border-radius: 3px; }
      .param-val { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-primary); font-weight: 700; }
      .param-note { font-size: 0.75rem; color: var(--text-muted); }
    }

    .compact-note {
      font-size: 0.8rem;
      color: var(--text-secondary);
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 12px 14px;
      line-height: 1.6;

      strong { color: var(--text-primary); }
    }

    /* ===== Write Flow ===== */
    .write-flow {
      display: flex;
      align-items: flex-start;
      gap: 0;
      flex-wrap: wrap;
    }

    .wf-step {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .wfs-num {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 900;
      flex-shrink: 0;
    }

    .wfs-body {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 10px 14px;
      min-width: 140px;
      max-width: 200px;

      .wfs-title { font-size: 0.8rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
      .wfs-desc { font-size: 0.74rem; color: var(--text-secondary); line-height: 1.5; }
    }

    .wfs-arrow { font-size: 1.1rem; padding: 8px 4px; flex-shrink: 0; margin-top: 4px; }

    /* ===== Source Table ===== */
    .src-table-wrap { overflow-x: auto; }
    .src-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.84rem;

      thead tr { background: rgba(124,92,252,0.08); }
      th { padding: 10px 16px; text-align: left; font-weight: 700; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
      td { padding: 10px 16px; color: var(--text-secondary); border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
      tr:hover td { background: rgba(255,255,255,0.02); }
      tr:last-child td { border-bottom: none; }
      code { font-family: var(--font-mono); font-size: 0.82em; color: #a78bfa; }
    }

    .sys-badge {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid;
      display: inline-block;
    }

    @media (max-width: 768px) {
      .two-sys { grid-template-columns: 1fr; }
      .sys-divider { padding: 10px 0; }
      .topic-layout { grid-template-columns: 1fr; }
      .rag-compare { grid-template-columns: 1fr; }
      .rc-vs { padding: 10px 0; }
      .compact-layout { grid-template-columns: 1fr; }
      .write-flow { flex-direction: column; }
    }

    @media (max-width: 640px) {
      .chapter-hero, .ch-section { padding-left: 20px; padding-right: 20px; }
    }
  `]
})
export class MemoryComponent {

  memoryTypes = [
    { name: 'user',      color: '#7c5cfc', desc: '用戶角色、目標、技術背景、偏好', file: 'user.md' },
    { name: 'feedback',  color: '#00d4aa', desc: '用戶給 AI 的行為指引，避免重蹈覆轍', file: 'feedback_testing.md' },
    { name: 'project',   color: '#ff8c42', desc: '進行中工作、目標、截止日期、關鍵決策', file: 'project_auth.md' },
    { name: 'reference', color: '#ffd166', desc: '外部系統、工具位置、API 端點指針', file: 'reference_linear.md' },
  ];

  relevanceRules = [
    { num: '①', color: '#7c5cfc', title: '小型 Sonnet 模型評分', desc: '用輕量模型分析當前對話語義，對每個主題檔評估相關性分數，避免讓主模型做篩選決策。' },
    { num: '②', color: '#00d4aa', title: '最多載入 5 個檔案', desc: '硬性上限防止 context 膨脹。相關性不足的主題檔不載入，即使它們存在也不消耗 token。' },
    { num: '③', color: '#ffd166', title: '優先 warnings 與 gotchas', desc: '已知問題、踩坑紀錄、不能做的事比一般描述更優先被載入，因為它們對 AI 行為影響最大。' },
    { num: '④', color: '#ff8c42', title: '排除已知使用中的工具文檔', desc: '若某工具已在對話中被主動使用，其說明文檔相關性降低，不必再佔用載入名額。' },
  ];

  ragSteps = [
    '對所有歷史對話做 embedding 向量化',
    '建立向量索引（FAISS / ChromaDB）',
    '查詢時計算 cosine similarity',
    '取 top-k 結果注入 context',
  ];

  ragProblems = [
    '需要額外基礎設施（向量 DB）',
    '向量化成本，索引需定期更新',
    '語義相似度 ≠ 真正需要的資訊',
    'AI 無法控制搜索策略',
  ];

  agentSteps = [
    'AI 分析當前問題，自主決定搜索關鍵字',
    '執行 grep 對 .jsonl 歷史檔搜索',
    '讀取 grep 結果，決定是否需要更多搜索',
    '將相關片段直接放入 context',
  ];

  agentAdvantages = [
    '零基礎設施成本（只需 grep）',
    'AI 理解查詢意圖，選字精準',
    '可迭代搜索，找不到換關鍵字',
    '完全透明，搜索過程可審查',
  ];

  compactSteps = [
    { color: '#7c5cfc', title: '監測觸發條件', desc: '對話 token 數 > 10K 且訊息數 > 5 則' },
    { color: '#ff8c42', title: '計算保留點', desc: 'calculateMessagesToKeepIndex() 決定保留最新幾則訊息' },
    { color: '#ffd166', title: '生成摘要', desc: '對舊訊息呼叫 Claude 生成壓縮摘要' },
    { color: '#00d4aa', title: '替換歷史', desc: '舊訊息替換為摘要，新訊息繼續追加，對話可持續' },
  ];

  compactParams = [
    { key: 'minTokens',    val: '10,000',  note: '觸發壓縮的最低 token 閾值' },
    { key: 'minMessages',  val: '5',       note: '觸發壓縮的最低訊息數' },
    { key: 'maxTokens',    val: '40,000',  note: 'SessionMemory 摘要最大 token 上限' },
    { key: 'implementation', val: 'trySessionMemoryCompaction()', note: 'sessionMemoryCompact.ts' },
  ];

  writeFlow = [
    { color: '#7c5cfc', title: '對話進行中', desc: 'AI 識別到值得記住的資訊（用戶偏好、錯誤教訓等）' },
    { color: '#7c5cfc', title: '決定記憶類型', desc: '判斷屬於 user / feedback / project / reference 哪一類' },
    { color: '#00d4aa', title: '寫入主題檔', desc: '建立或更新對應的 .md 檔（如 user_role.md）' },
    { color: '#00d4aa', title: '更新 MEMORY.md', desc: '在索引加入/更新條目，格式：- [標題](file.md) — 一句描述' },
    { color: '#5c8aff', title: '對話存入 .jsonl', desc: '對話結束後完整歷史自動保存為 jsonl 歸檔' },
    { color: '#ffd166', title: '下次對話載入', desc: 'MEMORY.md 自動載入；主題檔按語義相關性按需載入' },
  ];

  srcTable = [
    { file: 'memdir/memdir.ts',        sys: '系統 A', sysColor: '#7c5cfc', role: 'MEMORY.md 讀寫、大小限制強制執行、截斷警告' },
    { file: 'findRelevantMemories.ts', sys: '系統 A', sysColor: '#7c5cfc', role: '語義相關性評分、最多 5 個主題檔選擇' },
    { file: 'claudemd.ts',             sys: '相關',   sysColor: '#ff8c42', role: 'CLAUDE.md 搜索（從工作目錄向上遍歷）、注入 System Prompt' },
    { file: 'sessionMemory.ts',        sys: '系統 B', sysColor: '#00d4aa', role: 'SessionMemory 讀寫、壓縮觸發條件檢查' },
    { file: 'sessionMemoryCompact.ts', sys: '系統 B', sysColor: '#00d4aa', role: 'trySessionMemoryCompaction()、calculateMessagesToKeepIndex()' },
    { file: 'buildSystemPrompt.ts',    sys: '共用',   sysColor: '#ffd166', role: '整合 CLAUDE.md + MEMORY.md + 主題檔 → System Prompt' },
  ];
}
