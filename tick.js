function tick() {
    count = 0
    count2++


    for (i = 1; i < WIDTH - 1; i++) {
        for (j = 1; j < HEIGHT - 1; j++) {
            if (!tiles[i][j]) {
            } else {
                if (tiles[i][j].isTickable && count2 % tiles[i][j].tickspeed == 0) {

                    tiles[i][j].tick() // if tile is tickable, tick it
                }
                /*
                if (tiles[i][j]) {
                    switch (Math.floor(random(50))) {
                        case 0:
                            if (tiles[i][j] == 1 || tiles[i][j] == 4) {
                                // if any surrounding tile is 3, set this tile to 3 as well
                                if (
                                    tiles[i - 1][j] == 3 ||
                                    tiles[i + 1][j] == 3 ||
                                    tiles[i][j - 1] == 3 ||
                                    tiles[i][j + 1] == 3
                                ) {
                                    nextTiles[i][j] = 3
                                }
                            }
                            break
                        case 1:
                            if (tiles[i][j] == 1 || tiles[i][j] == 3) {
                                if (
                                    tiles[i - 1][j] == 4 ||
                                    tiles[i + 1][j] == 4 ||
                                    tiles[i][j - 1] == 4 ||
                                    tiles[i][j + 1] == 4
                                ) {
                                    nextTiles[i][j] = 4
                                }
                            }
                    }
                    if (tiles[i][j] == 6) {
                        if (!tiles[i][j + 1] || tiles[i][j + 1] == 8) {
                            nextTiles[i][j + 1] = 6
                            nextTiles[i][j] = tiles[i][j + 1]
                        } else if (
                            (!tiles[i + 1][j + 1] || tiles[i + 1][j + 1] == 8) &&
                            (!tiles[i + 1][j] || tiles[i + 1][j] == 8)
                        ) {
                            nextTiles[i + 1][j + 1] = 6
                            nextTiles[i][j] = tiles[i + 1][j + 1]
                        } else if (
                            (!tiles[i - 1][j + 1] || tiles[i - 1][j] == 8) &&
                            (!tiles[i - 1][j] || tiles[i - 1][j] == 8)
                        ) {
                            nextTiles[i - 1][j + 1] = 6
                            nextTiles[i][j] = tiles[i - 1][j + 1]
                        }
                    } else if (tiles[i][j] == 7) {
                        explosionSize = 5
                        nextTiles[i][j] = 0
                        for (k = 0 - explosionSize; k < explosionSize; k++) {
                            for (l = 0 - explosionSize; l < explosionSize; l++) {
                                nextTiles[i + k][j + l] = 0
                            }
                        }
                    } else if (tiles[i][j] == 8) {
                        // wateraw
                        if (!checkTile(i, j)) {
                            nextTiles[i][j + 1] = 8
                            nextTiles[i][j] = 0

                        } else {
                            for (k = 1; k < 10; k++) {
                                if (!tiles[i + k][j + 1]) {
                                    travelR = 1
                                    break
                                }
                                if (!tiles[i - k][j + 1]) {
                                    travelR = 2
                                    break
                                }
                            }
                            if (travelR == 1) {
                                if (!tiles[i + 1][j]) {
                                    nextTiles[i + 1][j] = 8
                                    nextTiles[i][j] = 0
                                }
                            } else if (travelR == 2) {
                                if (!tiles[i - 1][j]) {
                                    nextTiles[i - 1][j] = 8
                                    nextTiles[i][j] = 0
                                }
                            }
                        }











                    } else if (tiles[i][j] == 9) // bitOn
                    { // if any surrounding tile is not 9, set this tile to 10
                        if (countAdjacentTiles(i, j, 9) > 0) {
                            nextTiles[i][j] = 10
                        }
                    } else if (tiles[i][j] == 10) // bitFlip
                    { //if any surrounding tile is 9, set this tile to 10
                        if (countAdjacentTiles(i, j, 9) > 0) {
                            nextTiles[i][j] = 10
                        } else if (countAdjacentTiles(i, j, 10) > 10) {
                            nextTiles[i][j] = 9
                        } else { nextTiles[i][j] = 10 }
                    }
                }

                if (count2 % 10 == 0) {
                    neighbours = 0
                    for (k = -1; k <= 1; k++) {
                        for (l = -1; l <= 1; l++) {
                            if (tiles[i + k][j + l] == 5) {
                                neighbours++
                            }
                        }
                    }

                    if (tiles[i][j] == 5) {
                        neighbours--
                    }

                    if (tiles[i][j] == 5 && neighbours < 2) {
                        nextTiles[i][j] = 0
                    } else if (tiles[i][j] == 5 && neighbours > 3) {
                        nextTiles[i][j] = 0
                    } else if (!tiles[i][j] && neighbours == 3) {
                        nextTiles[i][j] = 5
                    } else {
                        nextTiles[i][j] = tiles[i][j]
                    }
                }*/
            }
        }
    }


    for (i = 1; i < WIDTH; i++) {
        for (j = 1; j < HEIGHT; j++) {
            if (tiles[i][j] != nextTiles[i][j]) {
                setTile(i, j, nextTiles[i][j], true)

                // //tiles[i][j].kill()
                // tiles[i][j] = nextTiles[i][j]

                // tiles[i][j].positionX = i
                // tiles[i][j].positionY = j
                // tiles[i][j].live()
            }



        }
    }
}