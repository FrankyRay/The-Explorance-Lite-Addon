//@ts-check
import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
  // @ts-ignore
} from "mojang-minecraft-ui";
import { Print } from "../PrintMessage.js";
import * as ScoreboardConsC from "./ScoreboardConsoleC.js";

const Overworld = world.getDimension("overworld");

export function Ability(player) {
  let typeAbility = ["mayfly", "mute", "worldbuilder"];
  let formAbility = new ModalFormData();

  formAbility.title("Ability [/ability]");
  formAbility.dropdown("Ability Type", typeAbility, 0);
  formAbility.toggle("Value", true);
  formAbility.toggle("§9Show Command Syntax", false);

  formAbility.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, bool, syntax] = respond.formValues;

    let command = `ability ${typeAbility[type]} ${bool}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function CameraShake(player) {
  let formCameraShake = new ModalFormData();

  formCameraShake.title("Camera Shake [/camerashake]");
  formCameraShake.toggle(
    "CS Mode [§cRemove§r/§aAdd§r]§8\n{Remove - Use Target Only}",
    true
  );
  formCameraShake.textField("Target §g[Player]", "Target Selector");
  formCameraShake.slider("Intensity Shake", 0, 4, 1, 1);
  formCameraShake.textField("Duration §g[Seconds]", "Duration");
  formCameraShake.toggle("Shake Type §8[§cPositional§8/§aRotational§8]");
  formCameraShake.toggle("§9Show Command Syntax", false);

  formCameraShake.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [play, target, intensity, duration, type, syntax] = respond.formValues;

    let shakeType = "positional";
    if (type) {
      shakeType = "rotational";
    }

    let command = `camerashake add ${target} ${intensity} ${duration} ${shakeType}`;
    if (!play) {
      command = `camerashake stop ${target}`;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Clear(player) {
  let formClear = new ModalFormData();

  formClear.title("Clear [/clear]");
  formClear.textField("Target §g[Player]§8[Optional]", "Target Selector");
  formClear.textField("Item ID §8[Optional]", "Item ID");
  formClear.textField("Item Data §8[Optional]", "Data Value [Int]");
  formClear.textField("Amount §9[Max]§8[Optional]", "Amount");
  formClear.toggle("§9Show Command Syntax", false);

  formClear.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, item, data, amount, syntax] = respond.formValues;

    let command = `clear ${target} ${item} ${data} ${amount}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Clone(player) {
  let formClone = new ModalFormData();
  let modeCloneMask = ["replace", "masked", "filtered"];
  let modeCloneType = ["normal", "force", "move"];

  formClone.title("Clone [/clone]");
  formClone.textField("1st Position §g[XYZ][~^]", "XYZ Position");
  formClone.textField("2nd Position §g[XYZ][~^]", "XYZ Position");
  formClone.textField("Destination Position §g[XYZ][~^]", "XYZ Position");
  formClone.dropdown("Mask Mode", modeCloneMask);
  formClone.dropdown("Clone Mode §9[Replace/Masked Mode]", modeCloneType);
  formClone.textField("Block Name §9[Filtered Mode]", "Block");
  formClone.textField("Data Value §9[Filtered Mode]", "Aux or BlockState");
  formClone.toggle("§9Show Command Syntax", false);

  formClone.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos1, pos2, pos3, mode, type, block, data, syntax] =
      respond.formValues;

    let command = `clone ${pos1} ${pos2} ${pos3} ${modeCloneMask[mode]} ${modeCloneType[type]}`;
    if (mode == 2) {
      command = `clone ${pos1} ${pos2} ${pos3} ${modeCloneMask[mode]} ${block} ${data}`;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Damage(player) {
  let formDamage = new ModalFormData();
  let typeDamage = [
    "all",
    "anvil",
    "attack",
    "block_explosion",
    "charging",
    "contact",
    "drowning",
    "durability",
    "entity_attack",
    "entity_explosion",
    "fall",
    "falling_block",
    "fatal",
    "fire",
    "fire_tick",
    "fireworks",
    "fly_into_wall",
    "freezing",
    "lava",
    "lightning",
    "magic",
    "magma",
    "none",
    "override",
    "piston",
    "projectile",
    "stalactite",
    "stalagmite",
    "starve",
    "suffocation",
    "suicide",
    "temperature",
    "thorns",
    "void",
    "wither",
  ];

  formDamage.title("Damage [/damage]");
  formDamage.textField("Target §g[Entity]", "Target Selector", "@s");
  formDamage.textField("Damage Amount", "Damage Value", "1");
  formDamage.dropdown("Damage Type §8[Optional]", typeDamage);
  formDamage.textField(
    "Damager §g[1 Entity]§9[c=1]§8[Optional]",
    "Target Selector"
  );
  formDamage.toggle("§9Show Command Syntax", false);

  formDamage.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, amount, type, damager, syntax] = respond.formValues;

    let command = `damage ${target} ${amount} ${typeDamage[type]} ${damager}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

// Difficulty: Syntax Can't Use
export function Difficulty(player) {
  let formDifficulty = new ActionFormData();

  formDifficulty.title("Difficulty [/difficulty]");
  formDifficulty.body("Select your difficulty");
  formDifficulty.button("Peaceful §9[0]");
  formDifficulty.button("Easy §9[1]");
  formDifficulty.button("Normal §9[2]");
  formDifficulty.button("Hard §9[3]");

  formDifficulty.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let button = respond.selection;
    player.runCommand(`difficulty ${button}`);
  });
}

export function Effect(player) {
  let formEffect = new ModalFormData();
  let typeEffect = [
    "Absorbtion",
    "Bad Omen",
    "Blindness",
    "Clear",
    "Conduit Power",
    "Darkness",
    "Dolphin Grace",
    "Fatal Poison",
    "Fire Resistance",
    "Haste",
    "Health Boost",
    "Hunger",
    "Instant Damage",
    "Instant Health",
    "Invisibility",
    "Jump Boost",
    "Levitation",
    "Mining Fatigue",
    "Nausea",
    "Night Vision",
    "Poison",
    "Regeneration",
    "Resistance",
    "Saturation",
    "Slow Falling",
    "Slowness",
    "Speed",
    "Strength",
    "Village Hero",
    "Water Breathing",
    "Weakness",
    "Wither",
  ];

  formEffect.title("Effect [/effect]");
  formEffect.textField("Target §g[Entity]", "Target Selector");
  formEffect.dropdown("Effect Type", typeEffect);
  formEffect.textField("Duration §g[Second]§8[Optional]", "Duration", "30");
  formEffect.slider("Amplifier §8[Optional]§r", 0, 255, 1, 0);
  formEffect.toggle("Hide Particle §8[Optional]", false);
  formEffect.toggle("§9Show Command Syntax", false);

  formEffect.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, effect, duration, amplifier, particle, syntax] =
      respond.formValues;

    let command = `effect ${target} ${typeEffect[effect]
      .replace(" ", "_")
      .toLowerCase()} ${duration} ${amplifier} ${particle}`;
    if (effect == 3) {
      command = `effect ${target} clear`;
      return;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Enchant(player) {
  let formEnchant = new ModalFormData();
  let typeEnchant = [
    "Aqua Affinity",
    "Bane of Arthropoth",
    "Blast Protection",
    "Channeling",
    "Curse of Binding",
    "Curse of Vanishing",
    "Depth Strider",
    "Efficiency",
    "Feather Falling",
    "Fire Aspect",
    "Flame",
    "Fortune",
    "Frost Walker",
    "Impaling",
    "Infinity",
    "Knockback",
    "Looting",
    "Loyalty",
    "Luck of the Sea",
    "Lure",
    "Mending",
    "Multishot",
    "Piercing",
    "Power",
    "Projectile Protection",
    "Protection",
    "Punch",
    "Quick Charge",
    "Respiration",
    "Riptide",
    "Sharpness",
    "Silk Touch",
    "Smite",
    "Soul Speed",
    "Swift Sneak",
    "Thorns",
    "Unbreaking",
  ];

  formEnchant.title("Enchant [/enchant]");
  formEnchant.textField("Target §g[Player]", "Target Selection", "@s");
  formEnchant.dropdown("Enchantment Type", typeEnchant);
  formEnchant.slider("Enchantment Level §8[Optional]§r", 1, 5, 1, 1);
  formEnchant.toggle("§9Show Command Syntax", false);

  formEnchant.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, type, level, syntax] = respond.formValues;

    let command = `enchant ${target} ${typeEnchant[type]
      .replace(" ", "_")
      .toLowerCase()} ${level}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Event(player) {
  let formEvent = new ModalFormData();

  formEvent.title("Event [/event]");
  formEvent.textField("Target §g[Entity]", "Target Selector");
  formEvent.textField("Entity Event", "Event");
  formEvent.toggle("§9Show Command Syntax", false);

  formEvent.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, event, syntax] = respond.formValues;

    let command = `event entity ${target} ${event}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Fill(player) {
  let formFill = new ModalFormData();
  let typeFillMode = ["replace", "destroy", "keep", "hollow", "outline"];

  formFill.title("Setblock [/setblock]");
  formFill.textField("1st Position §g[XYZ][~^]", "XYZ Position");
  formFill.textField("2nd Position §g[XYZ][~^]", "XYZ Position");
  formFill.textField("Block Name", "Block");
  formFill.textField("Data Value", "Aux or BlockState");
  formFill.dropdown("Setblock Mode", typeFillMode, 0);
  formFill.textField("Block Name §9[Replace Mode]§8[Optional]", "Block");
  formFill.textField(
    "Data Value §9[Replace Mode]§8[Optional]",
    "Aux or BlockState"
  );
  formFill.toggle("§9Show Command Syntax", false);

  formFill.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos1, pos2, block, data, mode, rblock, rdata, syntax] =
      respond.formValues;

    let command = `setblock ${pos1} ${pos2} ${block} ${data} ${typeFillMode[mode]}`;
    if (mode == 0) {
      command = `setblock ${pos1} ${pos2} ${block} ${data} replace ${rblock} ${rdata}`;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Fog(player) {
  let formFog = new ModalFormData();
  let typeFogMode = ["push", "pop", "remove"];

  formFog.title("Fog [/fog]");
  formFog.textField("Target §8[Player]", "Target Selector");
  formFog.dropdown(
    "Fog Mode\n§8[§c'Pop/Remove' (Remove)§8/§aPush (Add)§8]",
    typeFogMode
  );
  formFog.textField("Fog ID §9[For 'push' mode]", "Fog ID (minecraft:<fog>)");
  formFog.textField("Fog Name", "User Provided ID");
  formFog.toggle("§9Show Command Syntax", false);

  formFog.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, mode, type, name, syntax] = respond.formValues;

    let command = `fog ${target} ${typeFogMode[mode]} ${name}`;
    if (mode == 0) {
      command = `fog ${target} push ${type} ${name}`;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Function(player) {
  let formFunction = new ModalFormData();

  formFunction.title("Function [/function]");
  formFunction.textField(
    'Function File Path §9[Addon]\n§8Start from inside "functions" folder',
    "File Path"
  );
  formFunction.toggle("§9Show Command Syntax", false);

  formFunction.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [path, syntax] = respond.formValues;

    let command = `function ${path}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

// Gamemode: Syntax Can't Use
export function Gamemode(player) {
  let formGamemode = new ActionFormData();

  formGamemode.title("Gamemode [/gamemode]");
  formGamemode.body("Set the gamemode of player");
  formGamemode.button("Survival §9[0]");
  formGamemode.button("Creative §9[1]");
  formGamemode.button("Adventure §9[2]");
  formGamemode.button("Default §9[5]");
  formGamemode.button("Spectator §9[6][Leaked]");

  formGamemode.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let button = respond.selection;
    switch (button) {
      case 3:
        player.runCommand(`gamemode 5`);
        break;
      case 4:
        player.runCommand(`gamemode 6`);
        break;
      default:
        player.runCommand(`gamemode ${button}`);
        break;
    }
  });
}

