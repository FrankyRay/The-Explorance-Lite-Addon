import {
  MinecraftDimensionTypes,
  MinecraftEffectTypes,
  MinecraftEnchantmentTypes,
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

export const MCEnchantments = {
  aqua_affinity: MinecraftEnchantmentTypes.aquaAffinity,
  bane_of_arthropods: MinecraftEnchantmentTypes.baneOfArthropods,
  blast_protection: MinecraftEnchantmentTypes.blastProtection,
  channeling: MinecraftEnchantmentTypes.channeling,
  curse_of_binding: MinecraftEnchantmentTypes.binding,
  curse_of_vanishing: MinecraftEnchantmentTypes.vanishing,
  depth_strider: MinecraftEnchantmentTypes.depthStrider,
  efficiency: MinecraftEnchantmentTypes.efficiency,
  feather_falling: MinecraftEnchantmentTypes.featherFalling,
  fire_aspect: MinecraftEnchantmentTypes.fireAspect,
  fire_protection: MinecraftEnchantmentTypes.fireProtection,
  flame: MinecraftEnchantmentTypes.flame,
  fortune: MinecraftEnchantmentTypes.fortune,
  frost_walker: MinecraftEnchantmentTypes.frostWalker,
  impaling: MinecraftEnchantmentTypes.impaling,
  infinity: MinecraftEnchantmentTypes.infinity,
  knockback: MinecraftEnchantmentTypes.knockback,
  looting: MinecraftEnchantmentTypes.looting,
  loyalty: MinecraftEnchantmentTypes.loyalty,
  luck_of_the_sea: MinecraftEnchantmentTypes.luckOfTheSea,
  lure: MinecraftEnchantmentTypes.lure,
  mending: MinecraftEnchantmentTypes.mending,
  multishot: MinecraftEnchantmentTypes.multishot,
  piercing: MinecraftEnchantmentTypes.piercing,
  power: MinecraftEnchantmentTypes.power,
  projectile_protection: MinecraftEnchantmentTypes.projectileProtection,
  protection: MinecraftEnchantmentTypes.protection,
  punch: MinecraftEnchantmentTypes.punch,
  quick_charge: MinecraftEnchantmentTypes.quickCharge,
  respiration: MinecraftEnchantmentTypes.respiration,
  riptide: MinecraftEnchantmentTypes.riptide,
  sharpness: MinecraftEnchantmentTypes.sharpness,
  silk_touch: MinecraftEnchantmentTypes.silkTouch,
  smite: MinecraftEnchantmentTypes.smite,
  soul_speed: MinecraftEnchantmentTypes.soulSpeed,
  swift_sneak: MinecraftEnchantmentTypes.swiftSneak /* Beta/Preview only */,
  thorns: MinecraftEnchantmentTypes.thorns,
  unbreaking: MinecraftEnchantmentTypes.unbreaking,
  [Symbol.iterator]: function* () {
    let properties = Object.keys(this);
    for (let i of properties) {
      yield [i, this[i]];
    }
  },
};

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
  // MinecraftEnchantmentTypes.swiftSneak /* Beta/Preview only */,
  MinecraftEnchantmentTypes.thorns,
  MinecraftEnchantmentTypes.unbreaking,
];
