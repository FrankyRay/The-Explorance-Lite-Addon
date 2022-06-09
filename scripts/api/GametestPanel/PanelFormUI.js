//@ts-check
import { Entity, EntityQueryOptions, world } from "mojang-minecraft";
import { ActionFormData, MessageFormData } from "mojang-minecraft-ui";
import { Print } from "../PrintMessage.js";
// UI Files
import { PlayerCompUI } from "./PlayerComp.js";
import { ItemCompUI } from "./ItemComp.js";
import { ExplosionMethod } from "./CreateMethod.js";

const VIEW = "\n§7Click To View More";
const BETA = "\n§6Beta Version";
const NA = "\n§cNot Available";

let entityConfig = new EntityQueryOptions();
entityConfig.closest = 1;
entityConfig.name = "Server Config";
entityConfig.type = "minecraft:armor_stand";

export function GametestPanel(player) {
  let panelGametest = new ActionFormData()
    .title("Gametest Panel")
    .body("Select one to view more")
    .button("Components View" + VIEW)
    .button("Gametest Create Method" + VIEW)
    .button("Component Show Tick" + VIEW)
    .button("Console Test" + VIEW);

  panelGametest.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 0:
        ComponentsUI(player);
        break;
      case 1:
        CreateMethodUI(player);
        break;
      case 3:
        console.log("Console Log | console.log()");
        console.warn("Console Warn | console.warn()");
        console.error("Console Error | console.error()");
        break;
      default:
        Print("The action is not available yet!");
    }
  });
}

function CreateMethodUI(player) {
  let formCreate = new ActionFormData()
    .title("Create Method")
    .body("Select method to create")
    .button("Entity" + NA)
    .button("Item" + NA)
    .button("Particle" + NA)
    .button("Explosion" + BETA);

  formCreate.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 3:
        ExplosionMethod(player);
        break;
      default:
        Print("The method is not available yet!");
    }
  });
}

function ComponentsUI(player) {
  let formComp = new ActionFormData()
    .title("Component")
    .body("Select component to view the component")
    .button("Player" + VIEW)
    .button("Item" + VIEW)
    .button("Block" + NA)
    .button("Entity" + NA);

  formComp.show(player).then((respond) => {
    if (respond.isCanceled) return;

    switch (respond.selection) {
      case 0:
        PlayerCompUI(player);
        break;
      case 1:
        ItemCompUI(player);
        break;
      default:
        Print("The component is not available yet!");
    }
  });
}

function RequirementUI(player) {
  let status = false;
  let location = "";
  for (let entity of world
    .getDimension("overworld")
    .getEntities(entityConfig)) {
    let { x, y, z } = entity.location;
    location = [x, y, z].map((val) => val.toFixed(1)).join(" ");
    status = true;
  }

  let message;
  if (status) {
    message = `${status}\nServer Config Entity on ${location}`;
  } else {
    message = `${status}\nYou need to spawn armor stand with "Server Config" name`;
  }

  let formRequire = new MessageFormData()
    .title("Gametest Server Requirement")
    .body(`Server Config [Armor Stand]: \n${message}`)
    .button1("OK")
    .button2("Cancel");

  formRequire.show(player).then();
}
