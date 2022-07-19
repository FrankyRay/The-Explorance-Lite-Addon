import { Print } from "./lib/MinecraftFunctions.js";

function RolesPrint(message, roles, playerName, target = "@a") {
  switch (roles) {
    case "admin":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§g[ADMIN] ${playerName}§r: ${message}"}]}`
      );
      break;
    case "mods":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§9[MODS] ${playerName}§r: ${message}"}]}`
      );
      break;
    case "red_team":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§c[RED TEAM] ${playerName}§r: ${message}"}]}`
      );
      break;
    case "yellow_team":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§e[YELLOW TEAM] ${playerName}§r: ${message}"}]}`
      );
      break;
    case "green_team":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§a[GREEN TEAM] ${playerName}§r: ${message}"}]}`
      );
      break;
    case "blue_team":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§b[BLUE TEAM] ${playerName}§r: ${message}"}]}`
      );
      break;
  }
}

export function Chats(message, player) {
  if (player.hasTag("Admin")) {
    RolesPrint(message, "admin", player.name);
  } else if (player.hasTag("Mods")) {
    RolesPrint(message, "mods", player.name);
  } else if (player.hasTag("RedTeam")) {
    RolesPrint(message, "red_team", player.name);
  } else if (player.hasTag("YellowTeam")) {
    RolesPrint(message, "yellow_team", player.name);
  } else if (player.hasTag("GreenTeam")) {
    RolesPrint(message, "green_team", player.name);
  } else if (player.hasTag("BlueTeam")) {
    RolesPrint(message, "blue_team", player.name);
  } else if (player.hasTag("Mute")) {
    Print("You has been muted by Admin/Operator", player.name, "INFO");
  }
}
