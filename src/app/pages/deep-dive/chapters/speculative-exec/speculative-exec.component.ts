import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speculative-exec',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 12</span>
      <h1>投機執行機制</h1>
      <p>Overlay 檔案系統 + 流水線化預執行，延遲隱藏的核心工程。借鑒 CPU 分支預測原理，在用戶確認前已完成預執行。</p>
      <div class="hero-tags">
        <span class="htag">speculativeExec.ts</span>
        <span class="htag">overlayFS.ts</span>
        <span class="htag">pipeline</span>
        <span class="htag">延遲隱藏</span>
        <span class="htag">Overlay FS</span>
      </div>
    </div>

      <!-- 核心概念 -->
      <section class="ch-section">
        <h2 class="section-title">什麼是投機執行？</h2>
        <div class="concept-card">
          <div class="concept-icon">💡</div>
          <div class="concept-body">
            <h3>像 CPU 指令流水線一樣隱藏等待延遲</h3>
            <p>投機執行（Speculative Execution）是 Claude Code 延遲隱藏的核心優化策略。其核心思想借鑒自 CPU 的分支預測機制：</p>
            <ul>
              <li>在用戶尚未點擊「確認」之前，系統已在<strong>隔離的 Overlay 檔案系統</strong>中開始預執行操作</li>
              <li>若用戶確認 → 將 Overlay 層的結果複製回真實檔案系統，幾乎零等待</li>
              <li>若用戶拒絕 → 直接丟棄 Overlay 層，真實檔案系統未受任何影響</li>
              <li>同時，當用戶在審核第 N 步時，系統已在投機執行第 N+1 步</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Overlay 檔案系統 -->
      <section class="ch-section">
        <h2 class="section-title">Overlay 檔案系統架構</h2>

        <div class="overlay-diagram">
          <div class="overlay-layer real-fs">
            <div class="layer-label">真實檔案系統 Real FS</div>
            <div class="layer-files">
              <div class="file-chip">src/main.ts</div>
              <div class="file-chip">src/utils.ts</div>
              <div class="file-chip">package.json</div>
              <div class="file-chip">...</div>
            </div>
            <div class="layer-note">用戶確認後才寫入</div>
          </div>

          <div class="overlay-arrow-up">
            <div class="arrow-line"></div>
            <div class="arrow-labels">
              <span class="label-confirm">✅ 確認 → Copy-up</span>
              <span class="label-reject">❌ 拒絕 → Drop</span>
            </div>
          </div>

          <div class="overlay-layer overlay-fs">
            <div class="layer-label">Overlay 層（臨時覆蓋）</div>
            <div class="layer-files">
              <div class="file-chip file-modified">src/main.ts ✏️</div>
              <div class="file-chip file-new">src/new-feature.ts 🆕</div>
            </div>
            <div class="layer-note">寫操作先在此執行（隔離安全）</div>
          </div>

          <div class="overlay-arrow-down">
            <div class="arrow-line"></div>
            <div class="label-read">📖 讀操作穿透兩層（Union Read）</div>
          </div>

          <div class="overlay-layer model-layer">
            <div class="layer-label">模型生成層 Model Output</div>
            <div class="layer-files">
              <div class="spec-item">建議 N: 修改 main.ts</div>
              <div class="spec-item spec-active">建議 N+1: 新增 feature.ts ⟵ 投機預執行中</div>
              <div class="spec-item spec-pending">建議 N+2: 更新 index.ts ⟵ 等待中</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 流水線時間軸 -->
      <section class="ch-section">
        <h2 class="section-title">流水線化執行時間軸</h2>
        <p class="section-desc">對比傳統串行模式與投機執行的時間差異</p>

        <div class="timeline-comparison">

          <div class="timeline-block">
            <div class="timeline-title">❌ 傳統串行模式（無投機執行）</div>
            <div class="timeline-track">
              <div class="tl-step tl-model">模型生成<br>建議 N</div>
              <div class="tl-arrow">→</div>
              <div class="tl-step tl-wait">等待用戶<br>確認 N</div>
              <div class="tl-arrow">→</div>
              <div class="tl-step tl-exec">執行<br>建議 N</div>
              <div class="tl-arrow">→</div>
              <div class="tl-step tl-model">模型生成<br>建議 N+1</div>
              <div class="tl-arrow">→</div>
              <div class="tl-step tl-wait">等待用戶<br>確認 N+1</div>
            </div>
            <div class="timeline-total">總時間 = Σ(生成 + 等待 + 執行) × N 步</div>
          </div>

          <div class="timeline-block timeline-block--opt">
            <div class="timeline-title">✅ 投機執行流水線模式</div>
            <div class="timeline-track">
              <div class="tl-step tl-model">模型生成<br>建議 N</div>
              <div class="tl-arrow">→</div>
              <div class="tl-step tl-wait">用戶確認 N<br><span class="sub-note">同時投機執行 N+1</span></div>
              <div class="tl-arrow">→</div>
              <div class="tl-step tl-exec tl-instant">Copy-up<br>（瞬間完成）</div>
              <div class="tl-arrow">→</div>
              <div class="tl-step tl-wait">用戶確認 N+1<br><span class="sub-note">同時投機執行 N+2</span></div>
            </div>
            <div class="timeline-total timeline-total--opt">總時間 ≈ 最長單步時間（隱藏等待延遲）</div>
          </div>

        </div>
      </section>

      <!-- 執行邏輯流程 -->
      <section class="ch-section">
        <h2 class="section-title">投機執行完整流程</h2>

        <div class="flow-steps">
          <div class="flow-step" *ngFor="let step of flowSteps; let i = index">
            <div class="flow-num">{{ i + 1 }}</div>
            <div class="flow-content">
              <div class="flow-title">{{ step.title }}</div>
              <div class="flow-desc">{{ step.desc }}</div>
              <div class="flow-code" *ngIf="step.code">
                <pre>{{ step.code }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 確認 vs 拒絕 -->
      <section class="ch-section">
        <h2 class="section-title">確認 / 拒絕的不同路徑</h2>

        <div class="outcome-grid">
          <div class="outcome-card outcome-confirm">
            <div class="outcome-header">
              <span class="outcome-icon">✅</span>
              <span class="outcome-title">用戶點擊確認</span>
            </div>
            <ol class="outcome-steps">
              <li>將 Overlay 層的所有修改 <strong>Copy-up</strong> 至真實檔案系統</li>
              <li>清理 Overlay 臨時目錄</li>
              <li>記錄文件變更日誌（用於後續壓縮恢復）</li>
              <li>立即開始處理下一個已投機執行的建議</li>
            </ol>
            <div class="outcome-result outcome-result--success">用戶幾乎感受不到等待延遲</div>
          </div>

          <div class="outcome-card outcome-reject">
            <div class="outcome-header">
              <span class="outcome-icon">❌</span>
              <span class="outcome-title">用戶點擊拒絕</span>
            </div>
            <ol class="outcome-steps">
              <li>直接 <strong>Drop</strong> Overlay 層（rm -rf 臨時目錄）</li>
              <li>真實檔案系統完全未受影響</li>
              <li>取消尚未完成的投機執行任務</li>
              <li>返回模型重新規劃</li>
            </ol>
            <div class="outcome-result outcome-result--reject">安全回滾，零副作用</div>
          </div>
        </div>
      </section>

      <!-- 技術細節 -->
      <section class="ch-section">
        <h2 class="section-title">技術實現細節</h2>

        <div class="tech-grid">
          <div class="tech-card" *ngFor="let item of techDetails">
            <div class="tech-icon">{{ item.icon }}</div>
            <div class="tech-title">{{ item.title }}</div>
            <div class="tech-desc">{{ item.desc }}</div>
          </div>
        </div>
      </section>

      <!-- 與安全機制的協作 -->
      <section class="ch-section">
        <h2 class="section-title">與安全機制的協作</h2>
        <div class="security-note">
          <div class="sn-icon">🛡️</div>
          <div class="sn-body">
            <h3>投機執行 ≠ 繞過安全審查</h3>
            <p>投機執行的前提是操作已通過<strong>第一道安全過濾</strong>：</p>
            <ul>
              <li>Settings 規則檢查（允許/拒絕清單）</li>
              <li>YOLO 分類器初步評估（Sonnet 快速判斷）</li>
              <li>Bash 20 項安全掃描</li>
            </ul>
            <p>只有這些檢查通過後，操作才會進入投機執行佇列在 Overlay FS 中預先執行。用戶確認是最後一道人工審查關卡。</p>
          </div>
        </div>
      </section>

      <!-- 工程價值 -->
      <section class="ch-section">
        <h2 class="section-title">為什麼這個設計值得深入研究？</h2>
        <div class="value-cards">
          <div class="value-card" *ngFor="let v of values">
            <div class="value-icon">{{ v.icon }}</div>
            <div class="value-title">{{ v.title }}</div>
            <div class="value-desc">{{ v.desc }}</div>
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
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .section-title { font-size:1.25rem; font-weight:800; color:var(--text-primary); margin-bottom:20px; padding-bottom:10px; border-bottom:2px solid var(--border-color); }
    .section-desc { color:var(--text-secondary); font-size:0.88rem; margin-bottom:20px; }

    .concept-card {
      display:flex; gap:20px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:24px;
      .concept-icon { font-size:2rem; flex-shrink:0; }
      .concept-body {
        h3 { font-size:1rem; font-weight:700; color:var(--text-primary); margin-bottom:12px; }
        p { font-size:0.88rem; color:var(--text-secondary); line-height:1.7; margin-bottom:12px; }
        ul { padding-left:20px; }
        li { font-size:0.85rem; color:var(--text-secondary); margin-bottom:6px; line-height:1.6; }
        strong { color:var(--text-primary); }
      }
    }

    /* Overlay Diagram */
    .overlay-diagram {
      display:flex; flex-direction:column; gap:0; align-items:center;
    }

    .overlay-layer {
      width:100%; border-radius:var(--radius-md); padding:20px 24px;
      .layer-label { font-family:var(--font-mono); font-size:0.75rem; font-weight:700; margin-bottom:12px; text-transform:uppercase; letter-spacing:.08em; }
      .layer-files { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:10px; }
      .layer-note { font-size:0.78rem; color:var(--text-muted); font-style:italic; }
    }

    .real-fs { background:linear-gradient(135deg,rgba(0,212,170,.08),rgba(92,138,255,.08)); border:1px solid rgba(0,212,170,.25); .layer-label { color:rgba(0,212,170,.8); } }
    .overlay-fs { background:linear-gradient(135deg,rgba(255,209,102,.08),rgba(255,140,66,.08)); border:1px solid rgba(255,209,102,.3); .layer-label { color:rgba(255,209,102,.9); } }
    .model-layer { background:linear-gradient(135deg,rgba(124,92,252,.08),rgba(167,139,250,.08)); border:1px solid rgba(124,92,252,.25); .layer-label { color:rgba(167,139,250,.9); } }

    .file-chip { background:var(--bg-tertiary); border:1px solid var(--border-color); border-radius:6px; padding:4px 10px; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-secondary); }
    .file-modified { border-color:rgba(255,209,102,.5); color:rgba(255,209,102,.9); }
    .file-new { border-color:rgba(0,212,170,.5); color:rgba(0,212,170,.9); }

    .spec-item { font-size:0.82rem; color:var(--text-secondary); padding:6px 10px; border-radius:6px; margin-bottom:4px; }
    .spec-active { background:rgba(255,209,102,.12); color:rgba(255,209,102,.9); border:1px solid rgba(255,209,102,.3); }
    .spec-pending { opacity:.5; }

    .overlay-arrow-up, .overlay-arrow-down {
      display:flex; flex-direction:column; align-items:center; padding:12px 0; width:100%;
      .arrow-line { width:2px; height:24px; background:var(--border-accent); }
      .arrow-labels { display:flex; gap:20px; margin-top:4px; }
      .label-confirm { font-size:0.75rem; color:rgba(0,212,170,.8); }
      .label-reject { font-size:0.75rem; color:rgba(255,77,109,.8); }
      .label-read { font-size:0.75rem; color:var(--text-muted); margin-top:4px; }
    }

    /* Timeline */
    .timeline-comparison { display:flex; flex-direction:column; gap:24px; }
    .timeline-block {
      background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:20px 24px;
      .timeline-title { font-size:0.88rem; font-weight:700; color:var(--text-secondary); margin-bottom:16px; }
    }
    .timeline-block--opt { border-color:rgba(0,212,170,.3); background:linear-gradient(135deg,rgba(0,212,170,.04),var(--bg-card)); }
    .timeline-track { display:flex; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px; }
    .tl-step { background:var(--bg-tertiary); border:1px solid var(--border-color); border-radius:8px; padding:10px 14px; font-size:0.75rem; text-align:center; color:var(--text-secondary); line-height:1.4; }
    .tl-model { border-color:rgba(124,92,252,.4); color:rgba(167,139,250,.9); }
    .tl-wait { border-color:rgba(255,209,102,.4); color:rgba(255,209,102,.9); }
    .tl-exec { border-color:rgba(0,212,170,.4); color:rgba(0,212,170,.9); }
    .tl-instant { background:rgba(0,212,170,.08); }
    .tl-arrow { color:var(--text-muted); font-size:1.1rem; }
    .sub-note { display:block; font-size:0.68rem; color:rgba(0,212,170,.8); margin-top:3px; }
    .timeline-total { font-size:0.78rem; color:var(--text-muted); font-style:italic; }
    .timeline-total--opt { color:rgba(0,212,170,.8); }

    /* Flow Steps */
    .flow-steps { display:flex; flex-direction:column; gap:0; }
    .flow-step {
      display:flex; gap:16px; padding:20px 0; border-bottom:1px solid var(--border-color);
      &:last-child { border-bottom:none; }
      .flow-num { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,rgba(255,209,102,.2),rgba(255,140,66,.2)); border:1px solid rgba(255,209,102,.4); display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-size:0.8rem; font-weight:700; color:rgba(255,209,102,.9); flex-shrink:0; }
      .flow-content {
        .flow-title { font-size:0.95rem; font-weight:700; color:var(--text-primary); margin-bottom:6px; }
        .flow-desc { font-size:0.84rem; color:var(--text-secondary); line-height:1.6; }
        .flow-code { margin-top:10px; pre { background:var(--bg-tertiary); border:1px solid var(--border-color); border-radius:8px; padding:12px 16px; font-size:0.78rem; color:var(--text-secondary); font-family:var(--font-mono); overflow-x:auto; margin:0; white-space:pre-wrap; } }
      }
    }

    /* Outcome Grid */
    .outcome-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
    .outcome-card { border-radius:var(--radius-md); padding:24px; }
    .outcome-confirm { background:linear-gradient(135deg,rgba(0,212,170,.06),var(--bg-card)); border:1px solid rgba(0,212,170,.25); }
    .outcome-reject { background:linear-gradient(135deg,rgba(255,77,109,.06),var(--bg-card)); border:1px solid rgba(255,77,109,.25); }
    .outcome-header { display:flex; align-items:center; gap:10px; margin-bottom:16px; .outcome-icon { font-size:1.3rem; } .outcome-title { font-size:0.95rem; font-weight:700; color:var(--text-primary); } }
    .outcome-steps { padding-left:20px; margin-bottom:16px; li { font-size:0.83rem; color:var(--text-secondary); margin-bottom:8px; line-height:1.6; } strong { color:var(--text-primary); } }
    .outcome-result { font-size:0.8rem; font-weight:700; padding:8px 14px; border-radius:8px; text-align:center; }
    .outcome-result--success { background:rgba(0,212,170,.12); color:rgba(0,212,170,.9); }
    .outcome-result--reject { background:rgba(255,77,109,.12); color:rgba(255,77,109,.9); }

    /* Tech Grid */
    .tech-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; }
    .tech-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:20px; text-align:center; .tech-icon { font-size:1.8rem; margin-bottom:10px; } .tech-title { font-size:0.88rem; font-weight:700; color:var(--text-primary); margin-bottom:6px; } .tech-desc { font-size:0.78rem; color:var(--text-secondary); line-height:1.5; } }

    /* Security Note */
    .security-note { display:flex; gap:20px; background:linear-gradient(135deg,rgba(255,140,66,.06),var(--bg-card)); border:1px solid rgba(255,140,66,.25); border-radius:var(--radius-md); padding:24px; .sn-icon { font-size:2rem; flex-shrink:0; } .sn-body { h3 { font-size:1rem; font-weight:700; color:var(--text-primary); margin-bottom:10px; } p { font-size:0.85rem; color:var(--text-secondary); line-height:1.7; margin-bottom:10px; } ul { padding-left:20px; } li { font-size:0.83rem; color:var(--text-secondary); margin-bottom:6px; } strong { color:var(--text-primary); } } }

    /* Value Cards */
    .value-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; }
    .value-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:20px; .value-icon { font-size:1.5rem; margin-bottom:10px; } .value-title { font-size:0.9rem; font-weight:700; color:var(--text-primary); margin-bottom:8px; } .value-desc { font-size:0.8rem; color:var(--text-secondary); line-height:1.6; } }

    @media (max-width:640px) {
      .chapter-hero { padding-left:16px; padding-right:16px; }
      .ch-section { padding-left:16px; padding-right:16px; }
      .outcome-grid { grid-template-columns:1fr; }
      .timeline-track { flex-direction:column; align-items:flex-start; }
    }
  `]
})
export class SpeculativeExecComponent {

  flowSteps = [
    {
      title: '模型生成操作建議',
      desc: '模型輸出一個或多個操作建議（如修改某個文件），並將其加入投機執行佇列。',
      code: null
    },
    {
      title: '初步安全審查',
      desc: 'Settings 規則 + YOLO 分類器 + Bash 安全掃描依次通過後，操作被標記為「可投機執行」。',
      code: null
    },
    {
      title: '在 Overlay FS 中預執行',
      desc: '系統在臨時 Overlay 目錄中執行所有寫操作（Write / Edit / Bash），讀操作穿透 Overlay 層讀取真實 FS（Union Read）。',
      code: `// 偽代碼示意
