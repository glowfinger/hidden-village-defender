import createAnimation from '$lib/classes/player/helpers/CreateAnimations';

export default class PlayerController {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  gamePad?: Phaser.Types.Input.Gamepad.Pad;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  direction: 'left' | 'right' = 'right';
  stateMachine: any;

  constructor(
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    gamePad: Phaser.Types.Input.Gamepad.Pad | undefined,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined,
  ) {
    this.cursors = cursors;
    this.gamePad = gamePad;
    this.sprite = sprite;
    this.sprite.setBounce(0);
    this.sprite.body.setSize(25, 52).setOffset(10, 12);
    this.sprite.body.setGravityY(300);
    this.sprite.setCollideWorldBounds(true);

    createAnimation(this.sprite);
  }

  public update(time: number, delta: number) {
    if (!this.cursors) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.walkLeft();
    } else if (this.cursors.right.isDown) {
      this.walkRight();
    } else {
      this.sprite.setVelocityX(0);

      if (this.direction === 'left') {
        this.idleLeft();
      } else {
        this.idleRight();
      }
    }
  }

  private walkLeft() {
    //TODO: this.direction should be in a action handler
    this.direction = 'left';
    this.sprite.flipX = true;
    this.sprite.setVelocityX(-160);
    this.sprite.anims.play('walking', true);
  }

  private walkRight() {
    //TODO: this.direction should be in a action handler
    this.direction = 'right';
    this.sprite.flipX = false;
    this.sprite.setVelocityX(160);
    this.sprite.anims.play('walking', true);
  }

  private idleLeft() {
    this.sprite.flipX = true;
    this.sprite.setVelocityX(0);
    this.sprite.anims.play('idle', true);
  }

  private idleRight() {
    this.sprite.flipX = false;
    this.sprite.setVelocityX(0);
    this.sprite.anims.play('idle', true);
  }
}
