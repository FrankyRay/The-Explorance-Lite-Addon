import pyautogui as pg
import time

time.sleep(3)
pg.typewrite('!itemgive stick\n', .1)
time.sleep(2)
pg.typewrite('!itemgive apple 1 0 {"name": "Pear", "lore": ["Line 1", "Line 2"]}\n', .1)

"""

"""