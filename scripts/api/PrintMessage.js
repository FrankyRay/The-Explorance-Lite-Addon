import { world } from 'mojang-minecraft'

const Overworld = world.getDimension('overworld')


// Tellraw Message
export function Print(message, type = 'normal', target = "@a") {
  switch (type) {
    case 'normal':
      Overworld.runCommand(`tellraw ${target} {"rawtext": [{"text": "${message}"}]}`);
      break;
    case 'tips':
      Overworld.runCommand(`tellraw ${target} {"rawtext": [{"text": "§a[TIPS] §r${message}"}]}`);
      break;
    case 'info':
      Overworld.runCommand(`tellraw ${target} {"rawtext": [{"text": "§e[INFO] §r${message}"}]}`);
      break;
    case 'warn':
      Overworld.runCommand(`tellraw ${target} {"rawtext": [{"text": "§c[WARN] §r${message}"}]}`);
      break;
  }
}

// Titleraw (Actionbar) Message
export function PrintAction(message, target = "@a") {
  Overworld.runCommand(`titleraw ${target} actionbar {"rawtext": [{"text": "${message}"}]}`)
}