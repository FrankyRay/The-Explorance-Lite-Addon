import { world } from "mojang-minecraft";

function coordinate() {
  world.events.tick.subscribe((tick) => {
    for (let player of world.getPlayers()) {
      let x = Math.floor(player.location.x);
      let y = Math.floor(player.location.y);
      let z = Math.floor(player.location.z);
      let health = player.getComponent("minecraft:health").current;
      try {
        Overworld.runCommand(
          `scoreboard players set "${player.name}" X_Coord ${x}`
        );
        Overworld.runCommand(
          `scoreboard players set "${player.name}" Y_Coord ${y}`
        );
        Overworld.runCommand(
          `scoreboard players set "${player.name}" Z_Coord ${z}`
        );
        Overworld.runCommand(
          `scoreboard players set "${player.name}" Health ${health}`
        );
      } catch (err) {}
    }
  });
}

function scoreAPIObjectives() {
  world.events.beforeChat.subscribe((chat) => {
    if (chat.message.startsWith(`${CmdPrefix}scoreAPI`)) {
      let arg = chat.message.replace(`${CmdPrefix}scoreAPI `, "");
      if (arg === "add") {
        Overworld.runCommand(`scoreboard objectives ${arg} X_Coord dummy`);
        Overworld.runCommand(`scoreboard objectives ${arg} Y_Coord dummy`);
        Overworld.runCommand(`scoreboard objectives ${arg} Z_Coord dummy`);
        Overworld.runCommand(`scoreboard objectives ${arg} Health dummy`);
      } else if (arg === "remove") {
        Overworld.runCommand(`scoreboard objectives ${arg} X_Coord`);
        Overworld.runCommand(`scoreboard objectives ${arg} Y_Coord`);
        Overworld.runCommand(`scoreboard objectives ${arg} Z_Coord`);
        Overworld.runCommand(`scoreboard objectives ${arg} Health`);
      }
    }
  });
}
