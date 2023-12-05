import createAnimation from '$lib/classes/player/helpers/CreateAnimations';

const JUMPING_GRAVITY = 1000;
const FALLING_GRAVITY = 1200;

export default class PlayerController {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  gamePad?: Phaser.Types.Input.Gamepad.Pad;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  direction: 'left' | 'right' = 'right';
  stateMachine: any;

  private isFalling: boolean = false;
  private lastVelocityY: number = 0;

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
    this.sprite.body.setGravityY(FALLING_GRAVITY);
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

    this.isFalling = this.sprite.body.velocity.y > 0;

    if (this.isFalling) {
      this.sprite.anims.play('falling', true);
      this.sprite.body.setGravityY(FALLING_GRAVITY);
    } else {
      this.sprite.body.setGravityY(JUMPING_GRAVITY);
    }

    if (!this.sprite.body.onFloor() && !this.isFalling) {
      this.sprite.anims.play('jumping', true);
    }

    if (this.cursors.space.isDown) {
      this.jump();
    }
  }

  private jump() {
    this.lastVelocityY = this.sprite.body.velocity.y;
    if (this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-600);
    } else {
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
