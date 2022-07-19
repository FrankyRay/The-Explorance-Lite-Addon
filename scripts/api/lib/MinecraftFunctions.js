//@ts-check
import {
  world,
  Location,
  BlockLocation,
  Enchantment,
  MinecraftEnchantmentTypes,
} from "mojang-minecraft";

/**
 * Print the message to the player (all/specific) with tellraw command
 * @param {string} message The message to print out
 * @param {string} target Target of the message. Default all players
 * @param {string|null} prefix Prefix message
 */
export function Print(message, target = "@a", prefix = null) {
  if (target.includes(" ")) target = `"${target}"`;

  if (prefix != null) {
    world
      .getDimension("overworld")
      .runCommand(
        `tellraw ${target} {"rawtext": [{"text": "[${prefix}] ${message}"}]}`
      );
    return;
  }
  world
    .getDimension("overworld")
    .runCommand(`tellraw ${target} {"rawtext": [{"text": "${message}"}]}`);
}

/**
 * Print the message to the player (all/specific) to action bar with tellraw command
 * @param {string} message The message to print out
 * @param {string} target Target of the message. Default all player
 */
export function PrintAction(message, target = "@a") {
  if (target.includes(" ")) target = `"${target}"`;

  world
    .getDimension("overworld")
    .runCommand(
      `titleraw ${target} actionbar {"rawtext": [{"text": "${message}"}]}`
    );
}

/**
 * Return the lowest coordinate from 2 points
 * @param {string} pos1
 * @param {string} pos2
 * @returns {string}
 */
export function MinCoord(pos1, pos2) {
  let ListPos1 = pos1.split(" ").map(Number);
  let ListPos2 = pos2.split(" ").map(Number);

  let PosX = [ListPos1[0], ListPos2[0]];
  let PosY = [ListPos1[1], ListPos2[1]];
  let PosZ = [ListPos1[2], ListPos2[2]];

  let x = Math.min(...PosX);
  let y = Math.min(...PosY);
  let z = Math.min(...PosZ);

  return `${x} ${y} ${z}`;
}

/**
 * Return how many blocks in that area
 * @param {string} pos1
 * @param {string} pos2
 * @returns {number}
 */
export function BlocksCounter(pos1, pos2) {
  let ListPos1 = pos1.split(" ").map(Number);
  let ListPos2 = pos2.split(" ").map(Number);

  let X = Math.abs(ListPos2[0] - ListPos1[0]) + 1;
  let Y = Math.abs(ListPos2[1] - ListPos1[1]) + 1;
  let Z = Math.abs(ListPos2[2] - ListPos1[2]) + 1;

  return X * Y * Z;
}

/**
 * Return the player's chunk position
 * @param {import("mojang-minecraft").Location} location Location of the player
 * @return {import("mojang-minecraft").Location} Location of the player's chunk
 */
export function PlayerChunkPosition(location) {
  let { x, y, z } = location;
  return new Location(
    Math.floor(x % 16),
    Math.floor(y % 16),
    Math.floor(z % 16)
  );
}

/**
 * Return the chunk position from the player position
 * @param {import("mojang-minecraft").Location} location Location of the player
 * @return {import("mojang-minecraft").Location} Location of the chunk from the player
 */
export function ChunkPosition(location) {
  let { x, y, z } = location;
  return new Location(
    Math.floor(x / 16),
    Math.floor(y / 16),
    Math.floor(z / 16)
  );
}

/**
 * Return time format `00:00.00` for effect's duration (Use tick instead of second)
 * @param {number} number The number of the time
 * @return {string} Time format `00:00.00`
 */
export function EffectTimeStyle(number) {
  let ms = (number / 20).toFixed(2).split(".")[1];
  let second = Math.floor(number / 20) % 60;
  let minute = Math.floor(number / 1200);

  let sec = second < 10 ? `0${second}` : second.toString();
  let min = minute < 10 ? `0${minute}` : minute.toString();
  return `${min}:${sec}.${ms}`;
}

/**
 * Return string location into `Location()` class
 * @param {string} location String consist 3 set of coordinate number
 * @returns {import("mojang-minecraft").Location}
 */
export function StringToLocation(location) {
  let locList = location.split(" ").map((val) => parseInt(val));
  return new Location(locList[0], locList[1], locList[2]);
}

/**
 * Return string location into `BlockLocation()` class
 * @param {string} location String consist 3 set of coordinate number
 * @returns {import("mojang-minecraft").BlockLocation}
 */
export function StringToBlockLocation(location) {
  let locList = location.split(" ").map((val) => parseInt(val));
  return new BlockLocation(locList[0], locList[1], locList[2]);
}

/**
 * Get score from scoreboard
 * @param {import("mojang-minecraft").Entity|import("mojang-minecraft").Player|string} target Scoreboard target/player
 * @param {string} objective Scoreboard objective
 * @param {boolean} failsave Return 0 [true]/Throw Error [false] if the entity was not there
 * @return {number} Score of the entity
 */
export function GetScore(target, objective, failsave = true) {
  let scoreboardObjective = world.scoreboard.getObjective(objective);
  try {
    if (typeof target == "string") {
      return scoreboardObjective.getScore(
        // @ts-ignore
        scoreboardObjective
          .getParticipants()
          .find((v) => v.displayName == target)
      );
    }
    return scoreboardObjective.getScore(target.scoreboard);
  } catch {
    if (failsave) return 0;
    throw Error(`Target has no score on objective "${objective}"`);
  }
}

/**
 * Add enchantment to the item
 * @param {import("mojang-minecraft").ItemStack} item The Item Class
 * @param {string} enchantID Enchantment ID. For example `"unbreaking"` or `"mending"`
 * @param {number} enchantLevel Enchantment Level. The level can't be exceed the normal enchantment value. Default value: 1.
 */
export function AddEnchantment(item, enchantID, enchantLevel = 1) {
  let itemEnchant = item.getComponent("enchantments").enchantments;
  itemEnchant.addEnchantment(
    new Enchantment(MinecraftEnchantmentTypes[enchantID], enchantLevel)
  );
  // Set new EnchantmentList to item
  item.getComponent("enchantments").enchantments = itemEnchant;
}

/**
 * Get every enchantments on the item and mapping into Object
 * @param {import("mojang-minecraft").ItemStack} item The Item Class
 * @return {object[]} Array of object contain every enchantments id and lvl
 */
export function GetEnchantment(item) {
  let enchant = item.getComponent("enchantments").enchantments;
  let encPos = enchant.next();
  let encList = [];

  while (!encPos.done) {
    if (enchant.hasEnchantment(encPos.value.type)) {
      let enc = enchant.getEnchantment(encPos.value.type);
      encList.push({ id: enc.type.id, lvl: enc.level });
    }
  }

  return encList;
}
