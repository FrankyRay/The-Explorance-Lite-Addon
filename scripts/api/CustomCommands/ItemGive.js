// @ts-check
import { world, ItemStack, Items } from "mojang-minecraft";
import { Print } from "../lib/MinecraftFunctions";
import { AddEnchantment } from "../lib/MinecraftFunctions";

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
  let rawComponents = args.match(/(\{(.*)\})/g)?.toString() ?? "{}";
  let itemComponents = JSON.parse(rawComponents);
  let dataValue = "Data" in itemComponents ? itemComponents["Data"] : 0;

  // Set player inventory variable
  let inventory = player.getComponent("inventory").container;

  let emptySlot = -1;
  for (let i = 0; i < 36; i++) {
    if (!inventory.getItem(i)) {
      emptySlot = i;
      break;
    }
  }

  if (emptySlot == -1) {
    return Print("[ERROR] You doesn't have empty slot");
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
    if ("minecraft:can_place_on" in itemComponents) {
      blockList = blockList.concat(
        itemComponents["minecraft:can_place_on"]["blocks"]
      );
    }
    // Push block list on "CanPlaceOn"
    if ("CanPlaceOn" in itemComponents) {
      blockList = blockList.concat(itemComponents["CanPlaceOn"]);
    }

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
    if ("minecraft:can_destroy" in itemComponents) {
      blockList = blockList.concat(
        itemComponents["minecraft:can_destroy"]["blocks"]
      );
    }

    // Push block list on "CanDestroy"
    if ("CanDestroy" in itemComponents) {
      blockList = blockList.concat(itemComponents["CanDestroy"]);
    }

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
  if (NBTComponent.length === 0) {
    let newItem = new ItemStack(
      Items.get(name),
      parseInt(amount),
      parseInt(dataValue)
    );
    inventory.setItem(emptySlot, newItem);
  } else {
    player.runCommand(
      `give @s ${name} ${amount} ${dataValue} {${NBTComponent.join(", ")}}`
    );
  }

  // Take the item again
  let theItem = player.getComponent("inventory").container.getItem(emptySlot);

  // Set item's name and lore if "Display" component exist
  if ("Display" in itemComponents) {
    let compDisplay = itemComponents["Display"];
    // Set item's name
    if ("Name" in compDisplay) theItem.nameTag = compDisplay["Name"];

    // Set item's lore
    if ("Lore" in compDisplay) theItem.setLore(compDisplay["Lore"]);
  }

  // Set item's enchantments (Not working yet)
  if ("Enchantments" in itemComponents) {
    for (let enchant in itemComponents["Enchantments"]) {
      let enchantData = itemComponents["Enchantments"][enchant];
      AddEnchantment(
        theItem,
        enchantData["id"],
        "lvl" in enchantData ? enchantData["lvl"] : 1
      );
    }
  }

  // Add the item back
  inventory.setItem(emptySlot, theItem);

  Print(`Successfully give '${player.name}' ${name} (${amount})`);
}
