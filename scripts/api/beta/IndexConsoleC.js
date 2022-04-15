import { world as World } from 'mojang-minecraft'
import { ActionFormData } from 'mojang-minecraft-ui';
import * as ConsC from './MainConsoleC.js'
import { ScoreboardIndex } from './ScoreboardConsoleC.js'

/**
 * Book Form to open fast command
 * @param {import("mojang-minecraft").Entity} player 
 */
export function ConsoleCommands(player) {
  let indexForm = new ActionFormData()
  indexForm.title('Console Commands')
  indexForm.body('Command List:')

  indexForm.button('Ability') // Done
  indexForm.button('Camerashake') // Done
  indexForm.button('Clear') // Done
  indexForm.button('Clearspawnpoint') // (Prob Delete)
  indexForm.button('Clone')
  indexForm.button('Damage') // Done
  indexForm.button('Dialogue')
  indexForm.button('Difficulty') // Done
  indexForm.button('Effect') // Done
  indexForm.button('Enchant') // Done
  indexForm.button('Event')
  indexForm.button('Execute')
  indexForm.button('Fill') // Done
  indexForm.button('Fog') // Done
  indexForm.button('Function') // Done
  indexForm.button('Gamemode') // Done
  indexForm.button('Gamerule') // Done
  indexForm.button('Gametest')
  indexForm.button('Give') // Done
  indexForm.button('Help')
  indexForm.button('Kick')
  indexForm.button('Kill')
  indexForm.button('List')
  indexForm.button('Locate') // Done
  indexForm.button('Loot') // Done
  indexForm.button('Mobevent')
  indexForm.button('Music')
  indexForm.button('Particle')
  indexForm.button('Playanimation')
  indexForm.button('Playsound')
  indexForm.button('Replaceitem') // Done
  indexForm.button('Ride')
  indexForm.button('Schedules')
  indexForm.button('Scoreboard') // Done
  indexForm.button('Setblock')
  indexForm.button('Setmaxplayers')
  indexForm.button('Setworldspawn')
  indexForm.button('Spawnpoint')
  indexForm.button('Spreadplayers')
  indexForm.button('Stopsound')
  indexForm.button('Structure')
  indexForm.button('Summon') // Done
  indexForm.button('Tag') // Done
  indexForm.button('Teleport')
  indexForm.button('Tellraw')
  indexForm.button('Testfor')
  indexForm.button('Tickingarea')
  indexForm.button('Time') // Done
  indexForm.button('Titleraw')
  indexForm.button('Weather') // Done
  indexForm.button('XP') // Done

  indexForm.show(player).then(respondForm => {
    let button = respondForm.selection
    if (respondForm.isCanceled) return
    switch (button) {
      case 0:
        ConsC.Ability(player);
        break;
      case 1:
        ConsC.CameraShake(player);
        break;
      case 2:
        ConsC.Clear(player);
        break;
      case 5:
        ConsC.Damage(player);
        break;
      case 7:
        ConsC.Difficulty(player); 
        break;
      case 8:
        ConsC.Effect(player); 
        break;
      case 9:
        ConsC.Enchant(player); 
        break;
      case 12:
        ConsC.Fill(player); 
        break;
      case 13:
        ConsC.Fog(player); 
        break;
      case 14:
        ConsC.Function(player); 
        break;
      case 15:
        ConsC.Gamemode(player); 
        break;
      case 16:
        ConsC.Gamerule(player); 
        break;
      case 18:
        ConsC.Give(player); 
        break;
      case 23:
        ConsC.Locate(player); 
        break;
      case 24:
        ConsC.Loot(player); 
        break;
      case 30:
        ConsC.Replaceitem(player); 
        break;
      case 33:
        ScoreboardIndex(player); 
        break;
      case 34:
        ConsC.Setblock(player); 
        break;
      case 41:
        ConsC.Summon(player); 
        break;
      case 42:
        ConsC.Tag(player); 
        break;
      case 47:
        ConsC.Time(player); 
        break;
      case 49:
        ConsC.Weather(player); 
        break;
      case 50:
        ConsC.XP(player); 
        break;
      default:
        player.runCommand(`tellraw @a {"rawtext": [{"text": "The command was not available yet. Coming Soon!\n"}, {"text": "[EC/Index/${button}]"}]}`)
    }
  })
}