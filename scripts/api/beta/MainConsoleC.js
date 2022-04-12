import { world } from 'mojang-minecraft'
import { ActionFormData, MessageFormData, ModalFormData } from 'mojang-minecraft-ui';
import { Print } from '../PrintMessage.js'

const Overworld = world.getDimension('overworld')

export function Ability(player) {
  let typeAbility = ["mayfly", "mute", "worldbuilder"]
  let formAbility = new ModalFormData()

  formAbility.title("Ability [/ability]")
  formAbility.dropdown("Ability Type", typeAbility, 0)
  formAbility.toggle("Boolean", true)

  formAbility.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ type, bool ] = respond.formValues
    player.runCommand(`ability ${typeAbility[type]} ${bool}`)
  })
}

export function CameraShake(player) {
  let formCameraShake = new ModalFormData()

  formCameraShake.title("Camera Shake [/camerashake]")
  formCameraShake.toggle("Add/Remove\n§8true - Add\nfalse - Stop (Use Target Only)", true)
  formCameraShake.textField("Target §8[Player]", "Target Selector")
  formCameraShake.slider("Intensity Shake", 0, 4, 1, 1)
  formCameraShake.textField("Duration §8[Seconds]", "Duration")
  formCameraShake.toggle("Shake Type\n§8true - Rotational\nfalse - Positional")

  formCameraShake.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ play, target, intensity, duration, type ] = respond.formValues
    if (!play) {
      player.runCommand(`camerashake stop ${target}`)
      return
    }
    if (type) {
      type = "Rotational"
    } else {
      type = "Positional"
    }

    player.runCommand(`camerashake add ${target} ${intensity} ${duration} ${type}`)
  })
}

export function Clear(player) {
  let formClear = new ModalFormData()

  formClear.title("Clear [/clear]")
  formClear.textField("Target §8[Player][Optional]", "Target Selector")
  formClear.textField("Item §8[Optional]", "Item ID")
  formClear.textField("Data Values §8[Optional]\n'-1' Match All Item Data Value", "Data Value [Int]")
  formClear.textField("Maximum Amount §8[Optional]", "Amount")

  formClear.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ target, item, data, amount ] = respond.formValues
    player.runCommand(`clear ${target} ${item} ${data} ${amount}`)
  })
}

export function Effect(player) {
  let formEffect = new ModalFormData()
  let typeEffect = [
    'Absorbtion',
    'Bad Omen',
    'Blindness',
    'Clear',
    'Conduit Power',
    'Darkness',
    'Dolphin Grace',
    'Fatal Poison',
    'Fire Resistance',
    'Haste',
    'Health Boost',
    'Hunger',
    'Instant Damage',
    'Instant Health',
    'Invisibility',
    'Jump Boost',
    'Levitation',
    'Mining Fatigue',
    'Nausea',
    'Night Vision',
    'Poison',
    'Regeneration',
    'Resistance',
    'Saturation',
    'Slow Falling',
    'Slowness',
    'Speed',
    'Strength',
    'Village Hero',
    'Water Breathing',
    'Weakness',
    'Wither'
  ]

  formEffect.title('Effect [/effect]')
  formEffect.textField('Target §8[Entity]\nSuround the player name with ""', 'Target Selector')
  formEffect.dropdown('Effect Type', typeEffect)
  formEffect.textField('Duration §8[Second]', 'Duration', '30')
  formEffect.slider('Amplifier', 0, 255, 1, 0)
  formEffect.toggle('Hide Particle', false)

  formEffect.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ target, effect, duration, amplifier, particle ] = respond.formValues
    if (effect == 3) {
      player.runCommand(`effect ${target} clear`)
      return
    }
    player.runCommand(`effect ${target} ${typeEffect[effect].replace(' ', '_')} ${duration} ${amplifier} ${particle}`)
  })
}

export function Enchant(player) {
  let formEnchant = new ModalFormData()
  let typeEnchant = [
    'Aqua Affinity',
    'Bane of Arthropoth',
    'Blast Protection',
    'Channeling',
    'Curse of Binding',
    'Curse of Vanishing',
    'Depth Strider',
    'Efficiency',
    'Feather Falling',
    'Fire Aspect',
    'Flame',
    'Fortune',
    'Frost Walker',
    'Impaling',
    'Infinity',
    'Knockback',
    'Looting',
    'Loyalty',
    'Luck of the Sea',
    'Lure',
    'Mending',
    'Multishot',
    'Piercing',
    'Power',
    'Projectile Protection',
    'Protection',
    'Punch',
    'Quick Charge',
    'Respiration',
    'Riptide',
    'Sharpness',
    'Silk Touch',
    'Smite',
    'Soul Speed',
    'Swift Sneak',
    'Thorns',
    'Unbreaking'
  ]

  formEnchant.title('Enchant [/enchant]')
  formEnchant.textField('Target §8[Player]', 'Target Selection', '@s')
  formEnchant.dropdown('Enchantment Type', typeEnchant)
  formEnchant.slider('Enchantment Level', 1, 5, 1, 1)

  formEnchant.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ target, type, level ] = respond.formValues
    player.runCommand(`enchant ${target} ${typeEnchant[type].replace(' ', '_')} ${level}`)
  })
}

