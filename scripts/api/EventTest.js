import { world } from "mojang-minecraft";
// Testing all events on "mojang-minecraft" module

// Variable "Event" for fast typing
const Event = world.events;

function tickToTimeFormat(ticks) {
  let time = ticks / 20;
  let minute = Math.floor(time / 60);
  let second = time % 60;

  return `${minute}:${second}`;
}

/* Event List */

/**
 * Event `beforeChat`:
 * Fires when player sent the message on chat
 * - Minecraft Version: Unknown
 * - Equivalent: Event `chat` (Without `.cancel`)
 *
 * Event component:
 * - `.cancel: bool = false`: Cancel the message to sent
 * - `.message -> str`: The message of what player sent
 * - `.sender -> Player`: Who sent the message
 * - `.sendToTargets -> bool`: Are the message broadcast to all player?
 * - `.target -> Player[]`: List of player who got the message
 */
function eventChat() {
  Event.beforeChat.subscribe((chatEvent) => {
    let message = chatEvent.message;
    let player = chatEvent.sender.name;
    let send = chatEvent.sendToTargets;
    let target = chatEvent.targets;
    console.warn(
      `Chat Event Detected\nMessage: ${message}\nSender: ${player}\nSend To Targets: ${send}\nTargets: ${target}`
    );
  });
}

function eventDataDrivenEntity() {
  Event.beforeDataDrivenEntityTriggerEvent.subscribe((DDETEvent) => {
    let entity = DDETEvent.entity.id;
    let eventID = DDETEvent.id;
    let modifier = DDETEvent.modifiers;
    console.warn(
      `Data Driven Entity Trigger Event Detected\nEntity: ${entity}\nEvent ID: ${eventID}\nModifier: ${modifier}`
    );
  });
}

/**
 * Event "beforeExplosion":
 * Fires when entity explode
 * - Minecraft Version: Unknown
 * - Equivalent: Event `explosion` (Without `.cancel`)
 *
 * Event component:
 * - `.cancel: bool = false`: Cancel the explosion
 * - `.dimension -> Dimension`: The dimension of where the explosion was
 * - `.entity -> Entity`: The entity who explode
 */
function eventExplosion() {
  Event.beforeExplosion.subscribe((explodeEvent) => {
    let dimension = explodeEvent.dimension.id;
    let entity = explodeEvent.source.id;
    console.warn(
      `Explosion Event Detected\nDimension: ${dimension}\nEntity Source: ${entity}`
    );
  });
}

/**
 * Event "beforeItemUse":
 * Fires when entity use the item (Can be use to detect "Right Click")
 * - Minecraft Version: Unknown
 * - Equivalent: Event `itemUse` (Without `.cancel`)
 *
 * Event component:
 * - `.cancel: bool = false`: Cancel the item get used
 * - `.item -> ItemStack`: Item that entity use
 * - `.entity -> Entity`: Entity who use the item
 */
function eventItemUse() {
  Event.beforeItemUse.subscribe((itemEvent) => {
    let item = itemEvent.item.id;
    let entity = itemEvent.source.id;
    console.warn(`Item Use Event Detected\nItem: ${item}\nEntity: ${entity}`);
  });
}

/**
 * Event `beforeItemUseOn`:
 * Fires when entity use the item on block (Nearly same with `beforeItemUse` event)
 * - Minecraft Version: Unknown
 * - Equivalent: Event `itemUseOn` (Without `.cancel`)
 *
 * Event component:
 * - `.cancel: bool = false`: Cancel the item get used on block
 * - `.blockFace -> Direction`: ???
 * - `.blockLocation -> BlockLocation`: The location of the block
 * - `.faceLocationX -> float`: Entity's X rotation
 * - `.faceLocationY -> float`: Entity's Y rotation
 * - `.item -> ItemStack`: Item that entity use
 * - `.entity -> Entity`: Entity who use the item
 */
