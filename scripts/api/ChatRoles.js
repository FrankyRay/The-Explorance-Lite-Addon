import { Print, RolesPrint } from './PrintMessage.js'

export function Chats(message, player) {
  if (player.hasTag('Admin')) {
    RolesPrint(message, 'admin', player.name)
  } else if (player.hasTag('Mods')) {
    RolesPrint(message, 'mods', player.name)
  } else if (player.hasTag('RedTeam')) {
    RolesPrint(message, 'red_team', player.name)
  } else if (player.hasTag('YellowTeam')) {
    RolesPrint(message, 'yellow_team', player.name)
  } else if (player.hasTag('GreenTeam')) {
    RolesPrint(message, 'green_team', player.name)
  } else if (player.hasTag('BlueTeam')) {
    RolesPrint(message, 'blue_team', player.name)
  } else if (player.hasTag('Mute')) {
    Print('You has been muted by Admin/Operator', 'info', player.name)
  }
}