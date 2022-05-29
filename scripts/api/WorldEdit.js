//@ts-check
import { world } from "mojang-minecraft";
import * as MinecraftMath from "./MathOperations.js";
import { Print, PrintAction } from "./PrintMessage.js";

let pos1 = "";
let pos2 = "";
// let reverse = 0;

/**
 * @param {import('mojang-minecraft').Player} player
 * @param {string} arg
 * @param {string} prefix
 */
export function WorldEditBE(player, arg, prefix) {
  let subcommand = arg.split(" ")[0];
  switch (subcommand) {
    case "pos1" || "pos2":
      SetPoint(player, arg);
      break;
    case "set":
      let blockType = arg.substring(arg.indexOf(" ") + 1);
      SetBlocks(player, blockType);
      break;
    case "undo":
      UndoAction(player);
    default:
      Print(
        `Subcommand "${subcommand}" on "${prefix}worldedit" is not found. Run "${prefix}help worldedit" to check custom commands`,
        "info",
        player.name
      );
  }
}

/**
 * Set the position of the player (Round Down)
 * @param {import("mojang-minecraft").Player} player
 */
function SetPosition(player) {
  let { x, y, z } = player.location;
  return `${Math.floor(x)} ${Math.floor(y)} ${Math.floor(z)}`;
}

function SetPoint(player, set) {
  if (set == "pos1") {
    pos1 = SetPosition(player);
    PrintAction(`Set 1st Position at ${pos1}`, player.name);
  } else if (set == "pos2") {
    pos2 = SetPosition(player);
    PrintAction(`Set 2nd Position at ${pos2}`, player.name);
  }
}

function SetBlocks(player, block) {
  if (pos2 == "") {
    player.runCommand(`setblock ${pos1} ${block}`);
    player.runCommand(`structure save we:undoaction ${pos1} ${pos1} memory`);
    // reverse += 1
    PrintAction(`Set 1 block with ${block}`);
  } else {
    let blocks = MinecraftMath.HowMuchBlocks(pos1, pos2);
    player.runCommand(`fill ${pos1} ${pos2} ${block}`);
    player.runCommand(`structure save we:undoaction ${pos1} ${pos2} memory`);
    // reverse += 1
    PrintAction(`Set ${blocks} blocks with ${block}`);
  }
}

function UndoAction(player) {
  let lowestCoord = MinecraftMath.MinCoord(pos1, pos2);
  player.runCommand(`structure load we:undoaction ${lowestCoord}`);
  PrintAction(`Undo the previous action`);
}
