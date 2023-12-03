export default class LoadingScence extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScene' });
  }

  create() {
    const { width, height } = this.scale;
    const x = width * 0.5;
    const y = height * 0.5;

    const left = this.add.rectangle(x - 50, y, 40, 75, 0x7a367b, 1);
    const centre = this.add.rectangle(x, y, 40, 75, 0x7a367b, 1);
    const right = this.add.rectangle(x + 50, y, 40, 75, 0x7a367b, 1);

    this.tweens.add({
      targets: left,
      scaleY: 2,
      ease: Phaser.Math.Easing.Sine.InOut,
      duration: 600,
      repeatDelay: 300,
      delay: 0,
      repeat: -1,
      yoyo: true,
      onYoyo: () => {
        if (left.fillColor === 0xdf84a5) {
          left.setFillStyle(0x7a367b, 1);
        } else {
          left.setFillStyle(0xdf84a5, 1);
        }
      },
    });

    this.tweens.add({
      targets: centre,
      scaleY: 2,
      ease: Phaser.Math.Easing.Sine.InOut,

      duration: 600,
      repeatDelay: 300,
      delay: 300,
      repeat: -1,
      yoyo: true,
    });

    this.tweens.add({
      targets: right,
      scaleY: 2,
      ease: Phaser.Math.Easing.Sine.InOut,
      duration: 600,
      repeatDelay: 300,
      delay: 600,
      repeat: -1,
      yoyo: true,
    });
  }
}
