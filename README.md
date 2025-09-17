# GitVan Next.js GitHub Pack

This pack demonstrates GitVan's job-only architecture with Nunjucks templates, designed for GitHub distribution and giget integration.

## Features

- **Job-Only Architecture**: No React/Next.js files in the pack, only jobs and templates
- **Nunjucks Templates**: Dynamic template rendering with variables
- **GitHub Distribution**: Pack can be pulled using giget
- **Two Jobs**: 
  - `nextjs:create-project` - Creates project structure
  - `nextjs:startup` - Installs dependencies and starts dev server

## Usage

```bash
# Pull the pack using giget
npx giget@latest github:your-username/gitvan-nextjs-pack

# Run the creation job
gitvan job nextjs:create-project --projectName my-app

# Run the startup job
gitvan job nextjs:startup --projectName my-app
```

## Pack Structure

```
nextjs-github-pack/
├── pack.json              # Pack manifest
├── jobs/
│   ├── create-project.mjs # Project creation job
│   └── startup.mjs        # Startup job
└── templates/
    ├── README.md.njk      # Project README template
    ├── package.json.njk   # Package.json template
    ├── next.config.js.njk # Next.js config template
    ├── tsconfig.json.njk  # TypeScript config template
    ├── .gitignore.njk     # Git ignore template
    └── src-app-page.tsx.njk # Home page template
```

## Template Variables

- `{{ projectName }}` - Project name
- `{{ projectVersion }}` - Project version
- `{{ nextVersion }}` - Next.js version
- `{{ reactVersion }}` - React version
- `{{ gitvanVersion }}` - GitVan version
- `{{ now }}` - Current timestamp

This pack showcases how GitVan can distribute automation packs via GitHub and giget, enabling remote pack installation and execution.
