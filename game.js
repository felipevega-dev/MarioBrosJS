/* global Phaser */

const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#fff',
    parent: 'game',
    scene: {
        preload, // se ejecuta antes de crear el juego
        create, // se ejecuta al crear el juego
        update // se ejecuta en cada frame
    }
}

new Phaser.Game(config);

function preload() {
    console.log('preload');
}

function create()   {
    console.log('create');
}

function update()   {

}