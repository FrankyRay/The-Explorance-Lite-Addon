import { world } from "mojang-minecraft";

export function ChunkInfo() {
  world.events.tick.subscribe((tickEvent) => {
    for (let player in world.getPlayers()) {
      let [x, z] = player.location;

      let { x_axis, y_axis } = ChunkPos(x, z);
      // let []
    }
  });
}

function ChunkPos(x, z) {
  const X_axis = Math.ceil(x / 16);
  const Y_axis = Math.ceil(z / 16);

  return { X_axis, Y_axis };
}

function ChunkPlayerPos(x, z) {
  const X_Player_Axis = x % 16;
  const Y_Player_Axis = z % 16;

  return { X_Player_Axis, Y_Player_Axis };
}