export function Gamerule(player) {
  let formGamerule = new ModalFormData();
  let typeGamerule = [
    "commandBlocksEnable",
    "commandBlockOutput",
    "doDaylightCycle",
    "doEntityDrops",
    "doFireTick",
    "doInsomnia",
    "doImmendiateRespawn",
    "doMobLoot",
    "doMobSpawning",
    "doTileDrops",
    "doWeatherCycle",
    "drowningDamage",
    "fallDamage",
    "fireDamage",
    "freezeDamage",
    "§efunctionCommandLimit", // Index: 15
    "keepInventory",
    "§emaxCommandChainLenght", // Index: 17
    "mobGriefing",
    "naturalRegeneration",
    "pvp",
    "§erandomTickSpeed", // Index: 21
    "respawnBlocksExplode",
    "sendCommandFeedback",
    "showCoordinates",
    "showDeathMessages",
    "§espawnRadius", // Index: 26
    "tntExplodes",
    "showTags",
  ];

  formGamerule.title("Gamerule [/gamerule]");
  formGamerule.dropdown("Gamerule Type", typeGamerule);
  formGamerule.textField(
    "Value §g[Integer]§9[Yellow Gamemode Only]",
    "For some gamerule only"
  );
  formGamerule.toggle("Value §g[Boolean]", false);
  formGamerule.toggle("§9Show Command Syntax", false);

  formGamerule.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, int, bool, syntax] = respond.formValues;

    let command;
    switch (type) {
      case 15:
        command = `gamerule functionCommandLimit ${int}`;
        break;
      case 17:
        command = `gamerule maxCommandChainLenght ${int}`;
        break;
      case 21:
        if (Number(int) > 10) {
          command = gameruleWarnHighRTS(player, int);
          break;
        }
        command = `gamerule randomTickSpeed ${int}`;
        break;
      case 26:
        command = `gamerule spawnRadius ${int}`;
        break;
      default:
        command = `gamerule ${typeGamerule[type].toLowerCase()} ${bool}`;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Give(player) {
  let formGive = new ModalFormData();

  formGive.title("Give [/give]");
  formGive.textField("Target §g[Player]", "Target Selector");
  formGive.textField("Item ID", "Item Type");
  formGive.textField("Amount §8[Optional]", "Item Amount");
  formGive.textField("Data Values §8[Optional]", "Data Value [Int]");
  formGive.textField(
    "Item Component/Tag §8[Optional][Manual]",
    "JSON Component"
  );
  formGive.toggle("§9Show Command Syntax", false);

  formGive.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, item, amount, data, component, syntax] = respond.formValues;

    let command = `give ${target} ${item} ${amount} ${data} ${component}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Kick(player) {
  let formKick = new ModalFormData();

  formKick.title("Kick [/kick]");
  formKick.textField("Target §g[Entity]", "Target Selector");
  formKick.textField("Kick Reason §8[Optional]", "Reason");
  formKick.toggle("§9Show Command Syntax", false);

  formKick.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, reason, syntax] = respond.formValues;

    let command = `kick ${target} ${reason}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Kill(player) {
  let formKill = new ModalFormData();

  formKill.title("Kill [/kill]");
  formKill.textField("Target §g[Entity]§8[Optional]", "Target Selector");
  formKill.toggle("§9Show Command Syntax", false);

  formKill.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, syntax] = respond.formValues;

    let command = `kill ${target}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Locate(player) {
  let formLocate = new ModalFormData();
  let typeLocate = [
    "Ancient City",
    "Bastion Remnant",
    "Buried Treasure",
    "Endcity",
    "Fortress",
    "Mansion",
    "Mineshaft",
    "Monument",
    "Ruins",
    "Pillager Outpost",
    "Ruined Portal",
    "Shipwreck",
    "Stronghold",
    "Temple",
    "Village",
  ];

  formLocate.title("Locate [/locate]");
  formLocate.dropdown("Structure Type", typeLocate);
  formLocate.toggle("New Chunk Search", false);
  formLocate.toggle("§9Show Command Syntax", false);

  formLocate.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [structure, chunk, syntax] = respond.formValues;

    let command = `locate ${typeLocate[structure]
      .replace(" ", "")
      .toLowerCase()} ${chunk}`;
    let message = player.runCommand(command);
    Print(message.statusMessage, "normal", player.name);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Loot(player) {
  let formLoot = new ModalFormData();
  let typeLoot = ["Spawn", "Give", "Insert"];

  formLoot.title("Loot [/loot]");
  formLoot.dropdown("Loot Type", typeLoot, 0);
  formLoot.textField("Position §g[XYZ]§r/Target §g[Entity]", "Position/Target");
  formLoot.textField(
    'Loot Tables §9[Addon]\n§8Start from inside "loot_tables" folder',
    "Path"
  );
  formLoot.toggle("Loot Mode\n§8[§cLoot§8/§aKill§8]", false);
  formLoot.toggle("Tool §8[Optional]\n[§cOffhand§8/§aMainhand§8]", true);
  formLoot.toggle("§9Show Command Syntax", false);

  formLoot.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, target, path, kill, hand, syntax] = respond.formValues;

    let killType = "loot";
    if (kill) {
      killType = "kill";
    }

    let handType = "offhand";
    if (hand) {
      handType = "mainhand";
    }

    let command = `loot ${typeLoot[type]} ${target} ${killType} "${path}" ${handType}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Mobevent(player) {
  let formMobevent = new ModalFormData();
  let typeMobevent = [
    "minecraft:pillager_patrols_event",
    "minecraft:wandering_trader_event",
    "events_enabled",
  ];

  formMobevent.title("Mobevent [/mobevent]");
  formMobevent.dropdown("Mob Event Type", typeMobevent);
  formMobevent.toggle("Value §g[Boolean]", true);
  formMobevent.toggle("§9Show Command Syntax", false);

  formMobevent.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, value, syntax] = respond.formValues;

    let command = `mobevent ${typeMobevent[type]} ${value}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Music(player) {
  let formMusic = new ModalFormData();
  let typeMusic = ["play", "queue", "stop", "volume"];

  formMusic.title("Music [/music]");
  formMusic.dropdown(
    "Music Mode\n§9'Stop' Mode use fade stop\n'Volume' Mode use volume only",
    typeMusic
  );
  formMusic.textField("Track Name", "Music Name");
  formMusic.textField("Volume §9[Float]§8[Optional]", "Volume", "1.0");
  formMusic.slider("Fade In/Out §9[Second]§8[Optional]§r", 1, 10, 1, 1);
  formMusic.toggle("Repeat Mode\n§8[§cPlay Once§8/§aLoop§8]", false);
  formMusic.toggle("§9Show Command Syntax", false);

  formMusic.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [mode, name, volume, fade, repeat, syntax] = respond.formValues;

    let repeatMode = "play_once";
    if (repeat) {
      repeatMode = "loop";
    }

    let command = `music ${typeMusic[mode]} ${name} ${volume} ${fade} ${repeatMode}`;
    if (mode == 2) {
      command = `music stop ${fade}`;
    } else if (mode == 3) {
      command = `music volume ${volume}`;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Particle(player) {
  let formParticle = new ModalFormData();

  formParticle.title("Particle [/particle]");
  formParticle.textField("Particle ID", "Particle");
  formParticle.textField("1st Position §g[XYZ][~^]", "XYZ Position");
  formParticle.toggle("§9Show Command Syntax", false);

  formParticle.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [particle, pos, syntax] = respond.formValues;

    let command = `particle ${particle} ${pos}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Playanimation(player) {
  let formPlayanimation = new ModalFormData();

  formPlayanimation.title("Playanimation [/playanimation]");
  formPlayanimation.textField("Target §g[Player]", "Target Selector");
  formPlayanimation.textField("Animation ID", "Animation");
  formPlayanimation.textField("Next State §8[Optional]", "Animation");
  formPlayanimation.textField(
    "Blend Out Time §g[Float]§8[Optional]",
    "Animation"
  );
  formPlayanimation.textField("Stop Expression §8[Optional]", "Animation");
  formPlayanimation.textField("Controller §8[Optional]", "Animation");
  formPlayanimation.toggle("§9Show Command Syntax", false);

  formPlayanimation.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, animation, state, blend, stop, controller, syntax] =
      respond.formValues;

    let command = `playanimation ${target} ${animation} ${state} ${blend} ${stop} ${controller}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Replaceitem(player) {
  let formReplaceitem = new ModalFormData();
  let typeReplaceitem = [
    "slot.weapon.mainhand",
    "slot.weapon.offhand",
    "slot.armor.head",
    "slot.armor.chest",
    "slot.armor.legs",
    "slot.armor.feet",
    "slot.hotbar",
    "slot.inventory",
    "slot.enderchest",
    "slot.saddle",
    "slot.armor",
    "slot.chest",
    "slot.equippable",
  ];

  formReplaceitem.title("Replaceitem [/replaceitem]");
  formReplaceitem.toggle("Target Type\n§8[§cBlock§8/§aEntity§8]", true);
  formReplaceitem.textField(
    "Position §g[XYZ]§r/Target §g[Entity]",
    "Coodinate/Target Selector"
  );
  formReplaceitem.dropdown("Inv. Slot Container", typeReplaceitem);
  formReplaceitem.textField("Inv. Slot ID", "Slot ID");
  formReplaceitem.toggle("Replace Mode\n§8[§cKeep§8/§aDestroy§8]", true);
  formReplaceitem.textField("Item", "Item Type");
  formReplaceitem.slider("Amount §8[Optional]§r", 1, 64, 1, 1);
  formReplaceitem.textField("Data Values §8[Optional]", "Data Value [Int]");
  formReplaceitem.textField(
    "Item Component/Tag §8[Optional][Manual]",
    "JSON Component"
  );
  formReplaceitem.toggle("§9Show Command Syntax", false);

  formReplaceitem.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [be, postgt, container, id, mode, item, amount, data, tag, syntax] =
      respond.formValues;

    let target = "block";
    if (be) {
      target = "entity";
    }

    let replaceMode = "keep";
    if (mode) {
      replaceMode = "destroy";
    }

    let command = `replaceitem ${target} ${postgt} ${typeReplaceitem[container]} ${id} ${replaceMode} ${item} ${amount} ${data} ${tag}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

// Scoreboard: Unavailable Yet
export function Scoreboard(player) {
  let formScoreboard = new MessageFormData();

  formScoreboard.title("Scoreboard [/scoreboard]");
  formScoreboard.body(
    "Choose one of these option, scoreboard objective or players"
  );
  formScoreboard.button1("Objectives");
  formScoreboard.button2("Players");

  formScoreboard.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let select = respond.selection;
    if (select == 1) {
      ScoreboardConsC.ScoreboardObjectivesIndex(player);
    } else {
      ScoreboardConsC.ScoreboardPlayersIndex(player);
    }
  });
}

