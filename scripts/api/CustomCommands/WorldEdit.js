//@ts-check
import { world } from "mojang-minecraft";
import * as MinecraftMath from "../MathOperations.js";
import { Print, PrintAction } from "../PrintMessage.js";

let pos1 = "";
let pos2 = "";
let reverse = 0;

/**
 * @param {import('mojang-minecraft').Player} player
 * @param {string} arg
 * @param {string} prefix
 */
export function WorldEditBE(player, arg, prefix) {
  let subcommand = arg.split(" ")[0];
  switch (subcommand) {
    case "pos1" /* Set the first position of an area */:
      let { x: x1, y: y1, z: z1 } = player.location;
      pos1 = `${Math.floor(x1)} ${Math.floor(y1)} ${Math.floor(z1)}`;
      PrintAction(`Successfully set position 1 at ${pos1}`);
      break;

    case "pos2" /* Set the second position of an area */:
      let { x: x2, y: y2, z: z2 } = player.location;
      pos2 = `${Math.floor(x2)} ${Math.floor(y2)} ${Math.floor(z2)}`;
      PrintAction(`Successfully set position 2 at ${pos2}`);
      break;

    case "fill" /* Fill the area with block */:
      // Fill the area
      let blockType = arg.substring(arg.indexOf(" ") + 1);
      let blocks = MinecraftMath.BlocksCounter(pos1, pos2);
      player.runCommand(`fill ${pos1} ${pos2} ${blockType}`);

      // Set the undo
      reverse++;
      player.runCommand(
        `structure save we:undoaction${reverse} ${pos1} ${pos2} memory`
      );

      // Print the result
      PrintAction(`Set ${blocks} blocks with ${blockType.split(" ")[0]}`);
      break;

    case "undo" /* Undo the previous action */:
      // Check if `reverse` is 0
      if (reverse == 0) {
        PrintAction(`There's no action to undo`);
        break;
      }

      // Run the undo
      let lowestCoord = MinecraftMath.MinCoord(pos1, pos2);
      player.runCommand(
        `structure load we:undoaction${reverse} ${lowestCoord}`
      );
      reverse--;

      // Print the result
      PrintAction(`Undo the previous action`);
      break;

    default:
      Print(
        `Subcommand "${subcommand}" on "${prefix}worldedit" is not found. Run "${prefix}help worldedit" to check custom commands`,
        player.name,
        "info",
        "info",
        "yellow",
        "reset"
      );
  }
}
