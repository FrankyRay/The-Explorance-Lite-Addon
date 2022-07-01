import { world as World } from "mojang-minecraft";

export function CommandsComponent(command) {
  const Overworld = World.getDimension("overworld");

  let cmd = Overworld.runCommand(command);
  let comp = "";
  Object.keys(cmd).forEach((key) => {
    comp += `\n| ${key} §8${typeof cmd[key]}: §9${cmd[key]}§r`;
  });

  return `Command: '§g${command}§r'\nComponents: {${comp}\n}`;
}
