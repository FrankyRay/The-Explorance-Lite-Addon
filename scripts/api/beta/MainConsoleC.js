import { ActionFormData, MessageFormData, ModalFormData } from 'mojang-minecraft-ui';
import { Print } from '../PrintMessage.js'

export function Ability(player) {
  let typeAbility = ["mayfly", "mute", "worldbuilder"]
  let formAbility = new ModalFormData()

  formAbility.title("Ability [/ability]")
  formAbility.dropdown("Ability Type", typeAbility, 0)
  formAbility.toggle("Boolean", true)

  formAbility.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ type, bool ] = respond.formValues
    player.runCommand(`ability ${typeAbility[type]} ${bool}`)
  })
}

export function CameraShake(player) {
  let formCameraShake = new ModalFormData()

  formCameraShake.title("Camera Shake [/camerashake]")
  formCameraShake.toggle("Add/Remove\n§8true - Add\nfalse - Stop (Use Target Only)", true)
  formCameraShake.textField("Target §8[Player]", "Target Selector")
  formCameraShake.slider("Intensity Shake", 0, 4, 1, 1)
  formCameraShake.textField("Duration §8[Seconds]", "Duration")
  formCameraShake.toggle("Shake Type\n§8true - Rotational\nfalse - Positional")

  formCameraShake.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ play, target, intensity, duration, type ] = respond.formValues
    if (!play) {
      player.runCommand(`camerashake stop ${target}`)
      return
    }
    if (type) {
      type = "Rotational"
    } else {
      type = "Positional"
    }

    player.runCommand(`camerashake add ${target} ${intensity} ${duration} ${type}`)
  })
}

export function Clear(player) {
  let formClear = new ModalFormData()

  formClear.title("Clear [/clear]")
  formClear.textField("Target §8[Player][Optional]", "Target Selector")
  formClear.textField("Item §8[Optional]", "Item ID")
  formClear.textField("Data Values §8[Optional]\n'-1' Match All Item Data Value", "Data Value [Int]")
  formClear.textField("Maximum Amount §8[Optional]", "Amount")

  formClear.show(player).then(respond => {
    if (respond.isCanceled) return

    let [ target, item, data, amount ] = respond.formValues
    player.runCommand(`clear ${target} ${item} ${data} ${amount}`)
  })
}