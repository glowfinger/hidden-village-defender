import CameraController from '$lib/phaser/CameraController';
import PlayerController from '$lib/phaser/PlayerController';
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  private player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private gamePad?: Phaser.Types.Input.Gamepad.Pad;

  private platforms?: Phaser.Physics.Arcade.StaticGroup;

  private playerController?: PlayerController;
  private cameraController?: CameraController;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('ground', '/sprites/platforms/basic-platform.png');
    this.load.image('sky', '/backgrounds/night-image.png');

    this.load.atlas('first-sprite', '/sprites/first-sprite.png', '/first-sprite-atlas.json');

    this.load.spritesheet({
      key: 'sprite',
      url: '/sprites/idle.png',
      frameConfig: {
        frameWidth: 50,
        frameHeight: 66,
        startFrame: 0,
        endFrame: 7,
        margin: 0,
        spacing: 0,
      },
    });

    this.load.spritesheet({
      key: 'sprite-walking',
      url: '/sprites/walking.png',
      frameConfig: {
        frameWidth: 42,
        frameHeight: 66,
        startFrame: 0,
        endFrame: 11,
        margin: 0,
      },
    });

    this.load.spritesheet({
      key: 'sprite-falling',
      url: '/sprites/falling.png',
      frameConfig: {
        frameWidth: 42,
        frameHeight: 74,
        startFrame: 0,
        endFrame: 1,
        margin: 0,
      },
    });

    this.load.spritesheet({
      key: 'sprite-jumping',
      url: '/sprites/jumping.png',
      frameConfig: {
        frameWidth: 34,
        frameHeight: 66,
        startFrame: 0,
        endFrame: 1,
        margin: 0,
      },
    });
  }

  create() {
    this.physics.world.setBounds(0, 0, 3240, 360);
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    if (this.input.gamepad && this.input.gamepad.total >= 0) {
      this.input.gamepad.once(
        'connected',
        (pad: Phaser.Types.Input.Gamepad.Pad) => (this.gamePad = pad),
      );
    }

    this.add.tileSprite(0, 0, 3240, 360, 'sky').setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    generatePlaforms(this.platforms);

    this.player = this.physics.add.sprite(100, 100, 'sprite');

    this.playerController = new PlayerController(this.player, this.gamePad, this.cursors);
    this.cameraController = new CameraController(this.cameras.main, this.player);

    this.physics.add.collider(this.player, this.platforms);
  }

  update(time: number, delta: number) {
    if (!this.playerController) {
      return;
    }

    this.playerController.update(time, delta);
  }
}

function generatePlaforms(platforms: Phaser.Physics.Arcade.StaticGroup) {
  const y = 228 + 96;

  for (let i = 0; i * 32 < 3240; i++) {
    platforms.create(i * 32, y, 'ground');
  }

  platforms.create(320, 160, 'ground');
}
