import { world as World } from 'mojang-minecraft';
import * as MinecraftUI from 'mojang-minecraft-ui';

/**
 * @param {import("mojang-minecraft").Player} player
 */
export function UIActionFormData(player) {
  let actionForm = new MinecraftUI.ActionFormData()
  actionForm.title('Button Tester')
  actionForm.body('Select one of these button')
  actionForm.button('Button 0')
  actionForm.button('Button 1')
  actionForm.button('Button 2')
  actionForm.button('Button 3')
  actionForm.button('Button 4')
  actionForm.button('Button 5')

  actionForm.show(player).then(actionformrespond => {
    const { isCanceled, selection } = actionformrespond

    if (isCanceled) {
      player.runCommand("say You've canceled the form [Exit Code: 0]")
      return
    }

    switch (selection){
      case 0:
        player.runCommand('say Pressed Button 0');
        break;
      case 1:
        player.runCommand('say Pressed Button 1');
        break;
      case 2:
        player.runCommand('say Pressed Button 2');
        break;
      case 3:
        player.runCommand('say Pressed Button 3');
        break;
      case 4:
        player.runCommand('say Pressed Button 4');
        break;
      case 5:
        player.runCommand('say Pressed Button 5');
        break;
    }
  })
}