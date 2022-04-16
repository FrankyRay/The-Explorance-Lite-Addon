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
  formAbility.dropdown("Ability", typeAbility, 0);
  formAbility.toggle("Value §8[Bool]", true);

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
    "CS Mode§8\ntrue - Add\nfalse - Stop {Use Target Only}",
    true
  );
  formCameraShake.textField("Target §8[Player]", "Target Selector");
  formCameraShake.slider("Intensity Shake", 0, 4, 1, 1);
  formCameraShake.textField("Duration §8[Seconds]", "Duration");
  formCameraShake.toggle("Shake Type§8\ntrue - Rotational\nfalse - Positional");

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
  formClear.textField("Target \n§8[Player][Optional]", "Target Selector");
  formClear.textField("Item ID \n§8[Optional]", "Item ID");
  formClear.textField(
    "Item Data \n§8[Optional]\n'-1' Match All Item Data Value",
    "Data Value [Int]"
  );
  formClear.textField("Amount §8(Max)\n[Optional]", "Amount");

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
  formDamage.textField("Target§8\n[Entity]", "Target Selector", "@s");
  formDamage.textField("Damage Amount", "Damage Value", "1");
  formDamage.dropdown("Damage Type", typeDamage);
  formDamage.textField("Damager§8\n[Entity][Optional][c=1]", "Target Selector");

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
  formDifficulty.button("Peacefull");
  formDifficulty.button("Easy");
  formDifficulty.button("Normal");
  formDifficulty.button("Hard");

  formDifficulty.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let button = respond.selection;
    switch (button) {
      case 0:
        player.runCommand("difficulty peacefull");
      case 1:
        player.runCommand("difficulty easy");
      case 2:
        player.runCommand("difficulty normal");
      case 3:
        player.runCommand("difficulty hard");
    }
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
  formEffect.textField(
    'Target §8[Entity]\nSuround the player name with ""',
    "Target Selector"
  );
  formEffect.dropdown("Effect Type", typeEffect);
  formEffect.textField("Duration §8[Second]", "Duration", "30");
  formEffect.slider("Amplifier", 0, 255, 1, 0);
  formEffect.toggle("Hide Particle", false);

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
  formEnchant.textField("Target §8[Player]", "Target Selection", "@s");
  formEnchant.dropdown("Enchantment Type", typeEnchant);
  formEnchant.slider("Enchantment Level", 1, 5, 1, 1);

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
  formFill.textField("Position 1 §8[XYZ]", "3-Int Coordinate");
  formFill.textField("Position 2 §8[XYZ]", "3-Int Coordinate");
  formFill.textField("Block Name", "Block");
  formFill.textField("Data Value", "Aux or BlockState", "0");
  formFill.dropdown("Setblock Mode", typeFillMode, 0);
  formFill.textField("Block Name §8[ReplaceMode]", "Block");
  formFill.textField("Data Value §8[ReplaceMode]", "Aux or BlockState");

  formFill.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [pos1, pos2, block, data, mode, rblock, rdata] = respond.formValues;
    if (mode == 0) {
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
  formFog.dropdown("Fog Mode\n§8push - Add new fog\npop/remove - Remove fog");
  formFog.textField("Fog ID\n§8For 'push' mode", "Fog ID (minecraft:<fog>)");
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
  formFunction.textField("Function File Path", "File Path");

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
  formGamemode.button("Survival [0]");
  formGamemode.button("Creative [1]");
  formGamemode.button("Adventure [2]");
  formGamemode.button("Default [5]");
  formGamemode.button("Spectator (Leak)[6]");

  formGamemode.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let button = respond.selection;
    switch (button) {
      case 0:
        player.runCommand(`gamemode survival "${player.name}"`);
        break;
      case 1:
        player.runCommand(`gamemode creative "${player.name}"`);
        break;
      case 2:
        player.runCommand(`gamemode adventure "${player.name}"`);
        break;
      case 3:
        player.runCommand(`gamemode 5 "${player.name}"`);
        break;
      case 4:
        player.runCommand(`gamemode 6 "${player.name}"`);
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
  formGamerule.dropdown(
    "Gamerule Type\n§8Yellow text using textfield",
    typeGamerule
  );
  formGamerule.textField("Integer", "For some gamerule only");
  formGamerule.toggle("Boolean", false);

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
  formGive.icon("absorbtion_heart.png");
  formGive.textField("Target §8[Player]", "Target Selector", "@s");
  formGive.textField("Item", "Item Type");
  formGive.textField("Amount §8[Optional]", "Item Amount", "1");
  formGive.textField(
    "Data Values §8[Optional]\n'-1' Match All Item Data Value",
    "Data Value [Int]",
    "0"
  );
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
    "ancientcity",
    "bastionremnant",
    "buriedtreasure",
    "endcity",
    "fortress",
    "mansion",
    "mineshaft",
    "monument",
    "ruins",
    "pillageroutpost",
    "ruinedportal",
    "shipwreck",
    "stronghold",
    "temple",
    "village",
  ];

  formLocate.title("Locate [/locate]");
  formLocate.dropdown("Structure", typeLocate);
  formLocate.toggle("Search on New Chunk", false);

  formLocate.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [structure, chunk] = respond.formValues;
    player.runCommand(`locate ${typeLocate[structure]} ${chunk}`);
  });
}

export function Loot(player) {
  let formLoot = new ModalFormData();
  let typeLoot = ["Spawn", "Give", "Insert"];

  formLoot.title("Loot [/loot]");
  formLoot.dropdown("Loot Type", typeLoot, 0);
  formLoot.textField("Position/Target", "Position (1, 2, 3) or Target (@a)");
  formLoot.textField(
    'Loot Tables\n§8Start from inside "loot_tables" folder',
    "Path"
  );
  formLoot.toggle("Loot/Kill", false);
  formLoot.toggle("Tool §8[Optional]\nfalse - Offhand\ntrue - Mainhand", true);

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
  formReplaceitem.toggle("Block/Entity\n§8true - Entity\nfalse - Block", true);
  formReplaceitem.textField(
    "Position §8[Block]§r/Target §8[Entity]",
    "Coodinate/Target Selector"
  );
  formReplaceitem.dropdown("Inv. Slot Container", typeReplaceitem);
  formReplaceitem.textField("Inv. Slot ID", "Slot ID");
  formReplaceitem.toggle("Replace Mode\n§8true - Destroy\nfalse - Keep", true);
  formReplaceitem.textField("Item", "Item Type");
  formReplaceitem.slider("Amount §8[Optional]", 1, 64, 1, 1);
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
  formSetblock.textField("Position §8[XYZ]", "3-Int Coordinate");
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
  formSummon.textField("Entity Type", "Entity (W/O Namespace)");
  formSummon.textField("Position §8[Optional]", "Coordinate");
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
  formTag.textField("Target §8[Entity]", "Target Selector");
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
  formWeather.textField("Duration §8[Tick][Optional]", "Duration");

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
  formXP.textField("Target §8[Player]", "Target Selector", "@s");
  formXP.toggle("Per Level", true);

  formXP.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [amount, target, level] = respond.formValues;
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
