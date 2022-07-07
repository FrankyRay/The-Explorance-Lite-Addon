// @ts-check
import {
  EnchantmentType,
  MinecraftDimensionTypes,
  MinecraftEffectTypes,
  MinecraftEnchantmentTypes,
  world,
} from "mojang-minecraft";
export { MinecraftDimensionTypes, MinecraftEnchantmentTypes };

export const Color = {
  black: "§0",
  dark_blue: "§1",
  dark_green: "§2",
  dark_aqua: "§3",
  dark_red: "§4",
  dark_purple: "§5",
  gold: "§6",
  gray: "§7",
  dark_gray: "§8",
  blue: "§9",
  green: "§a",
  aqua: "§b",
  red: "§c",
  light_purple: "§d",
  yellow: "§e",
  white: "§f",
  minecoin_gold: "§g",
  obfuscated: "§k",
  bold: "§l",
  striketrough: "§m" /* Not working! MCPE-41729 */,
  underline: "§n" /* Not working! MCPE-41729 */,
  italic: "§o",
  reset: "§r",
};

export const MCDimensions = {
  overworld: MinecraftDimensionTypes.overworld,
  nether: MinecraftDimensionTypes.nether,
  the_end: MinecraftDimensionTypes.theEnd,
};

/**
 * Take identifier of enchantment as a string
 * and return it as `MinecraftEnchantmentTypes` class
 *
 * @param {string} enchantment
 * @return {import("mojang-minecraft").EnchantmentType}
 */
export function MCEnchantments(enchantment) {
  switch (enchantment) {
    case "aqua_affinity":
      return MinecraftEnchantmentTypes.aquaAffinity;
    case "bane_of_arthropods":
      return MinecraftEnchantmentTypes.baneOfArthropods;
    case "blast_protection":
      return MinecraftEnchantmentTypes.blastProtection;
    case "channeling":
      return MinecraftEnchantmentTypes.channeling;
    case "curse_of_binding":
      return MinecraftEnchantmentTypes.binding;
    case "curse_of_vanishing":
      return MinecraftEnchantmentTypes.vanishing;
    case "depth_strider":
      return MinecraftEnchantmentTypes.depthStrider;
    case "efficiency":
      return MinecraftEnchantmentTypes.efficiency;
    case "feather_falling":
      return MinecraftEnchantmentTypes.featherFalling;
    case "fire_aspect":
      return MinecraftEnchantmentTypes.fireAspect;
    case "fire_protection":
      return MinecraftEnchantmentTypes.fireProtection;
    case "flame":
      return MinecraftEnchantmentTypes.flame;
    case "fortune":
      return MinecraftEnchantmentTypes.fortune;
    case "frost_walker":
      return MinecraftEnchantmentTypes.frostWalker;
    case "impaling":
      return MinecraftEnchantmentTypes.impaling;
    case "infinity":
      return MinecraftEnchantmentTypes.infinity;
    case "knockback":
      return MinecraftEnchantmentTypes.knockback;
    case "looting":
      return MinecraftEnchantmentTypes.looting;
    case "loyalty":
      return MinecraftEnchantmentTypes.loyalty;
    case "luck_of_the_sea":
      return MinecraftEnchantmentTypes.luckOfTheSea;
    case "lure":
      return MinecraftEnchantmentTypes.lure;
    case "mending":
      return MinecraftEnchantmentTypes.mending;
    case "multishot":
      return MinecraftEnchantmentTypes.multishot;
    case "piercing":
      return MinecraftEnchantmentTypes.piercing;
    case "power":
      return MinecraftEnchantmentTypes.power;
    case "projectile_protection":
      return MinecraftEnchantmentTypes.projectileProtection;
    case "protection":
      return MinecraftEnchantmentTypes.protection;
    case "punch":
      return MinecraftEnchantmentTypes.punch;
    case "quick_charge":
      return MinecraftEnchantmentTypes.quickCharge;
    case "respiration":
      return MinecraftEnchantmentTypes.respiration;
    case "riptide":
      return MinecraftEnchantmentTypes.riptide;
    case "sharpness":
      return MinecraftEnchantmentTypes.sharpness;
    case "silk_touch":
      return MinecraftEnchantmentTypes.silkTouch;
    case "smite":
      return MinecraftEnchantmentTypes.smite;
    case "soul_speed":
      return MinecraftEnchantmentTypes.soulSpeed;
    case "swift_sneak":
      return MinecraftEnchantmentTypes.swiftSneak;
    case "thorns":
      return MinecraftEnchantmentTypes.thorns;
    case "unbreaking":
      return MinecraftEnchantmentTypes.unbreaking;
    default:
      throw new Error(`There's no enchantment type ${enchantment}`);
  }
}

export const MCEnchantmentsList = [
  MinecraftEnchantmentTypes.aquaAffinity,
  MinecraftEnchantmentTypes.baneOfArthropods,
  MinecraftEnchantmentTypes.blastProtection,
  MinecraftEnchantmentTypes.channeling,
  MinecraftEnchantmentTypes.binding,
  MinecraftEnchantmentTypes.vanishing,
  MinecraftEnchantmentTypes.depthStrider,
  MinecraftEnchantmentTypes.efficiency,
  MinecraftEnchantmentTypes.featherFalling,
  MinecraftEnchantmentTypes.fireAspect,
  MinecraftEnchantmentTypes.fireProtection,
  MinecraftEnchantmentTypes.flame,
  MinecraftEnchantmentTypes.fortune,
  MinecraftEnchantmentTypes.frostWalker,
  MinecraftEnchantmentTypes.impaling,
  MinecraftEnchantmentTypes.infinity,
  MinecraftEnchantmentTypes.knockback,
  MinecraftEnchantmentTypes.looting,
  MinecraftEnchantmentTypes.loyalty,
  MinecraftEnchantmentTypes.luckOfTheSea,
  MinecraftEnchantmentTypes.lure,
  MinecraftEnchantmentTypes.mending,
  MinecraftEnchantmentTypes.multishot,
  MinecraftEnchantmentTypes.piercing,
  MinecraftEnchantmentTypes.power,
  MinecraftEnchantmentTypes.projectileProtection,
  MinecraftEnchantmentTypes.protection,
  MinecraftEnchantmentTypes.punch,
  MinecraftEnchantmentTypes.quickCharge,
  MinecraftEnchantmentTypes.respiration,
  MinecraftEnchantmentTypes.riptide,
  MinecraftEnchantmentTypes.sharpness,
  MinecraftEnchantmentTypes.silkTouch,
  MinecraftEnchantmentTypes.smite,
  MinecraftEnchantmentTypes.soulSpeed,
  MinecraftEnchantmentTypes.swiftSneak,
  MinecraftEnchantmentTypes.thorns,
  MinecraftEnchantmentTypes.unbreaking,
];
