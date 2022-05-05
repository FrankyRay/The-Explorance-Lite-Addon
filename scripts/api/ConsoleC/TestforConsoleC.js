import { world } from "mojang-minecraft";
import { ModalFormData } from "mojang-minecraft-ui";

export function Testforentity(player) {
  let formTestforentity = new ModalFormData();
  let command, syntax;

  formTestforentity.title("Testfor (Entity) [/testfor]");
  formTestforentity.textField("Target §g[Entity]", "Target Selector");
  formTestforentity.toggle("§9Show Command Syntax", false);

  formTestforentity.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [target, syntaxarg] = respond.formValues;

    command = `testfor ${target}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function Testforblock(player) {
  let formTestforblock = new ModalFormData();
  let command, syntax;

  formTestforblock.title("Testforblock [/testforblock]");
  formTestforblock.textField("Position §g[XYZ][~^]", "XYZ Position");
  formTestforblock.textField("Block Name", "Block");
  formTestforblock.textField("Data Value", "Aux or BlockState", "0");
  formTestforblock.toggle("§9Show Command Syntax", false);

  formTestforblock.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos, block, data, syntaxarg] = respond.formValues;

    command = `testforblock ${pos} ${block} ${data}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function Testforblocks(player) {
  let formTestforblocks = new ModalFormData();
  let command, syntax;

  formTestforblocks.title("Testforblocks [/testforblocks]");
  formTestforblocks.textField("1st Position §g[XYZ][~^]", "XYZ Position");
  formTestforblocks.textField("2nd Position §g[XYZ][~^]", "XYZ Position");
  formTestforblocks.textField(
    "Destination Position §g[XYZ][~^]",
    "XYZ Position"
  );
  formTestforblocks.toggle("Test Area Type §8[§cMasked§8/§aAll§8]", true);
  formTestforblocks.toggle("§9Show Command Syntax", false);

  formTestforblocks.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [pos1, pos2, destination, type, syntaxarg] = respond.formValues;

    let typeTest = "all";
    if (!type) {
      typeTest = "masked";
    }

    command = `testforblocks ${pos1} ${pos2} ${destination} ${typeTest}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}
