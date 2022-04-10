# Armor Stand rotation
setblock = 4
radius = 10

with open("./functions/circle/asRot.mcfunction", 'a') as function:
    for i in range(setblock):
        function.write(f'\n# Set block from armor stand perspective #1')
        for j in range(radius):
            if i == 0:
                function.write(f'\nexecute @e[type=armor_stand,name="Radius:{j+1}"scores={{radiusRot=0..90}}] ~ ~ ~ setblock ^ ^ ^{j+1} stonebrick')
            elif i == 1:
                function.write(f'\nexecute @e[type=armor_stand,name="Radius:{j+1}"scores={{radiusRot=0..90}}] ~ ~ ~ setblock ^ ^ ^-{j+1} stonebrick')
            elif i == 2:
                function.write(f'\nexecute @e[type=armor_stand,name="Radius:{j+1}"scores={{radiusRot=0..90}}] ~ ~ ~ setblock ^{j+1} ^ ^ stonebrick')
            elif i == 3:
                function.write(f'\nexecute @e[type=armor_stand,name="Radius:{j+1}"scores={{radiusRot=0..90}}] ~ ~ ~ setblock ^-{j+1} ^ ^ stonebrick')