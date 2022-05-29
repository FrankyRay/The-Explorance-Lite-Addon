//@ts-check
import * as Minecraft from "mojang-minecraft";
import { PrintAction } from "./api/PrintMessage.js";

function welcome(player) {
  console.warn("Start");
  try {
    if (player.hasTag("been") == true) {
      player.runCommand(
        `titleraw @s title {"rawtext":[{"text":"Welcome back to "},{"text":"§oNAME"}]}`
      );
      player.runCommand(
        `titleraw @s subtitle {"rawtext":[{"text":"${player.nameTag}"}]}`
      );
    } else if (player.hasTag("old") == true) {
      player.runCommand(
        `titleraw @s title {"rawtext":[{"text":"Welcome"},{"text":"§oHome"}]}`
      );
      player.runCommand(
        `titleraw @s subtitle {"rawtext":[{"text":"${player.nameTag}"}]}`
      );
    } else {
      player.runCommand(
        `titleraw @s title {"rawtext":[{"text":"Welcome to "},{"text":"§oNAME"}]}`
      );
      player.runCommand(
        `titleraw @s subtitle {"rawtext":[{"text":"${player.nameTag}"}]}`
      );
    }
  } catch (e) {
    console.warn(e);
  }
}

//Joining event control
export function Test() {
  Minecraft.world.events.playerJoin.subscribe((eventData) => {
    let { player } = eventData;
    let event = Minecraft.world.events.tick.subscribe(() => {
      if (!player) {
        Minecraft.world.events.tick.unsubscribe(event);
        return;
      }
      try {
        player.runCommand("testfor @s");
        welcome(player);
        player = null;
      } catch {}
    });
  });
}
