//@ts-check
import { world, MinecraftItemTypes } from "mojang-minecraft";
import * as MinecraftMath from "./MathOperations.js";
import { Print, PrintAction } from "./PrintMessage.js";
import { CommandsComponent } from "./CommandsComp.js";
import { WorldEditBE } from "./WorldEdit.js";

const Overworld = world.getDimension("overworld");
// Saved Variable
let pos1 = "";
let pos2 = "";

/**
 * Custom Command with Gametest
 * @param {string} prefix
 * @param {string} commands
 * @param {string} args
 * @param {import("mojang-minecraft").Player} player
 */
export function CustomCommands(prefix, commands, args, player) {
  let HelpCommand = "This is help commands";
  switch (commands) {
    case "help" /* Help Command. Not useful yet :v */:
      Print(HelpCommand, "normal", player.name);
      break;

    case "cmdcomp" /* Checking Command Component */:
      Print(CommandsComponent(args), "normal", player.name);
      break;

    case "consolewarn" /* Just calling the console warn to make sure it works */:
      console.warn("You call the console warning");
      break;

    case "consc" /* FIXME: Give the Console Commands Book */:
      player.runCommand(`loot give @s loot "custom/console_command"`);
      break;

    case "gmc" /* Set gamemode to Creative*/:
      Overworld.runCommand(`gamemode creative "${player.name}"`);
      break;

    case "gms" /* Set gamemode to Survival*/:
      Overworld.runCommand(`gamemode survival "${player.name}"`);
      break;

    case "playercomp" /* Take player's components */:
      let {
        dimension: { id: dimensionID },
        headLocation: { x: xhead, y: yhead, z: zhead },
        id,
        isSneaking,
        location: { x: xloc, y: yloc, z: zloc },
        name,
        nameTag,
        //@ts-ignore
        rotation: { x: xrot, y: yrot },
        viewVector: { x: xvec, y: yvec, z: zvec },
      } = player;
      Print(
        `Player Class [${name}]:\nDimension: ${dimensionID}\nHead Location:\n  X: ${xhead}\n  Y: ${yhead}\n  Z: ${zhead}\nID: ${id}\nSneaking: ${isSneaking}\nLocation:\n  X: ${xloc}\n  Y: ${yloc}\n  Z: ${zloc}\nName Tag: ${nameTag}\nRotation:\n  X: ${xrot}\n  Y: ${yrot}\nView Vector:\n  X: ${xvec}\n  Y: ${xvec}\n  Z: ${xvec}`,
        "normal",
        player.name
      );
      break;

    case "test" /* Testing some feature with my custom command */:
      Print("There's no test yet!");
      break;

    case "worldedit" /* [TODO: Create own file] My own world edit */:
      // WorldEditBE(player, args, prefix);
      if (args.split(" ")[0] == "set1") {
        let x = Math.floor(player.location.x);
        let y = Math.floor(player.location.y);
        let z = Math.floor(player.location.z);
        pos1 = `${x} ${y} ${z}`;
        PrintAction(`Set 1st position: ${pos1}`, player.name);
      } else if (args.split(" ")[0] == "set2") {
        let x = Math.floor(player.location.x);
        let y = Math.floor(player.location.y);
        let z = Math.floor(player.location.z);
        pos2 = `${x} ${y} ${z}`;
        PrintAction(`Set 1st position: ${pos1}`, player.name);
      } else if (args.split(" ")[0] == "fill") {
        let blockType = args.substring(args.indexOf(" ") + 1);
        let blocks = MinecraftMath.HowMuchBlocks(pos1, pos2);
        Overworld.runCommand(`fill ${pos1} ${pos2} ${blockType}`);
        Overworld.runCommand(
          `structure save we:beforefill ${pos1} ${pos2} memory`
        );
        PrintAction(
          `Successfully filling the area with ${blockType} (${blocks} Block(s))`,
          player.name
        );
      } else if (args.split(" ")[0] == "undo") {
        let newPos = MinecraftMath.MinCoord(pos1, pos2);
        Overworld.runCommand(`structure load we:beforefill ${newPos}`);
        PrintAction(`Successfully undo the fill commands`, player.name);
      }
      break;

    default: /* Send error message when there's no command */
      Print(
        `Command "${commands}" is not found. Run ${prefix}help to check custom commands`,
        "info",
        player.name
      );
  }
}
