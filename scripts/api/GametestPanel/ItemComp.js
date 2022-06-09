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
    .button("Show Component Info")
    .button("Durability Info [Check Comp]");

  formItemComp.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 0:
        ComponentInfoUI(player);
        break;
      // case 1:
      //   DurabilityInfo(player);
      //   break;
      default:
        Print("Not available yet!");
    }
  });
}

/**
 * @param {import("mojang-minecraft").Player} player
 */
function ComponentInfoUI(player) {
  let itemComps = ["General", "Enchantment", "Durability", "Cooldown"];

  let formItemComp = new ModalFormData()
    .title("Item Components")
    .dropdown("Components", itemComps)
    .slider("Hotbar Slot", 1, 9, 1)
    .toggle("Show Option\n§8[§cContent Log§8/§aChat Display§8]", false);

  formItemComp.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [comp, slot, opt] = respond.formValues;
    let item = player.getComponent("inventory").container.getItem(slot - 1);
    if (!item) {
      Print(`Slot ${slot} has no item`);
      return;
    }
    let message = `Item Component Info [Type: ${item.id}]`;
    let componentID = "";
    let componentProperty = {};
    switch (itemComps[comp]) {
      case "General":
        let { amount, data, nameTag } = item;
        let lore = item
          .getLore()
          .map((val) => val.replace("\n", "\\n"))
          .join("\n  ");
        componentID = "General";
        componentProperty = {
          Amount: amount,
          "Data Value": data,
          Lore: `[\n  ${lore}\n]`,
          Name: nameTag,
        };
        break;
      default:
        Print(`Component not available yet`);
        return;
    }

    message += `\n§cType Component§r: ${componentID}`;
    for (let comp in componentProperty) {
      message += `\n§g${comp}§r: ${componentProperty[comp]}`;
    }
    if (opt) Print(message);
    else console.warn(message);
  });
}

// /**
//  * @param {import("mojang-minecraft").Player} player
//  */
// function DurabilityInfo(player) {
//   let item = player
//     .getComponent("inventory")
//     .container.getItem(player.selectedSlot);

//   let durability = item.hasComponent("minecraft:durability");
// }
