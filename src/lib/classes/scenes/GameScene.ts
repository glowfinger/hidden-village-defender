import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private platforms: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('ground', '/sprites/platforms/basic-platform.png');
    this.load.image('sky', '/backgrounds/night-image.png');
    this.load.spritesheet({
      key: 'sprite',
      url: '/sprites/walking.png',
      frameConfig: {
        frameWidth: 40,
        frameHeight: 64,
        startFrame: 0,
        endFrame: 4,
        margin: 1,
      },
    });
  }

  create() {
    this.physics.world.setBounds(0, 0, 3240, 360);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.tileSprite(0, 0, 3240, 360, 'sky').setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    generatePlaforms(this.platforms);

    this.player = this.physics.add.sprite(100, 100, 'sprite');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(300);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.cameras.main.setBounds(0, 0, 3240, 360);
    this.cameras.main.fadeIn(600);
    this.cameras.main.startFollow(this.player, true, 1, 1, 0, 0);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      // this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      // this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      // this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

function generatePlaforms(platforms: Phaser.Physics.Arcade.StaticGroup) {
  const y = 228 + 96;

  for (let i = 0; i * 32 < 3240; i++) {
    platforms.create(i * 32, y, 'ground');
  }
}
