import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../lib/MinecraftFunctions.js";

export function TickingareaAdd(player) {
  let command, syntax;
  let formTickingareaAdd = new ModalFormData()
    .title("Tickingarea Add")
    .toggle("Add Mode\n§8[§cCircle§8/§aSquare§8]", true)
    .textField(
      "1st Position §g[XYZ][~^]§9[Square Mode]§r\nCenter Position §g[XYZ][~^]§9[Circle Mode]",
      "XYZ Position"
    )
    .textField(
      "2nd Position §g[XYZ][~^]§9[Square Mode]§r\nRadius §g[Int]§9[Circle Mode]",
      "Position/Radius"
    )
    .textField("Tickingarea Name §8[Optional]", "Name")
    .toggle("§9Show Command Syntax", false);

  formTickingareaAdd.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [mode, arg1, arg2, name, syntaxarg] = respond.formValues;

    command = `tickingarea add ${arg1} ${arg2} ${name}`;
    if (!mode) {
      command = `tickingarea add ${arg1} ${arg2} ${name}`;
    }
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function TickingareaRemove(player) {
  let command, syntax;
  let formTickingareaRemove = new ModalFormData()
    .title("Tickingarea Remove")
    .toggle("Remove Mode\n§8[§cAll§8/§aSpecify§8]", true)
    .textField("Position §g[XYZ][~^]§r/Tickingarea Name", "Position/Name")
    .toggle("§9Show Command Syntax", false);

  formTickingareaRemove.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [mode, arg, syntaxarg] = respond.formValues;

    command = `tickingarea remove ${arg}`;
    if (!mode) {
      command = `tickingarea remove_all`;
    }
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function TickingareaList(player) {
  let formTickingareaList = new MessageFormData()
    .title("Tickingarea List")
    .body("Show list of tickingarea.\nSelect dimension mode")
    .button1("Current Dimension")
    .button2("All Dimension");

  formTickingareaList.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let button = respond.selection;

    command = `tickingarea list`;
    if (button == 0) {
      command = `tickingarea list all-dimensions`;
    }
    let message = player.runCommand(command);
    Print(message.statusMessage, player.name);
  });
}
