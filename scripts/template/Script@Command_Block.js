import * as Gametest from "mojang-gametest";
import { world, BlockLocation } from "mojang-minecraft";
var pos1 = "";
var pos2 = "";
var home = "";

function location(pos) {
  var x = Math.floor(eventData.sender.location.x);
  var y = Math.floor(eventData.sender.location.y);
  var z = Math.floor(eventData.sender.location.z);
  return `${x} ${y} ${z}`;
}

function print(text) {
  world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"text": "${text}"}]}`);
}

function Pos1(command) {
  const chatCallback = world.events.beforeChat.subscribe((eventData) => {
    if (eventData.message === "!pos1") {
      var x = Math.floor(eventData.sender.location.x);
      var y = Math.floor(eventData.sender.location.y);
      var z = Math.floor(eventData.sender.location.z);
      pos1 = `${x} ${y} ${z}`;
      print(`pos1 set ${pos1}`);
      eventData.cancel = true;
    }
  });
}

function Pos2(command) {
  const chatCallback = world.events.beforeChat.subscribe((eventData) => {
    if (eventData.message === "!pos2") {
      var x = Math.floor(eventData.sender.location.x);
      var y = Math.floor(eventData.sender.location.y);
      var z = Math.floor(eventData.sender.location.z);
      pos2 = `${x} ${y} ${z}`;
      print(`pos2 set ${pos2}`);
      eventData.cancel = true;
      return pos2;
    }
  });
}

const chatCallback = world.events.beforeChat.subscribe((eventData) => {
  if (eventData.message.startsWith("!fill")) {
    let block = eventData.message.replace("!fill ", "");
    world.getDimension("overworld").runCommand(`fill ${pos1} ${pos2} ${block}`);
    eventData.cancel = true;
    }
});

function SetHome(command) {
  world.events.beforeChat.subscribe((eventData) => {
    if (eventData.message === "!sethome") {
      var x = Math.floor(eventData.sender.location.x);
      var y = Math.floor(eventData.sender.location.y);
      var z = Math.floor(eventData.sender.location.z);
      eventData.cancel = true;
      home = `${x} ${y} ${z}`;
      print(`home set ${home}`);
    }
  });
}

world.events.beforeChat.subscribe((eventData) => {
  if (eventData.message === "!tphome") {
    let playerName = eventData.sender.name;
    eventData.cancel = true;
    print(`Teleported to your home at ${home}`);
    world.getDimension("overworld").runCommand(`tp ${playerName} ${home}`);
  }
});

Pos1();
Pos2();
SetHome();