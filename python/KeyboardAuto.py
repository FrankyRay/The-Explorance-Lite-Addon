import pyautogui as pg
import time

time.sleep(3)
pg.typewrite('!itemgive stick\n', .1)
time.sleep(2)
pg.typewrite('!itemgive netherite_sword 1 {"Display": {"Name": "Legend Sword", "Lore": ["Made from the ore of hell", "Very strong and powerful"]}, "Enchantments": [{"id": "unbreaking", "lvl": 3}, {"id": "mending"}], "CanPlaceOn": ["stone", "wool"], "CanDestroy": ["stone", "wool"], "KeepOnDeath": {}, "ItemLock": "lock_in_slot"}\n', .05)

"""
!itemgive stick
!itemgive netherite_sword 1 {"Display": {"Name": "Legend Sword", "Lore": ["Made from the ore of hell", "Very strong and powerful"]}, "Enchantments": [{"id": "sharpness", "lvl": 5}, {"id": "unbreaking", "lvl": 3}], "CanPlaceOn": ["stone", "wool"], "CanDestroy": ["stone", "wool"], "KeepOnDeath": {}, "ItemLock": "lock_in_slot"}

"""