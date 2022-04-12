import { world as World } from 'mojang-minecraft'
import { ActionFormData } from 'mojang-minecraft-ui';
import * as ConsC from './MainConsoleC.js'

/**
 * Book Form to open fast command
 * @param {import("mojang-minecraft").Entity} player 
 */
export function ConsoleCommands(player) {
  let indexForm = new ActionFormData()
  indexForm.title('Console Commands')
  indexForm.body('Command List:')

  indexForm.button('Ability')
  indexForm.button('Camerashake')
  indexForm.button('Clear')
  indexForm.button('Clearspawnpoint')
  indexForm.button('Clone')
  indexForm.button('Damage')
  indexForm.button('Daylock')
  indexForm.button('Dialogue')
  indexForm.button('Difficulty')
  indexForm.button('Effect')
  indexForm.button('Enchant')
  indexForm.button('Event')
  indexForm.button('Execute')
  indexForm.button('Fill')
  indexForm.button('Fog')
  indexForm.button('Function')
  indexForm.button('Gamemode')
  indexForm.button('Gamerule')
  indexForm.button('Gametest')
  indexForm.button('Give')
  indexForm.button('Help')
  indexForm.button('Kick')
  indexForm.button('Kill')
  indexForm.button('List')
  indexForm.button('Locate')
  indexForm.button('Loot')
  indexForm.button('Mobevent')
  indexForm.button('Music')
  indexForm.button('Particle')
  indexForm.button('Playanimation')
  indexForm.button('Playsound')
  indexForm.button('Replaceitem')
  indexForm.button('Ride')
  indexForm.button('Schedules')
  indexForm.button('Scoreboard')
  indexForm.button('Setblock')
  indexForm.button('Setmaxplayers')
  indexForm.button('Setworldspawn')
  indexForm.button('Spawnpoint')
  indexForm.button('Spreadplayers')
  indexForm.button('Stopsound')
  indexForm.button('Structure')
  indexForm.button('Summon')
  indexForm.button('Tag')
  indexForm.button('Teleport')
  indexForm.button('Tellraw')
  indexForm.button('Testfor')
  indexForm.button('Testforblocks')
  indexForm.button('Tickingarea')
  indexForm.button('Time')
  indexForm.button('Titleraw')
  indexForm.button('Toggledownfall')
  indexForm.button('Weather')
  indexForm.button('XP')

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
      case 9:
        ConsC.Effect(player); 
        break;
      case 10:
        ConsC.Enchant(player); 
        break;
      case 16:
        ConsC.Gamemode(player); 
        break;
      case 17:
        ConsC.Gamerule(player); 
        break;
      case 19:
        ConsC.Give(player); 
        break;
      case 25:
        ConsC.Loot(player); 
        break;
      case 43:
        ConsC.Tag(player); 
        break;
      case 49:
        ConsC.Time(player); 
        break;
      case 53:
        ConsC.XP(player); 
        break;
      default:
        player.runCommand(`tellraw @a {"rawtext": [{"text": "The command was not available yet. Coming Soon!\n"}, {"text": "[EC/Index/${button}]"}]}`)
    }
  })
}