//@ts-check
import { Items, ItemStack, ItemType, world } from "mojang-minecraft";
import * as MinecraftMath from "./MathOperations.js";
import { Print, PrintAction } from "./PrintMessage.js";
import { CommandsComponent } from "./CommandsComp.js";

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
 * @param {boolean} admin
 */
export function CustomCommands(prefix, commands, args, player, admin) {
  let HelpCommand = "This is help commands";
  switch (commands) {
    case "help":
      Print(HelpCommand, "normal", player.name);
      break;
    case "cmdcomp":
      const Component = CommandsComponent(args);
      Print(Component, "normal", player.name);
      break;
    case "consolewarn":
      console.warn("You call the console warning");
      break;
    case "componentItem":
      let item = player
        .getComponent("minecraft:inventory")
        // @ts-ignore
        .container.getItem(player.selectedSlot);
      if (item != undefined && item.hasComponent("minecraft:durability")) {
        let durability = item.getComponent("minecraft:durability");
        let maximumDurability = durability.maxDurability;
        let currentDurability = durability.damage;
        Print(
          `Durability: ${currentDurability}/${maximumDurability}`,
          "normal",
          player.name
        );
      } else if (item != undefined && item.hasComponent("minecraft:food")) {
        let food = item.getComponent("minecraft:food");
        let foodNutrition = food.nutrition;
        let foodAlwaysEat = food.canAlwaysEat;
        Print(
          `Nutrition: ${foodNutrition} - Always Eat?: ${foodAlwaysEat}`,
          "normal",
          player.name
        );
      } else {
        Print(
          `The item doesn't have any detectable component with Gametest\nItem ID: ${item.id}`,
          "normal",
          player.name
        );
      }
      break;
    case "consc":
      player.runCommand(`loot give @s loot "custom/console_command"`);
      break;
    case "gmc":
      Overworld.runCommand(`gamemode creative "${player.name}"`);
      break;
    case "gms":
      Overworld.runCommand(`gamemode survival "${player.name}"`);
      break;
    case "worldedit":
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
    case "test":
      let inv = player.getComponent("minecraft:inventory").container;
      let itemArmor = inv.getItem(100);
      if (itemArmor != undefined) {
        Print(`Item detectable: ${itemArmor.id}`, "normal", player.name);
      } else {
        Print("Not detectable", "normal", player.name);
      }
      break;
    default:
      Print(
        `Command "${commands}" is not found. Run ${prefix}help to check custom commands`,
        "info",
        player.name
      );
  }
}
