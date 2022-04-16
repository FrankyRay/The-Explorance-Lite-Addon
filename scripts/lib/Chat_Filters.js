import { world } from "mojang-minecraft";

// Link Filters
function noLink() {
  world.events.beforeChat.subscribe((msgData) => {
    let message = msgData.message;
    let admin = msgData.sender.hasTag("Admin");
    let trustedPlayer = msgData.sender.hasTag("Trusted");
    if (message.includes("discord.gg") && (!trustedPlayer || !admin)) {
      let playerName = msgData.sender.name;
      msgData.cancel = true;
      messageInfo(
        "No discord link invitation [Exit Code: Discord Link]",
        playerName
      );
    } else if (
      (message.includes("youtu.be/dQw4w9WgXcQ") ||
        message.includes("www.youtube.com/watch?v=dQw4w9WgXcQ")) &&
      (!trustedPlayer || !admin)
    ) {
      let playerName = msgData.sender.name;
      msgData.cancel = true;
      messageInfo("No YT link [Exit Code: Rickroll]", playerName);
    }
  });
}
