// @ts-check
import { world, Enchantment } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../PrintMessage";
import { MCEnchantments, MCEnchantmentsList } from "../Database.js";

/**
 * @param {import("mojang-minecraft").Player} player
 */
export function ItemCompUI(player) {
  let formItemComp = new ActionFormData()
    .title("Item Components")
    .body("Select one to see more")
    .button("Show Component Info")
    .button("Check Illegal Item");

  formItemComp.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 0:
        ComponentInfoUI(player);
        break;
      case 1:
        try {
          let messageIllegal = [];
          for (let i = 0; i < 36; i++) {
            // @ts-ignore
            let item = player.getComponent("inventory").container.getItem(i);
            if (!item) continue;

            let eComp = item.getComponent("enchantments").enchantments;
            for (let enc in MCEnchantmentsList) {
              let itemEnc = eComp.getEnchantment(MCEnchantmentsList[enc]);
              if (!itemEnc) continue;

              // Get enchantment data
              let {
                level,
                type: { id, maxLevel },
              } = itemEnc;

              // Check if the enchantment is cannot be applied to the item
              console.warn(
                `\${item.id} - \${MCEnchantmentsList[enc].id} - \${eComp.canAddEnchantment(new Enchantment(MCEnchantmentsList[enc], 1))}\n${
                  item.id
                } - ${MCEnchantmentsList[enc].id} - ${eComp.canAddEnchantment(
                  new Enchantment(MCEnchantmentsList[enc], 1)
                )}`
              );
              if (
                !eComp.canAddEnchantment(
                  new Enchantment(MCEnchantmentsList[enc])
                )
              ) {
                messageIllegal.push([
                  `§a${item.id}§r should not have enchantment §c${MCEnchantmentsList[enc].id}`,
                ]);
              }

              // Check if the enchantment has higher level than the max level
              if (level > maxLevel) {
                messageIllegal.push([
                  `§a${item.id}§r has enchantment §e${id}§r with illegal level §c(${level} > ${maxLevel})`,
                ]);
              }
            }
          }
          for (let msg of messageIllegal) {
            Print(msg);
          }
        } catch (err) {
          console.error(err);
        }
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
  let itemComps = ["General", "Enchantment", "Durability", "Cooldown"];

  let formItemComp = new ModalFormData()
    .title("Item Components")
    .dropdown("Components", itemComps)
    .slider("Hotbar Slot", 1, 9, 1)
    .toggle("Show Option\n§8[§cContent Log§8/§aChat Display§8]", false);

  formItemComp.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [comp, slot, opt] = respond.formValues;
    // @ts-ignore
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
      case "Enchantment":
        for (let enc of Object.values(MCEnchantments)) {
          let itemEnc = item
            .getComponent("enchantments")
            .enchantments.getEnchantment(MCEnchantments[enc]);
          if (!itemEnc) continue;

          let {
            level,
            type: { id, maxLevel },
          } = itemEnc;
          // @ts-ignore
          componentID[id] = `${level}/${maxLevel}`;
        }
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