const overlay = createOverlayFS(realFS, tempDir);
await tool.execute({ fs: overlay });
speculativeResults.set(opId, overlay.diff());`
    },
    {
      title: '展示給用戶確認',
      desc: '系統將預執行結果（diff、影響的文件列表）展示給用戶，等待確認。與此同時，N+1 操作已在新的 Overlay 層開始投機執行。',
      code: null
    },
    {
      title: '確認 → Copy-up 或 拒絕 → Drop',
      desc: '用戶確認後執行 Copy-up，將 Overlay 層的 diff 應用到真實 FS；用戶拒絕後直接丟棄臨時目錄，真實 FS 完全不受影響。',
      code: `if (confirmed) {
  overlay.copyUpToReal();   // 瞬間完成
  changelog.record(diff);   // 記錄用於壓縮恢復
} else {
  overlay.drop();           // rm -rf tempDir
  pipeline.cancelNext();    // 取消後續投機任務
}`
    },
    {
      title: '流水線繼續下一步',
      desc: '確認完成後，用戶幾乎立即看到 N+1 步的結果（因為 N+1 已在背景預執行完成），整個流程如同無縫流水線。',
      code: null
    }
  ];

  techDetails = [
    {
      icon: '📂',
      title: 'Union Read',
      desc: '讀操作同時看到 Overlay 層和真實 FS，Overlay 優先，確保模型能看到自己已投機執行的結果。'
    },
    {
      icon: '🔒',
      title: 'Write Isolation',
      desc: '所有寫操作只能在 Overlay 臨時目錄中進行，真實 FS 在用戶確認前處於完全只讀狀態。'
    },
    {
      icon: '⚡',
      title: 'Pipeline 並行',
      desc: '用戶審核第 N 步的同時，第 N+1 步在不同 Overlay 實例中並行投機執行，完全無阻塞。'
    },
    {
      icon: '🔄',
      title: 'Diff 追蹤',
      desc: 'Overlay 層記錄完整的文件 diff，確認時只需 apply diff，速度極快，不需重新執行操作。'
    },
    {
      icon: '📝',
      title: 'Changelog 記錄',
      desc: 'Copy-up 後，系統記錄文件變更日誌，供四級壓縮體系在上下文壓縮後智能恢復最近修改的文件。'
    },
    {
      icon: '🚫',
      title: 'Cancel 機制',
      desc: '用戶拒絕時，除了丟棄當前 Overlay，還會取消佇列中尚未完成的後續投機執行任務，避免資源浪費。'
    }
  ];

  values = [
    {
      icon: '⚡',
      title: '極致延遲隱藏',
      desc: '將用戶等待時間從「生成 + 執行 + 等待」壓縮到近乎「確認即完成」，大幅改善互動體驗。'
    },
    {
      icon: '🛡️',
      title: '零副作用回滾',
      desc: 'Overlay 隔離確保拒絕操作時不留下任何痕跡，這是 AI 系統中難得的「可安全試錯」設計。'
    },
    {
      icon: '🏭',
      title: '類 CPU 工程思維',
      desc: '將 CPU 分支預測 + 指令流水線的思想移植到 AI 工具呼叫層，是跨域工程創新的典型案例。'
    },
    {
      icon: '📚',
      title: '值得借鑒的模式',
      desc: '任何需要「人工審核 + 批量操作」的 AI 系統都可以借鑒此模式，不只限於程式碼 Agent。'
    }
  ];
}
