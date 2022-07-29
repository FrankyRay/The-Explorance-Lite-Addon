import * as GameTest from "mojang-gametest"; // UUID: 6f4b6893-1bb6-42fd-b458-7fa3d0c89616
import {
  BlockLocation,
  DynamicPropertiesDefinition,
  MinecraftEntityTypes,
  world,
  world as World,
} from "mojang-minecraft"; // UUID: b26a4d4c-afdf-4690-88f8-931846312678
// import * as MinecraftUI from 'mojang-minecraft-ui';  // UUID: 2BD50A27-AB5F-4F40-A596-3641627C635E
import { Print, PrintAction } from "./api/lib/MinecraftFunctions.js";
import { CustomCommands } from "./api/CustomCommands/CCommands.js";
import { Chats } from "./api/ChatRoles.js";
import { GametestPanel } from "./api/GametestPanel/PanelFormUI.js";
import { ConsoleCommands } from "./api/ConsoleC/IndexConsoleC.js";
import { TickComponent } from "./api/GametestPanel/PlayerComp.js";
import "./api/CustomSelections/IndexSelection.js";
import "./api/lib/EventTest.js";
import { BlockRaycastOptions } from "mojang-minecraft";

const Prefix = "!";
const Overworld = World.getDimension("overworld");

function CommandsChat() {
  World.events.beforeChat.subscribe((chatEvent) => {
    let Message = chatEvent.message;
    let Player = chatEvent.sender;
    if (chatEvent.message.startsWith(Prefix)) {
      chatEvent.cancel = true;
      let RemovePrefix = Message.replace(Prefix, "");
      let Command = RemovePrefix.split(" ")[0];
      let Arguments = Message.substring(Message.indexOf(" ") + 1);
      CustomCommands(Prefix, Command, Arguments, Player);
    } else {
      chatEvent.cancel = true;
      Chats(Message, Player);
    }
  });
}

function FormOpen() {
  World.events.itemUse.subscribe((itemEvent) => {
    let item = itemEvent.item;
    let entity = itemEvent.source;
    if (item.getLore().includes("§r[Console Command Form]")) {
      ConsoleCommands(entity);
    } else if (item.getLore().includes("§r[MC Component Form]")) {
      GametestPanel(entity);
    }
  });
}

function DynamicPropertyRegister() {
  World.events.worldInitialize.subscribe((eventData) => {
    let playerCompShowTick = new DynamicPropertiesDefinition();
    playerCompShowTick.defineString("playerCST", 20);

    eventData.propertyRegistry.registerEntityTypeDynamicProperties(
      playerCompShowTick,
      MinecraftEntityTypes.player
    );
    console.warn("World Initialize Event Detected");
  });
}

GameTest.register("SimulatedPlayerTests", "spawn_forever", (test) => {
  const spawnLoc = new BlockLocation(1, 5, 1);
  const landLoc = new BlockLocation(1, 2, 1);
  const playerName = "Test Player";
  const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
  test.assertEntityPresent("player", spawnLoc);
  test.assert(player.nameTag === playerName, "Unexpected name tag");
})
  .maxTicks(72000)
  .structureName("ComponentTests:platform")
  .tag(GameTest.Tags.suiteDefault);

function BlockStateTick() {
  world.events.tick.subscribe((tick) => {
    for (let player of world.getPlayers()) {
      if (!player.hasTag("Tick:BlockState")) continue;

      let blockOpt = new BlockRaycastOptions();
      blockOpt.includeLiquidBlocks = true;
      blockOpt.includePassableBlocks = true;
      blockOpt.maxDistance = 8;

      let block = player.getBlockFromViewVector(blockOpt);
      if (!block) {
        PrintAction(`§gBlock Properties §3(minecraft:air)`, player.name);
        continue;
      }
      let properties = block.permutation.getAllProperties();

      let outputMsg = `§gBlock Properties §3(${block.id})`;
      for (let property of properties) {
        let { name, validValues, value } = property;

        switch (typeof value) {
          case "string":
            let valuesType = [];
            let valuesMsg = "";
            let charCount = 0;
            for (let i = 0; i < validValues.length; i++) {
              charCount += validValues[i].length;
              valuesType.push(
                validValues[i] == value
                  ? `§c'${validValues[i]}'§r`
                  : `'${validValues[i]}'`
              );
            }
            if (charCount > 85) {
              let valueIndex = validValues.indexOf(value);
              if (valueIndex == 0)
                valuesMsg = `${valuesType[valueIndex]}, ${
                  valuesType[valueIndex + 1]
                }, ${valuesType[valueIndex + 2]} ...`;
              else if (valueIndex == validValues.length)
                valuesMsg = `... ${valuesType[valueIndex - 2]}, ${
                  valuesType[valueIndex - 1]
                }, ${valuesType[valueIndex]}`;
              else
                valuesMsg = `... ${valuesType[valueIndex - 1]}, ${
                  valuesType[valueIndex]
                }, ${valuesType[valueIndex + 1]} ...`;
            } else valuesMsg = valuesType.join(", ");
            outputMsg += `\n§e${name} §7(${typeof value}) [${
              validValues.length
            }] [${charCount}]\n§r[ ${valuesMsg} ]`;
            break;

          case "number":
            outputMsg += `\n§e${name} §7(${typeof value})\n§c${value}§r [0 - ${
              validValues.length - 1
            }]`;
            break;

          case "boolean":
            let valueF = value === true ? "§atrue§r" : "§cfalse§r";
            outputMsg += `\n§e${name} §7(${typeof value})\n${valueF}`;
            break;
        }
      }

      PrintAction(outputMsg, player.name);
    }
  });
}

BlockStateTick();
// TickComponent();
DynamicPropertyRegister();
FormOpen();
CommandsChat();
