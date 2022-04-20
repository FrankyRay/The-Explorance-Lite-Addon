import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../PrintMessage.js";

// Scoreboard Objectives Functions
export function ScoreboardObjectivesIndex(player) {
  let formSbObjectives = new ActionFormData();

  formSbObjectives.title("SB Objectives [/scoreboard objectives]");
  formSbObjectives.body("Select an option");
  formSbObjectives.button("Add/Remove");
  formSbObjectives.button("List");
  formSbObjectives.button("Set Display");

  formSbObjectives.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let button = respond.selection;
    switch (button) {
      case 0:
        SbObjAdd(player);
        break;
      case 1:
        player.runCommand("scoreboard objectives list");
        break;
      case 2:
        SbObjDisplay(player);
        break;
    }
  });
}

function SbObjAdd(player) {
  let formSbObjAdd = new ModalFormData();

  formSbObjAdd.title("SB Objectives Add/Remove");
  formSbObjAdd.toggle("Add/Remove\n§8true - Add\nfalse - Remove", true);
  formSbObjAdd.textField("Objective Name", "Name");
  formSbObjAdd.textField(
    "Objective Display Name\n§8For 'add' argument",
    "Display Name"
  );

  formSbObjAdd.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [type, name, display] = respond.formValues;
    if (!type) {
      player.runCommand(`scoreboard objectives remove ${name}`);
      return;
    }
    player.runCommand(`scoreboard objectives add ${name} dummy "${display}"`);
  });
}

function SbObjDisplay(player) {
  let formSbObjDisplay = new ModalFormData();
  let typeSbObjDisplay = ["list", "sidebar", "belowname"];

  formSbObjDisplay.title("SB Objectives SetDisplay");
  formSbObjDisplay.dropdown("Set Display Type", typeSbObjDisplay, 1);
  formSbObjDisplay.textField("Objective Name", "Name");
  formSbObjDisplay.toggle(
    "Score Sort Order\n§8true - Ascending\nfalse - Descending",
    true
  );

  formSbObjDisplay.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [type, name, sort] = respond.formValues;
    let order = "descending";
    if (sort) {
      order = "ascending";
    }
    player.runCommand(
      `scoreboard objectives setdisplay ${typeSbObjDisplay[type]} ${name} ${order}`
    );
  });
}

// Scoreboard Players Functions
export function ScoreboardPlayersIndex(player) {
  let formSbPlayers = new ActionFormData();

  formSbPlayers.title("SB Players [/scoreboard players]");
  formSbPlayers.body("Select an option");
  formSbPlayers.button("Add/Remove/Set/Reset");
  formSbPlayers.button("List");
  formSbPlayers.button("Operation");
  formSbPlayers.button("Random");
  formSbPlayers.button("Test");

  formSbPlayers.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let button = respond.selection;
    switch (button) {
      case 0:
        SbPlrARSR(player);
        break;
      case 1:
        SbPlrList(player);
        break;
      case 2:
        SbPlrOperation(player);
        break;
      case 3:
        SbPlrRandom(player);
        break;
      case 4:
        SbPlrTest(player);
        break;
    }
  });
}

function SbPlrARSR(player) {
  let formSbPlrARSR = new ModalFormData();
  let typeSbPlrARSR = ["add", "remove", "set", "reset"];

  formSbPlrARSR.title("SB Player ARSR (Add/Remove/Set/Reset)");
  formSbPlrARSR.dropdown("Score Changer Type", typeSbPlrARSR);
  formSbPlrARSR.textField("Target §8[Entity]", "Target Selector", "@s");
  formSbPlrARSR.textField("Objective Name", "Name");
  formSbPlrARSR.textField("Score Value", "Value");

  formSbPlrARSR.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [type, target, objective, value] = respond.formValues;
    if (type == 3) {
      player.runCommand(`scoreboard players reset ${target} ${objective}`);
      return;
    }
    player.runCommand(
      `scoreboard players ${typeSbPlrARSR[type]} ${target} ${objective} ${value}`
    );
  });
}

function SbPlrList(player) {
  let formSbPlrList = new ModalFormData();

  formSbPlrList.title("SB Players List");
  formSbPlrList.textField("Target §8[Entity]", "Target Selector");

  formSbPlrList.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target] = respond.formValues;
    player.runCommand(`scoreboard players list ${target}`);
  });
}

function SbPlrOperation(player) {
  let formSbPlrOperation = new ModalFormData();
  let typeSbPlrOperation = ["=", "+=", "-=", "*=", "/=", "%=", "<", ">", "><"];

  formSbPlrOperation.title("SB Players Operation");
  formSbPlrOperation.textField("Target §8[Destination]", "Target Selector");
  formSbPlrOperation.textField("Objectives Name §8[Destination]", "Name");
  formSbPlrOperation.dropdown("Score Operation", typeSbPlrOperation);
  formSbPlrOperation.textField("Target §8[Source]", "Target Selector");
  formSbPlrOperation.textField("Objectives Name §8[Source]", "Name");

  formSbPlrOperation.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [tgtDest, objDest, operation, tgtSource, objSource] =
      respond.formValues;
    player.runCommand(
      `scoreboard players operation ${tgtDest} ${objDest} ${typeSbPlrOperation[operation]} ${tgtSource} ${objSource}`
    );
  });
}

function SbPlrRandom(player) {
  let formSbPlrRandom = new ModalFormData();

  formSbPlrRandom.title("SB Players Random");
  formSbPlrRandom.textField("Target §8[Entity]", "Target Selector");
  formSbPlrRandom.textField("Objective Name", "Name");
  formSbPlrRandom.textField("Min Score Value", "Min Value");
  formSbPlrRandom.textField("Max Score Value", "Max Value");

  formSbPlrRandom.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target, objective, min, max] = respond.formValues;
    player.runCommand(
      `scoreboard players random ${target} ${objective} ${min} ${max}`
    );
  });
}

function SbPlrReset(player) {
  let formSbPlrReset = new ModalFormData();

  formSbPlrReset.title("SB Players List");
  formSbPlrReset.textField("Target §8[Entity]", "Target Selector");
  formSbPlrReset.textField("Objectives Name §8[Optional]", "Name");

  formSbPlrReset.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target, objective] = respond.formValues;
    player.runCommand(`scoreboard players reset ${target} ${objective}`);
  });
}

function SbPlrTest(player) {
  let formSbPlrTest = new ModalFormData();

  formSbPlrTest.title("SB Players Random");
  formSbPlrTest.textField("Target §8[Entity]", "Target Selector");
  formSbPlrTest.textField("Objective Name", "Name");
  formSbPlrTest.textField("Min Score Value", "Min Value");
  formSbPlrTest.textField("Max Score Value §8[Optional]", "Max Value");

  formSbPlrTest.show(player).then((respond) => {
    if (respond.isCanceled) return;

    let [target, objective, min, max] = respond.formValues;
    player.runCommand(
      `scoreboard players random ${target} ${objective} ${min} ${max}`
    );
  });
}
