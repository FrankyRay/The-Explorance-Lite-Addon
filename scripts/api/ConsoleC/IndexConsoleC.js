import { world as World } from "mojang-minecraft";
import { ActionFormData } from "mojang-minecraft-ui";
import * as ConsC from "./MainConsoleC.js";

/**
 * Book Form to open fast command
 * @param {import("mojang-minecraft").Entity} player
 */
export function ConsoleCommands(player) {
  let indexForm = new ActionFormData();
  indexForm.title("Console Commands");
  indexForm.body("Command List:");

  indexForm.button("Ability"); // Done
  indexForm.button("Camerashake"); // Done
  indexForm.button("Clear"); // Done
  indexForm.button("Clone"); // Done
  indexForm.button("Damage"); // Done
  indexForm.button("Dialogue");
  indexForm.button("Difficulty"); // Done
  indexForm.button("Effect"); // Done
  indexForm.button("Enchant"); // Done
  indexForm.button("Event"); // Done
  indexForm.button("Execute");
  indexForm.button("Fill"); // Done
  indexForm.button("Fog"); // Done
  indexForm.button("Function"); // Done
  indexForm.button("Gamemode"); // Done
  indexForm.button("Gamerule"); // Done
  indexForm.button("Gametest");
  indexForm.button("Give"); // Done
  indexForm.button("Help");
  indexForm.button("Kick"); // Done
  indexForm.button("Kill"); // Done
  indexForm.button("Locate"); // Done
  indexForm.button("Loot"); // Done
  indexForm.button("Mobevent"); // Done
  indexForm.button("Music"); // Done
  indexForm.button("Particle"); // Done
  indexForm.button("Playanimation"); // Done
  indexForm.button("Replaceitem"); // Done
  indexForm.button("Ride");
  indexForm.button("Schedules");
  indexForm.button("Scoreboard"); // Done
  indexForm.button("Setblock"); // Done
  indexForm.button("Setworldspawn"); // Done
  indexForm.button("Sound"); // Done
  indexForm.button("Spawnpoint");
  indexForm.button("Spreadplayers"); // Done
  indexForm.button("Structure");
  indexForm.button("Summon"); // Done
  indexForm.button("Tag"); // Done
  indexForm.button("Teleport"); // Done
  indexForm.button("Tellraw");
  indexForm.button("Testfor"); // Done
  indexForm.button("Tickingarea");
  indexForm.button("Time"); // Done
  indexForm.button("Titleraw");
  indexForm.button("Weather"); // Done
  indexForm.button("XP"); // Done

  indexForm.show(player).then((respondForm) => {
    let button = respondForm.selection;
    if (respondForm.isCanceled) return;
    switch (button) {
      case 0:
        ConsC.Ability(player);
        break;
      case 1:
        ConsC.Camerashake(player);
        break;
      case 2:
        ConsC.Clear(player);
        break;
      case 3:
        ConsC.Clone(player);
        break;
      case 4:
        ConsC.Damage(player);
        break;
      case 6:
        ConsC.Difficulty(player);
        break;
      case 7:
        ConsC.Effect(player);
        break;
      case 8:
        ConsC.Enchant(player);
        break;
      case 9:
        ConsC.Event(player);
        break;
      case 11:
        ConsC.Fill(player);
        break;
      case 12:
        ConsC.Fog(player);
        break;
      case 13:
        ConsC.Function(player);
        break;
      case 14:
        ConsC.Gamemode(player);
        break;
      case 15:
        ConsC.Gamerule(player);
        break;
      case 17:
        ConsC.Give(player);
        break;
      case 19:
        ConsC.Kick(player);
        break;
      case 20:
        ConsC.Kill(player);
        break;
      case 21:
        ConsC.Locate(player);
        break;
      case 22:
        ConsC.Loot(player);
        break;
      case 23:
        ConsC.Mobevent(player);
        break;
      case 24:
        ConsC.Music(player);
        break;
      case 25:
        ConsC.Particle(player);
        break;
      case 26:
        ConsC.Playanimation(player);
        break;
      case 27:
        ConsC.Replaceitem(player);
        break;
      case 30:
        ConsC.Scoreboard(player);
        break;
      case 31:
        ConsC.Setblock(player);
        break;
      case 32:
        ConsC.Setworldspawn(player);
        break;
      case 33:
        ConsC.Spawnpoint(player);
        break;
      case 34:
        ConsC.Spawnpoint(player);
        break;
      case 35:
        ConsC.Spreadplayers(player);
        break;
      case 37:
        ConsC.Summon(player);
        break;
      case 38:
        ConsC.Tag(player);
        break;
      case 39:
        ConsC.Teleport(player);
        break;
      case 41:
        ConsC.Testfor(player);
        break;
      case 43:
        ConsC.Time(player);
        break;
      case 45:
        ConsC.Weather(player);
        break;
      case 46:
        ConsC.XP(player);
        break;
      default:
        player.runCommand(
          `tellraw @a {"rawtext": [{"text": "The command was not available yet. Coming Soon!\n"}, {"text": "[EC/Index/${button}]"}]}`
        );
    }
  });
}
