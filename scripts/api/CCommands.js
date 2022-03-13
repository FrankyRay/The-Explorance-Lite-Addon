import { world } from 'mojang-minecraft';
import * as MinecraftMath from './MathOperations';
import { Print, PrintAction } from './PrintMessage';

const Overworld = world.getDimension('overworld')
// Saved Variable
var pos1 = ''
var pos2 = ''

export function CustomCommands(prefix, commands, args, player) {
  let HelpCommand = ''
  switch (commands) {
    case 'help':
      Print(HelpCommand, 'normal', player.name);
      break;
    case 'gmc':
      Overworld.runCommand(`gamemode creative "${player.name}"`);
      break;
    case 'gms':
      Overworld.runCommand(`gamemode survival "${player.name}"`);
      break;
    case 'worldedit':
      if (args.split(' ')[0] == 'set1') {
        let { x, y, z } = player.location
        pos1 = `${x} ${y} ${z}`
        PrintAction(`Set 1st position: ${pos1}`, player.name)
      } else if (args.split(' ')[0] == 'set2') {
        let { x, y, z } = player.location
        pos2 = `${x} ${y} ${z}`
        PrintAction(`Set 1st position: ${pos1}`, player.name)
      } else if (args.split(' ')[0] == 'fill') {
        let blockType = args.substring(args.indexOf(' ') + 1)
        let blocks = MinecraftMath.HowMuchBlocks(pos1, pos2)
        Overworld.runCommand(`fill ${pos1} ${pos2} ${blockType}`)
        Overworld.runCommand(`structure save we:beforefill ${pos1} ${pos2} memory`)
        PrintAction(`Successfully filling the area with ${blockType} (${blocks} Block(s))`, player.name)
      } else if (args.split(' ')[0] == 'undo') {
        let newPos = MinecraftMath.MinCoord(pos1, pos2)
        Overworld.runCommand(`structure load we:beforefill ${newPos}`)
        PrintAction(`Successfully undo the fill commands`, player.name)
      }
    default:
      Print(`Command "${commands}" is not found. Run ${prefix}help to check custom commands`, 'info', player.name)
  }
}