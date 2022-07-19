//@ts-check
import { ExplosionOptions, world } from "mojang-minecraft";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "mojang-minecraft-ui";
import { Print } from "../lib/MinecraftFunctions";
import { StringToLocation } from "../lib/MinecraftFunctions.js";

/**
 * @param {import("mojang-minecraft").Player} player
 */
export function ExplosionMethod(player) {
  let formExplosion = new ModalFormData()
    .title("Explosion Config")
    .textField("Explosion Location", "Location")
    .textField("Explosion Radius", "Radius")
    .toggle("Allow Underwater\n§8[Explode in underwater]", false)
    .toggle("Breaks Blocks\n§8[Break block when explode]", false)
    .toggle("Causes Fire\n§8[Ignite fire when explode]", false);

  formExplosion
    .show(player)
    .then((respond) => {
      if (respond.isCanceled) return;

      let [loc, rad, underwater, block, fire] = respond.formValues;
      let explodeMethod = new ExplosionOptions();
      explodeMethod.allowUnderwater = underwater;
      explodeMethod.breaksBlocks = block;
      explodeMethod.causesFire = fire;

      player.dimension.createExplosion(
        StringToLocation(loc),
        parseInt(rad),
        explodeMethod
      );
    })
    .catch((err) => console.warn(err));
}
