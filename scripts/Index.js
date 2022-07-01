import * as Gametest from "mojang-gametest"; // UUID: 6f4b6893-1bb6-42fd-b458-7fa3d0c89616
import {
  DynamicPropertiesDefinition,
  MinecraftEntityTypes,
  world as World,
} from "mojang-minecraft"; // UUID: b26a4d4c-afdf-4690-88f8-931846312678
// import * as MinecraftUI from 'mojang-minecraft-ui';  // UUID: 2BD50A27-AB5F-4F40-A596-3641627C635E
import { CustomCommands } from "./api/CustomCommands/CCommands.js";
import { Chats } from "./api/ChatRoles.js";
import { GametestPanel } from "./api/GametestPanel/PanelFormUI.js";
import { ConsoleCommands } from "./api/ConsoleC/IndexConsoleC.js";
import "./api/EventTest.js";
import { Print, PrintAction } from "./api/PrintMessage.js";

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

function TickComponent() {
  World.events.tick.subscribe((tick) => {
    for (let player of World.getPlayers()) {
      let hasComponent = false;
      let message = `Player Component Info [Name: ${player.name}]`;
      let componentID = "";
      let componentProperty = {};
      if (player.getDynamicProperty("playerCST")) {
        hasComponent = true;
      } else if (player.getDynamicProperty("playerCST") === "None") {
        hasComponent = false;
      }

      if (hasComponent) {
        switch (player.getDynamicProperty("playerCST")) {
          case "General":
            let {
              dimension: { id: dimensionID },
              headLocation: { x: xhead, y: yhead, z: zhead },
              id: idPlayer,
              isSneaking,
              location: { x: xloc, y: yloc, z: zloc },
              name,
              nameTag,
              //@ts-ignore
              rotation: { x: xrot, y: yrot },
              viewVector: { x: xvec, y: yvec, z: zvec },
            } = player;
            componentID = "General";
            componentProperty = {
              Dimension: dimensionID,
              "Head Location": [xhead, yhead, zhead]
                .map((val) => val.toFixed(2))
                .join(" "),
              ID: idPlayer,
              "Is Sneaking": isSneaking,
              Location: [xloc, yloc, zloc]
                .map((val) => val.toFixed(2))
                .join(" "),
              "Name Tag": nameTag,
              Rotation: [xrot, yrot].map((val) => val.toFixed(2)).join(" "),
              "View Vector": [xvec, yvec, zvec]
                .map((val) => val.toFixed(2))
                .join(" "),
            };
            break;
          case "Health":
            let {
              current,
              id: idHealth,
              value,
            } = player.getComponent("health");
            componentID = idHealth;
            componentProperty = {
              Current: current,
              Value: value,
            };
            break;
          case "Inventory":
            let {
              additionalSlotsPerStrength,
              canBeSiphonedFrom,
              container: { emptySlotsCount, size },
              containerType,
              id: idInv,
              inventorySize,
              restrictToOwner,
            } = player.getComponent("inventory");
            let itemID = player
              .getComponent("inventory")
              .container.getItem(player.selectedSlot)?.id;
            componentID = idInv;
            componentProperty = {
              "Additional Slots Per Strength": additionalSlotsPerStrength,
              "Can Be Siphoned From": canBeSiphonedFrom,
              "Container - Empty_Slots_Count": emptySlotsCount,
              "Container - Size": size,
              "Container Type": containerType,
              "Inventory Size": inventorySize,
              Mainhand: itemID ? itemID : "Empty",
              "Restrict To Owner": restrictToOwner,
            };
            break;
          default:
            return;
        }
      }

      message += `\n§cType Component§r: ${componentID}`;
      for (let comp in componentProperty) {
        message += `\n§g${comp}§r: ${componentProperty[comp]}`;
      }

      player.runCommand(
        `titleraw @s actionbar {"rawtext": [{"text": "${message}"}]}`
      );
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

TickComponent();
DynamicPropertyRegister();
FormOpen();
CommandsChat();
