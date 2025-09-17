import { defineJob } from "../../../src/core/job-registry.mjs";
import { createLogger } from "../../../src/utils/logger.mjs";
import { useTemplate } from "../../../src/composables/template.mjs";
import { withGitVan } from "../../../src/core/context.mjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "pathe";

const logger = createLogger("job:nextjs-create-project");

export default defineJob({
  meta: {
    name: "nextjs:create-project",
    description: "Creates a new Next.js project structure using Nunjucks templates from GitHub pack",
    version: "1.0.0",
    category: "scaffolding",
    tags: ["nextjs", "project", "structure", "templates", "github"],
  },
  hooks: ["post-commit", "post-merge"],
  async run(context) {
    logger.info("Creating Next.js project structure with templates from GitHub pack...");
    
    const projectName = context.inputs?.projectName || "my-nextjs-app";
    const projectPath = join(process.cwd(), projectName);
    
    // Create main directories
    const directories = [
      "src/app",
      "src/components", 
      "src/lib",
      "src/styles",
      "public",
      "config"
    ];
    
    for (const dir of directories) {
      mkdirSync(join(projectPath, dir), { recursive: true });
      logger.info("Created directory: " + dir);
    }
    
    // Use GitVan template system to render files
    await withGitVan({ cwd: process.cwd() }, async () => {
      const template = await useTemplate({ 
        paths: [join(dirname(import.meta.url), "../templates")],
        autoescape: false 
      });
      
      // Template context
      const templateContext = {
        projectName,
        projectVersion: "0.1.0",
        nextVersion: "^14.0.0",
        reactVersion: "^18.0.0",
        nodeTypesVersion: "^20.0.0",
        reactTypesVersion: "^18.0.0",
        eslintVersion: "^8.0.0",
        typescriptVersion: "^5.0.0",
        gitvanVersion: "2.0.0",
        now: new Date()
      };
      
      // Render templates
      const readmeContent = template.renderString(
        await import("fs").then(fs => fs.readFileSync(join(dirname(import.meta.url), "../templates/README.md.njk"), "utf8")),
        templateContext
      );
      
      const packageJsonContent = template.renderString(
        await import("fs").then(fs => fs.readFileSync(join(dirname(import.meta.url), "../templates/package.json.njk"), "utf8")),
        templateContext
      );
      
      const nextConfigContent = template.renderString(
        await import("fs").then(fs => fs.readFileSync(join(dirname(import.meta.url), "../templates/next.config.js.njk"), "utf8")),
        templateContext
      );
      
      const tsConfigContent = template.renderString(
        await import("fs").then(fs => fs.readFileSync(join(dirname(import.meta.url), "../templates/tsconfig.json.njk"), "utf8")),
        templateContext
      );
      
      const gitignoreContent = template.renderString(
        await import("fs").then(fs => fs.readFileSync(join(dirname(import.meta.url), "../templates/.gitignore.njk"), "utf8")),
        templateContext
      );
      
      // Write rendered files
      await import("fs").then(fs => {
        fs.writeFileSync(join(projectPath, "README.md"), readmeContent);
        fs.writeFileSync(join(projectPath, "package.json"), packageJsonContent);
        fs.writeFileSync(join(projectPath, "next.config.js"), nextConfigContent);
        fs.writeFileSync(join(projectPath, "tsconfig.json"), tsConfigContent);
        fs.writeFileSync(join(projectPath, ".gitignore"), gitignoreContent);
      });
    });
    
    logger.info("Next.js project structure created successfully with templates from GitHub pack");
    
    return {
      success: true,
      message: "Created Next.js project structure for " + projectName + " using Nunjucks templates from GitHub pack",
      projectPath,
      directories: directories.length,
      templates: 5
    };
  },
});
