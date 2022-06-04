//@ts-check
import { world } from "mojang-minecraft";
import { ActionFormData, MessageFormData } from "mojang-minecraft-ui";
import { Print } from "../PrintMessage";

/**
 * @param {import("mojang-minecraft").Player} player
 */
export function PlayerCompUI(player) {
  let formPlayerComp = new ActionFormData()
    .title("Player Components")
    .body("Select one to see more")
    .button("Show General Info")
    .button("Show Component Info");

  formPlayerComp.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 0:
        GeneralInfo(player);
        break;
      case 1:
        ComponentInfoUI(player);
        break;
      default:
        return;
    }
  });
}

function GeneralInfo(player) {
  let {
    dimension: { id: dimensionID },
    headLocation: { x: xhead, y: yhead, z: zhead },
    id,
    isSneaking,
    location: { x: xloc, y: yloc, z: zloc },
    name,
    nameTag,
    //@ts-ignore
    rotation: { x: xrot, y: yrot },
    viewVector: { x: xvec, y: yvec, z: zvec },
  } = player;

  let component = {
    Dimension: dimensionID,
    Head_Location: [xhead, yhead, zhead].map((val) => val.toFixed(2)).join(" "),
    ID: id,
    Is_Sneaking: isSneaking,
    Location: [xloc, yloc, zloc].map((val) => val.toFixed(2)).join(" "),
    Name_Tag: nameTag,
    Rotation: [xrot, yrot].join(" "),
    View_Vector: [xvec, yvec, zvec].map((val) => val.toFixed(2)).join(" "),
  };

  let message = `General Player Component [Name: ${name}]`;
  for (let key in component) {
    message += `\n§g${key.replace("_", " ")}§r: ${component[key]}`;
  }

  let formPrint = new MessageFormData()
    .title("Show Type")
    .body("Select where you want to print the code")
    .button1("Content Log [console.warn()]")
    .button2("Chat Display [Print()]");

  formPrint.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 1:
        console.warn(message);
        break;
      case 0:
        Print(message);
        break;
    }
  });
}

/**
 * @param {import("mojang-minecraft").Player} player
 */
function ComponentInfoUI(player) {}