function eventItemUseOn() {
  Event.beforeItemUseOn.subscribe((itemOnEvent) => {
    let blockFace = itemOnEvent.blockFace;
    let { x, y, z } = itemOnEvent.blockLocation;
    let faceX = itemOnEvent.faceLocationX;
    let faceY = itemOnEvent.faceLocationY;
    let item = itemOnEvent.item.id;
    let entity = itemOnEvent.source.id;
    console.warn(
      `Item Use On Event Detected\nBlock Face: ${blockFace}\nBlock Location: ${x}, ${y}, ${z}\nFace Location: ${faceX}, ${faceY}\nItem: ${item}\nEntity: ${entity}`
    );
  });
}

/**
 * Event `beforePistonActivate`:
 * Fires when piston was turned on/off
 * - Minecraft Version: Unknown
 * - Equivalent: Event `pistonActivate` (Without `.cancel`)
 *
 * Event component:
 * - `.cancel: bool = false`: Cancel the piston turned on/off
 * - `.block -> Block`: What block get pushed/pulled
 * - `.dimension`
 */
function eventPistonActivate() {
  Event.beforePistonActivate.subscribe((pistonEvent) => {
    let block = pistonEvent.block.id;
    let dimension = pistonEvent.dimension.id;
    let expanding = pistonEvent.isExpanding;
    console.warn(
      `Piston Activate Event Detected\nBlock: ${block}\nDimension: ${dimension}\nIs Expanding: ${expanding}`
    );
  });
}

/**
 * 1.18.10.21?
 */
function eventBlockBreak() {
  Event.blockBreak.subscribe((breakEvent) => {
    let block = breakEvent.brokenBlockPermutation.type.id;
    let blockAfter = breakEvent.block.id;
    let dimension = breakEvent.dimension.id;
    let player = breakEvent.player.name;
    console.warn(
      `Block Break Event Detected\nBlock: ${block}\nBlock After: ${blockAfter}\nDimension: ${dimension}\nPlayer: ${player}`
    );
  });
}

/**
 * 1.18.10.21?
 */
function eventBlockExplode() {
  Event.blockExplode.subscribe((blockExplodeEvent) => {
    let block = blockExplodeEvent.block.id;
    let dimension = blockExplodeEvent.dimension.id;
    let entity = blockExplodeEvent.source.id;
    console.warn(
      `Block Explode Event Detected\nBlock: ${block}\nDimension: ${dimension}\nEntity: ${entity}`
    );
  });
}

function eventBlockPlace() {
  Event.blockPlace.subscribe((placeEvent) => {
    let block = placeEvent.block.id;
    let dimension = placeEvent.dimension.id;
    let player = placeEvent.player.name;
    console.warn(
      `Block Place Event Detected\nBlock: ${block}\nDimension: ${dimension}\nPlayer: ${player}`
    );
  });
}

function eventEffectAdd() {
  Event.effectAdd.subscribe((effectEvent) => {
    let effect = effectEvent.effect.displayName;
    let effectAmp = effectEvent.effect.amplifier;
    let duration = effectEvent.effect.duration;
    let effectState = effectEvent.effectState;
    let entity = effectEvent.entity.id;
    console.warn(
      `Effect Add Event Detected\nEffect: ${effect}\nEffect Amplifier: ${effectAmp}\nDuration: ${duration} Tick(s) (${tickToTimeFormat(
        duration
      )})\nEffect State: ${effectState}\nEntity: ${entity}`
    );
  });
}

function eventEntityCreate() {
  Event.entityCreate.subscribe((createEvent) => {
    let entity = createEvent.entity.id;
    console.warn(`Entity Create Event Detected\nEntity: ${entity}`);
  });
}

