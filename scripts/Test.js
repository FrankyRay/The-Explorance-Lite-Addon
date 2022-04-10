//@ts-check
import { world } from 'mojang-minecraft'
import { PrintAction } from './api/PrintMessage.js'

const overworld = world.getDimension('overworld')

export function rngBlockBreaking() {
  world.events.blockBreak.subscribe(breakEvent => {
    let playerName = breakEvent.player.name
    let rngBlock = Math.round(Math.random() * 100)
    let blockBefore = breakEvent.brokenBlockPermutation.type.id
    let { x, y, z } = breakEvent.block.location
    let pos = `${x} ${y} ${z}`
    if (blockBefore == ('oak_wood' || 'minecraft:oak_wood') && rngBlock > 80) {
      let rng = Math.round(Math.random() * 5)
      if (rng == (1 || 0)) {
        PrintAction(`RNG Start - Point: §41`)
        overworld.runCommand(`summon bee ${pos} attacked`)
        overworld.runCommand(`summon bee ${pos} attacked`)
        overworld.runCommand(`summon bee ${pos} attacked`)
        overworld.runCommand(`summon bee ${pos} attacked`)
        overworld.runCommand(`summon bee ${pos} attacked`)
      } else if (rng == 2) {
        PrintAction(`RNG Start - Point: §62`)
        overworld.runCommand(`summon bee ${pos} attacked`)
      } else if (rng == 3) {
        PrintAction(`RNG Start - Point: §e3`)
      } else if (rng == 4) {
        PrintAction(`RNG Start - Point: §a4`)
        overworld.runCommand(`give "${playerName}" oak_wood 16`)
      } else if (rng == 5) {
        PrintAction(`RNG Start - Point: §95`)
        overworld.runCommand(`give "${playerName}" oak_wood 32`)
      }
    }
  })
}

// Debugging
export function eventBlockBreak() {
  world.events.blockBreak.subscribe(breakEvent => {
    let block = breakEvent.brokenBlockPermutation.type.id
    let blockAfter = breakEvent.block.id
    let dimension = breakEvent.dimension.id
    let player = breakEvent.player.nameTag
    console.warn(`Block Break Event Detected\nBlock: ${block}\nBlock After: ${blockAfter}\nDimension: ${dimension}\nPlayer: ${player}`)
  })
}