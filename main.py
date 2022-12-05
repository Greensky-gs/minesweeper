from random import randint

def minesweeper(bombStyle = 'B'):
    plate = []
    def cords(x, y):
        if x == -1 or x == 10 or y == -1 or y == 10:
            return None
        return plate[x][y]

    def fill():
        for _ in range(10):
            plate.append([])

        for x in range(10):
            for y in range(10):
                plate[x].append(0)
    def randCords():
        coordinates = randint(0, 9);
        return coordinates;

    fill()
    for _ in range(randint(8, 10)):
        plate[randCords()][randCords()] = -1

    for x in range(10):
        for y in range(10):
            count = 0
            if cords(x, y) != -1:
                for z in [(x - 1, y), (x + 1, y), (x - 1, y - 1), (x, y - 1), (x + 1, y - 1), (x - 1, y + 1), (x, y + 1), (x + 1, y + 1)]:
                    if cords(z[0], z[1]) == -1:
                        count+= 1
                plate[x][y] = count
    # Format
    result = ''
    for x in range(10):
        result+='\n'
        for y in range(10):
            if cords(x, y) == -1:
                result+=bombStyle
            else:
                result+= str(cords(x, y))
            result+=' '
    return {
        'list': plate,
        'plate': result
    }

# Use minesweeper() here, or export it