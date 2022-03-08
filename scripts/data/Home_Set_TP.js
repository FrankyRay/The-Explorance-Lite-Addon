import { world } from 'mojang-minecraft'

function print(text, target='@a') {
  world.getDimension("overworld").runCommand(`tellraw ${target} {"rawtext":[{"text": "${text}"}]}`);
}

// Sethome and Tphome Commands
function SetHome() {
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

SetHome()