// @ts-check
import { world } from "mojang-minecraft";
import { Print } from "../lib/MinecraftFunctions.js";

const WORLD = world.getDimension("overworld");
// @ts-ignore
const SCOREBOARD = world.scoreboard;

/**
 * @param {string} args
 * @param {import("mojang-minecraft").Player} player
 */
export function Warp(args, player) {
  let argument = args.split(" ");
  let act = argument[0];
  let name = argument[1];

  switch (act) {
    case "add" /* Add new warp */:
      let { x, y, z } = player.location;
      WORLD.runCommand(
        `scoreboard players set ${name} warp_x ${Math.floor(x)}`
      );
      WORLD.runCommand(
        `scoreboard players set ${name} warp_y ${Math.floor(y)}`
      );
      WORLD.runCommand(
        `scoreboard players set ${name} warp_z ${Math.floor(z)}`
      );
      Print(
        `Successfully add warp '${name}' with coordinate ${Math.floor(
          x
        )} ${Math.floor(y)} ${Math.floor(z)}`
      );
      break;

    case "config" /* Configurate the warp command */:
      WORLD.runCommand("scoreboard objectives add warp_x dummy");
      WORLD.runCommand("scoreboard objectives add warp_y dummy");
      WORLD.runCommand("scoreboard objectives add warp_z dummy");

      // Say `complete` when done
      Print("Configuration complete");
      break;

    case "list" /* Show list of warp */:
      let warpList = [...SCOREBOARD.getObjective("warp_y").getParticipants()];

      let warpList2 = [];
      for (let warpItem in warpList) {
        let warpName = warpList[warpItem].displayName;
        let xWarp = SCOREBOARD.getObjective("warp_x").getScore(
          warpList[warpItem]
        );
        let yWarp = SCOREBOARD.getObjective("warp_y").getScore(
          warpList[warpItem]
        );
        let zWarp = SCOREBOARD.getObjective("warp_z").getScore(
          warpList[warpItem]
        );
        warpList2.push(`${warpName}: ${xWarp} ${yWarp} ${zWarp}`);
      }

      let message = "Warp List: ";
      for (let item in warpList2) message += `\n${warpList2[item]}`;
      Print(message);
      break;

    case "remove" /* Removing the warp */:
      WORLD.runCommand(`scoreboard players reset ${name} warp_x`);
      WORLD.runCommand(`scoreboard players reset ${name} warp_y`);
      WORLD.runCommand(`scoreboard players reset ${name} warp_z`);
      Print(`Successfully remove warp '${name}'`);
      break;

    case "tp" /* Teleport to specific warp */:
      let warpID = [...SCOREBOARD.getParticipants()].filter(
        (val) => val.displayName === name
      )[0];
      let xWarp = SCOREBOARD.getObjective("warp_x").getScore(warpID);
      let yWarp = SCOREBOARD.getObjective("warp_y").getScore(warpID);
      let zWarp = SCOREBOARD.getObjective("warp_z").getScore(warpID);

      player.runCommand(`tp ${xWarp} ${yWarp} ${zWarp}`);
  }
}