export function Setblock(player) {
  let formSetblock = new ModalFormData();
  let typeSetblockMode = ["replace", "destroy", "keep"];

  formSetblock.title("Setblock [/setblock]");
  formSetblock.textField("Position §g[XYZ][~^]", "XYZ Position");
  formSetblock.textField("Block Name", "Block");
  formSetblock.textField("Data Value", "Aux or BlockState", "0");
  formSetblock.dropdown("Setblock Mode", typeSetblockMode, 0);
  formSetblock.toggle("§9Show Command Syntax", false);

  formSetblock.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos, block, data, mode, syntax] = respond.formValues;

    let command = `setblock ${pos} ${block} ${data} ${typeSetblockMode[mode]}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Setworldspawn(player) {
  let formSetworldspawn = new ModalFormData();

  formSetworldspawn.title("Set World Spawn [/setworldspawn]");
  formSetworldspawn.textField(
    "Spawn Position §g[XYZ][~^]§8[Optional]",
    "XYZ Position"
  );
  formSetworldspawn.toggle("§9Show Command Syntax", false);

  formSetworldspawn.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos, syntax] = respond.formValues;

    let command = `setworldspawn ${pos}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Spawnpoint(player) {
  let formSpawnpoint = new ModalFormData();

  formSpawnpoint.title("Spawnpoint [/spawnpoint]");
  formSpawnpoint.toggle("Spawnpoint Mode\n§8[§cRemove§8/§aAdd§8]", true);
  formSpawnpoint.textField("Target §g[Player]§8[Optional]", "Target Selector");
  formSpawnpoint.textField(
    "Spawn Position §g[XYZ][~^]\n§9[Add Mode]§8[Optional]",
    "XYZ Position"
  );
  formSpawnpoint.toggle("§9Show Command Syntax", false);

  formSpawnpoint.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [mode, target, pos, syntax] = respond.formValues;

    let command = `spawnpoint ${target} ${pos}`;
    if (!mode) {
      command = `clearspawnpoint ${target}`;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Spreadplayers(player) {
  let formSpreadplayers = new ModalFormData();

  formSpreadplayers.title("Spread Players [/spreadplayers]");
  formSpreadplayers.textField("Position §g[XZ][~^]", "XZ Position");
  formSpreadplayers.textField("Min. Spread Distance §g[Float]", "Min Range");
  formSpreadplayers.textField("Max. Spread Distance §g[Float]", "Max Range");
  formSpreadplayers.textField("Target §g[Entity]", "Target Selector");
  formSpreadplayers.toggle("§9Show Command Syntax", false);

  formSpreadplayers.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos, min, max, target, syntax] = respond.formValues;

    let command = `spreadplayers ${pos} ${min} ${max} ${target}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Summon(player) {
  let formSummon = new ModalFormData();

  formSummon.title("Summon [/summon]");
  formSummon.textField("Entity Type", "Entity");
  formSummon.textField("Position §g[XYZ][~^]§8[Optional]", "Coordinate");
  formSummon.textField(
    "Entity Pre-Name §8[Optional]\nCan be empty even 'Event' specify",
    "Name"
  );
  formSummon.textField("Entity Event §8[Optional]", "Event");
  formSummon.toggle("§9Show Command Syntax", false);

  formSummon.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, pos, name, event, syntax] = respond.formValues;

    let command = `summon ${type} ${pos} ${event} ${name}`;
    if (event == "" && name != "") {
      command = `summon ${type} ${name} ${pos}`;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Tag(player) {
  let formTag = new ModalFormData();
  let typeTag = ["Add", "Remove", "List"];

  formTag.title("Tag [/tag]");
  formTag.textField("Target §g[Entity]", "Target Selector");
  formTag.dropdown("Tag Type", typeTag);
  formTag.textField("Tag Name", "Name of the tag");
  formTag.toggle("§9Show Command Syntax", false);

  formTag.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, type, name, syntax] = respond.formValues;

    let command = `tag ${target} ${typeTag[type]} ${name}`;
    if (type == 2) {
      command = `tag ${target} list`;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

//Time: Need Changes
export function Time(player) {
  let formTime = new ActionFormData();

  formTime.title("Time [/time set]");
  formTime.body("Set the time of world");
  formTime.button("Sunrise [06.00]");
  formTime.button("Day [12.00]");
  formTime.button("Sunset [18.00]");
  formTime.button("Midnight [24.00]");

  formTime.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let button = respond.selection;
    switch (button) {
      case 0:
        player.runCommand(`time set 0`);
        break;
      case 1:
        player.runCommand(`time set 6000`);
        break;
      case 2:
        player.runCommand(`time set 12000`);
        break;
      case 3:
        player.runCommand(`time set 18000`);
        break;
    }
  });
}

export function Weather(player) {
  let formWeather = new ModalFormData();
  let typeWeather = ["Clear", "Rain", "Thunder"];

  formWeather.title("Weather [/weather]");
  formWeather.dropdown("Weather Type", typeWeather);
  formWeather.textField("Duration §g[Second]§8[Optional]", "Duration");
  formWeather.toggle("§9Show Command Syntax", false);

  formWeather.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, duration, syntax] = respond.formValues;

    let command = `weather ${typeWeather[type]} ${duration}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function XP(player) {
  let formXP = new ModalFormData();

  formXP.title("XP [/xp]");
  formXP.textField("XP Amount", "Amount");
  formXP.toggle("Amount Type\n§8[§cPoints§8/§aLevels§8]", false);
  formXP.textField("Target §g[Player]§8[Optional]", "Target Selector");
  formXP.toggle("§9Show Command Syntax", false);

  formXP.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [amount, level, target, syntax] = respond.formValues;

    let command = `xp ${amount} ${target}`;
    if (level) {
      command = `xp ${amount}L ${target}`;
    }
    player.runCommand();

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

function gameruleWarnHighRTS(player, ticks) {
  let warnForm = new MessageFormData();

  warnForm.title("[Warning] High RTS");
  warnForm.body(
    `Warning!\nYou put random tick speed is ${ticks} (Higher than 10). High random tick speed can cause the world lag.\nYou want to continue to change?`
  );
  warnForm.button1("Continue");
  warnForm.button2("Cancel");

  warnForm.show(player).then((respond) => {
    let select = respond.selection;
    if (respond.isCanceled || select == 0) {
      Print("You canceled the changes", "normal", player.name);
      return;
    }
  });
  return `gamerule randomtickspeed ${ticks}`;
}