function eventEntityHit() {
  Event.entityHit.subscribe((hitEvent) => {
    let entity = hitEvent.entity.id;
    let hitBlock, hitEntity;
    if (hitEvent.hitBlock != undefined) {
      hitBlock = hitEvent.hitBlock.id;
      console.warn(
        `Entity Hit Event Detected\nEntity Source: ${entity}\nBlock: ${hitBlock}`
      );
    } else if (hitEvent.hitEntity != undefined) {
      hitEntity = hitEvent.hitEntity.id;
      console.warn(
        `Entity Hit Event Detected\nEntity Source: ${entity}\nEntity: ${hitEntity}`
      );
    } else {
      console.warn(
        `Entity Hit Event Detected\nEntity Source: ${entity}\nDid you punch air?`
      );
    }
  });
}

/**
 * Event `entityHurt`:
 * Fires when entity get hurt by entity
 *
 * Added on:
 * - Beta 1.18.30.20 / Preview 1.18.30.21
 * - Stable 1.18.30
 *
 * Event Component:
 * - `.cause -> str`: The type of damage received
 * - `.damage -> int`: The number of damage received (In HP)
 * - `.damagingEntity -> Entity`: Entity that gives damage
 * - `.hurtEntity -> Entity`: Entity that receives damage
 * - `.projectile -> Entity`: The projectile used to gives damage
 */
function eventEntityHurt() {
  Event.entityHurt.subscribe((hurtEvent) => {
    let cause = hurtEvent.cause;
    let damage = hurtEvent.damage;
    let source = hurtEvent.damagingEntity?.id;
    let target = hurtEvent.hurtEntity.id;
    let projectile = hurtEvent.projectile?.id;
    console.warn(
      `Entity Hurt Event Detected\nDamage Cause: ${cause}\nDamage: ${damage}\nSource: ${source}\nTarget: ${target}\nProjectile: ${projectile}`
    );
  });
}

function eventItemCompleteCharge() {
  Event.itemCompleteCharge.subscribe((completeChargeEvent) => {
    let item = completeChargeEvent.itemStack.id;
    let entity = completeChargeEvent.source.id;
    let duration = completeChargeEvent.useDuration;
    console.warn(
      `Item Complete Charge Event Detected\nItem: ${item}\nEntity: ${entity}\nDuration: ${duration}`
    );
  });
}

function eventItemReleaseCharge() {
  Event.itemReleaseCharge.subscribe((releaseChargeEvent) => {
    let item = releaseChargeEvent.itemStack.id;
    let entity = releaseChargeEvent.source.id;
    let duration = releaseChargeEvent.useDuration;
    console.warn(
      `Item Release Charge Event Detected\nItem: ${item}\nEntity: ${entity}\nDuration: ${duration}`
    );
  });
}

function eventItemStartCharge() {
  Event.itemStartCharge.subscribe((startChargeEvent) => {
    let item = startChargeEvent.itemStack.id;
    let entity = startChargeEvent.source.id;
    let duration = startChargeEvent.useDuration;
    console.warn(
      `Item Release Charge Event Detected\nItem: ${item}\nEntity: ${entity}\nDuration: ${duration}`
    );
  });
}

function eventItemStartUseOn() {
  Event.itemStartUseOn.subscribe((startUseOnEvent) => {
    let blockFace = startUseOnEvent.blockFace;
    let { x: p, y: q, z: r } = startUseOnEvent.buildBlockLocation;
    let { x: a, y: b, z: c } = startUseOnEvent.blockLocation;
    let item = startUseOnEvent.item.id;
    let entity = startUseOnEvent.source.id;
    console.warn(
      `Item Start Use On Event Detected\nBlock Face: ${blockFace}\nBlock Location: ${a} ${b} ${c}\nBuild Location: ${p} ${q} ${r}\nItem: ${item}\nEntity: ${entity}`
    );
  });
}

function eventItemStopCharge() {
  Event.itemStopCharge.subscribe((stopChargeEvent) => {
    let item = stopChargeEvent.itemStack.id;
    let entity = stopChargeEvent.source.id;
    let duration = stopChargeEvent.useDuration;
    console.warn(
      `Item Stop Charge Event Detected\nItem: ${item}\nEntity: ${entity}\nDuration: ${duration}`
    );
  });
}

