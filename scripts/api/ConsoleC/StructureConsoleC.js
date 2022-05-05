import { world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";

export function StructureSave(player) {
  let command, syntax;
  let formStructureSave = new ModalFormData()
    .title("Structure Save")
    .textField("Structure Name", "Name")
    .textField("1st Position §g[XYZ][~^]", "XYZ Position")
    .textField("2nd Position §g[XYZ][~^]", "XYZ Position")
    .toggle("Include Entities", true)
    .toggle("Save Mode\n§8[§cDisk§8/§aMemory§8]", true)
    .toggle("Include Blocks", true)
    .toggle("§9Show Command Syntax", false);

  formStructureSave.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [name, pos1, pos2, entity, mode, block, syntaxarg] = respond.formValues;

    command = `structure save ${name} ${pos1} ${pos2} ${entity} ${mode} ${block}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}

export function StructureLoad(player) {
  let command, syntax;
  let mirrorAxis = ["none", "x", "z", "xz"];
  let formStructureLoad = new ModalFormData()
    .title("Structure Load")
    .textField("Structure Name", "Name")
    .textField("Position §g[XYZ][~^]", "XYZ Position")
    .slider("Rotation", 0, 270, 90, 0)
    .dropdown("Mirror §g[Axis]", mirrorAxis)
    .toggle("Include Entities", true)
    .toggle("Include Blocks", true)
    .slider("Integrity", 0, 100, 1, 100)
    .textField("Seed", "Seed", "0")
    .toggle("Enable Load Animation", false)
    .toggle(
      "Animation Mode §9[Animation Mode]\n§8[§cBlock By Block§8/§aLayer By Layer§8]",
      true
    )
    .textField("Animation Duration §g[Second]§9[Animation Mode]", "Duration")
    .toggle("§9Show Command Syntax", false);

  formStructureLoad.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [
      name,
      pos,
      rot,
      mirror,
      entity,
      block,
      integrity,
      seed,
      animation,
      mode,
      duration,
      syntaxarg,
    ] = respond.formValues;

    let animationMode = "layer_by_layer";
    if (!mode) {
      animationMode = "block_by_block";
    }

    command = `structure load ${name} ${pos} ${rot} ${mirrorAxis[mirror]} ${entity} ${block} ${integrity} ${seed}`;
    if (animation) {
      command = `structure load ${name} ${pos} ${rot} ${mirrorAxis[mirror]} ${animationMode} ${duration} ${entity} ${block} ${integrity} ${seed}`;
    }
    sytax = syntaxarg;
  });
  return [command, syntax];
}

export function StructureDelete(player) {
  let command, syntax;
  let formStructureDelete = new ModalFormData()
    .title("Structure Delete")
    .textField("Structure Name", "Name")
    .toggle("§9Show Command Syntax", false);

  formStructureDelete.show(player).then((respond) => {
    if (respond.isCanceled) return;
    let [name, syntaxarg] = respond.formValues;

    command = `structure delete ${name}`;
    syntax = syntaxarg;
  });
  return [command, syntax];
}
