//@ts-check
import { Entity, world } from "mojang-minecraft";
import { ActionFormData } from "mojang-minecraft-ui";
import { Print } from "../PrintMessage.js";
import { PlayerCompUI } from "./PlayerComp.js";

export function ComponentsUI(player) {
  let formComp = new ActionFormData()
    .title("Component Display")
    .body("Select component to view more")
    .button("Player")
    .button("Item")
    .button("Entity");

  formComp.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 0:
        PlayerCompUI(player);
        break;
      // case 1:
      //   ItemComp(player);
      //   break;
      // case 2:
      //   Entity(player);
      //   break;
      default:
        Print("The component is WIP!");
    }
  });
}
