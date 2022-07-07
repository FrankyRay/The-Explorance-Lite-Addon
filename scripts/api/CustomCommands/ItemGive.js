// @ts-check
import { world, ItemStack, Items } from "mojang-minecraft";
import { Print } from "../PrintMessage";

const ExampleComponentLib = {
  Data: 0,
  Display: {
    Name: "Item's Name", // Done
    Lore: ["First Line", "Second Line"], // Done
  },
  Enchantment: [
    {
      id: "unbreaking",
      lvl: 4,
    },
    {
      id: "mending",
      lvl: 1,
    },
  ],
  CanPlaceOn: ["wool", "stone"], // Done
  CanDestroy: ["wool", "stone"], // Done
  KeepOnDeath: {}, // Done
  ItemLock: "lock_in_slot" /* or "lock_in_inventory" */, // Done
  "minecraft:can_place_on": { blocks: ["wool", "stone"] }, // Done
  "minecraft:can_destroy": { blocks: ["wool", "stone"] }, // Done
  "minecraft:keep_on_death": {}, // Done
  "minecraft:item_lock": { mode: "lock_in_slot" /* or "lock_in_inventory" */ }, // Done
  ExplorationMap: "ancient_city", // Not working for now due to `/loot` not working
};

/**
 * @param {import("mojang-minecraft").Player} player
 * @param {string} args
 */
export function ItemGive(player, args) {
  let argumentList = args.split(" ");
  let name = argumentList[0];
  let amount = argumentList[1] ?? 1;
  let dataValue = argumentList[2] ?? 0;
  let rawComponents = args.match(/(\{(.*)\})/g)?.toString() ?? "{}";
  let itemComponents = JSON.parse(rawComponents);

  // Set player inventory variable
  let inventory = player.getComponent("inventory").container;

  let emptySlot = 0;
  for (let i = 0; i < 36; i++) {
    if (!inventory.getItem(i)) {
      emptySlot = i;
      break;
    }
  }

  // Set list of default NBT Component
  let NBTComponent = [];

  // "CanPlaceOn" ("minecraft:can_place_on") Component
  if (
    "CanPlaceOn" in itemComponents ||
    "minecraft:can_place_on" in itemComponents
  ) {
    let blockList = [];
    // Push block list on "minecraft:can_place_on"
    blockList.push(
      "minecraft:can_place_on" in itemComponents
        ? itemComponents["minecraft:can_place_on"]["blocks"]
        : []
    );
    // Push block list on "CanPlaceOn"
    blockList.push(
      "CanPlaceOn" in itemComponents ? itemComponents["CanPlaceOn"] : []
    );

    NBTComponent.push(
      `"minecraft:can_place_on": {"blocks": ${JSON.stringify(blockList)}}`
    );
  }

  // "CanDestroy" ("minecraft:can_destroy") Component
  if (
    "CanDestroy" in itemComponents ||
    "minecraft:can_destroy" in itemComponents
  ) {
    let blockList = [];
    // Push block list on "minecraft:can_destroy"
    blockList.push(
      "minecraft:can_destroy" in itemComponents
        ? itemComponents["minecraft:can_destroy"]["blocks"]
        : []
    );
    // Push block list on "CanDestroy"
    blockList.push(
      "CanDestroy" in itemComponents ? itemComponents["CanDestroy"] : []
    );

    NBTComponent.push(
      `"minecraft:can_destroy": {"blocks": ${JSON.stringify(blockList)}}`
    );
  }

  // "ItemLock" ("minecraft:item_lock") Component
  if ("ItemLock" in itemComponents && "minecraft:item_lock" in itemComponents) {
    // Check if both value is not the same
    if (
      itemComponents["ItemLock"] !==
      itemComponents["minecraft:item_lock"]["mode"]
    ) {
      Print("§c[ERROR] 'ItemLock' component has mismatch value");
      throw new Error("§c[ERROR] 'ItemLock' component has mismatch value");
    } else {
      NBTComponent.push(
        `"minecraft:item_lock": {"mode": "${itemComponents["ItemLock"]}"}`
      );
    }
  } else if (
    "ItemLock" in itemComponents ||
    "minecraft:item_lock" in itemComponents
  ) {
    NBTComponent.push(
      `"minecraft:item_lock": {"mode": "${
        "ItemLock" in itemComponents
          ? itemComponents["ItemLock"]
          : itemComponents["minecraft:item_lock"]["mode"]
      }"}`
    );
  }

  // "KeepOnDeath" ("minecraft:keep_on_death") Component
  if (
    "KeepOnDeath" in itemComponents ||
    "minecraft:keep_on_death" in itemComponents
  )
    NBTComponent.push('"minecraft:keep_on_death": {}');

  // Send the item into player's inventory
  if (NBTComponent !== []) {
    player.runCommand(
      `give @s ${name} ${amount} ${dataValue} {${NBTComponent.join(", ")}}`
    );
  } else {
    let newItem = new ItemStack(
      Items.get(name),
      parseInt(amount),
      parseInt(dataValue)
    );
    inventory.setItem(emptySlot, newItem);
  }

  // Take the item again
  let newItem = player.getComponent("inventory").container.getItem(emptySlot);

  // Set item's name
  if ("name" in itemComponents) newItem.nameTag = itemComponents["name"];

  // Set item's lore
  if ("lore" in itemComponents) newItem.setLore(itemComponents["lore"]);

  // Set item's enchantments (Not working yet)
  // if ("Enchantments" in itemComponents) {
  //   for (let [keys, items] of Object.entries(itemComponents["enchantments"])) {
  //   }
  // }

  Print(`Successfully give '${player.name}' ${name} (${amount})`);
}
