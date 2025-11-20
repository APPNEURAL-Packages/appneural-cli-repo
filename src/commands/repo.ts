import { Command } from "commander";
import { logger, withSpinner, input } from "@appneural/cli-shared";
import { withTelemetry } from "@appneural/cli-shared";
import { ValidationError } from "@appneural/cli-shared";
import { cloneRepo, createRepo, linkRepo, listRepos } from "../services/repo.service.js";

export function registerRepoCommands(program: Command): void {
  const repo = program.command("repo").description("APPNEURAL repository automation");

  repo
    .command("create <name>")
    .description("Create a local APPNEURAL repository")
    .action((name: string) =>
      withTelemetry("repo:create", async () => {
        if (!name) {
          throw new ValidationError("APPNEURAL repository name required");
        }
        await withSpinner("Creating APPNEURAL repository", async () => createRepo(name));
        logger.success(`APPNEURAL repository '${name}' requested`);
      })
    );

  repo
    .command("clone <name>")
    .description("Clone an APPNEURAL repository")
    .action((name: string) =>
      withTelemetry("repo:clone", async () => {
        if (!name) {
          throw new ValidationError("APPNEURAL repository name required");
        }
        await withSpinner("Cloning APPNEURAL repository", async () => cloneRepo(name));
        logger.success(`APPNEURAL repository '${name}' cloned`);
      })
    );

  repo
    .command("link")
    .description("Link local workspace to an APPNEURAL repository")
    .action(() =>
      withTelemetry("repo:link", async () => {
        const remote = await input("Enter APPNEURAL remote URL");
        if (!remote) {
          throw new ValidationError("APPNEURAL remote URL required");
        }
        await withSpinner("Linking APPNEURAL repository", async () => linkRepo());
        logger.success(`APPNEURAL workspace linked to ${remote}`);
      })
    );

  repo
    .command("list")
    .description("List APPNEURAL repositories")
    .action(() =>
      withTelemetry("repo:list", async () => {
        const repos = await withSpinner("Enumerating APPNEURAL repositories", listRepos);
        if (repos.length === 0) {
          logger.warn("APPNEURAL repositories directory is empty");
          return;
        }
        repos.forEach((name) => logger.info(`APPNEURAL repo: ${name}`));
      })
    );
}
