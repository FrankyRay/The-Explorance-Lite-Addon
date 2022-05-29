function RolesPrint(message, roles, playerName, target = "@a") {
  switch (roles) {
    case "admin":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§g ${playerName}§r: ${message}"}]}`
      );
      break;
    case "mods":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§9 ${playerName}§r: ${message}"}]}`
      );
      break;
    case "red_team":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§c ${playerName}§r: ${message}"}]}`
      );
      break;
    case "yellow_team":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§e ${playerName}§r: ${message}"}]}`
      );
      break;
    case "green_team":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§a ${playerName}§r: ${message}"}]}`
      );
      break;
    case "blue_team":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§b ${playerName}§r: ${message}"}]}`
      );
      break;
  }
}
