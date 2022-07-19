import * as Gametest from "mojang-gametest";
import { world } from "mojang-minecraft";

function print(command, target = "@a") {
  let run = world.getDimension("overworld").runCommand(command);
  let text = JSON.stringify(run)
    .replace(/"/g, "")
    .replace(/:/g, ": §c")
    .replace(/,/g, "\n§8: §a")
    .replace("}", "§r")
    .replace("{", "\n§8: §a");
  world
    .getDimension("overworld")
    .runCommand(
      `tellraw ${target} {"rawtext":[{"text": "Command: §g${command}§r\nData: {${text}\n}"}]}`
    );
}

function commandsOutput() {
  world.events.beforeChat.subscribe((eventData) => {
    if (eventData.message.startsWith("!cmd")) {
      eventData.cancel = true;
      let command = eventData.message.replace("!cmd ", "");
      print(command);
    }
  });
}
