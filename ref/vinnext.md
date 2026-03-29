Quick start
vinext includes an Agent Skill that handles migration for you. It works with Claude Code, OpenCode, Cursor, Codex, and dozens of other AI coding tools. Install it, open your Next.js project, and tell the AI to migrate:

npx skills add cloudflare/vinext
Then open your Next.js project in any supported tool and say:

migrate this project to vinext
The skill handles compatibility checking, dependency installation, config generation, and dev server startup. It knows what vinext supports and will flag anything that needs manual attention.

Or do it manually
npm install -D vinext vite @vitejs/plugin-react
If you're using the App Router, also install:

npm install -D @vitejs/plugin-rsc react-server-dom-webpack
Replace next with vinext in your scripts:

{
  "scripts": {
    "dev": "vinext dev",
    "build": "vinext build",
    "start": "vinext start"
  }
}
vinext dev          # Development server with HMR
vinext build        # Production build
vinext deploy       # Build and deploy to Cloudflare Workers
vinext auto-detects your app/ or pages/ directory, loads next.config.js, and configures Vite automatically. No vite.config.ts required for basic usage.

Your existing pages/, app/, next.config.js, and public/ directories work as-is. Run vinext check first to scan for known compatibility issues, or use vinext init to automate the full migration.