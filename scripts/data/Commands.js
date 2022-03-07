import * as Gametest from 'mojang-gametest'
import { world, Location, BlockLocation, Dimension } from 'mojang-minecraft'

var Pos1 = ''
var Pos2 = ''


function MinCoord() {
  var ListPos1 = Pos1.split(' ').map(Number)
  var ListPos2 = Pos2.split(' ').map(Number)
  
  var PosX = [ListPos1[0], ListPos2[0]]
  var PosY = [ListPos1[1], ListPos2[1]]
  var PosZ = [ListPos1[2], ListPos2[2]]

  var x = Math.min(...PosX)
  var y = Math.min(...PosY)
  var z = Math.min(...PosZ)

  return `${x} ${y} ${z}`
}


function WorldEdit(command) {
  world.events.beforeChat.subscribe((eventData) => {
    if (eventData.message === '!set1') {
      var player = eventData.sender
      var x = Math.floor(player.location.x)
      var y = Math.floor(player.location.y)
      var z = Math.floor(player.location.z)
      Pos1 = `${x} ${y} ${z}`
      print(`Set first point at ${Pos1}`)
      eventData.cancel = true
    } else if (eventData.message === '!set2') {
      var player = eventData.sender
      var x = Math.floor(player.location.x)
      var y = Math.floor(player.location.y)
      var z = Math.floor(player.location.z)
      Pos2 = `${x} ${y} ${z}`
      print(`Set first point at ${Pos2}`)
      eventData.cancel = true
    } else if (eventData.message.startsWith('!fill')) {
      var block = eventData.message.replace('!fill ', '')
      world.getDimension('overworld').runCommand(`structure save we:beforefill ${Pos1} ${Pos2} memory`)
      world.getDimension('overworld').runCommand(`fill ${Pos1} ${Pos2} ${block}`)
      eventData.cancel = true
    } else if (eventData.message === '!undo') {
      var coord = MinCoord()
      world.getDimension('overworld').runCommand(`structure load we:beforefill ${coord}`)
      eventData.cancel = true
    }
  })
}


function SetHome(command) {
  world.events.beforeChat.subscribe((eventData) => {
    if (eventData.message === '!sethome') {
      var player = eventData.sender
      var x = Math.floor(player.location.x)
      var y = Math.floor(player.location.y)
      var z = Math.floor(player.location.z)
      var coord = `${x} ${y} ${z}`
      player.getTags().forEach(tag => {
        if (tag.includes('Home: ')) {
          player.removeTag(tag)
        }
      })
      player.addTag(`Home: ${coord}`)
      print(`Your home was set on ${coord}. Type '!tphome' to teleport to your home point`)
      eventData.cancel = true
    } else if (eventData.message === '!tphome') {
      var player = eventData.sender
      var coord = false
      player.getTags().forEach(tag => {
        if (tag.includes('Home: ')) {
          coord = tag.replace('Home: ', '')
        }
        
        if (!coord) {
          print("Oh no! You didn't have home point. Type '!tphome' to set your home")
        } else {
          world.getDimension('overworld').runCommand(`tp ${player.name} ${coord}`)
        }
      })
      eventData.cancel = true
    }
  })
}