import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../PrintMessage";

/**
 * @param {import("mojang-minecraft").Player} player
 */
export function PlayerCompUI(player) {
  let formPlayerComp = new ActionFormData()
    .title("Player Components")
    .body("Select one to see more")
    .button("Show Component Info");

  formPlayerComp.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 0:
        ComponentInfo(player);
        break;
      default:
        Print("Not available yet!");
    }
  });
}

/**
 * @param {import("mojang-minecraft").Player} player
 */
function ComponentInfo(player) {
  let playerComps = ["General", "Health", "Inventory"];

  let formPlrComp = new ModalFormData()
    .title("Player Components")
    .dropdown("Components", playerComps)
    .toggle("Show Tick\n§8[§cShow Once§8/§aShow Always§8]", false)
    .toggle(
      "Show Option §8{Show Once}\n§8[§cContent Log§8/§aChat Display§8]",
      false
    );

  formPlrComp
    .show(player)
    .then((respond) => {
      if (respond.isCanceled) return;

      let [comp, tick, opt] = respond.formValues;
      if (tick) {
        player.setDynamicProperty("playerCST", playerComps[comp]);
        return;
      } else {
        player.setDynamicProperty("playerCST", "None");
      }

      let message = `Player Component Info [Name: ${player.name}]`;
      let componentID = "";
      let componentProperty = {};
      switch (playerComps[comp]) {
        case "General":
          let {
            dimension: { id: dimensionID },
            headLocation: { x: xhead, y: yhead, z: zhead },
            id: idPlayer,
            isSneaking,
            location: { x: xloc, y: yloc, z: zloc },
            name,
            nameTag,
            //@ts-ignore
            rotation: { x: xrot, y: yrot },
            viewVector: { x: xvec, y: yvec, z: zvec },
          } = player;
          componentID = "General";
          componentProperty = {
            Dimension: dimensionID,
            "Head Location": [xhead, yhead, zhead]
              .map((val) => val.toFixed(2))
              .join(" "),
            ID: idPlayer,
            "Is Sneaking": isSneaking,
            Location: [xloc, yloc, zloc].map((val) => val.toFixed(2)).join(" "),
            "Name Tag": nameTag,
            Rotation: [xrot, yrot].map((val) => val.toFixed(2)).join(" "),
            "View Vector": [xvec, yvec, zvec]
              .map((val) => val.toFixed(2))
              .join(" "),
          };
          break;
        case "Health":
          let { current, id: idHealth, value } = player.getComponent("health");
          componentID = idHealth;
          componentProperty = {
            Current: current,
            Value: value,
          };
          break;
        case "Inventory":
          let {
            additionalSlotsPerStrength,
            canBeSiphonedFrom,
            container: { emptySlotsCount, size },
            containerType,
            id: idInv,
            inventorySize,
            restrictToOwner,
          } = player.getComponent("inventory");
          let itemID = player
            .getComponent("inventory")
            .container.getItem(player.selectedSlot).id;
          componentID = idInv;
          componentProperty = {
            "Additional Slots Per Strength": additionalSlotsPerStrength,
            "Can Be Siphoned From": canBeSiphonedFrom,
            "Container - Empty Slots Count": emptySlotsCount,
            "Container - Size": size,
            "Container Type": containerType,
            "Inventory Size": inventorySize,
            Mainhand: itemID ? itemID : "Empty",
            "Restrict To Owner": restrictToOwner,
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
    })
    .catch((err) => {
      console.error(err);
    });
}
