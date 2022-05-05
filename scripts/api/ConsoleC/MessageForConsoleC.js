import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../PrintMessage.js";

export function MessageRawtext(player) {
  let rawtext = "";
  let formMessageRawtext = new ModalFormData()
    .title("Message Rawtext")
    .textField(
      "Rawtext Message\nInput normal message with special symbol\n<'Target'> : Selector\n{'Target'|'Objective'} : Score Check",
      "Message"
    );

  formMessageRawtext.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [message] = respond.formValues;
    let score = /({\S+})|(<[@a-zA-Z0-9]+>)/g;

    let output1 = message.split(score).filter((element) => {
      return element != undefined;
    });
    player.runCommand(`say ${output1}`);
  });
  // return rawtext;
}
