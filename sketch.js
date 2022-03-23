class Button {
    /* Constructor expects parameters for
    fill color, x and y coordinates that
    will be used to initialize class properties.
    */
    constructor(bColor, x, y, x2, y2, type, text, pressedColor) {
        this.sizeX = x2 - x
        this.sizeY = y2 - y
        this.color = bColor
        this.pressedColor = pressedColor
        this.x = x
        this.y = y
        this.x2 = x2
        this.y2 = y2
        this.pressed = false
        this.text = text
        this.type = type
        buttons.push(this)
        if (!this.pressedColor) {
            this.pressedColor = this.color
        }
    }


    display() {
        this.checkClicked()
        text(this.text, this.x + 5, this.y + (this.sizeY / 2))
        if (!this.pressed) {
            fill(this.color)
            rect(this.x, this.y, this.x2 - this.x, this.y2 - this.y)
        } else {
            fill(this.pressedColor)
            rect(this.x + 3, this.y + 3, -2 + this.x2 - this.x, -2 + this.y2 - this.y)

        }

    }

    checkClicked() {
        if (mouseIsPressed && mouseX > this.x && mouseX < this.x2 && mouseY > this.y && mouseY < this.y2) {
            this.pressed = true
        } else {
            this.pressed = false
        }
    }
}


class Tile {
    constructor() {
        this.type = "tile"
        this.color = color(255, 0, 0)

    }

    tick() {}
}

class PinkTile extends Tile {
    constructor() {
        super()
        this.type = "pink"
        this.color = color(255, 0, 255)
    }

    tick() {
        this.color = color(255, 0, random(255))
    }
}

class RotatableTile extends Tile {
    constructor(rotation) {
        super()
        this.type = "rotatable"
        this.color = color(0, 255, 0)
        this.rotation = rotation
        this.rotatable = true
    }

    tick() {

    }
}




function setupTiles() {
    WIDTH = 100
    HEIGHT = 100
    TILESIZE = 10
    tiles = Array.from(Array(WIDTH), () => new Array(HEIGHT))
    tilesData = Array.from(Array(WIDTH), () => new Array(HEIGHT))
    nextTiles = Array.from(Array(WIDTH), () => new Array(HEIGHT))
    offsetY = (HEIGHT * -TILESIZE) / 2
    offsetX = (WIDTH * -TILESIZE) / 2
    tiles[1][1] = 1
    nextTiles[1][1] = 1
    tiles[WIDTH / 2][HEIGHT / 2] = 1


    for (i = 0; i < WIDTH - 1; i++) {
        for (j = 0; j < HEIGHT - 1; j++) {
            tiles[i][j] = 0
            nextTiles[i][j] = 0
        }
    }
    tiles[1][1] = new Tile()
    tiles[2][1] = new PinkTile()

}

function setup() {
    buttons = []
    button1 = new Button("blue", width / 10, height / 10, 50 + width / 10, 50 + height / 10, "pause", "test", "red")
    button2 = new Button("red", width / 10, height / 5, 50 + width / 10, 50 + height / 5, "pause", "test2", "pink")


    setupTiles()
    createCanvas(windowWidth, windowHeight)



    fr = 600
    speed = 0.2
    dt = 1
    fps = 1
    c = color(255, 0, 0)
    count = 0
    count2 = 0

    mouseTileX = 0
    mouseTileY = 0
    lastPosX = 0
    lastPosY = 0
    tileTypes = ["blank", "blue", "border", "red", "green", "black", "sand", "explosion", "water", "bitOn", "bitFlip"]
    selectedTile = 0
    gameSpeed = 0
    paused = false
    amountOfTileTypes = tileTypes.length - 1



}

function checkTile(x, y, tile) {
    console.log(`ct.. ${x},${y},, ${tile}`)
    if (tiles[x][y]) {
        console.log(`start ${x}, ${y}, ${tile}: true`)
        return true
    } else {
        console.log(`start ${x}, ${y}, ${tile}: false`)
        return false
    }
}

function countAdjacentTiles(x, y, tile) {

    let count = 0
    if (checkTile(x + 1, y, tile)) count++
        if (checkTile(x, y + 1, tile)) count++
            if (checkTile(x - 1, y, tile)) count++
                if (checkTile(x, y - 1, tile)) count++
                    console.log(`cat ${x}, ${y}, ${tile}: ${count}`)
    return count
}

function checkAdjacentAdjacents(x, y, tile) {
    if (countAdjacentTiles(x + 1, y, tile) > 1) return true
    else if (countAdjacentTiles(x - 1, y, tile) > 1) return true
    else if (countAdjacentTiles(x, y + 1, tile) > 1) return true
    else if (countAdjacentTiles(x, y - 1, tile) > 1) return true
    else return false
}

