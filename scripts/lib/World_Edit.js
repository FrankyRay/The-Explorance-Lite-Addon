import { world } from "mojang-minecraft";

var Pos1 = "";
var Pos2 = "";

function print(text, target = "@a") {
  world
    .getDimension("overworld")
    .runCommand(`tellraw ${target} {"rawtext":[{"text": "${text}"}]}`);
}

/*
  Finding the lowest XYZ Coordinate from 2 points
  For example:
  1st Point: 64 64 64
  2nd Point: 32 60 120
  The lowest XYZ for 3rd point is 32 60 64 
  Used for '!undo' cmd
*/
function MinCoord() {
  var ListPos1 = Pos1.split(" ").map(Number);
  var ListPos2 = Pos2.split(" ").map(Number);

  var PosX = [ListPos1[0], ListPos2[0]];
  var PosY = [ListPos1[1], ListPos2[1]];
  var PosZ = [ListPos1[2], ListPos2[2]];

  var x = Math.min(...PosX);
  var y = Math.min(...PosY);
  var z = Math.min(...PosZ);

  return `${x} ${y} ${z}`;
}

/*
  World Edit Commands
  - '!set1' -> Setting 1st point
  - '!set2' -> Setting 2nd point
  - '!fill <block> [dataValue]' -> Filling area from 2 points
  - '!undo' -> Undo the previous fill
*/
function WorldEdit(command) {
  world.events.beforeChat.subscribe((eventData) => {
    if (eventData.message === "!set1") {
      var player = eventData.sender;
      var x = Math.floor(player.location.x);
      var y = Math.floor(player.location.y);
      var z = Math.floor(player.location.z);
      Pos1 = `${x} ${y} ${z}`;
      print(`Set first point at ${Pos1}`);
      eventData.cancel = true;
    } else if (eventData.message === "!set2") {
      var player = eventData.sender;
      var x = Math.floor(player.location.x);
      var y = Math.floor(player.location.y);
      var z = Math.floor(player.location.z);
      Pos2 = `${x} ${y} ${z}`;
      print(`Set first point at ${Pos2}`);
      eventData.cancel = true;
    } else if (eventData.message.startsWith("!fill")) {
      var block = eventData.message.replace("!fill ", "");
      world
        .getDimension("overworld")
        .runCommand(`structure save we:beforefill ${Pos1} ${Pos2} memory`);
      world
        .getDimension("overworld")
        .runCommand(`fill ${Pos1} ${Pos2} ${block}`);
      eventData.cancel = true;
    } else if (eventData.message === "!undo") {
      var coord = MinCoord();
      world
        .getDimension("overworld")
        .runCommand(`structure load we:beforefill ${coord}`);
      eventData.cancel = true;
    }
  });
}
