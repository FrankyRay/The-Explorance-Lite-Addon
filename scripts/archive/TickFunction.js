//@ts-check
import { BlockRaycastOptions, world as World } from "mojang-minecraft";
import { Print, PrintAction } from "../api/lib/MinecraftFunctions.js";

export function TickFunction() {
  World.events.tick.subscribe((tickEvent) => {
    for (let player of World.getPlayers()) {
      let ChunkPosition = (
        /** @type {import("mojang-minecraft").Player} */ target
      ) => {
        if (target.hasTag("F:ShowChunk")) {
          let { x, y, z } = target.location;
          let [cx, cz, tx, tz] = ChunkPositionMath(x, z);

          PrintAction(
            `Player Position: ${Math.floor(x)}, ${Math.floor(
              z
            )}\nChunk Position: ${cx}, ${cz}\nPlayer-in-Chunk Position: ${tx}, ${tz}`,
            target.name
          );
        }
      };

      let RaycastBlock = (
        /** @type {import("mojang-minecraft").Player} */ target
      ) => {
        if (target.hasTag("F:RayCast")) {
          let raycast = new BlockRaycastOptions();
          raycast.maxDistance = 10;

          let Block = target.getBlockFromViewVector(raycast);
          if (Block.id == "minecraft:netherite_block") {
            Print("Found netherite block", target.name);
            target.removeTag("F:RayCast");
          }
        }
      };

      ChunkPosition(player);
    }
  });
}

function ChunkPositionMath(x, z) {
  let chunk_x = Math.floor(x / 16);
  let chunk_z = Math.floor(z / 16);

  let target_x = Math.floor(x % 16);
  let target_z = Math.floor(z % 16);

  return [chunk_x, chunk_z, target_x, target_z];
}
