import { world } from "mojang-minecraft";

const Overworld = world.getDimension("overworld");

// Tellraw Message
export function Print(message, type = "normal", target = "@a") {
  switch (type) {
    case "normal":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "${message}"}]}`
      );
      break;
    case "tips":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§a[TIPS] §r${message}"}]}`
      );
      break;
    case "info":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§e[INFO] §r${message}"}]}`
      );
      break;
    case "warn":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§c[WARN] §r${message}"}]}`
      );
      break;
    case "consc":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§9[Command Syntax] §g${message}"}]}`
      );
      break;
  }
}

export function RolesPrint(message, roles, playerName, target = "@a") {
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
        `tellraw ${target} {"rawtext": [{"text": "§e[RED TEAM] ${playerName}§r: ${message}"}]}`
      );
      break;
    case "green_team":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§a[RED TEAM] ${playerName}§r: ${message}"}]}`
      );
      break;
    case "blue_team":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§b[RED TEAM] ${playerName}§r: ${message}"}]}`
      );
      break;
  }
}

// Titleraw (Actionbar) Message
export function PrintAction(message, target = "@a") {
  Overworld.runCommand(
    `titleraw ${target} actionbar {"rawtext": [{"text": "${message}"}]}`
  );
}
