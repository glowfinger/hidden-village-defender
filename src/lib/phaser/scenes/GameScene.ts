import CameraController from '$lib/phaser/CameraController';
import PlayerController from '$lib/phaser/PlayerController';
import Phaser from 'phaser';

interface Input {
  left: boolean;
  right: boolean;
  down: boolean;
  up: boolean;
  walk: boolean;
  jump: boolean;
}

const gamepadInput: Input = {
  left: false,
  right: false,
  down: false,
  up: false,
  walk: false,
  jump: false,
};

const keyboardInput: Input = {
  left: false,
  right: false,
  down: false,
  up: false,
  walk: false,
  jump: false,
};

export default class GameScene extends Phaser.Scene {
  private player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private gamePad?: Phaser.Types.Input.Gamepad.Pad;

  private platforms?: Phaser.Physics.Arcade.StaticGroup;

  private playerController?: PlayerController;
  private cameraController?: CameraController;

  private debugText?: Phaser.GameObjects.Text;

  private keys: any = {};

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
        endFrame: 3,
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
        endFrame: 5,
        margin: 0,
      },
    });

    this.load.spritesheet({
      key: 'sprite-running',
      url: '/sprites/running.png',
      frameConfig: {
        frameWidth: 58,
        frameHeight: 58,
        startFrame: 0,
        endFrame: 5,
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

    this.load.spritesheet({
      key: 'sprite-crouching',
      url: '/sprites/crouching.png',
      frameConfig: {
        frameWidth: 42,
        frameHeight: 50,
        startFrame: 0,
        endFrame: 0,
        margin: 0,
      },
    });

    this.load.spritesheet({
      key: 'sprite-casting',
      url: '/sprites/casting.png',
      frameConfig: {
        frameWidth: 68,
        frameHeight: 66,
        startFrame: 0,
        endFrame: 10,
        margin: 0,
      },
    });

    this.load.spritesheet({
      key: 'sprite-technique',
      url: '/sprites/technique.png',
      frameConfig: {
        frameWidth: 67,
        frameHeight: 58,
        startFrame: 0,
        endFrame: 10,
        margin: 0,
      },
    });
  }

  create() {
    this.physics.world.setBounds(0, 0, 3240, 360);
    if (this.input.keyboard) {
      this.keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        jam: Phaser.Input.Keyboard.KeyCodes.J,
      });
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

    this.player = this.physics.add.sprite(240, 230, 'sprite');

    this.playerController = new PlayerController(this.player, gamepadInput, keyboardInput);
    this.cameraController = new CameraController(this.cameras.main, this.player);

    this.physics.add.collider(this.player, this.platforms);

    this.debugText = this.add.text(0, 0, JSON.stringify([keyboardInput, gamepadInput], null, 2), {
      fontFamily: 'monospace',
      align: 'left',
      fontSize: '12px',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 4,
      color: '#fff',
    });
  }

  update(time: number, delta: number) {
    if (!this.playerController) {
      return;
    }

    if (this.gamePad) {
      const axisH = this.gamePad.axes[0].getValue();
      const axisV = this.gamePad.axes[1].getValue();

      if (axisH >= 0.4) {
        gamepadInput.left = false;
        gamepadInput.right = true;
        gamepadInput.walk = false;
      } else if (axisH > 0.1 && axisH < 0.4) {
        gamepadInput.left = false;
        gamepadInput.right = true;
        gamepadInput.walk = true;
      } else if (axisH <= -0.4) {
        gamepadInput.left = true;
        gamepadInput.right = false;
        gamepadInput.walk = false;
      } else if (axisH < -0.1 && axisH < -0.4) {
        gamepadInput.left = true;
        gamepadInput.right = false;
        gamepadInput.walk = true;
      } else {
        gamepadInput.left = false;
        gamepadInput.right = false;
        gamepadInput.walk = false;
      }
    }

    if (this.keys) {
      if (this.keys.left.isDown) {
        keyboardInput.left = true;
        keyboardInput.right = false;
        keyboardInput.walk = true;
      } else if (this.keys.right.isDown) {
        keyboardInput.left = false;
        keyboardInput.right = true;
        keyboardInput.walk = true;
      } else {
        keyboardInput.left = false;
        keyboardInput.right = false;
        keyboardInput.walk = false;
      }

      if (this.keys.up.isDown) {
        keyboardInput.up = true;
        keyboardInput.down = false;
      } else if (this.keys.down.isDown) {
        keyboardInput.up = false;
        keyboardInput.down = true;
      } else {
        keyboardInput.up = false;
        keyboardInput.down = false;
      }

      if (this.keys.jam.isDown) {
        keyboardInput.jump = true;
      } else {
        keyboardInput.jump = false;
      }
    }

    this.debugText?.setText(JSON.stringify([keyboardInput, gamepadInput], null, 2));

    // this.add.text(0, 0, JSON.stringify(input), {
    //   fontFamily: 'monospace',
    //   align: 'left',
    //   fontSize: '12px',
    //   fontStyle: 'bold',
    //   stroke: '#000',
    //   strokeThickness: 4,
    //   color: '#fff',
    // });
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
