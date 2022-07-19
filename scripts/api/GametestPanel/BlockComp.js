//@ts-check
import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../lib/MinecraftFunctions";

/**
 * @param {import("mojang-minecraft").Player} player
 */
export function BlockCompUI(player) {
  let formBlcokComp = new ActionFormData()
    .title("Block Components")
    .body("Select one to see more")
    .button("Show Component Info");

  formBlcokComp.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 0:
        ComponentInfoUI(player);
        break;
      default:
        Print("Not available yet!");
    }
  });
}

/**
 * @param {import("mojang-minecraft").Player} player
 */
function ComponentInfoUI(player) {
  let blockComps = ["General"];
}
