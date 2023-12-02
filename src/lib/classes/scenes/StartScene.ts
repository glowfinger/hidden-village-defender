import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  preload() {
    // Load assets here
  }

  create() {
    this.cameras.main.setBackgroundColor('#de9e41');
    const helloButton = this.add
      .text(0, 0, 'Start Game', {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      })
      .setInteractive()
      .on('pointerover', over, this)
      .on('pointerout', out, this)
      .on('pointerup', up, this)
      .on('pointerdown', down, this);
  }

  update() {
    // Update logic here
  }
}

function over(this: Phaser.Scene) {
  console.log('button over');
}

function out(this: Phaser.Scene) {
  this.scene.start('GameScene');
  this.scene.start('GameUIScene');
}

function up(this: Phaser.Scene) {
  console.log('button up');
}

function down(this: Phaser.Scene) {
  console.log('button out');
}