function draw() {
    background(220)


    input()
    count = count + gameSpeed * deltaTime
    if (count > 100) tick()
        //if (checkTile(1,1,[0])) console.log("yeah")
    strokeWeight(1)
    frameRate(fr)

    //tiles[0][((mouseTileY + offsetY) / TILESIZE).toFixed(0)] = 2;
    //tiles[((mouseTileX - offsetX) / TILESIZE).toFixed(0)][0] = 2



    // -- tiles --
    startY = -1 * Math.floor(offsetY / TILESIZE) - 1
    startX = -1 * Math.floor(offsetX / TILESIZE) - 1
    stopY = Math.ceil(startY + height / TILESIZE) + 1
    stopX = Math.ceil(startX + width / TILESIZE) + 1

    if (startY < 0) startY = 0
    if (startX < 0) startX = 0
    if (stopY >= HEIGHT) stopY = HEIGHT
    if (stopX >= WIDTH) stopX = WIDTH

    for (i = startX; i < stopX; i++) {
        for (j = startY; j < stopY; j++) {
            if (
                j + 1 > -1 * (offsetY / TILESIZE) &&
                j - 1 < -1 * (offsetY / TILESIZE) + height / TILESIZE &&
                i + 1 > -1 * (offsetX / TILESIZE) &&
                i - 1 < -1 * (offsetX / TILESIZE) + width / TILESIZE
            ) {
                if (i == 0 || i == WIDTH - 1 || j == 0 || j == HEIGHT - 1) {
                    tiles[i][j] = 2
                }
                switch (tiles[i][j]) {
                    case 0: // blank
                        c = color(255, 204, 0)
                        break
                    case 1: // blue
                        c = color(0, 0, 255)
                        break
                    case 2: // border
                        c = color(50, 50, 50)
                        break
                    case 3: // red
                        c = color(255, 0, 0)
                        break
                    case 4: // green
                        c = color(0, 255, 50)
                        break
                    case 5: // black
                        c = color(0, 0, 0)
                        break
                    case 6: // sand
                        c = color(200, 200, 20)
                        break
                    case 7: // explosion
                        c = color(255, 0, 0)
                        break
                    case 8: // water
                        c = color(0, 80, 255)
                        break
                    case 9: // bitOn
                        c = color(50, 0, 0)
                        break
                    case 10:
                        c = color(40, 40, 40)
                        break
                    case 11:
                        c = color(200, 50, 80)
                        break

                    default:
                        c = color(255, 90, 40)
                }

                if (tiles[i][j].type) { c = tiles[i][j].color }

                if (tiles[i][j]) {
                    strokeWeight(0)
                    fill(c)
                    rect(
                        i * TILESIZE + offsetX,
                        j * TILESIZE + offsetY,
                        TILESIZE,
                        TILESIZE
                    )
                }
            }
        }
    }

    Smoothing = 0.9

    dt = dt * Smoothing + deltaTime * (1 - Smoothing)
    fps = 1000 / dt
    textPosX = 30
    textPosY = 40
    if (mouseTileX < 0) {
        mouseTileX = 0

    }
    if (mouseTileX >= WIDTH) {
        mouseTileX = WIDTH - 1
    }
    if (mouseTileY < 0) {
        mouseTileY = 0
    }
    if (mouseTileY >= HEIGHT) {
        mouseTileY = HEIGHT - 1
    }


    // -- UI --
    if (tiles[mouseTileX][mouseTileY] || tiles[mouseTileX][mouseTileY] === 0) {
        infoTile = tiles[mouseTileX][mouseTileY]
    } else {
        infoTile = "N/A"
    }
    strokeWeight(4)
    info = `DT :  ${dt.toFixed(1)}\nFPS: ${fps.toFixed(
        1
    )}\nmousetile: ${mouseTileX} \n${mouseTileY}\n\n${infoTile}\nnext:${nextTiles[mouseTileX][mouseTileY]
        }\noffset: ${offsetX}\n${offsetY}\ntilesize: ${TILESIZE}\nnewfps:${frameRate().toFixed(2)}\nstart:${startX},${startY}\nend:${stopX},${stopY}\n${count}\n${count2}\ngamespeed: ${gameSpeed}`
    fill(0, 0, 0)

    text(info, textPosX + 1, textPosY + 1)
    info2 = ""
    text(info2, 0, 50)
    text(`${selectedTile}: ${tileTypes[selectedTile]}`, width - 100, 30)
    strokeWeight(1)
    fill(0, 255, 0)

    text(info, textPosX, textPosY)


    info3 = `${mouseTileX},${mouseTileY}: ${checkTile(mouseTileX, mouseTileY, 1)}`
    text(info3, textPosX + 50, textPosY + 50)
    strokeWeight(0)
    if (paused) { // paused behaviour
        for (var a of buttons) {
            if (a.type == "pause") {
                a.display()

            }

        }
    }
}

function mouseWheel(event) {
    if (event.delta < 0) {
        if (TILESIZE < 100) {
            TILESIZE++
            offsetX = offsetX - mouseTileX
            offsetY = offsetY - mouseTileY
        }

    } else {
        if (TILESIZE > 3) {
            TILESIZE--
            offsetX = offsetX + mouseTileX
            offsetY = offsetY + mouseTileY
        }
    }


    print(event.delta)

    return false // prevents page scrolling
}

function keyPressed() {
    if (keyCode === ESCAPE) {
        if (paused) { paused = false } else { paused = true }
    } else if (keyCode === RIGHT_ARROW) {
        console.log(checkTile(1, 1, 1))
    }
}