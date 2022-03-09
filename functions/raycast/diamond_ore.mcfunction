# Raycast: Diamond Ore
scoreboard objectives add raycast dummy
execute @s ~ ~ ~ summon minecraft:armor_stand "Raycast"

# Finding
# Block 1
execute @s ~ ~ ~ tp @e[name="Raycast",c=1] ^ ^ ^1
execute @e[name="Raycast",c=1] ~ ~ ~ detect ~ ~ ~ minecraft:diamond_ore -1 scoreboard players add @s raycast 1
# Block 2
execute @s ~ ~ ~ tp @e[name="Raycast",c=1] ^ ^ ^2
execute @e[name="Raycast",c=1] ~ ~ ~ detect ~ ~ ~ minecraft:diamond_ore -1 scoreboard players add @s raycast 1
# Block 3
execute @s ~ ~ ~ tp @e[name="Raycast",c=1] ^ ^ ^3
execute @e[name="Raycast",c=1] ~ ~ ~ detect ~ ~ ~ minecraft:diamond_ore -1 scoreboard players add @s raycast 1
# Block 4
execute @s ~ ~ ~ tp @e[name="Raycast",c=1] ^ ^ ^4
execute @e[name="Raycast",c=1] ~ ~ ~ detect ~ ~ ~ minecraft:diamond_ore -1 scoreboard players add @s raycast 1
# Block 5
execute @s ~ ~ ~ tp @e[name="Raycast",c=1] ^ ^ ^5
execute @e[name="Raycast",c=1] ~ ~ ~ detect ~ ~ ~ minecraft:diamond_ore -1 scoreboard players add @s raycast 1

# Result
execute @e[name="Raycast",scores={raycast=1..},c=1] ~ ~ ~ titleraw @p actionbar {"rawtext": [{"text": "Founding "}, {"score":{"name": "@e[name=\"Raycast\",c=1]", "objective": "raycast"}},{"text": " diamond ore(s) within 5 blocks"}]}
execute @e[name="Raycast",scores={raycast=0},c=1] ~ ~ ~ title @p actionbar "Cannot founding any diamond ore within 5 blocks"

# Finalizing
kill @e[name="Raycast",c=1]
scoreboard objectives remove raycast