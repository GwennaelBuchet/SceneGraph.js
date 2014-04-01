//definition of the sprites
var spriteDef = {
    //sx:sliceX, sy:sliceY, w:width, h:height, nn:numberOfImagesPerLine, n:numberOfImages
    cow     : {sx:33, sy:128, w: 32, h: 32},
    sheep   : {sx:66, sy:0, w: 32, h: 16},
    pig     : {sx:66, sy:65, w: 32, h: 16},
    tractor : {sx:32, sy:0, w: 32, h: 32}
}

//definition of obstacles in the scene
// in a real game, this should come from a configuration/level description file
var obstaclesDef = [
    {sprite: spriteDef.cow, x: 135, y: 256},
    {sprite: spriteDef.cow, x: 260, y: 256},
    {sprite: spriteDef.sheep, x: 455, y: 272},
    {sprite: spriteDef.sheep, x: 490, y: 272},
    {sprite: spriteDef.pig, x: 952, y: 272},
    {sprite: spriteDef.sheep, x: 1175, y: 272},
    {sprite: spriteDef.sheep, x: 1208, y: 272},
    {sprite: spriteDef.cow, x: 1308, y: 256},
    {sprite: spriteDef.pig, x: 1406, y: 256},
    {sprite: spriteDef.tractor, x: 1535, y: 256},
    {sprite: spriteDef.sheep, x: 1607, y: 272}
];
//number of obstacles in the scene
var nbObstacles = obstaclesDef.length;