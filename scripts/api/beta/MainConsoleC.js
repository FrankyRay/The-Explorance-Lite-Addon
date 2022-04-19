import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../PrintMessage.js";

const Overworld = world.getDimension("overworld");

export function Ability(player) {
  let typeAbility = ["mayfly", "mute", "worldbuilder"];
  let formAbility = new ModalFormData();

  formAbility.title("Ability [/ability]");
  formAbility.dropdown("Ability Type", typeAbility, 0);
  formAbility.toggle("Value", true);

  formAbility.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [type, bool] = respond.formValues;
    player.runCommand(`ability ${typeAbility[type]} ${bool}`);
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

  formCameraShake.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [play, target, intensity, duration, type] = respond.formValues;
    if (!play) {
      player.runCommand(`camerashake stop ${target}`);
      return;
    }
    if (type) {
      type = "Rotational";
    } else {
      type = "Positional";
    }

    player.runCommand(
      `camerashake add ${target} ${intensity} ${duration} ${type}`
    );
  });
}

export function Clear(player) {
  let formClear = new ModalFormData();

  formClear.title("Clear [/clear]");
  formClear.textField("Target §g[Player]§8[Optional]", "Target Selector");
  formClear.textField("Item ID §8[Optional]", "Item ID");
  formClear.textField("Item Data §8[Optional]", "Data Value [Int]");
  formClear.textField("Amount §9[Max]§8[Optional]", "Amount");

  formClear.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target, item, data, amount] = respond.formValues;
    player.runCommand(`clear ${target} ${item} ${data} ${amount}`);
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

  formDamage.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target, amount, type, damager] = respond.formValues;
    player.runCommand(
      `damage ${target} ${amount} ${typeDamage[type]} ${damager}`
    );
  });
}

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

  formEffect.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target, effect, duration, amplifier, particle] = respond.formValues;
    if (effect == 3) {
      player.runCommand(`effect ${target} clear`);
      return;
    }
    player.runCommand(
      `effect ${target} ${typeEffect[effect].replace(
        " ",
        "_"
      )} ${duration} ${amplifier} ${particle}`
    );
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

  formEnchant.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target, type, level] = respond.formValues;
    player.runCommand(
      `enchant ${target} ${typeEnchant[type].replace(" ", "_")} ${level}`
    );
  });
}

export function Fill(player) {
  let formFill = new ModalFormData();
  let typeFillMode = ["replace", "destroy", "keep", "hollow", "outline"];

  formFill.title("Setblock [/setblock]");
  formFill.textField(
    "Position 1 §g[XYZ]§9[Relative/Local]",
    "3 Points Position"
  );
  formFill.textField(
    "Position 2 §g[XYZ]§9[Relative/Local]",
    "3 Points Position"
  );
  formFill.textField("Block Name", "Block");
  formFill.textField("Data Value", "Aux or BlockState");
  formFill.dropdown("Setblock Mode", typeFillMode, 0);
  formFill.textField("Block Name §9[Replace Mode]§8[Optional]", "Block");
  formFill.textField(
    "Data Value §9[Replace Mode]§8[Optional]",
    "Aux or BlockState"
  );

  formFill.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [pos1, pos2, block, data, mode, rblock, rdata] = respond.formValues;
    if (mode == 0 && rblock == "") {
      player.runCommand(`setblock ${pos1} ${pos2} ${block} ${data}`);
      return;
    } else if (mode == 0 && rblock != "") {
      player.runCommand(
        `setblock ${pos1} ${pos2} ${block} ${data} replace ${rblock} ${rdata}`
      );
      return;
    }
    player.runCommand(
      `setblock ${pos1} ${pos2} ${block} ${data} ${typeFillMode[mode]}`
    );
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

  formFog.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target, mode, type, name] = respond.formValues;
    if (mode == 0) {
      player.runCommand(`fog ${target} push ${type} ${name}`);
      return;
    }
    player.runCommand(`fog ${target} ${typeFogMode[mode]} ${name}`);
  });
}

