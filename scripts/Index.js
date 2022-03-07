import * as Gametest from 'mojang-gametest';
import * as Minecraft from 'mojang-minecraft';
// import * as MinecraftUI from 'mojang-minecraft-ui';

const World = Minecraft.world
const Overworld = World.getDimension('overworld')
const Prefix = '\\'

// Print/Output Text
function print(message, target='@a') {
  Overworld.runCommand(`tellraw ${target} {"rawtext": [{"text": "${message}"}]}`)
}

// Roles message
function roles() {
  World.events.beforeChat.subscribe(eventData => {
    const Player = eventData.sender
    const PlayerName = Player.name
    const Message = eventData.message
    if (Player.hasTag('Admin') && !Message.startwith(Prefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§g[ADMIN]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('Mod') && !Message.startwith(Prefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§g[MODERATOR]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('RedTeam') && !Message.startwith(Prefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§c[RED TEAM]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('YellowTeam') && !Message.startwith(Prefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§e[YELLOW TEAM]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('GreenTeam') && !Message.startwith(Prefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§a[GREEN TEAM]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('BlueTeam') && !Message.startwith(Prefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw @a {"rawtext": [{"text": "§c[BLUE TEAM]§r ${PlayerName}: ${Message}"}]}`)
    } else if (Player.hasTag('Mute') && !Message.startwith(Prefix)) {
      eventData.cancel = true
      Overworld.runCommand(`tellraw "${PlayerName}" {"rawtext": [{"text": "§6[INFO]§r You has been muted"}]}`)
    }
  })
}







roles()