export function Gamemode(player) {
  let formGamemode = new ActionFormData()

  formGamemode.title('Gamemode [/gamemode]')
  formGamemode.body('Set the gamemode of player')
  formGamemode.button('Survival [0]')
  formGamemode.button('Creative [1]')
  formGamemode.button('Adventure [2]')
  formGamemode.button('Default [5]')
  formGamemode.button('Spectator (Leak)[6]')

  formGamemode.show(player).then(respond => {
    if (respond.isCanceled) return

    let button = respond.selection
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
  })
}

export function Gamerule(player) {
  let formGamerule = new ModalFormData()
  let typeGamerule = [
    'commandBlocksEnable',
    'commandBlockOutput',
    'doDaylightCycle',
    'doEntityDrops',
    'doFireTick',
    'doInsomnia',
    'doImmendiateRespawn',
    'doMobLoot',
    'doMobSpawning',
    'doTileDrops',
    'doWeatherCycle',
    'drowningDamage',
    'fallDamage',
    'fireDamage',
    'freezeDamage',
    '§efunctionCommandLimit', // Index: 15
    'keepInventory',
    '§emaxCommandChainLenght', // Index: 17
    'mobGriefing',
    'naturalRegeneration',
    'pvp',
    '§erandomTickSpeed', // Index: 21
    'respawnBlocksExplode',
    'sendCommandFeedback',
    'showCoordinates',
    'showDeathMessages',
    '§espawnRadius', // Index: 26
    'tntExplodes',
    'showTags'
  ]

  formGamerule.title('Gamerule [/gamerule]')
  formGamerule.dropdown('Gamerule Type\n§8Yellow text using textfield', typeGamerule)
  formGamerule.textField('Integer', 'For some gamerule only')
  formGamerule.toggle('Boolean', false)

  formGamerule.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ type, int, bool ] = respond.formValues
    Print(`Type: ${typeGamerule[type]}\nInt: ${int}\nBool: ${bool}`)
    switch(type) {
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
        };
        player.runCommand(`gamerule randomTickSpeed ${int}`);
        break;
      case 26:
        player.runCommand(`gamerule spawnRadius ${int}`);
        break;
      default:
        player.runCommand(`gamerule ${typeGamerule[type]} ${bool}`)
    }
  })
}

export function Give(player) {
  let giveForm = new ModalFormData()
  giveForm.title('Give [/give]')
  giveForm.textField('Target §8[Player]', 'Target Selector', '@s')
  giveForm.textField('Item', 'Item Type')
  giveForm.textField('Amount §8[Optional]', 'Item Amount', '1')
  giveForm.textField("Data Values §8[Optional]\n'-1' Match All Item Data Value", "Data Value [Int]", '0')
  giveForm.textField("Item Component/Tag §8[Optional][Manual]", "JSON Component")

  giveForm.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ target, item, amount, data, component ] = respond.formValues
    player.runCommand(`give ${target} ${item} ${amount} ${data} ${component}`)
  })
}

export function Loot(player) {
  let formLoot = new ModalFormData()
  let typeLoot = [ 'Spawn', 'Give', 'Insert' ]
  
  formLoot.title('Loot [/loot]')
  formLoot.dropdown('Loot Type', typeLoot, 0)
  formLoot.textField('Position/Target', 'Position (1, 2, 3) or Target (@a)')
  formLoot.textField('Loot Tables\n§8Start from inside "loot_tables" folder', 'Path')
  formLoot.toggle('Loot/Kill', false)
  formLoot.toggle('Tool §8[Optional]\nfalse - Offhand\ntrue - Mainhand', true)

  formLoot.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ type, target, path, kill, hand ] = respond.formValues
    let killType = 'loot'
    let handType = 'offhand'
    if (kill) {
      killType = 'kill'
    }

    if (hand) {
      handType = 'mainhand'
    }

    player.runCommand(`loot ${typeLoot[type]} ${target} ${killType} "${path}" ${handType}`)
  })
}

export function Tag(player) {
  let formTag = new ModalFormData()
  let typeTag = [ 'Add', 'Remove', 'List' ]

  formTag.title('Tag [/tag]')
  formTag.textField('Target §8[Entity]', 'Target Selector')
  formTag.dropdown('Tag Type', typeTag)
  formTag.textField('Tag Name', 'Name of the tag')

  formTag.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ target, type, name ] = respond.formValues
    if (type == 2) {
      player.runCommand(`tag ${target} list`)
      return
    }
    player.runCommand(`tag ${target} ${typeTag[type]} ${name}`)
  })
}

export function Time(player) {
  let formTime = new ActionFormData()

  formTime.title('Time [/time set]')
  formTime.body('Set the time of world')
  formTime.button('Sunrise [06.00]')
  formTime.button('Day [12.00]')
  formTime.button('Sunset [18.00]')
  formTime.button('Midnight [24.00]')

  formTime.show(player).then(respond => {
    if (respond.isCanceled) return

    let button = respond.selection
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
  })
}

function gameruleWarnHighRTS(player, ticks) {
  let warnForm = new MessageFormData()

  warnForm.title("[Warning] High RTS")
  warnForm.body(`Warning!\nYou put random tick speed is ${ticks} (Higher than 10). High random tick speed can cause the world lag.\nYou want to continue to change?`)
  warnForm.button1("Continue")
  warnForm.button2("Cancel")

  warnForm.show(player).then(respond => {
    if (respond.isCanceled) return

    let select = respond.selection
    if (select == 0) {
      Print("You canceled the changes", "normal", player.name)
      return
    }
    Overworld.runCommand(`gamerule randomtickspeed ${ticks}`)
  })
}