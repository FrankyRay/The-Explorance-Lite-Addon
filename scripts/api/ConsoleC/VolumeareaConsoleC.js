import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../lib/MinecraftFunctions.js";

export function VolumeareaAdd(player) {
  let command, syntax;
  let formVolumeareaAdd = new ModalFormData()
    .title("Volumearea Add")
    .textField("Volumearea ID §9[Addon]", "Identifier")
    .textField("1st Position §g[XYZ][~^]", "XYZ Position")
    .textField("2nd Position §g[XYZ][~^]", "XYZ Position")
    .textField("Volumearea Name §8[Optional]", "Name")
    .toggle("§9Show Command Syntax", false);

  formVolumeareaAdd.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [id, pos1, pos2, name, syntaxarg] = respond.formValues;

    command = `volumearea add ${id} ${pos1} ${pos2} ${name}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function VolumeareaRemove(player) {
  let command, syntax;
  let formVolumeareaRemove = new ModalFormData()
    .title("Volumearea Remove")
    .toggle("Remove Mode\n§8[§cAll§8/§aSpecify§8]", true)
    .textField("Position §g[XYZ][~^]§r/Volumearea Name", "Position/Name")
    .toggle("§9Show Command Syntax", false);

  formVolumeareaRemove.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [mode, arg, syntaxarg] = respond.formValues;

    command = `volumearea remove ${arg}`;
    if (!mode) {
      command = `volumearea remove_all`;
    }
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function VolumeareaList(player) {
  let formVolumeareaList = new MessageFormData()
    .title("Volumearea List")
    .body("Show list of volumearea.\nSelect dimension mode")
    .button1("Current Dimension")
    .button2("All Dimension");

  formVolumeareaList.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let button = respond.selection;

    command = `volumearea list`;
    if (button == 0) {
      command = `volumearea list all-dimensions`;
    }
    let message = player.runCommand(command);
    Print(message.statusMessage, player.name);
  });
}
