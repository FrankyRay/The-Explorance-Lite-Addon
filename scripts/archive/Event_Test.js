import { world } from 'mojang-minecraft';

function tickToTimeFormat(ticks) {
  let time = ticks / 20
  let minute = Math.floor(time / 60)
  let second = time % 60

  return `${minute}:${second}`
}

// Testing Events
function eventChat() {
  world.events.beforeChat.subscribe(chatEvent => {
    let message = chatEvent.message
    let player = chatEvent.sender.nameTag
    let send = chatEvent.sendToTargets
    let target = chatEvent.targets
    console.warn(`Chat Event Detected\nMessage: ${message}\nSender: ${player}\nSend To Targets: ${send}\nTargets: ${target}`)
  })
}

function eventExplosion() {
  world.events.beforeExplosion.subscribe(explodeEvent => {
    let dimension = explodeEvent.dimension.id
    let entity = explodeEvent.source.id
    console.warn(`Explosion Event Detected\nDimension: ${dimension}\nEntity Source: ${entity}`)
  })
}

function eventItemUse() {
  world.events.beforeItemUse.subscribe(itemEvent => {
    let item = itemEvent.item.id
    let entity = itemEvent.source.id
    console.warn(`Item Use Event Detected\nItem: ${item}\nEntity: ${entity}`)
  })
}

function eventItemUseOn() {
  world.events.beforeItemUseOn.subscribe(itemOnEvent => {
    let blockFace = itemOnEvent.blockFace
    let { x, y, z } = itemOnEvent.blockLocation
    let faceX = itemOnEvent.faceLocationX
    let faceY = itemOnEvent.faceLocationY
    let item = itemOnEvent.item.id
    let entity = itemOnEvent.source.id
    console.warn(`Item Use On Event Detected\nBlock Face: ${blockFace}\nBlock Location: ${x}, ${y}, ${z}\nFace Location: ${faceX}, ${faceY}\nItem: ${item}\nEntity: ${entity}`)
  })
}

function eventPistonActivate() {
  world.events.beforePistonActivate.subscribe(pistonEvent => {
    let block = pistonEvent.block.id
    let dimension = pistonEvent.dimension.id
    let expanding = pistonEvent.isExpanding
    console.warn(`Piston Activate Event Detected\nBlock: ${block}\nDimension: ${dimension}\nIs Expanding: ${expanding}`)
  })
}

function eventBlockBreak() {
  world.events.blockBreak.subscribe(breakEvent => {
    let block = breakEvent.brokenBlockPermutation.type.id
    let blockAfter = breakEvent.block.id
    let dimension = breakEvent.dimension.id
    let player = breakEvent.player.nameTag
    console.warn(`Block Break Event Detected\nBlock: ${block}\nBlock After: ${blockAfter}\nDimension: ${dimension}\nPlayer: ${player}`)
  })
}

function eventBlockPlace() {
  world.events.blockPlace.subscribe(placeEvent => {
    let block = placeEvent.block.id
    let dimension = placeEvent.dimension.id
    let player = placeEvent.player.nameTag
    console.warn(`Block Place Event Detected\nBlock: ${block}\nDimension: ${dimension}\nPlayer: ${player}`)
  })
}

function eventEffectAdd() {
  world.events.effectAdd.subscribe(effectEvent => {
    let effect = effectEvent.effect.displayName
    let effectAmp = effectEvent.effect.amplifier
    let duration = effectEvent.effect.duration
    let effectState = effectEvent.effectState
    let entity = effectEvent.entity.id
    console.warn(`Effect Add Event Detected\nEffect: ${effect}\nEffect Amplifier: ${effectAmp}\nDuration: ${duration} Tick(s) (${tickToTimeFormat(duration)})\nEffect State: ${effectState}\nEntity: ${entity}`)
  })
}

function eventEntityCreate() {
  world.events.entityCreate.subscribe(createEvent => {
    let entity = createEvent.entity.id
    console.warn(`Entity Create Event Detected\nEntity: ${entity}`)
  })
}

function eventEntityHit() {
  world.events.entityHit.subscribe(hitEvent => {
    let entity = hitEvent.entity.id
    let hitBlock = hitEvent.hitBlock.id
    let hitEntity = hitEvent.hitEntity.id
    console.warn(`Entity Hit Event Detected\nEntity Source: ${entity}\nBlock: ${hitBlock}\nEntity: ${hitEntity}`)
  })
}

function eventWeatherChange() {
  world.events.weatherChange.subscribe(weatherEvent => {
    let dimension = weatherEvent.dimension
    let lightning = weatherEvent.lightning
    let raining = weatherEvent.raining
    console.warn(`Weather Change Event Detected\nDimension: ${dimension}\nLightning: ${lightning}\nRaining: ${raining}`)
  })
}


// Events Run //
// Work
eventChat()
eventExplosion()
eventItemUse()
eventItemUseOn()
eventPistonActivate()
eventBlockBreak()
eventBlockPlace()
eventEffectAdd()
eventEntityCreate()
eventWeatherChange()
// Test
// Fail
eventEntityHit() // Probably on Beta