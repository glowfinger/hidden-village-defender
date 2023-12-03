import Phaser from 'phaser';

export default class GameUIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameUIScene' });
  }

  preload() {
    this.load.image('mana', '/sprites/mana-icon-grey.png');
    this.load.image('mana-earth', '/sprites/mana-icon-black.png');
    this.load.image('mana-wind', '/sprites/mana-icon-green.png');
    this.load.image('mana-fire', '/sprites/mana-icon-blue.png');
    this.load.image('mana-water', '/sprites/mana-icon-purple.png');

    this.load.on('complete', () => {
      console.log('GameUIScene preload complete');
    });
  }

  create() {
    this.add.text(16, 310, 'MANA', {
      fontFamily: 'monospace',
      align: 'right',
      fontSize: '16px',
      stroke: '#000',
      strokeThickness: 3,
      color: '#fff',
    });

    const manas = [
      'mana',
      'mana',
      'mana',
      'mana',
      'mana-earth',
      'mana-wind',
      'mana-fire',
      'mana-water',
    ];

    manas.forEach((mana, index) => {
      this.add.image(68 + index * 12, 320, mana);
    });
  }

  update() {
    // Update logic here
  }
}
