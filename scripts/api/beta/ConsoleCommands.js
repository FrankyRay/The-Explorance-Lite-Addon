import { ActionFormData, MessageFormData, ModalFormData } from 'mojang-minecraft-ui';

/**
 * Book Form to open fast command
 * @param {import("mojang-minecraft").Entity} player 
 */
export function BookForms(player) {
  let indexForm = new ActionFormData()
  indexForm.title('Console Commands')
  indexForm.body('Select the commands')
  indexForm.button('Effect')
  indexForm.button('Gamemode')
  indexForm.button('Gamerule')
  indexForm.button('Give')
  indexForm.button('Loot')
  indexForm.button('Time')

  indexForm.show(player).then(respondForm => {
    let button = respondForm.selection
    switch (button) {
      case 0:
        CommandEffect(player);
        break;
      case 1:
        CommandGamemode(player);
        break;
      case 2:
        CommandGamerule(player);
        break;
      case 3:
        CommandGive(player);
        break;
      case 4:
        CommandLoot(player);
        break;
      case 5:
        CommandTime(player);
        break;
    }
  })
}


function CommandGamemode(player) {
  let gamemodeForm = new ActionFormData()
  gamemodeForm.title('Gamemode (/gamemode)')
  gamemodeForm.body('Set the gamemode of player')
  gamemodeForm.button('Survival [0]')
  gamemodeForm.button('Creative [1]')
  gamemodeForm.button('Adventure [2]')

  gamemodeForm.show(player).then(respondForm => {
    let button = respondForm.selection
    switch (button) {
      case 0:
        player.runCommand(`gamemode survival ${player.name}`);
        break;
      case 1:
        player.runCommand(`gamemode creative ${player.name}`);
        break;
      case 2:
        player.runCommand(`gamemode adventure ${player.name}`);
        break;
    }
  })
}


function CommandTime(player) {
  let timeForm = new ActionFormData()
  timeForm.title('Time (/time [set])')
  timeForm.body('Set the time of world')
  timeForm.button('Sunrise [06.00]')
  timeForm.button('Day [12.00]')
  timeForm.button('Sunset [18.00]')
  timeForm.button('Midnight [24.00]')

  timeForm.show(player).then(respondForm => {
    let button = respondForm.selection
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


function CommandGive(player) {
  let giveForm = new ModalFormData()
  giveForm.title('Give (/give)')
  // giveForm.body('Give the item to player')
  giveForm.icon('items/apple.png')
  giveForm.textField('Item', 'Item Type')
  giveForm.textField('Amount', 'How Many?')

  giveForm.show(player).then(respondForm => {
    let [ item, amount ] = respondForm.formValues
    player.runCommand(`give "${player.name}" ${item} ${amount}`)
  })
}


function CommandEffect(player) {
  let effectForm = new ModalFormData()
  effectForm.title('Effect (/effect)')
  effectForm.icon('items/water_bottle.png')
  effectForm.textField('Effect', 'Effect Type (eg. fire_resistance)')
  // effectForm.slider('Level', 1, 3, 3, 1)
  effectForm.textField('Duration', 'Duration (in Seconds)')
  effectForm.toggle('Hide Particle', true)

  effectForm.show(player).then(respondForm => {
    let [ effect, duration, particle ] = respondForm.formValues
    if (effect == 'clear') {
      player.runCommand(`effect "${player.name}" clear`)
    }
    player.runCommand(`effect "${player.name}" ${effect} ${duration} 0 ${particle}`)
  })
}


function CommandLoot(player) {
  let lootForm = new ModalFormData()
  let lootType = [ 'spawn', 'give', 'insert' ]
  lootForm.title('Loot (/loot)')
  lootForm.dropdown('Loot Type', lootType, 0)
  lootForm.textField('Position/Target', 'Position (1, 2, 3) or Target (@a)')
  lootForm.textField('Loot Tables Path', 'loot_tables/_ <= Start Here')
  lootForm.toggle('Loot/Kill', false)
  lootForm.toggle('Offhand/Mainhand', false)

  lootForm.show(player).then(respondForm => {
    let [ type, target, path, kill, hand ] = respondForm.formValues
    let killType = 'loot'
    let handType = 'offhand'
    if (kill) {
      killType = 'kill'
    }

    if (hand) {
      handType = 'mainhand'
    }

    player.runCommand(`loot ${lootType[type]} ${target} ${killType} "${path}" ${handType}`)
  })
}


function CommandGamerule(player) {
  let gameruleForm = new ModalFormData()
  let gameruleType = [
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
    'functionCommandLimit', // Index: 15
    'keepInventory',
    'maxCommandChainLenght', // Index: 17
    'mobGriefing',
    'naturalRegeneration',
    'pvp',
    'randomTickSpeed', // Index: 21
    'respawnBlocksExplode',
    'sendCommandFeedback',
    'showCoordinates',
    'showDeathMessages',
    'spawnRadius', // Index: 26
    'tntExplodes',
    'showTags'
  ]
  gameruleForm.title('Gamerule (/gamerule)')
  gameruleForm.dropdown('Gamerule Type', gameruleType)
  gameruleForm.textField('Integer', 'For some gamerule only')
  gameruleForm.toggle('Boolean', false)

  gameruleForm.show(player).then(respondForm => {
    let [ type, int, bool ] = respondForm.formValues
    if (type == (15 || 17 || 21 || 26)) {
      player.runCommand(`gamerule ${gameruleType[type]} ${int}`)
      return
    }
    player.runCommand(`gamerule ${gameruleType[type]} ${bool}`)
  })
}