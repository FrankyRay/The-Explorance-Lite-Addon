import { world } from "mojang-minecraft";
import { Color } from "./MinecraftData.js";

const Overworld = world.getDimension("overworld");

// Tellraw Message
export function Print(
  message,
  target = "@a",
  type = "normal",
  field = "info",
  primary = "yellow",
  secondary = "reset"
) {
  switch (type) {
    case "normal":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "${message}"}]}`
      );
      break;
    case "info":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "${
          Color[primary]
        }[${field.toUpperCase()}] ${Color[secondary]}${message}"}]}`
      );
      break;
    case "consc":
      Overworld.runCommand(
        `tellraw ${target} {"rawtext": [{"text": "§9[Command Syntax] §g/${message}"}]}`
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

// Titleraw (Actionbar) Message
export function PrintAction(message, target = "@a") {
  Overworld.runCommand(
    `titleraw ${target} actionbar {"rawtext": [{"text": "${message}"}]}`
  );
}
