import Phaser from 'phaser';

export default class SplashScene extends Phaser.Scene {
  constructor() {
    super('SplashScene');
  }

  preload() {
    // Load assets here
  }

  create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.text(screenCenterX, screenCenterY, 'games.glowfinger.com').setOrigin(0.5);
    const text = this.add.text(10, 10, 'Press any button on a connected Gamepad');

    if (this.input.keyboard) {
      this.input.keyboard.on('keydown', changeToStartScene, this);
    }

    if (this.input.gamepad && this.input.gamepad.total >= 0) {
      this.input.gamepad.once('down', changeToStartScene, this);
    }

    this.input.on('pointerdown', changeToStartScene, this);
  }

  update() {
    // Update logic here
  }
}

function changeToStartScene(this: Phaser.Scene) {
  this.scene.start('StartScene');
}
