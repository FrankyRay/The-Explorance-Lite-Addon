import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../lib/MinecraftFunctions.js";

// Scoreboard Objectives Commands
export function ScoreboardObjectivesIndex(player) {
  let formSbObjectives = new ActionFormData()
    .title("SB Objectives [/scoreboard objectives]")
    .body("Select an option")
    .button("Add/Remove")
    .button("List")
    .button("Set Display");

  formSbObjectives.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let button = respond.selection;

    let command, syntax;
    switch (button) {
      case 0:
        [command, syntax] = ObjectivesAdd(player);
        break;
      case 1:
        let message = player.runCommand("scoreboard objectives list");
        Print(message.statusMessage, player.name);
        break;
      case 2:
        [command, syntax] = ObjectivesDisplay(player);
        break;
    }
    player.runCommand(command);
    if (syntax) Print(command, `"${player.name}"`, "Command Syntax");
  });
}

function ObjectivesAdd(player) {
  let command, syntax;
  let formObjectivesAdd = new ModalFormData()
    .title("SB Objectives Add/Remove")
    .toggle("Add/Remove\n§8[§cRemove§8/§aAdd§8]", true)
    .textField("Objective Name", "Name")
    .textField("Objective Display Name §9[Add Mode]", "Display Name")
    .toggle("§9Show Command Syntax", false);

  formObjectivesAdd.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, name, display, syntaxarg] = respond.formValues;

    command = `scoreboard objectives add ${name} dummy "${display}"`;
    if (!type) {
      command = `scoreboard objectives remove ${name}`;
    }
    syntax = syntaxarg;
  });
  return [command, syntax];
}

function ObjectivesDisplay(player) {
  let command, syntax;
  let typeObjectivesDisplay = ["list", "sidebar", "belowname"];
  let formObjectivesDisplay = new ModalFormData()
    .title("SB Objectives SetDisplay")
    .dropdown("Set Display Type", typeObjectivesDisplay, 1)
    .textField("Objective Name", "Name")
    .toggle("Score Sort Order\n§8[§cDescending§8/§aAscending§8]", true)
    .toggle("§9Show Command Syntax", false);

  formObjectivesDisplay.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, name, sort, syntaxarg] = respond.formValues;

    let order = "descending";
    if (sort) {
      order = "ascending";
    }
    command = `scoreboard objectives setdisplay ${typeObjectivesDisplay[type]} ${name} ${order}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

// Scoreboard Players Commands
export function ScoreboardPlayersIndex(player) {
  let formSbPlayers = new ActionFormData()
    .title("SB Players [/scoreboard players]")
    .body("Select an option")
    .button("Add/Remove/Set/Reset")
    .button("List")
    .button("Operation")
    .button("Random")
    .button("Test");

  formSbPlayers.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let button = respond.selection;

    let command, syntax;
    switch (button) {
      case 0:
        [command, syntax] = PlayersARSR(player);
        break;
      case 1:
        [command, syntax] = PlayersList(player);
        break;
      case 2:
        [command, syntax] = PlayersOperation(player);
        break;
      case 3:
        [command, syntax] = PlayersRandom(player);
        break;
      case 4: // Special Case for PlayersTest()
        PlayersTest(player);
        break;
    }
    player.runCommand(command);
    if (syntax) Print(command, `"${player.name}"`, "Command Syntax");
  });
}

function PlayersARSR(player) {
  let command, syntax;
  let typePlayersARSR = ["add", "remove", "set", "reset"];
  let formPlayersARSR = new ModalFormData()
    .title("SB Player ARSR (Add/Remove/Set/Reset)")
    .dropdown("Score Changer Type", typePlayersARSR)
    .textField("Target §g[Entity]", "Target Selector", "@s")
    .textField("Objective Name", "Name")
    .textField("Score Value", "Value")
    .toggle("§9Show Command Syntax", false);

  formPlayersARSR.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [type, target, objective, value, syntaxarg] = respond.formValues;

    command = `scoreboard players ${typePlayersARSR[type]} ${target} ${objective} ${value}`;
    if (type == 3) {
      command = `scoreboard players reset ${target} ${objective}`;
    }
    syntax = syntaxarg;
  });
  return [command, syntax];
}

function PlayersList(player) {
  let command, syntax;
  let formPlayersList = new ModalFormData()
    .title("SB Players List")
    .textField("Target §g[Entity]", "Target Selector")
    .toggle("§9Show Command Syntax", false);

  formPlayersList.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, syntaxarg] = respond.formValues;

    command = `scoreboard players list ${target}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

function PlayersOperation(player) {
  let command, syntax;
  let typePlayersOperation = [
    "=",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
    "<",
    ">",
    "><",
  ];
  let formPlayersOperation = new ModalFormData()
    .title("SB Players Operation")
    .textField("Target §g[Entity]§9[Destination]", "Target Selector")
    .textField("Objectives Name §9[Destination]", "Name")
    .dropdown("Score Operation", typePlayersOperation)
    .textField("Target §g[Entity]§9[Source]", "Target Selector")
    .textField("Objectives Name §9[Source]", "Name")
    .toggle("§9Show Command Syntax", false);

  formPlayersOperation.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [tgtDest, objDest, operation, tgtSource, objSource, syntaxarg] =
      respond.formValues;

    command = `scoreboard players operation ${tgtDest} ${objDest} ${typePlayersOperation[operation]} ${tgtSource} ${objSource}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

function PlayersRandom(player) {
  let command, syntax;
  let formPlayersRandom = new ModalFormData()
    .title("SB Players Random")
    .textField("Target §g[Entity]", "Target Selector")
    .textField("Objective Name", "Name")
    .textField("Min Score Value", "Min Value")
    .textField("Max Score Value", "Max Value")
    .toggle("§9Show Command Syntax", false);

  formPlayersRandom.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, objective, min, max, syntaxarg] = respond.formValues;

    command = `scoreboard players random ${target} ${objective} ${min} ${max}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

function PlayersTest(player) {
  let command, syntax;
  let formPlayersTest = new ModalFormData()
    .title("SB Players Random")
    .textField("Target §g[Entity]", "Target Selector")
    .textField("Objective Name", "Name")
    .textField("Min Score Value", "Min Value")
    .textField("Max Score Value §8[Optional]", "Max Value");

  formPlayersTest.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, objective, min, max, syntaxarg] = respond.formValues;

    command = `scoreboard players random ${target} ${objective} ${min} ${max}`;
    let message = player.runCommand(command);
    Print(message.statusMessage, player.name);

    syntax = syntaxarg;
    if (syntax) Print(command, `"${player.name}"`, "Command Syntax");
  });
  return [command, syntax];
}
