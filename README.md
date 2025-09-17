# GitVan Next.js GitHub Pack

This pack demonstrates GitVan's job-only architecture, designed for GitHub distribution and giget integration.

## Features

- **Job-Only Architecture**: Only 4 files total
- **GitHub Distribution**: Pack can be pulled using giget
- **Two Jobs**: 
  - `create-next-app` - Creates Next.js project structure
  - `start-next-app` - Installs dependencies and starts dev server

## Usage

```bash
# Pull the pack using giget
npx giget@latest github:seanchatmangpt/gitvan-nextjs-pack

# Run the creation job
gitvan job create-next-app --projectName my-app

# Run the startup job
gitvan job start-next-app --projectName my-app
```

## Pack Structure

```
nextjs-github-pack/
├── pack.json              # Pack manifest
├── README.md              # This file
├── create-next-app.job.mjs # Project creation job
└── start-next-app.job.mjs  # Startup job
```

This pack showcases how GitVan can distribute automation packs via GitHub and giget, enabling remote pack installation and execution with minimal files.