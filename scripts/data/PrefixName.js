import * as Gametest from 'mojang-gametest'
import { world, Location, BlockLocation, Dimension } from 'mojang-minecraft'

function PrefixName() {
    world.events.beforeChat.subscribe((eventData) => {
      if (!eventData.message.startsWith('!') && eventData.sender.hasTag('Owner')) {
        var player = eventData.sender.name
        var message = eventData.message
        world.getDimension('overworld').runCommand(`tellraw @a {"rawtext":[{"text": "§g[OWNER]<${player}>§r ${message}"}]}`)
        eventData.cancel = true
      } else if (!eventData.message.startsWith('!') && eventData.sender.hasTag('TeamRed') && !eventData.sender.hasTag('Owner')) {
        var player = eventData.sender.name
        var message = eventData.message
        world.getDimension('overworld').runCommand(`tellraw @a {"rawtext":[{"text": "§c<${player}>§r ${message}"}]}`)
        eventData.cancel = true
      } else if (!eventData.message.startsWith('!') && eventData.sender.hasTag('TeamYellow') && !eventData.sender.hasTag('Owner')) {
        var player = eventData.sender.name
        var message = eventData.message
        world.getDimension('overworld').runCommand(`tellraw @a {"rawtext":[{"text": "§e<${player}>§r ${message}"}]}`)
        eventData.cancel = true
      } else if (!eventData.message.startsWith('!') && eventData.sender.hasTag('TeamYellow') && !eventData.sender.hasTag('Owner')) {
        var player = eventData.sender.name
        var message = eventData.message
        world.getDimension('overworld').runCommand(`tellraw @a {"rawtext":[{"text": "§a<${player}>§r ${message}"}]}`)
        eventData.cancel = true
      } else if (!eventData.message.startsWith('!') && eventData.sender.hasTag('TeamBlue') && !eventData.sender.hasTag('Owner')) {
        var player = eventData.sender.name
        var message = eventData.message
        world.getDimension('overworld').runCommand(`tellraw @a {"rawtext":[{"text": "§b<${player}>§r ${message}"}]}`)
        eventData.cancel = true
      }
    })
  }