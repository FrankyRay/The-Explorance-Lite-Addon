import { world } from 'mojang-minecraft';

function customEnchantment() {
  world.events.tick.subscribe(ticks => {
    const second = ticks.currentTick % 20

    if (second === 0) {
      for (let player of world.getPlayers()) {
        let item = player.getComponent('minecraft:inventory').container.getItem(player.selectedSlot)

        if (item?.id === 'minecraft:netherite_pickaxe') {
          let loreList = item.getLore

          if (loreList.has('Bigger')) player.addTag('Pickaxe:Bigger')
        } else {
          player.removeTag('Pickaxe:Bigger')
        }
      }
    }
  })
}

function eventBlockBreak() {
  world.events.blockBreak.subscribe(breakEvent => {
    let {x, y, z} = breakEvent.block.location
    let player = breakEvent.player

    if (player.hasTag('Pickaxe:Bigger')) Overworld.runCommand(`fill ${x-1} ${y-1} ${z-1} ${x+1} ${y+1} ${z+1} air 0 destroy`)
  })
}


customEnchantment()
eventBlockBreak()