# Command Components

> Update: Minecraft 1.19.10

Command will return data as object.

```js
let data = world.getDimension("overworld").runCommand(<command>)
```

Every command will return `statusCode` and `statusMessage` with additional property every commands

```json
{
    "statusCode": 0, // Or -2147352576 (2^31 - 2^17) when error
    "statusMessage": "<Message/Output from the commands>"
}
```

## Ability

> The command `ability` accessible with `Education Edition` toggle enabled

```json
{
    "player": ["Steve", "FrankyRayMS"],
    "statusCode": 0,
    "statusMessage": "Ability has been updated",
    "value": true, // The value of ability to the player
}
```

## Alwaysday

> No documentation yet!

## Camerashake

With `/camerashake add`
```json
{
    "player": ["Steve", "FrankyRayMS"],
    "statusCode": 0,
    "statusMessage": "Send a request to the following players for their camera to shake: {player}"
}
```

With `/camerashake stop`
```json
{
    "player": ["Steve", "FrankyRayMS"],
    "statusCode": 0,
    "statusMessage": "Stopping the camera shake for the following players: {player}"
}
```

## Clear

When player did have item in their inventory
```json
{
    "itemsRemoved": ["32", "32"], // How many item removed per player
    "player": ["Steve", "FrankyRayMS"],
    "statusCode": 0,
    "statusMessage": "Cleared the inventory of {player}, removing {itemRemoved} items"
}
```

When player didn't have item in their inventory [Return: Error]
```json
{
    "itemsRemoved": ["32", "32"], // How many item removed per player
    "player": ["Steve", "FrankyRayMS"],
    "statusCode": -2147352576,
    "statusMessage": "Could not clear the inventory of {player}, no items to remove"
}
```

When testing is the item on the player using `/clear <player> <item> <data> 0`
```json
{
    "playerTest": ["Steve (1)", "FrankyRayMS (63)"], // `{Name} ({Item Amount})`
    "statusCode": 0,
    "statusMessage": "{playerTest} has {itemAmount} items that match the criteria"
}
```

## Clone

When successfully clone the area
```json
{
    "count": 4, // How many block cloned
    "statusCode": 0,
    "statusMessage": "{count} block cloned"
}
```

When no block cloned [Return: Error]
```json
{
    "statusCode": -2147352576,
    "statusMessage": "No blocks cloned"
}
```

When source area and destination area overlap (Without `filtered force`) [Return: Error]
```json
{
    "statusCode": -2147352576,
    "statusMessage": "Source and destination can not overlap"
}
```

> Note: Test failed `/clone` => `Too many blocks in the specified area (%1$d > %2$d)` 524288 blocks (8 chunk) equivalent

## Damage

When target can be damage
```json
{
    "hurtActors": ["Steve", "FrankyRayMS"],
    "statusCode": -214735276,
    "statusMessage": "Applied damage to {player}"
}
```

When target can not be damage [Return: Error]
```json
{
    "statusCode": -214735276,
    "statusMessage": "Could not apply damage to {player}",
    "unhurtActors": ["Steve", "FrankyRayMS"]
}
```

When too many source damage [Return: Error]
```json
{
    "statusCode": -214735276,
    "statusMessage": "There can only be one source entity. Please adjust your selector to limit selection to one entity."
}
```

> The command not give error even there's unhurtable target. The data returned both `hurtActors` and `unhurtActors`

## Difficulty

```json
{
    "difficulty": "PEACEFULL",
    "statusCode": 0,
    "statusMessage": "Set game difficulty to {difficulty}"
}
```
```yaml
difficulty:
  - PEACEFULL
  - EASY
  - NORMAL
  - HARD
```

## Effect

When successfully give effect to player
```json
{
    "amplifier": 9, // The effect amplifier/level, start from 0
    "effect": "regeneration", // The effect identifier
    "player": ["Steve", "FrankyRayMS", "Chicken", "Armor Stand"],
    "seconds": 600, // The effect duration,
    "statusCode": 0,
    "statusMessage": "Gave {effecf} * {amplifier} to {player} for {seconds} seconds"
}
```

When clear the effect (Entity did have the effect)
```json
{
    "statusCode": 0,
    "statusMessage": "Took all effects from {player}"
}
```

When clear the effect (Entity didn't have the effect) [Return: Error]
```json
{
    "player": ["Steve", "FrankyRayMS", "Chicken", "Armor Stand"],
    "statusCode": -2147352576,
    "statusMessage": "Couldn't take any effects from {player} as they do not have any"
}
```

## Enchant

When succeesfully enchant an item
```json
{
    "playerNames": ["FrankyRayMS"],
    "statusCode": 0,
    "statusMessage": "Enchanting succeeded for {player}"
}
```

Other than that, will cause error [Return: Error]
```json
{
    "playerNames": ["FrankyRayMS"],
    "statusCode": -2147352576,
    "statusMessage": "<Message>"
}
```
```yaml
statusMessage:
  - "{enchant} can't be combined with {enchant}"
  - "{enchant} does not support level {level}"
  - "The selected enchantment can't be added to the target item: {enchant}"
  - "The target doesn't hold an item: {player}"
```

## Fill

Successfully fill the area
```json
{
    "blockName": "Purple Wool",
    "fillCount": 16, // How many block get filled
    "statusCode": 0,
    "statusMessage": "{fillCount} blocks filled"
}
```

Fill 0 blocks [Return: Error]
```json
{
    "blockName": "Purple Wool",
    "fillCount": 0,
    "statusCode": -2147352576,
    "statusMessage": "{fillCount} blocks filled"
}
```

Failed to fill [Return: Error]
```json
{
    "statusCode": -2147352576,
    "statusMessage": "<Message>"
}
```
```yaml
statusMessage:
  - "Cannot place blocks outside of the world"
  - "Too many blocks in the specified area ({fillCount} > 32768)"
```

## Gamemode

Successfully change gamemode
```json
{
    "gamemode": "%createWorldScreen.gameMode.survival", // Referring lang file
    "player": ["Steve", "FrankyRayMS"],
    "statusCode": 0,
    "statusMessage": "Set {player}'s gamemode to {gamemode}"
}
```
```yaml
gamemode:
  - Creative: "%createWorldScreen.gameMode.creative"
  - Survival: "%createWorldScreen.gameMode.survival"
  - Adventure: "%createWorldScreen.gameMode.adventure"
  - Default: "%createWorldScreen.gameMode.serverDefault"
  - Spectator: "%createWorldScreen.gameMode.spectator"
```

