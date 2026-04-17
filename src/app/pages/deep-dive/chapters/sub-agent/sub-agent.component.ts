import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-agent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chapter-hero">
      <span class="chapter-num">Chapter 11</span>
      <h1>Sub-Agent · 多層代理架構</h1>
      <p>Claude Code 如何生成子 Agent、委派任務、隔離執行環境，並安全地傳遞權限</p>
      <div class="hero-tags">
        <span class="htag">src/tools/AgentTool/</span>
        <span class="htag">Worktree 隔離</span>
        <span class="htag">並行/串列執行</span>
        <span class="htag">權限降級委派</span>
      </div>
    </div>

    <!-- ① 概念比喻 -->
    <section class="ch-section">
      <div class="ch-section-header">
        <span class="csh-num">01</span>
        <div><h2>Sub-Agent 是什麼？</h2><p>把複雜任務分包給專業助手</p></div>
      </div>
      <div class="analogy-row">
        <div class="ar-card main-card">
          <div class="arc-icon">👔</div>
          <div class="arc-title">主 Agent（你）</div>
          <div class="arc-desc">負責規劃與協調，把複雜任務拆分後分派給子 Agent，最後整合結果</div>
          <div class="arc-badge main-badge">Main Thread</div>
        </div>
        <div class="ar-arrows">
          <div class="ara-line"></div>
          <div class="ara-label">AgentTool.call()</div>
          <div class="ara-line"></div>
        </div>
        <div class="ar-subs">
          <div class="arc-card sub-card" *ngFor="let s of subExamples; let i = index" [style.animationDelay]="i*0.1+'s'">
            <div class="arcc-color" [style.background]="s.color"></div>
            <div class="arcc-icon">{{ s.icon }}</div>
            <div class="arcc-title">{{ s.title }}</div>
            <div class="arcc-desc">{{ s.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ② AgentTool 輸入參數 -->
    <section class="ch-section ch-section--dark">
      <div class="ch-section-header">
        <span class="csh-num">02</span>
        <div><h2>AgentTool 完整參數</h2><p>每個參數都是一個重要的設計決策</p></div>
      </div>
      <div class="params-table">
        <div class="pt-header">
          <span>參數</span><span>類型</span><span>說明</span><span>重要性</span>
        </div>
        <div class="pt-row" *ngFor="let p of agentParams">
          <span class="ptr-name"><code>{{ p.name }}</code></span>
          <span class="ptr-type" [style.color]="p.typeColor">{{ p.type }}</span>
          <span class="ptr-desc">{{ p.desc }}</span>
          <span class="ptr-level" [style.background]="p.level==='必填'?'rgba(255,77,109,.15)':'rgba(92,138,255,.1)'" [style.color]="p.level==='必填'?'#ff4d6d':'#5c8aff'">{{ p.level }}</span>
        </div>
      </div>
    </section>

    <!-- ③ 執行模式 — CSS 動畫 -->
    <section class="ch-section">
      <div class="ch-section-header">
        <span class="csh-num">03</span>
        <div><h2>執行模式：同步 vs 非同步</h2><p>根據任務特性選擇合適的執行方式</p></div>
      </div>
      <div class="exec-modes">
        <div class="em-card sync-em">
          <div class="emc-title">🔒 Foreground (同步)</div>
          <div class="emc-timeline">
            <div class="emct-row main-row">
              <span class="emctr-label">主 Agent</span>
              <div class="emctr-bar main-bar">執行中</div>
              <div class="emctr-wait">等待...</div>
              <div class="emctr-resume main-bar">繼續</div>
            </div>
            <div class="emct-row sub-row">
              <span class="emctr-label">Sub Agent</span>
              <div class="emctr-empty"></div>
              <div class="emctr-bar sub-bar-anim">執行任務</div>
            </div>
          </div>
          <ul class="emc-points">
            <li>主 Agent 阻塞等待子 Agent 完成</li>
            <li>實時看到子 Agent 輸出</li>
            <li>適合：需要子任務結果才能繼續的場景</li>
          </ul>
        </div>
        <div class="em-card async-em">
          <div class="emc-title">⚡ Background (非同步)</div>
          <div class="emc-timeline">
            <div class="emct-row main-row">
              <span class="emctr-label">主 Agent</span>
              <div class="emctr-bar main-bar" style="flex:3">繼續執行其他任務...</div>
            </div>
            <div class="emct-row sub-row">
              <span class="emctr-label">Sub-A</span>
              <div class="emctr-bar sub-bar-anim" style="flex:2">任務A</div>
            </div>
            <div class="emct-row sub-row" style="animation-delay:.2s">
              <span class="emctr-label">Sub-B</span>
              <div class="emctr-empty" style="flex:.3"></div>
              <div class="emctr-bar sub-bar-anim" style="flex:2.5">任務B</div>
            </div>
          </div>
          <ul class="emc-points">
            <li>主 Agent 繼續執行，子任務背景運行</li>
            <li>透過 TaskListTool 查詢進度</li>
            <li>適合：可並行的獨立任務</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ④ 隔離模式 -->
    <section class="ch-section ch-section--dark">
      <div class="ch-section-header">
        <span class="csh-num">04</span>
        <div><h2>3 種隔離模式</h2><p>控制子 Agent 的執行環境</p></div>
      </div>
      <div class="isolation-cards">
        <div class="ic-card" *ngFor="let iso of isolationModes">
          <div class="icc-header" [style.borderColor]="iso.color+'44'" [style.background]="iso.color+'0d'">
            <span class="icch-icon">{{ iso.icon }}</span>
            <div>
              <div class="icch-name" [style.color]="iso.color">{{ iso.name }}</div>
              <div class="icch-param"><code>isolation: "{{ iso.param }}"</code></div>
            </div>
          </div>
          <div class="icc-body">
            <div class="iccb-desc">{{ iso.desc }}</div>
            <div class="iccb-flow">
              <div class="iccbf-step" *ngFor="let s of iso.steps">{{ s }}</div>
            </div>
            <div class="iccb-use">適用：{{ iso.use }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑤ 權限降級 -->
    <section class="ch-section">
      <div class="ch-section-header">
        <span class="csh-num">05</span>
        <div><h2>權限降級委派</h2><p>子 Agent 的權限只能小於等於父 Agent</p></div>
      </div>
      <div class="permission-hierarchy">
        <div class="ph-visual">
          <div class="phv-level" *ngFor="let l of permHierarchy; let i = index"
               [style.width]="(100-i*15)+'%'"
               [style.borderColor]="l.color+'44'"
               [style.background]="l.color+'0d'">
            <div class="phvl-label" [style.color]="l.color">{{ l.label }}</div>
            <div class="phvl-mode">{{ l.mode }}</div>
            <div class="phvl-tools">{{ l.tools }}</div>
          </div>
        </div>
        <div class="ph-modes">
          <div class="phm-card" *ngFor="let m of permModes">
            <div class="phmc-name" [style.color]="m.color">{{ m.name }}</div>
            <div class="phmc-desc">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑥ Fork 機制 -->
    <section class="ch-section ch-section--dark">
      <div class="ch-section-header">
        <span class="csh-num">06</span>
        <div><h2>Fork 機制 — 共享 Prompt Cache</h2><p>最高效的子 Agent 模式</p></div>
      </div>
      <div class="fork-explain">
        <div class="fe-left">
          <div class="fel-title">什麼是 Fork？</div>
          <div class="fel-desc">
            當省略 <code>subagent_type</code> 參數時，觸發隱式 Fork 模式。
            子 Agent 繼承父 Agent 的<strong>完整對話歷史</strong>，
            利用 Prompt Cache 共享已計算的 KV Cache，
            大幅降低 Token 成本。
          </div>
          <div class="fel-stats">
            <div class="fels-item">
              <div class="felsi-num">~90%</div>
              <div class="felsi-label">輸入 Token 費用節省</div>
            </div>
            <div class="fels-item">
              <div class="felsi-num">&lt;100ms</div>
              <div class="felsi-label">額外啟動延遲</div>
            </div>
          </div>
        </div>
        <div class="fe-right">
          <div class="fer-diagram">
            <div class="ferd-parent">
              <span>父 Agent Context</span>
              <div class="ferdp-cached">Cached ✓</div>
            </div>
            <div class="ferd-arrow">↓ fork()</div>
            <div class="ferd-child">
              <div class="ferdc-share">
                <span>共享 KV Cache</span>
                <span class="ferdc-free">Free</span>
              </div>
              <div class="ferdc-new">+ 新的子任務 prompt</div>
            </div>
          </div>
          <div class="fer-rule">⚠️ 防止遞迴：自動偵測 Fork 樣板，避免無限自我複製</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .chapter-hero {
      padding:48px 40px 40px; border-bottom:1px solid var(--border-color);
      background:radial-gradient(ellipse 70% 50% at 50% 100%, rgba(124,92,252,.1) 0%, transparent 70%);
      .chapter-num { font-family:var(--font-mono); font-size:.72rem; font-weight:700; color:#a78bfa; text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:12px; }
      h1 { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin-bottom:12px; background:linear-gradient(135deg,#a78bfa,#7c5cfc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      p { color:var(--text-secondary); font-size:.95rem; margin-bottom:20px; }
    }
    .hero-tags { display:flex; flex-wrap:wrap; gap:8px; }
    .htag { font-family:var(--font-mono); font-size:.7rem; background:rgba(124,92,252,.1); border:1px solid rgba(124,92,252,.25); color:#a78bfa; padding:3px 10px; border-radius:4px; }
    .ch-section { padding:48px 40px; border-bottom:1px solid var(--border-color); }
    .ch-section--dark { background:rgba(255,255,255,.01); }
    .ch-section-header { display:flex; gap:20px; align-items:flex-start; margin-bottom:32px; }
    .csh-num { font-family:var(--font-mono); font-size:.65rem; font-weight:800; color:var(--text-muted); background:rgba(255,255,255,.04); border:1px solid var(--border-color); padding:4px 10px; border-radius:6px; flex-shrink:0; margin-top:4px; }
    .ch-section-header h2 { font-size:1.3rem; font-weight:800; margin-bottom:4px; }
    .ch-section-header p { font-size:.85rem; color:var(--text-secondary); margin:0; }

    /* ── ANALOGY ── */
    .analogy-row { display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap; }
    .ar-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:16px; padding:24px; .arc-icon { font-size:2rem; margin-bottom:10px; } .arc-title { font-size:1rem; font-weight:700; margin-bottom:6px; } .arc-desc { font-size:.82rem; color:var(--text-secondary); line-height:1.6; margin-bottom:12px; } }
    .main-card { border-color:rgba(124,92,252,.35); min-width:180px; }
    .arc-badge { font-size:.65rem; font-weight:700; padding:3px 10px; border-radius:100px; }
    .main-badge { background:rgba(124,92,252,.15); color:#7c5cfc; border:1px solid rgba(124,92,252,.3); }
    .ar-arrows { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:20px 0; .ara-line { width:2px; height:30px; background:linear-gradient(180deg,#7c5cfc,transparent); } .ara-label { font-size:.7rem; color:var(--text-muted); white-space:nowrap; } }
    .ar-subs { display:flex; flex-direction:column; gap:10px; flex:1; }
    .arc-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:14px 16px; display:flex; gap:10px; align-items:center; animation:fadeUp .4s ease both; transition:all .2s; &:hover { transform:translateX(4px); } }
    @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    .arcc-color { width:4px; border-radius:2px; align-self:stretch; }
    .arcc-icon { font-size:1.2rem; } .arcc-title { font-size:.82rem; font-weight:700; margin-bottom:2px; } .arcc-desc { font-size:.75rem; color:var(--text-secondary); }

    /* ── PARAMS TABLE ── */
    .params-table { background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; overflow:hidden; }
    .pt-header { display:grid; grid-template-columns:1.5fr 1fr 3fr .7fr; padding:12px 20px; background:rgba(255,255,255,.02); border-bottom:1px solid var(--border-color); font-size:.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:.06em; }
    .pt-row { display:grid; grid-template-columns:1.5fr 1fr 3fr .7fr; padding:12px 20px; border-bottom:1px solid rgba(255,255,255,.04); align-items:center; &:last-child { border-bottom:none; } &:hover { background:rgba(255,255,255,.015); } }
    .ptr-name code { font-family:var(--font-mono); font-size:.78rem; color:#5c8aff; }
    .ptr-type { font-family:var(--font-mono); font-size:.72rem; }
    .ptr-desc { font-size:.82rem; color:var(--text-secondary); }
    .ptr-level { font-size:.65rem; font-weight:700; padding:2px 8px; border-radius:4px; text-align:center; }

    /* ── EXEC MODES ── */
    .exec-modes { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
    .em-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; overflow:hidden; }
    .emc-title { padding:14px 20px; font-size:.85rem; font-weight:700; border-bottom:1px solid var(--border-color); &.sync-em .emc-title { /* handled below */ } }
    .sync-em .emc-title { color:#5c8aff; background:rgba(92,138,255,.08); }
    .async-em .emc-title { color:#00d4aa; background:rgba(0,212,170,.08); }
    .emc-timeline { padding:20px; display:flex; flex-direction:column; gap:10px; }
    .emct-row { display:flex; align-items:center; gap:6px; }
    .emctr-label { font-size:.68rem; color:var(--text-muted); width:60px; flex-shrink:0; text-align:right; }
    .emctr-bar { font-size:.72rem; font-weight:700; padding:6px 10px; border-radius:6px; text-align:center; flex:1; }
    .emctr-empty { flex:.5; }
    .emctr-wait { flex:.5; font-size:.68rem; color:var(--text-muted); text-align:center; }
    .emctr-resume { flex:.5; }
    .main-bar { background:rgba(92,138,255,.2); color:#5c8aff; border:1px solid rgba(92,138,255,.3); }
    .main-row { } .sub-row { animation:slideIn .5s ease both; }
    @keyframes slideIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
    .sub-bar-anim { background:rgba(124,92,252,.15); color:#a78bfa; border:1px solid rgba(124,92,252,.3); animation:barPulse 2s ease infinite; }
    @keyframes barPulse { 0%,100%{opacity:.7} 50%{opacity:1} }
    .emc-points { padding:0 20px 16px; margin:0; display:flex; flex-direction:column; gap:6px; li { font-size:.78rem; color:var(--text-secondary); } }

    /* ── ISOLATION CARDS ── */
    .isolation-cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:16px; }
    .ic-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; overflow:hidden; }
    .icc-header { display:flex; gap:14px; align-items:center; padding:16px 20px; border-bottom:1px solid var(--border-color); .icch-icon { font-size:1.8rem; } .icch-name { font-size:.95rem; font-weight:700; margin-bottom:4px; } .icch-param code { font-family:var(--font-mono); font-size:.7rem; color:var(--text-muted); } }
    .icc-body { padding:16px 20px; .iccb-desc { font-size:.82rem; color:var(--text-secondary); margin-bottom:12px; line-height:1.6; } }
    .iccb-flow { display:flex; flex-direction:column; gap:4px; margin-bottom:12px; }
    .iccbf-step { font-size:.75rem; color:var(--text-secondary); padding:4px 0; border-bottom:1px solid rgba(255,255,255,.04); display:flex; gap:8px; &::before { content:'→'; color:var(--text-muted); } }
    .iccb-use { font-size:.75rem; color:var(--text-muted); font-style:italic; }

    /* ── PERMISSION HIERARCHY ── */
    .permission-hierarchy { display:flex; flex-direction:column; gap:28px; }
    .ph-visual { display:flex; flex-direction:column; align-items:center; gap:8px; }
    .phv-level {
      border:1px solid; border-radius:10px; padding:12px 20px; display:flex; align-items:center; gap:16px; transition:all .3s;
      .phvl-label { font-size:.8rem; font-weight:700; width:120px; flex-shrink:0; }
      .phvl-mode { font-family:var(--font-mono); font-size:.72rem; color:var(--text-secondary); flex:1; }
      .phvl-tools { font-size:.72rem; color:var(--text-muted); }
    }
    .ph-modes { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:10px; }
    .phm-card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:10px; padding:12px 16px; .phmc-name { font-family:var(--font-mono); font-size:.8rem; font-weight:700; margin-bottom:4px; } .phmc-desc { font-size:.75rem; color:var(--text-secondary); } }

    /* ── FORK ── */
    .fork-explain { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
    .fel-title { font-size:1rem; font-weight:700; margin-bottom:10px; }
    .fel-desc { font-size:.85rem; color:var(--text-secondary); line-height:1.7; margin-bottom:20px; code { font-family:var(--font-mono); background:rgba(124,92,252,.1); color:#a78bfa; padding:1px 6px; border-radius:3px; } strong { color:var(--text-primary); } }
    .fel-stats { display:flex; gap:16px; }
    .fels-item { background:rgba(0,212,170,.08); border:1px solid rgba(0,212,170,.2); border-radius:12px; padding:14px 20px; text-align:center; .felsi-num { font-size:1.6rem; font-weight:900; color:#00d4aa; } .felsi-label { font-size:.72rem; color:var(--text-muted); } }
    .fer-diagram { background:var(--bg-card); border:1px solid var(--border-color); border-radius:14px; padding:20px; margin-bottom:12px; }
    .ferd-parent { background:rgba(124,92,252,.1); border:1px solid rgba(124,92,252,.3); border-radius:8px; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; font-size:.82rem; font-weight:700; color:#7c5cfc; margin-bottom:8px; .ferdp-cached { font-size:.72rem; background:rgba(0,212,170,.15); color:#00d4aa; border:1px solid rgba(0,212,170,.3); padding:2px 8px; border-radius:4px; } }
    .ferd-arrow { text-align:center; font-size:.8rem; color:var(--text-muted); padding:6px 0; }
    .ferd-child { border:1px solid var(--border-color); border-radius:8px; padding:12px 16px; display:flex; flex-direction:column; gap:8px; }
    .ferdc-share { display:flex; align-items:center; justify-content:space-between; font-size:.82rem; color:var(--text-secondary); .ferdc-free { font-size:.7rem; background:rgba(0,212,170,.1); color:#00d4aa; border:1px solid rgba(0,212,170,.25); padding:2px 8px; border-radius:4px; font-weight:700; } }
    .ferdc-new { font-size:.78rem; color:#a78bfa; background:rgba(124,92,252,.08); border:1px solid rgba(124,92,252,.2); padding:6px 10px; border-radius:6px; }
    .fer-rule { font-size:.75rem; color:var(--text-muted); background:rgba(255,209,102,.06); border:1px solid rgba(255,209,102,.2); border-radius:8px; padding:8px 12px; }

    @media (max-width:768px) { .ch-section { padding:32px 20px; } .exec-modes,.fork-explain { grid-template-columns:1fr; } .pt-header,.pt-row { grid-template-columns:1fr 1fr; .ptr-desc,.ptr-type { display:none; } } }
  `]
})
export class SubAgentComponent {
  subExamples = [
    { icon:'🔍', color:'#5c8aff', title:'搜尋子 Agent', desc:'專門負責在代碼庫中搜尋相關檔案' },
    { icon:'✏️', color:'#00d4aa', title:'編輯子 Agent', desc:'專注於修改特定模組，隔離風險' },
    { icon:'🧪', color:'#ff8c42', title:'測試子 Agent', desc:'執行測試套件並回報結果' },
    { icon:'📝', color:'#a78bfa', title:'文件子 Agent', desc:'生成或更新技術文件' },
  ];

  agentParams = [
    { name:'prompt', type:'string', typeColor:'#00d4aa', desc:'給子 Agent 的完整指令，描述要完成的任務', level:'必填' },
    { name:'description', type:'string', typeColor:'#00d4aa', desc:'3-5 字的任務摘要，顯示在 UI 進度列', level:'必填' },
    { name:'subagent_type', type:'string', typeColor:'#5c8aff', desc:'代理類型：general-purpose 或自訂 Agent 名稱', level:'選填' },
    { name:'model', type:'enum', typeColor:'#ffd166', desc:'覆蓋模型選擇：sonnet / opus / haiku', level:'選填' },
    { name:'run_in_background', type:'boolean', typeColor:'#ff8c42', desc:'true = 非同步背景執行，false = 阻塞等待', level:'選填' },
    { name:'isolation', type:'enum', typeColor:'#ff4d6d', desc:'隔離模式：worktree（Git 分支）/ remote（雲端）', level:'選填' },
    { name:'cwd', type:'string', typeColor:'#a78bfa', desc:'覆蓋工作目錄，預設繼承父 Agent 的 cwd', level:'選填' },
    { name:'name', type:'string', typeColor:'#a78bfa', desc:'為此 Agent 命名，供 SendMessage 定向通訊使用', level:'選填' },
  ];

  isolationModes = [
    {
      icon:'📂', color:'#5c8aff', name:'無隔離（預設）', param:'(省略)',
      desc:'子 Agent 與父 Agent 共享相同的工作目錄和 Git 狀態，適合低風險任務。',
      steps:['繼承父 Agent 的 cwd', '直接操作同一份代碼', '無需清理步驟'],
      use:'程式碼搜尋、文件生成、低風險修改'
    },
    {
      icon:'🌿', color:'#00d4aa', name:'Worktree 隔離', param:'worktree',
      desc:'為子 Agent 建立獨立的 Git Worktree（臨時分支），修改被隔離，完成後可選擇 merge 或丟棄。',
      steps:['建立臨時 git worktree', '子 Agent 在隔離分支工作', '完成後 commit 修改', '父 Agent 收到 commit hash'],
      use:'高風險重構、實驗性修改、並行開發'
    },
    {
      icon:'☁️', color:'#ff8c42', name:'Remote 隔離', param:'remote',
      desc:'在雲端 CCR (Claude Code Remote) 環境執行，完全隔離的虛擬機，支援更高資源需求。',
      steps:['彈性分配雲端資源', '在獨立 VM 中執行', '結果透過 API 回傳', '自動清理資源'],
      use:'資源密集任務、跨環境測試、超長時間任務'
    },
  ];

  permHierarchy = [
    { color:'#7c5cfc', label:'主 Agent', mode:'ask / auto / plan', tools:'完整工具集' },
    { color:'#5c8aff', label:'子 Agent (bubble)', mode:'繼承，提示轉交主 Agent', tools:'繼承父工具集' },
    { color:'#00d4aa', label:'子 Agent (inherit)', mode:'使用父 Agent 權限規則', tools:'繼承父工具集' },
    { color:'#ff8c42', label:'子 Agent (plan)', mode:'只讀，無法寫入', tools:'限唯讀工具' },
  ];

  permModes = [
    { color:'#5c8aff', name:'bubble', desc:'子 Agent 的權限請求「冒泡」到父 Agent，由用戶在父終端機確認' },
    { color:'#00d4aa', name:'inherit', desc:'子 Agent 直接繼承父 Agent 的 allow/deny 規則，無需重複確認' },
    { color:'#ff8c42', name:'plan', desc:'子 Agent 只能執行唯讀操作，無法修改檔案或執行指令' },
    { color:'#ff4d6d', name:'dontAsk', desc:'遇到需要確認的操作自動拒絕，適合完全自動化的背景任務' },
  ];
}
