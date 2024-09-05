/* global Phaser */

const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade : {
            gravity: { y: 300},
            debug: false

        }
    },
    scene: {
        preload, // se ejecuta antes de crear el juego
        create, // se ejecuta al crear el juego
        update // se ejecuta en cada frame
    }
}

new Phaser.Game(config);
// this -> game -> scene -> object

function preload() {
    console.log('preload');
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )
    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        { frameWidth: 16}
    )
    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png',
        { frameWidth: 32}
    )

}

function create()   {
    
    this.add.image(110,50,'cloud1')
        .setOrigin(0,0)
        .setScale(0.15)



    // SUELOS    
    this.floor = this.physics.add.staticGroup()

    this.floor
        .create(0, config.height - 16, 'floorbricks')
        .setOrigin(0,.5)
        .refreshBody()
     

    this.floor
        .create(150, config.height - 16, 'floorbricks')
        .setOrigin(0,.5)
        .refreshBody()


    // MARIO
    this.mario = this.physics.add.sprite(50,100,'mario')
        .setOrigin(0,1)
        .setCollideWorldBounds(true)
        .setGravityY(300)

    this.physics.world.setBounds(0,0,2000, config.height)
    this.physics.add.collider(this.mario, this.floor)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)   

    this.keys = this.input.keyboard.createCursorKeys()
    

    // Animaciones
    this.anims.create({
        key: 'mario-walk',
        frames: this.anims.generateFrameNumbers(
            'mario', 
            { start: 1, end: 3}
        ),
        frameRate: 12,
        repeat: - 1,
    })

    this.anims.create({
        key: 'mario-jump',
        frames: [{ key: 'mario', frame: 1}]
    })

    this.anims.create({
        key: 'mario-idle',
        frames:[{ key: 'mario', frame: 0}]
    })
}

function update()   {
    if (this.keys.left.isDown) {
        this.mario.x -= 2
        this.mario.anims.play('mario-walk', true)
        this.mario.flipX = true
    } else if (this.keys.right.isDown) {
        this.mario.x += 2
        this.mario.anims.play('mario-walk', true)
        this.mario.flipX = false
    } else if (this.keys.up.isDown) {
        this.mario.y -= 5
        this.mario.anims.play('mario-jump', true)
    } else {
        this.mario.anims.play('mario-idle', true)
    }

    if (this.keys.up.isDown && this.mario.body.touching.down) {
        this.mario.setVelocityY(-300)
        this.mario.anims.play('mario-jump', true)
    }
}