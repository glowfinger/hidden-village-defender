import playerSpriteData from '$lib/classes/player/PlayerSpriteData';
import type SpriteData from '$lib/interfaces/SpriteData';
import directions from '$lib/classes/input/DirectionModel';
import service from '$lib/classes/player/PlayerStateMachine';
export default class Player {
  direction = 'right';

  animations = [playerSpriteData[0], playerSpriteData[1], playerSpriteData[2]];

  currentAnimation: SpriteData = this.animations[0];

  position: { x: number; y: number };
  velocity: number;
  size: { w: number; h: number };
  currentFrame = 0;
  drawnFrames = 0;

  constructor() {
    this.position = {
      x: 32,
      y: 296,
    };
    this.size = {
      h: 64,
      w: 32,
    };

    this.velocity = 0;
  }

  public idleAnimation() {
    this.currentAnimation = this.animations[0];
  }

  public runAnimation() {
    this.currentAnimation = this.animations[2];
  }

  render(c: CanvasRenderingContext2D) {
    const data = this.currentAnimation;
    if (data.image === null) {
      return;
    }

    this.currentFrame = this.currentFrame % data.frames;
    let srcX = this.currentFrame * data.w + data.border;
    let srcY = data.border;

    if (this.direction === 'left') {
      srcX = data.w * data.frames - (this.currentFrame + 1) * data.w + data.border;
      srcY = data.h + data.border;
    }

    c.drawImage(
      data.image,
      srcX,
      srcY,
      data.w - 2,
      data.h - 2,
      this.position.x,
      360 - data.h + data.border * 2,
      data.w - 2,
      data.h - 2,
    );

    this.drawnFrames++;
    if (this.drawnFrames > data.rate) {
      this.currentFrame++;
      this.drawnFrames = 0;
    }

    this.position.x += this.velocity;
  }

  update() {
    if (directions[0].left) {
      this.direction = 'left';
    } else if (directions[0].right) {
      this.direction = 'right';
    }

    if (directions[0].left || directions[0].right) {
      service.send('run', this);
      this.currentAnimation = this.animations[1]
    } else {
      service.send('idle', this);
      this.currentAnimation = this.animations[0]

    }
  }
}
