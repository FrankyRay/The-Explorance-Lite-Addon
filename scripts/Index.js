//@ts-check
import * as Gametest from 'mojang-gametest'; // UUID: 6f4b6893-1bb6-42fd-b458-7fa3d0c89616
import { world as World } from 'mojang-minecraft'; // UUID: b26a4d4c-afdf-4690-88f8-931846312678
// import * as MinecraftUI from 'mojang-minecraft-ui';  // UUID: 2BD50A27-AB5F-4F40-A596-3641627C635E
import { CustomCommands } from './api/CCommands.js'
import { Chats } from './api/ChatRoles.js'
import * as Test from './Test.js'

const Prefix = '!'
const Overworld = World.getDimension('overworld')


function CommandsChat() {
  World.events.beforeChat.subscribe(chatEvent => {
    let Message = chatEvent.message
    let Player = chatEvent.sender
    if (chatEvent.message.startsWith(Prefix)) {
      chatEvent.cancel = true
      let RemovePrefix = Message.replace(Prefix, '')
      let Command = RemovePrefix.split(' ')[0]
      let Arguments = Message.substring(Message.indexOf(' ') + 1)
      CustomCommands(Prefix, Command, Arguments, Player)
    } else {
      chatEvent.cancel = true
      Chats(Message, Player)
    }
  })
}


CommandsChat()
// Test.rngBlockBreaking()
// Test.eventBlockBreak()