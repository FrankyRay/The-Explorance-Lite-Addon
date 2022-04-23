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
import * as StructureConsC from "./StructureConsoleC.js";
import * as TestforConsC from "./TestforConsoleC.js";

const Overworld = world.getDimension("overworld");

export function Ability(player) {
  let typeAbility = ["mayfly", "mute", "worldbuilder"];
  let formAbility = new ModalFormData()
    .title("Ability [/ability]")
    .dropdown("Ability Type", typeAbility, 0)
    .toggle("Value", true)
    .toggle("§9Show Command Syntax", false);

  formAbility.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, bool, syntax] = respond.formValues;

    let command = `ability ${typeAbility[type]} ${bool}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Camerashake(player) {
  let formCameraShake = new ModalFormData()
    .title("Camera Shake [/camerashake]")
    .toggle("CS Mode §8[§cRemove§8/§aAdd§8]\n{Remove - Use Target Only}", true)
    .textField("Target §g[Player]", "Target Selector")
    .slider("Intensity Shake", 0, 4, 1, 1)
    .textField("Duration §g[Seconds]", "Duration")
    .toggle("Shake Type §8[§cPositional§8/§aRotational§8]")
    .toggle("§9Show Command Syntax", false);

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
  let formClear = new ModalFormData()
    .title("Clear [/clear]")
    .textField("Target §g[Player]§8[Optional]", "Target Selector")
    .textField("Item ID §8[Optional]", "Item ID")
    .textField("Item Data §8[Optional]", "Data Value [Int]")
    .textField("Amount §9[Max]§8[Optional]", "Amount")
    .toggle("§9Show Command Syntax", false);

  formClear.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, item, data, amount, syntax] = respond.formValues;

    let command = `clear ${target} ${item} ${data} ${amount}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Clone(player) {
  let modeCloneMask = ["replace", "masked", "filtered"];
  let modeCloneType = ["normal", "force", "move"];
  let formClone = new ModalFormData()
    .title("Clone [/clone]")
    .textField("1st Position §g[XYZ][~^]", "XYZ Position")
    .textField("2nd Position §g[XYZ][~^]", "XYZ Position")
    .textField("Destination Position §g[XYZ][~^]", "XYZ Position")
    .dropdown("Mask Mode", modeCloneMask)
    .dropdown("Clone Mode §9[Replace/Masked Mode]", modeCloneType)
    .textField("Block Name §9[Filtered Mode]", "Block")
    .textField("Data Value §9[Filtered Mode]", "Aux or BlockState")
    .toggle("§9Show Command Syntax", false);

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
  let formDamage = new ModalFormData()
    .title("Damage [/damage]")
    .textField("Target §g[Entity]", "Target Selector", "@s")
    .textField("Damage Amount", "Damage Value", "1")
    .dropdown("Damage Type §8[Optional]", typeDamage)
    .textField("Damager §g[1 Entity]§9[c=1]§8[Optional]", "Target Selector")
    .toggle("§9Show Command Syntax", false);

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
  let formDifficulty = new ActionFormData()
    .title("Difficulty [/difficulty]")
    .body("Select your difficulty")
    .button("Peaceful §9[0]")
    .button("Easy §9[1]")
    .button("Normal §9[2]")
    .button("Hard §9[3]");

  formDifficulty.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let button = respond.selection;

    player.runCommand(`difficulty ${button}`);
  });
}

