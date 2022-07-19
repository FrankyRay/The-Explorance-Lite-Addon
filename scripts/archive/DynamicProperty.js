world.events.worldInitialize.subscribe((eventData) => {
  // Initiialize Dynamic Property
  let playerCompShowTick = new DynamicPropertiesDefinition();
  playerCompShowTick.defineBoolean("variableBool");
  // "variableBool" is the property identifier. You can change whatever you want

  // Register the property
  eventData.propertyRegistry.registerEntityTypeDynamicProperties(
    playerCompShowTick, // The property
    MinecraftEntityTypes["player"] // This for the player
  );
});

// To access the property
// Set the value
player.setDynamicProperty("variableBool", true /* Value */);
// Get the value
let returnProperty = player.getDynamicProperty("varibleBool");
// Return true/false or undefined if player doesn't have
