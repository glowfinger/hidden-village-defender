import createAnimation from '$lib/classes/player/helpers/CreateAnimations';

const JUMPING_GRAVITY = 1000;
const FALLING_GRAVITY = 1200;

export default class PlayerController {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  gamePad?;
  cursors?;
  direction: 'left' | 'right' = 'right';
  stateMachine: any;

  private isFalling: boolean = false;
  private lastVelocityY: number = 0;

  constructor(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, gamePad, cursors) {
    this.cursors = cursors;
    this.gamePad = gamePad;
    this.sprite = sprite;
    this.sprite.setBounce(0);
    this.sprite.body.setSize(25, 52);
    this.sprite.body.setGravityY(FALLING_GRAVITY);
    this.sprite.setCollideWorldBounds(true);

    createAnimation(this.sprite);
  }

  public update(time: number, delta: number) {
    if (!this.gamePad) {
      return;
    }

    this.sprite.anims.play('idle', true);

    if (this.sprite.anims.getName() === 'idle') {
      this.sprite.setSize(25, 52).setOffset(0, 9);
    }

    if (this.sprite.anims.getName() === 'running') {
      this.sprite.setSize(25, 52).setOffset(0, 3);
    }

    if (this.sprite.anims.getName() === 'walking') {
      this.sprite.setSize(25, 52).setOffset(0, 10);
    }

    if (this.sprite.anims.getName() === 'falling') {
      this.sprite.setSize(25, 52).setOffset(0, 19);
    }

    if (this.sprite.anims.getName() === 'jumping') {
      this.sprite.setSize(25, 52).setOffset(0, 7);
    }

    if (this.sprite.anims.getName() === 'crouching') {
      this.sprite.setSize(25, 26).setOffset(0, 16);
    }

    if (this.sprite.anims.getName() === 'casting') {
      this.sprite.setSize(25, 52).setOffset(0, 10);
    }

    if (this.sprite.anims.getName() === 'technique') {
      this.sprite.setSize(25, 52).setOffset(0, 2);
    }

    // if (this.gamePad.left) {
    //   this.walkLeft();
    // } else if (this.gamePad.right) {
    //   this.walkRight();
    // } else {
    //   this.sprite.setVelocityX(0);
    //   this.idleLeft();
    // }
    // } else {
    //   this.sprite.setVelocityX(0);

    //   const isFlipped = this.direction === 'left';
    //   this.sprite.flipX = isFlipped;
    //   if (this.cursors.down.isDown) {
    //     this.sprite.anims.play('crouching', true);
    //     this.sprite.body.setSize(25, 52).setOffset(10, 12);
    //   } else {
    //     this.sprite.anims.play('idle', true);
    //     this.sprite.body.setSize(25, 52).setOffset(10, 12);
    //   }

    //   if (!this.cursors.down.isDown) {
    //     this.sprite.anims.play('crouching', true);
    //   } else {
    //     this.sprite.anims.play('idle', true);
    //   }
    // }

    // this.isFalling = this.sprite.body.velocity.y > 0;

    // if (this.isFalling) {
    //   this.sprite.anims.play('falling', true);
    //   this.sprite.body.setGravityY(FALLING_GRAVITY);
    // } else {
    //   this.sprite.body.setGravityY(JUMPING_GRAVITY);
    // }

    // if (!this.sprite.body.onFloor() && !this.isFalling) {
    //   this.sprite.anims.play('jumping', true);
    // }

    // if (this.cursors.space.isDown) {
    //   this.jump();
    // }
  }

  private jump() {
    this.lastVelocityY = this.sprite.body.velocity.y;
    if (this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-600);
    }
  }

  private walkLeft() {
    //TODO: this.direction should be in a action handler
    this.direction = 'left';
    this.sprite.flipX = true;
    this.sprite.setVelocityX(-160);
    this.sprite.anims.play('running', true);
  }

  private walkRight() {
    //TODO: this.direction should be in a action handler
    this.direction = 'right';
    this.sprite.flipX = false;
    this.sprite.setVelocityX(160);
    this.sprite.anims.play('running', true);
  }

  private idleLeft() {
    // this.sprite.flipX = true;
    // this.sprite.setVelocityX(0);
    // this.sprite.anims.play('idle', true);
  }

  private idleRight() {
    // this.sprite.flipX = false;
    // this.sprite.setVelocityX(0);
    // this.sprite.anims.play('idle', true);
  }
}

function onGroundOptions(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
  if (!sprite.body.onFloor()) {
    return;
  }
}
