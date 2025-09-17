import { defineJob } from "../../../src/core/job-registry.mjs";
import { createLogger } from "../../../src/utils/logger.mjs";
import { execSync } from "node:child_process";
import { join } from "pathe";
import { existsSync } from "node:fs";

const logger = createLogger("job:start-next-app");

export default defineJob({
  meta: {
    name: "start-next-app",
    description: "Installs dependencies and starts Next.js development server",
    version: "1.0.0",
    category: "development",
    tags: ["nextjs", "startup", "dev-server", "npm"],
  },
  hooks: ["post-commit", "post-merge"],
  async run(context) {
    logger.info("Starting Next.js project setup and development server...");
    
    const projectName = context.inputs?.projectName || "my-nextjs-app";
    const projectPath = join(process.cwd(), projectName);
    
    if (!existsSync(projectPath)) {
      logger.error("Project directory not found: " + projectPath);
      return {
        success: false,
        message: "Project directory not found. Run create-next-app first.",
        projectPath
      };
    }
    
    try {
      // Install dependencies
      logger.info("Installing dependencies...");
      execSync("npm install", { 
        cwd: projectPath, 
        stdio: "inherit" 
      });
      
      // Start development server
      logger.info("Starting Next.js development server...");
      logger.info("🌐 Project will be available at: http://localhost:3000");
      logger.info("📁 Project directory: " + projectPath);
      
      // Start dev server in background
      execSync("npm run dev", { 
        cwd: projectPath, 
        stdio: "inherit",
        detached: true 
      });
      
      logger.success("Next.js development server started successfully!");
      
      return {
        success: true,
        message: "Next.js project started successfully",
        projectPath,
        url: "http://localhost:3000",
        status: "running"
      };
      
    } catch (error) {
      logger.error("Failed to start Next.js project:", error.message);
      return {
        success: false,
        message: "Failed to start Next.js project: " + error.message,
        projectPath,
        error: error.message
      };
    }
  },
});
