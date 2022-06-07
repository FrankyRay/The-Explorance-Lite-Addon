//@ts-check
import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../PrintMessage";
import { DurabilityItem } from "../Database.js";

/**
 * @param {import("mojang-minecraft").Player} player
 */
export function ItemCompUI(player) {
  let formItemComp = new ActionFormData()
    .title("Item Components")
    .body("Select one to see more")
    .button("Show General Info")
    .button("Show Component Info")
    .button("Durability Info [Check Comp]");

  formItemComp.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 2:
        DurabilityInfo(player);
        break;
      default:
        Print("Not available yet!");
    }
  });
}

/**
 * @param {import("mojang-minecraft").Player} player
 */
function DurabilityInfo(player) {
  let item = player
    .getComponent("inventory")
    .container.getItem(player.selectedSlot);

  let durability = item.hasComponent("minecraft:durability");
}
