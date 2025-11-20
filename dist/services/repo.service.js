import { logger, runCommand } from "@appneural/cli-shared";
export async function createRepo(name) {
    logger.info(`APPNEURAL repo create placeholder for ${name} (TODO: GitHub API call)`);
}
export async function cloneRepo(name) {
    const repoUrl = `https://github.com/APPNEURAL/${name}.git`;
    await runCommand("git", ["clone", repoUrl], { cwd: process.cwd(), capture: false });
    logger.success(`APPNEURAL repository cloned from ${repoUrl}`);
}
export async function linkRepo() {
    logger.info("APPNEURAL repo link placeholder (TODO: Git remote wiring)");
}
export async function listRepos() {
    logger.info("APPNEURAL repo list placeholder (TODO: GitHub API fetch)");
    return ["appneural-platform", "appneural-admin", "appneural-services"];
}
//# sourceMappingURL=repo.service.js.map