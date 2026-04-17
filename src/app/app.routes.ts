import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features/features.component').then(m => m.FeaturesComponent)
  },
  {
    path: 'architecture',
    loadComponent: () => import('./pages/architecture/architecture.component').then(m => m.ArchitectureComponent)
  },
  {
    path: 'tools',
    loadComponent: () => import('./pages/tools/tools.component').then(m => m.ToolsComponent)
  },
  {
    path: 'technologies',
    loadComponent: () => import('./pages/technologies/technologies.component').then(m => m.TechnologiesComponent)
  },
  {
    path: 'local-deploy',
    loadComponent: () => import('./pages/local-deploy/local-deploy.component').then(m => m.LocalDeployComponent)
  },
  {
    path: 'flow',
    loadComponent: () => import('./pages/flow/flow.component').then(m => m.FlowComponent)
  },
  {
    path: 'token',
    loadComponent: () => import('./pages/token/token.component').then(m => m.TokenComponent)
  },
  {
    path: 'execution',
    loadComponent: () => import('./pages/execution/execution.component').then(m => m.ExecutionComponent)
  },
  {
    path: 'deep-dive',
    loadComponent: () => import('./pages/deep-dive/deep-dive-layout.component').then(m => m.DeepDiveLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/deep-dive/deep-dive-index.component').then(m => m.DeepDiveIndexComponent)
      },
      {
        path: 'agent-loop',
        loadComponent: () => import('./pages/deep-dive/chapters/agent-loop/agent-loop.component').then(m => m.AgentLoopComponent)
      },
      {
        path: 'tool-design',
        loadComponent: () => import('./pages/deep-dive/chapters/tool-design/tool-design.component').then(m => m.ToolDesignComponent)
      },
      {
        path: 'concurrency',
        loadComponent: () => import('./pages/deep-dive/chapters/concurrency/concurrency.component').then(m => m.ConcurrencyComponent)
      },
      {
        path: 'cache-split',
        loadComponent: () => import('./pages/deep-dive/chapters/cache-split/cache-split.component').then(m => m.CacheSplitComponent)
      },
      {
        path: 'retrieval',
        loadComponent: () => import('./pages/deep-dive/chapters/retrieval/retrieval.component').then(m => m.RetrievalComponent)
      },
      {
        path: 'memory',
        loadComponent: () => import('./pages/deep-dive/chapters/memory/memory.component').then(m => m.MemoryComponent)
      },
      {
        path: 'compression',
        loadComponent: () => import('./pages/deep-dive/chapters/compression/compression.component').then(m => m.CompressionComponent)
      },
      {
        path: 'security',
        loadComponent: () => import('./pages/deep-dive/chapters/security/security.component').then(m => m.SecurityComponent)
      },
      {
        path: 'mcp',
        loadComponent: () => import('./pages/deep-dive/chapters/mcp/mcp.component').then(m => m.McpComponent)
      },
      {
        path: 'hooks',
        loadComponent: () => import('./pages/deep-dive/chapters/hooks/hooks.component').then(m => m.HooksComponent)
      },
      {
        path: 'sub-agent',
        loadComponent: () => import('./pages/deep-dive/chapters/sub-agent/sub-agent.component').then(m => m.SubAgentComponent)
      },
      {
        path: 'speculative-exec',
        loadComponent: () => import('./pages/deep-dive/chapters/speculative-exec/speculative-exec.component').then(m => m.SpeculativeExecComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
