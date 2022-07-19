import { world } from "mojang-minecraft";

const CmdPrefix = "!";
const Overworld = world.getDimension("overworld");

function changeNameTag() {
  world.events.beforeChat.subscribe((msg) => {
    let text = msg.message;
    let player = msg.sender;

    if (text.startsWith(`${CmdPrefix}nametag`)) {
      let args = text.replace(`${CmdPrefix}nametag `, "");

      if (args.startsWith("change")) {
        let newName = args.replace("change ", "");
        player.nameTag = newName;
        Overworld.runCommand(
          `tellraw @a {"rawtext":[{"text": "Real name: ${player.name}\nAlias name: ${player.nameTag}"}]}`
        );
      } else if (args.startsWith("reset")) {
        player.nameTag = player.name;
        Overworld.runCommand(
          `tellraw @a {"rawtext":[{"text": "Real name: ${player.name}\nAlias name: ${player.nameTag}"}]}`
        );
      }
    }
  });
}
