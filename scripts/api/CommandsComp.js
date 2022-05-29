import { world as World } from "mojang-minecraft";

export function CommandsComponent(command) {
  const Overworld = World.getDimension("overworld");

  let cmd = Overworld.runCommand(command);
  let comp = JSON.stringify(cmd)
    .replace(/"/g, "'")
    .replace(/:/g, ": §9")
    .replace(/,/g, "\n§8: §a")
    .replace("}", "§r")
    .replace("{", "\n§8: §a");

  return `Command: '§g${command}§r'\nComponents: {${comp}\n}`;
}
