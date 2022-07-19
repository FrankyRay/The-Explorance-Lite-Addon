import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../lib/MinecraftFunctions.js";

export function TitleDisplay(player) {
  let command, syntax;
  let typeTitleDisplay = ["Title", "Subtitle", "Actionbar"];
  let formTitleDisplay = new ModalFormData()
    .title("Title Display")
    .textField("Target §g[Player]", "Target Selection")
    .dropdown("Title Type", typeTitleDisplay)
    .textField("Message Text", "Message")
    .toggle("§9Show Command Syntax", false);

  formTitleDisplay.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, type, message, syntaxarg] = respond.formValues;

    command = `title ${target} ${typeTitleDisplay[type]} ${message}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function TitleClearReset(player) {
  let command, syntax;
  let formTitleClearReset = new ModalFormData()
    .title("Title Clear/Reset")
    .toggle("Title Type §8[§cClear§8/§aReset§8]", false)
    .textField("Target §g[Player]", "Target Selection");

  formTitleClearReset.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, target, syntaxarg] = respond.formValues;

    command = `title ${target} clear`;
    if (type) {
      command = `title ${target} reset`;
    }
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function TitleTimes(player) {
  let command, syntax;
  let formTitleTimes = new ModalFormData()
    .title("Title Times")
    .textField("Target §g[Player]", "Target Selection")
    .textField("Fade In §g[Tick]", "Fade In")
    .textField("Stay §g[Tick]", "Stay")
    .textField("Fade Out §g[Tick]", "Fade Out")
    .toggle("§9Show Command Syntax", false);

  formTitleTimes.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, fadeIn, stay, fadeOut, syntaxarg] = respond.formValues;

    command = `title ${target} times ${fadeIn} ${stay} ${fadeOut}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}
