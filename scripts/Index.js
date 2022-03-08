import * as Gametest from 'mojang-gametest';
import { world } from 'mojang-minecraft';
// import * as MinecraftUI from 'mojang-minecraft-ui';

const CmdPrefix = '!'
const Overworld = world.getDimension('overworld')

// Changing nameTag
function changeNameTag() {
  world.events.beforeChat.subscribe(msg => {
    let text = msg.message
    let player = msg.sender

    if (text.startsWith(`${CmdPrefix}nametag`)) {
      let args = text.replace(`${CmdPrefix}nametag `, '')

      if (args.startsWith("change")) {
        let newName = args.replace('change ', '')
        player.nameTag = newName
        Overworld.runCommand(`tellraw @a {"rawtext":[{"text": "Real name: ${player.name}\nAlias name: ${player.nameTag}"}]}`)
      } else if (args.startsWith("reset")) {
        player.nameTag = player.name
        Overworld.runCommand(`tellraw @a {"rawtext":[{"text": "Real name: ${player.name}\nAlias name: ${player.nameTag}"}]}`)
      }
    }
  })
}

// Roles (from Roles.js)
function roles() {
  world.events.beforeChat.subscribe(eventData => {
    const Player = eventData.sender
    const PlayerName = Player.nameTag
    const Message = eventData.message
    if (Player.hasTag('Admin') && !Message.startsWith(CmdPrefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§g[ADMIN]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('Mod') && !Message.startsWith(CmdPrefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§g[MODERATOR]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('RedTeam') && !Message.startsWith(CmdPrefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§c[RED TEAM]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('YellowTeam') && !Message.startsWith(CmdPrefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§e[YELLOW TEAM]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('GreenTeam') && !Message.startsWith(CmdPrefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§a[GREEN TEAM]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('BlueTeam') && !Message.startsWith(CmdPrefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§c[BLUE TEAM]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('Mute') && !Message.startsWith(CmdPrefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw "${PlayerName}" {"rawtext": [{"text": "§6[INFO]§r You has been muted"}]}`)
    }
  })
}

changeNameTag()
roles()