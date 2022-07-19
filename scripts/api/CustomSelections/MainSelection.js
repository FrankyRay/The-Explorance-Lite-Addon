//@ts-check
import {
  BlockRaycastOptions,
  EntityRaycastOptions,
  MinecraftEffectTypes,
  world,
} from "mojang-minecraft";
import { MCEffectsList } from "../lib/MinecraftData.js";
import {
  ChunkPosition,
  PlayerChunkPosition,
  EffectTimeStyle,
} from "../lib/MinecraftFunctions.js";
import { PrintAction } from "../lib/MinecraftFunctions.js";

let tps = "20";
let delta = 0;

function DebugScreen() {
  world.events.tick.subscribe((tickEvent) => {
    for (let player of world.getPlayers()) {
      if (!player.getDynamicProperty("Debug:ShowDebug")) return;
      let message = `§gF3 Debug Screen`;

      if (player.getDynamicProperty("Debug:Name")) {
        let { nameTag } = player;
        message += `\n§cName:§r ${nameTag}`;
      }

      if (player.getDynamicProperty("Debug:TPS")) {
        if (tickEvent.currentTick % 20 == 0) {
          tps = (1 / tickEvent.deltaTime).toFixed(2);
          delta = Math.round(tickEvent.deltaTime * 1000);
        }
        message += `\n§cTPS:§r ${tps} (${delta}ms)`;
      }

      if (player.getDynamicProperty("Debug:Location")) {
        let {
          location: { x, y, z },
          dimension: { id },
        } = player;
        message += `\n§cLocation:§r ${x.toFixed(5)}/${y.toFixed(5)}/${z.toFixed(
          5
        )} (${id.replace("minecraft:", "").replace("_", " ")})`;
      }

      if (player.getDynamicProperty("Debug:Chunk")) {
        let { location } = player;
        let playerChunk = PlayerChunkPosition(location);
        let chunk = ChunkPosition(location);
        message += `\n§cChunk:§r ${playerChunk.x} ${playerChunk.y} ${playerChunk.z} (At chunk: ${chunk.x} ${chunk.y} ${chunk.z})`;
      }

      if (player.getDynamicProperty("Debug:Facing")) {
        let { x, y } = player.rotation;
        let direction = "South";
        if (-45 < y && y < 45) direction = `South (+Z)`;
        else if (45 < y && y < 135) direction = `West (-X)`;
        else if (-135 < y && y < -45) direction = `East (+X)`;
        else if ((135 < y && y < 180) || (-180 < y && y < -135))
          direction = `North (-Z)`;
        message += `\n§cFacing:§r ${direction} ${x.toFixed(2)}/${y.toFixed(2)}`;
      }

      if (player.getDynamicProperty("Debug:Effect")) {
        let effects = [];
        for (let effectType in MCEffectsList) {
          let eff = player.getEffect(MCEffectsList[effectType]);
          if (!eff) continue;

          let { amplifier, displayName, duration } = eff;
          let time = EffectTimeStyle(duration);
          effects.push({ name: displayName, lvl: amplifier, duration: time });
        }

        message += "\n§cEffect(s):§r ";
        if (effects.length == 0) message += "No active effect";
        else {
          for (let effect of effects) {
            message += `\n  ${effect["name"]} ${effect["lvl"]}: ${effect["duration"]} left`;
          }
        }
      }

      if (player.getDynamicProperty("Debug:Item")) {
        let item = player
          .getComponent("inventory")
          .container.getItem(player.selectedSlot);
        message += `\n§cItem:§r ${item?.id ?? "(None)"} ${
          !item ? "" : `(${item.nameTag ?? ""})`
        }`;
      }

      if (player.getDynamicProperty("Debug:Block")) {
        let blockRaycast = new BlockRaycastOptions();
        blockRaycast.includeLiquidBlocks = false;
        blockRaycast.includePassableBlocks = false;

        let block = player.getBlockFromViewVector(blockRaycast);
        message += `\n§cBlock:§r ${block?.id ?? "(None)"}`;
      }

      if (player.getDynamicProperty("Debug:Liquid")) {
        let liquidRaycast = new BlockRaycastOptions();
        liquidRaycast.includeLiquidBlocks = true;
        liquidRaycast.includePassableBlocks = true;

        let liquid = player.getBlockFromViewVector(liquidRaycast);
        let liquids = ["minecraft:water", "minecraft:lava"];
        message += `\n§cLiquid:§r ${
          !liquids.includes(liquid?.id) ? "(None)" : liquid.id
        }`;
      }

      if (player.getDynamicProperty("Debug:Entity")) {
        let entityRaycast = new EntityRaycastOptions();
        entityRaycast.maxDistance = 6;

        let entity = player.getEntitiesFromViewVector(entityRaycast);
        if (entity.length == 0) message += `\n§cEntity:§r (None)`;
        else message += `\n§cEntity:§r ${entity[0].id}`;
      }

      if (player.getDynamicProperty("Debug:Structure")) {
      }

      PrintAction(message, player.name);
    }
  });
}

DebugScreen();
