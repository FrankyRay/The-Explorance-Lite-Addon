import {
  DynamicPropertiesDefinition,
  Items,
  ItemStack,
  MinecraftEntityTypes,
} from "mojang-minecraft";
import { Player, world } from "mojang-minecraft";
import { Print, PrintAction } from "../lib/MinecraftFunctions.js";
import "./MainSelection.js";

const Options = [
  "Name", // 0
  "TPS", // 1
  "Location", // 2
  "Chunk", // 3
  "Facing", // 4
  "Effect", // 5
  "Item", // 6
  "Block", // 7
  "Liquid", // 8
  "Entity", // 9
  "Structure", // 10
];
let OptionsConfig = ["Show Debug", "General Config [Form]", ""];
let indexOptions = 0,
  indexConfig = -1;

function ItemEventHandler() {
  world.events.itemUse.subscribe((evdRight) => {
    // Detect right-click
    let { source: player, item } = evdRight;
    let showDebug = player.getDynamicProperty("Debug:ShowDebug");
    if (item.getLore().includes("§r§g[Debug Screen Tool]")) {
      if (showDebug) {
        indexConfig = -1;
        indexOptions = 0;
        let component = player.getDynamicProperty(
          `Debug:${Options[indexOptions]}`
        )
          ? "[§aShow§3]"
          : "[§cHide§3]";
        player.setDynamicProperty("Debug:ShowDebug", false);
        PrintAction(
          `§gPersonal F3 Debug Screen [Components]\n§3${Options[indexOptions]} ${component}`
        );
      } else if (!showDebug && !player.isSneaking) {
        if (indexOptions < Options.length - 1) indexOptions++;
        else if (indexOptions == Options.length - 1) indexOptions = 0;
        let component = player.getDynamicProperty(
          `Debug:${Options[indexOptions]}`
        )
          ? "[§aShow§3]"
          : "[§cHide§3]";
        PrintAction(
          `§gPersonal F3 Debug Screen [Components]\n§3${Options[indexOptions]} ${component}`
        );
      } else if (!showDebug && player.isSneaking) {
        console.warn(OptionsConfig);
        switch (indexOptions) {
          case 5:
            OptionsConfig[2] = "Effect Config [Form]";
            break;
          case 6:
            OptionsConfig[2] = "Item Config [Form]";
            break;
          case 7:
            OptionsConfig[2] = "Block Config [Form]";
            break;
          case 8:
            OptionsConfig[2] = "Liquid Config [Form]";
            break;
          case 9:
            OptionsConfig[2] = "Entity Config [Form]";
            break;
          case 10:
            OptionsConfig[2] = "Structure Config [Form]";
            break;
          default:
            OptionsConfig.splice(2, 1);
        }
        console.warn(OptionsConfig);
        if (indexConfig == -1) {
          indexConfig = 0;
        } else if (indexConfig < OptionsConfig.length - 1) indexConfig++;
        else if (indexConfig >= OptionsConfig.length - 1) indexConfig = 0;
        PrintAction(
          `§gPersonal F3 Debug Screen [Config]\n§3${OptionsConfig[indexConfig]}`
        );
      }
    }
  });

  world.events.entityHit.subscribe((evdLeft) => {
    // Detect left-click
    let { entity: player } = evdLeft;
    let item = player
      .getComponent("inventory")
      .container.getItem(player.selectedSlot);
    let showDebug = player.getDynamicProperty("Debug:ShowDebug");
    if (item?.getLore().includes("§r§g[Debug Screen Tool]")) {
      if (!showDebug && !player.isSneaking) {
        if (!player.getDynamicProperty(`Debug:${Options[indexOptions]}`))
          player.setDynamicProperty(`Debug:${Options[indexOptions]}`, true);
        else player.setDynamicProperty(`Debug:${Options[indexOptions]}`, false);
        let component = player.getDynamicProperty(
          `Debug:${Options[indexOptions]}`
        )
          ? "[§aShow§3]"
          : "[§cHide§3]";
        PrintAction(
          `§gPersonal F3 Debug Screen [Components]\n§3${Options[indexOptions]} ${component}`
        );
      } else if (!showDebug && player.isSneaking && indexConfig == -1) {
        player.setDynamicProperty("Debug:ShowDebug", true);
      } else if (!showDebug && player.isSneaking && !(indexConfig == -1)) {
        switch (OptionsConfig[indexConfig]) {
          case "Show Debug":
            player.setDynamicProperty("Debug:ShowDebug", true);
            break;
        }
      }
    }
  });
}

function DynamicPropertyHandler() {
  world.events.worldInitialize.subscribe((eventDP) => {
    let plrDebugOption = new DynamicPropertiesDefinition();
    plrDebugOption.defineBoolean("Debug:ShowDebug");
    plrDebugOption.defineBoolean("Debug:Name");
    plrDebugOption.defineBoolean("Debug:TPS");
    plrDebugOption.defineBoolean("Debug:Location");
    plrDebugOption.defineBoolean("Debug:Chunk");
    plrDebugOption.defineBoolean("Debug:Facing");
    plrDebugOption.defineBoolean("Debug:Effect");
    plrDebugOption.defineBoolean("Debug:Item");
    plrDebugOption.defineBoolean("Debug:Block");
    plrDebugOption.defineBoolean("Debug:Liquid");
    plrDebugOption.defineBoolean("Debug:Entity");
    plrDebugOption.defineBoolean("Debug:Structure");

    eventDP.propertyRegistry.registerEntityTypeDynamicProperties(
      plrDebugOption,
      MinecraftEntityTypes["player"]
    );
  });
}

/**
 * Add simple setting to the player
 * @param {import("mojang-minecraft").Player} player Player Class
 */
export function InitDebugScreen(player) {
  CheckPropertyDebug(player);
  let item = new ItemStack(Items.get("golden_sword"), 1, 0);
  item.setLore(["§r§g[Debug Screen Tool]"]);
  player.getComponent("inventory").container.setItem(player.selectedSlot, item);
}

function CheckPropertyDebug(player) {
  if (player.getDynamicProperty("Debug:ShowDebug") === undefined)
    player.setDynamicProperty("Debug:ShowDebug", false);
  if (player.getDynamicProperty("Debug:Name") === undefined)
    player.setDynamicProperty("Debug:Name", false);
  if (player.getDynamicProperty("Debug:TPS") === undefined)
    player.setDynamicProperty("Debug:TPS", true);
  if (player.getDynamicProperty("Debug:Location") === undefined)
    player.setDynamicProperty("Debug:Location", true);
  if (player.getDynamicProperty("Debug:Chunk") === undefined)
    player.setDynamicProperty("Debug:Chunk", true);
  if (player.getDynamicProperty("Debug:Facing") === undefined)
    player.setDynamicProperty("Debug:Facing", true);
  if (player.getDynamicProperty("Debug:Effect") === undefined)
    player.setDynamicProperty("Debug:Effect", false);
  if (player.getDynamicProperty("Debug:Item") === undefined)
    player.setDynamicProperty("Debug:Item", false);
  if (player.getDynamicProperty("Debug:Block") === undefined)
    player.setDynamicProperty("Debug:Block", false);
  if (player.getDynamicProperty("Debug:Liquid") === undefined)
    player.setDynamicProperty("Debug:Liquid", false);
  if (player.getDynamicProperty("Debug:Entity") === undefined)
    player.setDynamicProperty("Debug:Entity", false);
  if (player.getDynamicProperty("Debug:Structure") === undefined)
    player.setDynamicProperty("Debug:Structure", false);
}

DynamicPropertyHandler();
ItemEventHandler();
