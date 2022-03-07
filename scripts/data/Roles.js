import { world } from 'mojang-minecraft'

function dataPrint(text, target='@a') {
  let data = JSON.stringify(text).replace(/"/g, "").replace(/:/g, ': §c').replace(/,/g, '\n§8: §a').replace('}', '§r').replace('{', '\n§8: §a')
  world.getDimension("overworld").runCommand(`tellraw ${target} {"rawtext":[{"text": "Data: {${data}\n}"}]}`);
}


function messageInfo(message, target='@a') {
  world.getDimension('overworld').runCommand(`tellraw ${target} {"rawtext":[{"text": "§e[INFO]§r ${message}"}]}`);
}

function rolesMuted() {
  world.events.beforeChat.subscribe(msgData => {
    if (msgData.sender.hasTag('Muted')) {
      let playerName = msgData.sender.name;
      msgData.cancel = true;
      messageInfo('You are muted. Your message not send to public', playerName);
    }
  });
}


function noLink() {
  world.events.beforeChat.subscribe(msgData => {
    let message = msgData.message
    let admin = msgData.sender.hasTag('Admin')
    let trustedPlayer = msgData.sender.hasTag('Trusted')
    if (message.includes('discord.gg') && (!trustedPlayer || !admin)) {
      let playerName = msgData.sender.name
      msgData.cancel = true
      messageInfo('No discord link invitation [Exit Code: Discord Link]', playerName)
    } else if ((message.includes('youtu.be/dQw4w9WgXcQ') || message.includes('www.youtube.com/watch?v=dQw4w9WgXcQ')) && (!trustedPlayer || !admin)) {
      let playerName = msgData.sender.name
      msgData.cancel = true
      messageInfo('No YT link [Exit Code: Rickroll]', playerName)
    }
  })
}


function playerComponent() {
  world.events.beforeChat.subscribe(msgData => {
    if (msgData.message === '!player') {
      let player = msgData.sender.getComponents()
      let data = JSON.stringify(player).replace(/"/g, "").replace(/:/g, ': §c').replace(/,/g, '\n§8: §a').replace('}', '§r').replace('{', '\n§8: §a')
      world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"text": "Data: {${data}\n}"}]}`);
      // let data = JSON.stringify(player)
      // world.getDimension('overworld').runCommand(`say ${data}`)
    }
  })
}


playerComponent()
rolesMuted()
noLink()