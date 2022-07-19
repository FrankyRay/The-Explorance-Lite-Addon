import { Player, world } from "mojang-minecraft";
import { Print, PrintAction } from "../api/lib/MinecraftFunctions.js";

const ItemSelection = [
  "minecraft:wooden_sword",
  "minecraft:stone_sword",
  "minecraft:iron_sword",
  "minecraft:gold_sword",
  "minecraft:diamond_sword",
  "minecraft:netherite_sword",
];
const Options = ["(None)", "Player", "Item", "Block", "Entity"];
const OptionsSec = {
  "(None)": [],
  Player: ["General", "Inventory", "Health"],
  Item: ["General", "Enchantment"],
  Block: ["General"],
  Entity: ["General", "Health"],
};
let indexP = 0,
  indexS = 0,
  lockP = true,
  lockS = true;

function ItemEventHandler() {
  world.events.itemUse.subscribe((evdRight) => {
    // Detect right-click
    let { source: player, item } = evdRight;
    if (ItemSelection.includes(item.id)) {
      if (lockP && lockS) {
        lockS = false;
        lockP = false;
        PrintAction(`§gF3 Debug Screen\n§c${Options[indexP]}`, player.name);
      } else if (!lockP && indexP < Options.length - 1) {
        indexP++;
        PrintAction(`§gF3 Debug Screen\n§c${Options[indexP]}`, player.name);
      } else if (!lockP && indexP == Options.length - 1) {
        indexP = 0;
        PrintAction(`§gF3 Debug Screen\n§c${Options[indexP]}`, player.name);
      } else if (
        lockP &&
        !lockS &&
        indexS < OptionsSec[Options[indexP]].length - 1
      ) {
        indexS++;
        PrintAction(
          `§gF3 Debug Screen §9>> §a${Options[indexP]}\n§c${
            OptionsSec[Options[indexP]][indexS]
          }`,
          player.name
        );
      } else if (
        lockP &&
        !lockS &&
        indexS == OptionsSec[Options[indexP]].length - 1
      ) {
        indexS = 0;
        PrintAction(
          `§gF3 Debug Screen §9>> §a${Options[indexP]}\n§c${
            OptionsSec[Options[indexP]][indexS]
          }`,
          player.name
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

    if (ItemSelection.includes(item.id)) {
      if (!lockP && !lockS) {
        if (indexP == 0) lockS = true;
        lockP = true;
        indexS = -1;
        PrintAction(
          `§gF3 Debug Screen\n§c${Options[indexP]} §a[Selected]`,
          player.name
        );
      } else if (lockP && !lockS) {
        lockS = true;
        PrintAction(
          `§gF3 Debug Screen §9>> §a${Options[indexP]}\n§c${
            OptionsSec[Options[indexP]][indexS]
          } §a[Selected]`,
          player.name
        );
      }
    }
  });
}

ItemEventHandler();
