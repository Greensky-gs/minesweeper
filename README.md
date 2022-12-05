# minesweeper

This is an example for minesweeper command, without packages, in discord.js v13.
The returned grid is 10x10 cells

This code is open source, you can use it as you want.

I use the command handler from https://github.com/Greensky-gs/command-handler

## Python alternative

There is a python alternative in [`./main.py`](./main.py).

The script just creates a function that send a disctionarry :

```py
from main import minesweeper

plate = minesweeper()
// Dictionarry: { 'list': a list of lists of numbers, with -1 standing for a bomb, 'plate': 'a string version of the list  }
```
