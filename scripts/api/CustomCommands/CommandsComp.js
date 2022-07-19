import { world as World } from "mojang-minecraft";

export function CommandsComponent(command, player) {
  const Overworld = World.getDimension("overworld");

  let comp = "";
  try {
    let cmd = player.runCommand(command);
    Object.keys(cmd).forEach((key) => {
      comp += `\n| §c${key} §8${typeof cmd[key]}: §3${
        typeof cmd[key] == "object" ? JSON.stringify(cmd[key]) : cmd[key]
      }§r`;
    });
    return `Command Components [Success]:\n'§g${command}§r'\nComponents: {${comp}\n}`;
  } catch (error) {
    let err = JSON.parse(error);
    Object.keys(err).forEach((key) => {
      comp += `\n| §c${key} §8${typeof err[key]}: §3${
        typeof err[key] == "object" ? JSON.stringify(err[key]) : err[key]
      }§r`;
    });
    return `Command Components [Error]:\n'§g${command}§r'\nComponents: {${comp}\n}`;
  }
}