export function Effect(player) {
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
  let formEffect = new ModalFormData()
    .title("Effect [/effect]")
    .textField("Target §g[Entity]", "Target Selector")
    .dropdown("Effect Type", typeEffect)
    .textField("Duration §g[Second]§8[Optional]", "Duration", "30")
    .slider("Amplifier §8[Optional]§r", 0, 255, 1, 0)
    .toggle("Hide Particle §8[Optional]", false)
    .toggle("§9Show Command Syntax", false);

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
  let formEnchant = new ModalFormData()
    .title("Enchant [/enchant]")
    .textField("Target §g[Player]", "Target Selection", "@s")
    .dropdown("Enchantment Type", typeEnchant)
    .slider("Enchantment Level §8[Optional]§r", 1, 5, 1, 1)
    .toggle("§9Show Command Syntax", false);

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
  let formEvent = new ModalFormData()
    .title("Event [/event]")
    .textField("Target §g[Entity]", "Target Selector")
    .textField("Entity Event", "Event")
    .toggle("§9Show Command Syntax", false);

  formEvent.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, event, syntax] = respond.formValues;

    let command = `event entity ${target} ${event}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Fill(player) {
  let typeFillMode = ["replace", "destroy", "keep", "hollow", "outline"];
  let formFill = new ModalFormData()
    .title("Setblock [/setblock]")
    .textField("1st Position §g[XYZ][~^]", "XYZ Position")
    .textField("2nd Position §g[XYZ][~^]", "XYZ Position")
    .textField("Block Name", "Block")
    .textField("Data Value", "Aux or BlockState")
    .dropdown("Setblock Mode", typeFillMode, 0)
    .textField("Block Name §9[Replace Mode]§8[Optional]", "Block")
    .textField("Data Value §9[Replace Mode]§8[Optional]", "Aux or BlockState")
    .toggle("§9Show Command Syntax", false);

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
  let typeFogMode = ["push", "pop", "remove"];
  let formFog = new ModalFormData()
    .title("Fog [/fog]")
    .textField("Target §8[Player]", "Target Selector")
    .dropdown(
      "Fog Mode\n§8[§c'Pop/Remove' (Remove)§8/§aPush (Add)§8]",
      typeFogMode
    )
    .textField("Fog ID §9[For 'push' mode]", "Fog ID (minecraft:<fog>)")
    .textField("Fog Name", "User Provided ID")
    .toggle("§9Show Command Syntax", false);

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
  let formFunction = new ModalFormData()
    .title("Function [/function]")
    .textField(
      'Function File Path §9[Addon]\n§8Start from inside "functions" folder',
      "File Path"
    )
    .toggle("§9Show Command Syntax", false);

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
  let formGamemode = new ActionFormData()
    .title("Gamemode [/gamemode]")
    .body("Set the gamemode of player")
    .button("Survival §9[0]")
    .button("Creative §9[1]")
    .button("Adventure §9[2]")
    .button("Default §9[5]")
    .button("Spectator §9[6][Leaked]");

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
  let formGamerule = new ModalFormData()
    .title("Gamerule [/gamerule]")
    .dropdown("Gamerule Type", typeGamerule)
    .textField(
      "Value §g[Integer]§9[Yellow Gamemode Only]",
      "For some gamerule only"
    )
    .toggle("Value §g[Boolean]", false)
    .toggle("§9Show Command Syntax", false);

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
  let formGive = new ModalFormData()
    .title("Give [/give]")
    .textField("Target §g[Player]", "Target Selector")
    .textField("Item ID", "Item Type")
    .textField("Amount §8[Optional]", "Item Amount")
    .textField("Data Values §8[Optional]", "Data Value [Int]")
    .textField("Item Component/Tag §8[Optional][Manual]", "JSON Component")
    .toggle("§9Show Command Syntax", false);

  formGive.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, item, amount, data, component, syntax] = respond.formValues;

    let command = `give ${target} ${item} ${amount} ${data} ${component}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Kick(player) {
  let formKick = new ModalFormData()
    .title("Kick [/kick]")
    .textField("Target §g[Entity]", "Target Selector")
    .textField("Kick Reason §8[Optional]", "Reason")
    .toggle("§9Show Command Syntax", false);

  formKick.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, reason, syntax] = respond.formValues;

    let command = `kick ${target} ${reason}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Kill(player) {
  let formKill = new ModalFormData()
    .title("Kill [/kill]")
    .textField("Target §g[Entity]§8[Optional]", "Target Selector")
    .toggle("§9Show Command Syntax", false);

  formKill.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, syntax] = respond.formValues;

    let command = `kill ${target}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Locate(player) {
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
  let formLocate = new ModalFormData()
    .title("Locate [/locate]")
    .dropdown("Structure Type", typeLocate)
    .toggle("New Chunk Search", false)
    .toggle("§9Show Command Syntax", false);

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
  let typeLoot = ["Spawn", "Give", "Insert"];
  let formLoot = new ModalFormData()
    .title("Loot [/loot]")
    .dropdown("Loot Type", typeLoot, 0)
    .textField("Position §g[XYZ]§r/Target §g[Entity]", "Position/Target")
    .textField(
      'Loot Tables §9[Addon]\n§8Start from inside "loot_tables" folder',
      "Path"
    )
    .toggle("Loot Mode\n§8[§cLoot§8/§aKill§8]", false)
    .toggle("Tool §8[Optional]\n[§cOffhand§8/§aMainhand§8]", true)
    .toggle("§9Show Command Syntax", false);

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
  let typeMobevent = [
    "minecraft:pillager_patrols_event",
    "minecraft:wandering_trader_event",
    "events_enabled",
  ];
  let formMobevent = new ModalFormData()
    .title("Mobevent [/mobevent]")
    .dropdown("Mob Event Type", typeMobevent)
    .toggle("Value §g[Boolean]", true)
    .toggle("§9Show Command Syntax", false);

  formMobevent.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, value, syntax] = respond.formValues;

    let command = `mobevent ${typeMobevent[type]} ${value}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Music(player) {
  let typeMusic = ["play", "queue", "stop", "volume"];
  let formMusic = new ModalFormData()
    .title("Music [/music]")
    .dropdown(
      "Music Mode\n§9'Stop' Mode use fade stop\n'Volume' Mode use volume only",
      typeMusic
    )
    .textField("Track Name", "Music Name")
    .slider("Volume §9[Percentage]§8[Optional]", 0, 100, 1, 100)
    .slider("Fade In/Out §9[Second]§8[Optional]§r", 1, 10, 1, 1)
    .toggle("Repeat Mode\n§8[§cPlay Once§8/§aLoop§8]", false)
    .toggle("§9Show Command Syntax", false);

  formMusic.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [mode, name, volumearg, fade, repeat, syntax] = respond.formValues;

    let volume = volumearg / 100;
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
  let formParticle = new ModalFormData()
    .title("Particle [/particle]")
    .textField("Particle ID", "Particle")
    .textField("1st Position §g[XYZ][~^]", "XYZ Position")
    .toggle("§9Show Command Syntax", false);

  formParticle.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [particle, pos, syntax] = respond.formValues;

    let command = `particle ${particle} ${pos}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Playanimation(player) {
  let formPlayanimation = new ModalFormData()
    .title("Playanimation [/playanimation]")
    .textField("Target §g[Player]", "Target Selector")
    .textField("Animation ID", "Animation")
    .textField("Next State §8[Optional]", "Animation")
    .textField("Blend Out Time §g[Float]§8[Optional]", "Animation")
    .textField("Stop Expression §8[Optional]", "Animation")
    .textField("Controller §8[Optional]", "Animation")
    .toggle("§9Show Command Syntax", false);

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
  let formReplaceitem = new ModalFormData()
    .title("Replaceitem [/replaceitem]")
    .toggle("Target Type\n§8[§cBlock§8/§aEntity§8]", true)
    .textField(
      "Position §g[XYZ]§r/Target §g[Entity]",
      "Coodinate/Target Selector"
    )
    .dropdown("Inv. Slot Container", typeReplaceitem)
    .textField("Inv. Slot ID", "Slot ID")
    .toggle("Replace Mode\n§8[§cKeep§8/§aDestroy§8]", true)
    .textField("Item", "Item Type")
    .slider("Amount §8[Optional]§r", 1, 64, 1, 1)
    .textField("Data Values §8[Optional]", "Data Value [Int]")
    .textField("Item Component/Tag §8[Optional][Manual]", "JSON Component")
    .toggle("§9Show Command Syntax", false);

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

export function Scoreboard(player) {
  let formScoreboard = new MessageFormData()
    .title("Scoreboard [/scoreboard]")
    .body("Choose one of these option, scoreboard objective or players")
    .button1("Objectives")
    .button2("Players");

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
  let typeSetblockMode = ["replace", "destroy", "keep"];
  let formSetblock = new ModalFormData()
    .title("Setblock [/setblock]")
    .textField("Position §g[XYZ][~^]", "XYZ Position")
    .textField("Block Name", "Block")
    .textField("Data Value", "Aux or BlockState", "0")
    .dropdown("Setblock Mode", typeSetblockMode, 0)
    .toggle("§9Show Command Syntax", false);

  formSetblock.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos, block, data, mode, syntax] = respond.formValues;

    let command = `setblock ${pos} ${block} ${data} ${typeSetblockMode[mode]}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Setworldspawn(player) {
  let formSetworldspawn = new ModalFormData()
    .title("Set World Spawn [/setworldspawn]")
    .textField("Spawn Position §g[XYZ][~^]§8[Optional]", "XYZ Position")
    .toggle("§9Show Command Syntax", false);

  formSetworldspawn.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos, syntax] = respond.formValues;

    let command = `setworldspawn ${pos}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Sound(player) {
  let formSound = new ModalFormData()
    .title("Sound [/playsound & /stopsound]")
    .toggle(
      "Sound Mode §8[§cStop§8/§aPlay§8]\n{Stop - Use Target & Sound}",
      true
    )
    .textField("Sound ID §8[Stop: Optional]", "Sound")
    .textField("Target §g[Player]§8[Play: Optional]", "Target Selector")
    .textField("Position §g[XYZ][~^]§8[Optional]", "XYZ Position")
    .slider("Volume §9[Percentage]§8[Optional]", 0, 100, 1, 100)
    .slider("Pitch §8[Optional]", 0, 256, 1, 1)
    .slider("Minimum Volume §9[Percentage]§8[Optional]", 0, 100, 1, 100)
    .toggle("§9Show Command Syntax", false);

  formSound.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [mode, sound, target, pos, volumearg, pitch, minVolumearg, syntax] =
      respond.formValues;

    let volume = volumearg / 100;
    let minVolume = minVolumearg / 100;

    let command = `playsound ${sound} ${target} ${pos} ${volume} ${pitch} ${minVolume}`;
    if (!mode) {
      command = `stopsound ${target} ${sound}`;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Spawnpoint(player) {
  let formSpawnpoint = new ModalFormData()
    .title("Spawnpoint [/spawnpoint]")
    .toggle("Spawnpoint Mode\n§8[§cRemove§8/§aAdd§8]", true)
    .textField("Target §g[Player]§8[Optional]", "Target Selector")
    .textField(
      "Spawn Position §g[XYZ][~^]\n§9[Add Mode]§8[Optional]",
      "XYZ Position"
    )
    .toggle("§9Show Command Syntax", false);

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
  let formSpreadplayers = new ModalFormData()
    .title("Spread Players [/spreadplayers]")
    .textField("Position §g[XZ][~^]", "XZ Position")
    .textField("Min. Spread Distance §g[Float]", "Min Range")
    .textField("Max. Spread Distance §g[Float]", "Max Range")
    .textField("Target §g[Entity]", "Target Selector")
    .toggle("§9Show Command Syntax", false);

  formSpreadplayers.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos, min, max, target, syntax] = respond.formValues;

    let command = `spreadplayers ${pos} ${min} ${max} ${target}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Structure(player) {
  let formStructure = new ActionFormData()
    .title("Structure [/structure]")
    .body("Select structure mode")
    .button("Save")
    .button("Load")
    .button("Delete");

  formStructure.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let button = respond.formValues;

    let command, syntax;
    switch (button) {
      case 0:
        [command, syntax] = StructureConsC.StructureSave(player);
        break;
      case 1:
        [command, syntax] = StructureConsC.StructureLoad(player);
        break;
      case 2:
        [command, syntax] = StructureConsC.StructureDelete(player);
        break;
    }
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Summon(player) {
  let formSummon = new ModalFormData()
    .title("Summon [/summon]")
    .textField("Entity Type", "Entity")
    .textField("Position §g[XYZ][~^]§8[Optional]", "Coordinate")
    .textField(
      "Entity Pre-Name §8[Optional]\nCan be empty even 'Event' specify",
      "Name"
    )
    .textField("Entity Event §8[Optional]", "Event")
    .toggle("§9Show Command Syntax", false);

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
  let typeTag = ["Add", "Remove", "List"];
  let formTag = new ModalFormData()
    .title("Tag [/tag]")
    .textField("Target §g[Entity]", "Target Selector")
    .dropdown("Tag Type", typeTag)
    .textField("Tag Name", "Name of the tag")
    .toggle("§9Show Command Syntax", false);

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

export function Teleport(player) {
  let formTeleport = new ModalFormData()
    .title("Teleport [/teleport]")
    .textField("Victim §g[Entity]§8[Optional]", "Target Selector")
    .textField("Position §g[XYZ]§r/Target §g[Entity]", "Position/Target")
    .toggle("Facing Argument §8[Optional]", false)
    .toggle("Check For Block", false)
    .toggle("§9Show Command Syntax", false);

  formTeleport.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [victim, postgt, facing, block, syntax] = respond.formValues;

    let facingArgument;
    if (facing) {
      facingArgument = teleportFacing(player);
    }
    let command = `tp ${victim} ${postgt} ${facingArgument}${block}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function Testfor(player) {
  let formTestfor = new ActionFormData()
    .title("Testfor Family")
    .body("Select any of these commands")
    .button("Entity [/testfor]")
    .button("Block (Single) [/testforblock]")
    .button("Entity (Area) [/testforblocks]");

  formTestfor.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let selection = respond.selection;

    let command, syntax;
    switch (selection) {
      case 0:
        [command, syntax] = TestforConsC.Testforentity(player);
        break;
      case 1:
        [command, syntax] = TestforConsC.Testforblock(player);
        break;
      case 2:
        [command, syntax] = TestforConsC.Testforblocks(player);
        break;
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
  let typeWeather = ["Clear", "Rain", "Thunder"];
  let formWeather = new ModalFormData()
    .title("Weather [/weather]")
    .dropdown("Weather Type", typeWeather)
    .textField("Duration §g[Second]§8[Optional]", "Duration")
    .toggle("§9Show Command Syntax", false);

  formWeather.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, duration, syntax] = respond.formValues;

    let command = `weather ${typeWeather[type]} ${duration}`;
    player.runCommand(command);

    if (syntax) Print(command, "consc", `"${player.name}"`);
  });
}

export function XP(player) {
  let formXP = new ModalFormData()
    .title("XP [/xp]")
    .textField("XP Amount", "Amount")
    .toggle("Amount Type\n§8[§cPoints§8/§aLevels§8]", false)
    .textField("Target §g[Player]§8[Optional]", "Target Selector")
    .toggle("§9Show Command Syntax", false);

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
  let warnForm = new MessageFormData()
    .title("[Warning] High RTS")
    .body(
      `Warning!\nYou put random tick speed is ${ticks} (Higher than 10). High random tick speed can cause the world lag.\nYou want to continue to change?`
    )
    .button1("Continue")
    .button2("Cancel");

  warnForm.show(player).then((respond) => {
    let select = respond.selection;
    if (respond.isCanceled || select == 0) {
      Print("Command abort", "normal", player.name);
      return;
    }
  });
  return `gamerule randomtickspeed ${ticks}`;
}

function teleportFacing(player) {
  let facingArgument;
  let formFacingTP = new ModalFormData()
    .title("Teleport Facing")
    .toggle("Facing Type §8[§cRotation§8/§aPosition/Target§8]", false)
    .textField(
      "Rotation §g[XZ Rot]§r\nPosition §g[XYZ]§r\nTarget §g[Entity]§8[Optional]",
      "Rotation/Position/Target"
    );

  formFacingTP.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, arg] = respond.formValues;

    facingArgument = `${arg} `;
    if (type) {
      facingArgument = `facing ${arg} `;
    }
  });
  return facingArgument;
}
