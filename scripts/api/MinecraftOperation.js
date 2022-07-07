//@ts-check
import {
  world,
  Location,
  BlockLocation,
  Enchantment,
  MinecraftEnchantmentTypes,
} from "mojang-minecraft";

/**
 * Return the lowest coordinate from 2 points
 * @param {string} pos1
 * @param {string} pos2
 * @returns string
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
 * @returns number
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
 * @param {number} enchantLevel Enchantment Level. The level can't be exceed the normal enchantment value
 */
export function AddEnchantment(item, enchantID, enchantLevel = 1) {
  let itemEnchant = item.getComponent("enchantments").enchantments;
  itemEnchant.addEnchantment(
    new Enchantment(MinecraftEnchantmentTypes[enchantID], enchantLevel)
  );
  // Set new EnchantmentList to item
  item.getComponent("enchantments").enchantments = itemEnchant;
}
