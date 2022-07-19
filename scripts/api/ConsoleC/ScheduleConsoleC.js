import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../lib/MinecraftFunctions.js";

export function ScheduleSquare(player) {
  let command, syntax;
  let formScheduleSquare = new ModalFormData()
    .title("Schedule + Square Area")
    .textField("1st Position §g[XYZ][~^]", "XYZ Position")
    .textField("2nd Position §g[XYZ][~^]", "XYZ Position")
    .textField(
      'Function File Path §9[Addon]\n§8Start from inside "functions" folder',
      "File Path"
    )
    .toggle("§9Show Command Syntax", false);

  formScheduleSquare.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos1, pos2, file, syntaxarg] = respond.formValues;

    command = `schedule on_area_loaded add ${pos1} ${pos2} ${file}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function ScheduleCircle(player) {
  let command, syntax;
  let formScheduleCircle = new ModalFormData()
    .title("Schedule + Circle Area")
    .textField("Center Position §g[XYZ][~^]", "XYZ Position")
    .textField("Radius §g[Int]", "Radius")
    .textField(
      'Function File Path §9[Addon]\n§8Start from inside "functions" folder',
      "File Path"
    )
    .toggle("§9Show Command Syntax", false);

  formScheduleCircle.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [center, radius, file, syntaxarg] = respond.formValues;

    command = `schedule on_area_loaded add circle ${center} ${radius} ${file}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function ScheduleTickingarea(player) {
  let command, syntax;
  let formScheduleTickingarea = new ModalFormData()
    .title("Schedule + Tickingarea")
    .textField("Ticking Area Name", "Ticking Area")
    .textField(
      'Function File Path §9[Addon]\n§8Start from inside "functions" folder',
      "File Path"
    )
    .toggle("§9Show Command Syntax", false);

  formScheduleTickingarea.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [tickingarea, file, syntaxarg] = respond.formValues;

    command = `schedule on_area_loaded tickingarea ${tickingarea} ${pos2} ${file}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}
