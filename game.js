/* global Phaser */

const config = {
    type: Phaser,
    width: 256,
    height: 244,
    backgroundColor: 'white',
    parent: 'game',
    scene: {
        preload, // se ejecuta antes de crear el juego
        create, // se ejecuta al crear el juego
        update // se ejecuta en cada frame
    }
}

function preload() {
    this.load.image('player', 'assets/player.png');
}

function create()   {
    this.add.image(100, 100, 'player');
}

function update()   {
    console.log('update');
}