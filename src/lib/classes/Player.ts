// image.src = neji;

import playerSpriteData from "$lib/PlayerSpriteData";
import type SpriteData from "$lib/interfaces/SpriteData";
import directions from "$lib/classes/DirectionModel";


export default class Player {

  direction = 'left'

  animations = {
    'idle': playerSpriteData[0],
    'walk': playerSpriteData[1],
    'run': playerSpriteData[2],

  }

  currentAnimation: SpriteData = this.animations.idle;


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

  draw(c: CanvasRenderingContext2D) {


    const data = this.currentAnimation
    if (data.image === null) {
      return;
    }

    this.currentFrame = this.currentFrame % data.frames;
    let srcX = this.currentFrame * data.w + data.border;
    let srcY = data.border


    if (this.direction === 'left') {
      srcX = data.w * data.frames - (this.currentFrame + 1) * data.w + data.border
      srcY = data.h + data.border

    }

    c.drawImage(
      data.image,
      srcX,
      srcY,
      data.w - 2, data.h - 2, this.position.x,
      360 - data.h + data.border * 2
      , data.w - 2, data.h - 2)

    this.drawnFrames++;
    if (this.drawnFrames > data.rate) {
      this.currentFrame++;
      this.drawnFrames = 0;
    }

    this.position.x += this.velocity
  }


  setAnimation(key: string) {
    if (key in this.animations) {
      this.currentAnimation = this.animations[key]
      this.currentFrame = 0;


      if (directions.left) {

        this.direction = 'left'
      } else {
        this.direction = 'right'
      }


    } else {
      console.error('Animation key does not exist')
    }


  }


  update(c: CanvasRenderingContext2D,) {


    this.draw(c)
  }
}