function eventItemStopUseOn() {
  Event.itemStopUseOn.subscribe((stopUseOnEvent) => {
    let { x, y, z } = stopUseOnEvent.blockLocation;
    let item = stopUseOnEvent.item.id;
    let entity = stopUseOnEvent.source.id;
    console.warn(
      `Item Stop Use On Event Detected\nBlock Location: ${x} ${y} ${z}\nItem: ${item}\nEntity: ${entity}`
    );
  });
}

function eventLeverActivate() {
  Event.leverActivate.subscribe((leverEvent) => {
    let block = leverEvent.block.id;
    let dimension = leverEvent.dimension.id;
    let power = leverEvent.isPowered;
    let player = leverEvent.player.name;
    console.log(
      `Lever Activate Event Detected\nBlock: ${block}\nDimension: ${dimension}\nPower: ${power}\nPlayer: ${player}`
    );
  });
}

// Player Join Event
// Player Leave Event

function eventProjectileHit() {
  Event.projectileHit.subscribe((projectileEvent) => {
    let dimension = projectileEvent.dimension.id;
    let vector = projectileEvent.hitVector;
    let { x, y, z } = projectileEvent.location;
    let projectile = projectileEvent.projectile.id;
    let source = projectileEvent.source.id;
    if (projectileEvent.blockHit != undefined) {
      let {
        block: { id },
        face,
        faceLocationX,
        faceLocationY,
      } = projectileEvent.blockHit;
      console.warn(
        `Projectile Hit Event Detected\nBlock: \n- ID: ${id}\n- Face: ${face}\n- Face Location: ${faceLocationX} ${faceLocationY}\nDimension: ${dimension}\nVector: ${vector}\nLocation: ${x} ${y} ${z}\nProjectile: ${projectile}\nSource: ${source}`
      );
    } else if (projectileEvent.entityHit != undefined) {
      let entity = projectileEvent.entityHit.entity.id;
      console.warn(
        `Projectile Hit Event Detected\nTarget: ${entity}\nDimension: ${dimension}\nVector: ${vector}\nLocation: ${x} ${y} ${z}\nProjectile: ${projectile}\nSource: ${source}`
      );
    }
  });
}

// Tick Event

function eventWeatherChange() {
  Event.weatherChange.subscribe((weatherEvent) => {
    let dimension = weatherEvent.dimension;
    let lightning = weatherEvent.lightning;
    let raining = weatherEvent.raining;
    console.warn(
      `Weather Change Event Detected\nDimension: ${dimension}\nLightning: ${lightning}\nRaining: ${raining}`
    );
  });
}

function csteventEntityKilled() {
  Event.entityHurt.subscribe((killedEvent) => {
    let target = killedEvent.hurtEntity;
    if (target.getComponent("health").current <= 0) {
      let cause = killedEvent.cause;
      let damage = killedEvent.damage;
      let source = killedEvent.damagingEntity?.id;
      let projectile = killedEvent.projectile?.id;

      console.log(
        `Custom Event: Entity Killed Detected [EntityHurt]\nDamage Cause: ${cause}\nDamage: ${damage}\nSource: ${source}\nTarget: ${target}\nProjectile: ${projectile}`
      );
    }
  });
}

// World Initialize Event

/* Event Test */

// -+- Work -+-
// eventBlockBreak();
// eventBlockPlace();
// eventChat();
// eventEffectAdd();
// eventEntityCreate();
// eventEntityHit();
// eventExplosion();
// eventItemUse();
// eventItemUseOn();
// eventPistonActivate();
// eventWeatherChange();
// eventBlockExplode();
// eventDataDrivenEntity();
// eventEntityHurt();
// eventItemCompleteCharge();
// eventItemReleaseCharge();
// eventItemStartCharge();
// eventItemStartUseOn();
// eventItemStopCharge();
// eventItemStopUseOn();
// eventLeverActivate();
// eventProjectileHit();

// -+- Test -+-

// -+- Custom -+-
csteventEntityKilled();