export function Function(player) {
  let formFunction = new ModalFormData();

  formFunction.title("Function [/function]");
  formFunction.textField(
    'Function File Path §9[Addon]\n§8Start from inside "functions" folder',
    "File Path"
  );

  formFunction.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [path] = respond.formValues;
    player.runCommand(`function ${path}`);
  });
}

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

  formGamerule.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [type, int, bool] = respond.formValues;
    Print(`Type: ${typeGamerule[type]}\nInt: ${int}\nBool: ${bool}`);
    switch (type) {
      case 15:
        player.runCommand(`gamerule functionCommandLimit ${int}`);
        break;
      case 17:
        player.runCommand(`gamerule maxCommandChainLenght ${int}`);
        break;
      case 21:
        if (Number(int) > 10) {
          gameruleWarnHighRTS(player, int);
          break;
        }
        player.runCommand(`gamerule randomTickSpeed ${int}`);
        break;
      case 26:
        player.runCommand(`gamerule spawnRadius ${int}`);
        break;
      default:
        player.runCommand(`gamerule ${typeGamerule[type]} ${bool}`);
    }
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

  formGive.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target, item, amount, data, component] = respond.formValues;
    player.runCommand(`give ${target} ${item} ${amount} ${data} ${component}`);
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

  formLocate.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [structure, chunk] = respond.formValues;
    let message = player.runCommand(
      `locate ${typeLocate[structure].replace(" ", "")} ${chunk}`
    );
    Print(message.statusMessage, "normal", player.name);
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

  formLoot.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [type, target, path, kill, hand] = respond.formValues;
    let killType = "loot";
    let handType = "offhand";
    if (kill) {
      killType = "kill";
    }

    if (hand) {
      handType = "mainhand";
    }

    player.runCommand(
      `loot ${typeLoot[type]} ${target} ${killType} "${path}" ${handType}`
    );
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

  formReplaceitem.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [be, postgt, container, id, mode, item, amount, data, tag] =
      respond.formValues;
    let target = "block";
    if (be) {
      target = "entity";
    }

    let replaceMode = "keep";
    if (mode) {
      replaceMode = "destroy";
    }

    player.runCommand(
      `replaceitem ${target} ${postgt} ${typeReplaceitem[container]} ${id} ${replaceMode} ${item} ${amount} ${data} ${tag}`
    );
  });
}

export function Setblock(player) {
  let formSetblock = new ModalFormData();
  let typeSetblockMode = ["replace", "destroy", "keep"];

  formSetblock.title("Setblock [/setblock]");
  formSetblock.textField(
    "Position §g[XYZ]§9[Relative/Local]",
    "3 Points Position"
  );
  formSetblock.textField("Block Name", "Block");
  formSetblock.textField("Data Value", "Aux or BlockState", "0");
  formSetblock.dropdown("Setblock Mode", typeSetblockMode, 0);

  formSetblock.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [pos, block, data, mode] = respond.formValues;
    player.runCommand(
      `setblock ${pos} ${block} ${data} ${typeSetblockMode[mode]}`
    );
  });
}

export function Summon(player) {
  let formSummon = new ModalFormData();

  formSummon.title("Summon [/summon]");
  formSummon.textField("Entity Type", "Entity");
  formSummon.textField(
    "Position §g[XYZ]§9[Relative/Local]§8[Optional]",
    "Coordinate"
  );
  formSummon.textField(
    "Entity Pre-Name §8[Optional]\nCan be empty even 'Event' specify",
    "Name"
  );
  formSummon.textField("Entity Event §8[Optional]", "Event");

  formSummon.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [type, pos, name, event] = respond.formValues;
    if (event == "" && name != "") {
      player.runCommand(`summon ${type} ${name} ${pos}`);
      return;
    }
    player.runCommand(`summon ${type} ${pos} ${event} ${name}`);
  });
}

export function Tag(player) {
  let formTag = new ModalFormData();
  let typeTag = ["Add", "Remove", "List"];

  formTag.title("Tag [/tag]");
  formTag.textField("Target §g[Entity]", "Target Selector");
  formTag.dropdown("Tag Type", typeTag);
  formTag.textField("Tag Name", "Name of the tag");

  formTag.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target, type, name] = respond.formValues;
    if (type == 2) {
      player.runCommand(`tag ${target} list`);
      return;
    }
    player.runCommand(`tag ${target} ${typeTag[type]} ${name}`);
  });
}

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

  formWeather.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [type, duration] = respond.formValues;
    player.runCommand(`weather ${typeWeather[type]} ${duration}`);
  });
}

export function XP(player) {
  let formXP = new ModalFormData();

  formXP.title("XP [/xp]");
  formXP.textField("XP Amount", "Amount");
  formXP.toggle("Amount Type\n§8[§cPoints§8/§aLevels§8]", false);
  formXP.textField("Target §g[Player]§8[Optional]", "Target Selector");

  formXP.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [amount, level, target] = respond.formValues;
    if (level) {
      player.runCommand(`xp ${amount}L ${target}`);
    } else {
      player.runCommand(`xp ${amount} ${target}`);
    }
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
    if (respond.isCanceled) return;

    let select = respond.selection;
    if (select == 0) {
      Print("You canceled the changes", "normal", player.name);
      return;
    }
    player.runCommand(`gamerule randomtickspeed ${ticks}`);
  });
}
