//@ts-check
import { world, ItemStack, MinecraftItemTypes } from "mojang-minecraft";
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
      Print(HelpCommand, player.name);
      break;

    case "cmdcomp" /* Checking Command Component */:
      Print(CommandsComponent(args), player.name);
      break;

    case "consolewarn" /* Just calling the console warn to make sure it works */:
      console.warn("You call the console warning");
      break;

    case "consc" /* Give the Console Commands Book */:
      let consc = new ItemStack(MinecraftItemTypes.book);
      consc.setLore(["§r[Console Command Form]", "§r§bRight click to open UI"]);

      player
        .getComponent("inventory")
        .container.setItem(player.selectedSlot, consc);
      break;

    case "gmc" /* Set gamemode to Creative*/:
      Overworld.runCommand(`gamemode creative "${player.name}"`);
      break;

    case "gms" /* Set gamemode to Survival*/:
      Overworld.runCommand(`gamemode survival "${player.name}"`);
      break;

    case "gtpanel" /* Give the Component UI Stick */:
      let compstick = new ItemStack(MinecraftItemTypes.stick);
      compstick.setLore([
        "§r[MC Component Form]",
        "§r§bRight click to open UI",
      ]);

      player
        .getComponent("inventory")
        .container.setItem(player.selectedSlot, compstick);
      break;

    case "itemcomp" /* Take item's components */:
      let item = player
        .getComponent("inventory")
        .container.getItem(player.selectedSlot);
      let { amount, data, id: itemid } = item;
      // let component = item.getComponents();
      // let itemname = item.nameTag;
      // let lore = item.getLore();
      Print(
        `Item Class [${itemid}]:\nAmount: ${amount}\nData: ${data}` /* + `\nComponent: ${component}\nName: ${itemname}\nLore: ${lore}` */,
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
        player.name,
        "info",
        "info",
        "yellow"
      );
  }
}
