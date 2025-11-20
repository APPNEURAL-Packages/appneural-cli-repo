import { Command } from "commander";
import { registerRepoCommands } from "./commands/repo.js";

export default function register(program: Command): void {
  registerRepoCommands(program);
}
