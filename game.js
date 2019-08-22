var ratio = 9 / 16;
var GAME_WIDTH = 1280;
var GAME_HEIGHT = Math.floor(GAME_WIDTH * ratio);

const config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
}

var game = new Phaser.Game(config);

function preload() {
    this.load.image("tiles", "./assets/tilemaps/battle-royale.png");
    this.load.tilemapTiledJSON("map", "./assets/tilemaps/map1/battle-royale.json");
    this.load.image('player', "./assets/player.png");
}

function create() {
    this.map = this.make.tilemap({
        key: "map"
    });

    const tileset = this.map.addTilesetImage("battle-royale", "tiles");
    const floorLayer = this.map.createStaticLayer("floor", tileset, 0, 0);
    this.herbeLayer = this.map.createStaticLayer("herbe", tileset, 0, 0);
    this.blockLayer = this.map.createStaticLayer("block", tileset, 0, 0);
    //this.map["wallLayer"] = this.map.createStaticLayer("wall", tileset, 0, 0);
    this.blockLayer.setCollisionByProperty({
        collide: true
    });
    this.herbeLayer.setAlpha(0.8).setDepth(2);


    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    ``
    var spawnPoint = this.map.findObject("player", obj => obj.name === "player1");
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player").setSize(60, 80).setScale(0.8).setDepth(1);
    this.player.setTint("0xff0000");
    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player);
    this.physics.add.collider(this.player, this.blockLayer);

    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
        var pointer = this.input.activePointer;
        var player = this.player;
        var angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)
        player.setRotation(angle + Math.PI / 2);
        this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
        var pointer = this.input.activePointer;
        var player = this.player;
        var angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)
        player.setRotation(angle + Math.PI / 2);
        this.player.setVelocityX(300);
    }

    if (this.cursors.up.isDown) {
        var pointer = this.input.activePointer;
        var player = this.player;
        var angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)
        player.setRotation(angle + Math.PI / 2);
        this.player.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
        var pointer = this.input.activePointer;
        var player = this.player;
        var angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)
        player.setRotation(angle + Math.PI / 2);
        this.player.setVelocityY(300);
    }

    this.input.on('pointermove', function(pointer) {
        var player = this.player;
        var angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)
        player.setRotation(angle + Math.PI / 2);
    }, this);
}