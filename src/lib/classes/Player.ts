// image.src = neji;

import playerSpriteData from "$lib/PlayerSpriteData";
import type SpriteData from "$lib/interfaces/SpriteData";


export default class Player {
  position: { x: number; y: number };
  velocity: number;
  size: { w: number; h: number };
  imageData = playerSpriteData;
  action = 'new';
  currentFrame = 0;
  drawnFrames = 0;

  constructor() {
    this.position = {
      x: 32,
      y: 32,
    };
    this.size = {
      h: 64,
      w: 32,
    };

    this.velocity = 0;

  }

  draw(c: CanvasRenderingContext2D) {


    const data: SpriteData = this.imageData[2];
    if(data.image === null) {
      return;
    }


    //
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)


    // c.drawImage(this.imageData[0].image, 0, 0)

    this.currentFrame = this.currentFrame % data.frames;
    const srcX = this.currentFrame * data.w;


    c.drawImage(
      data.image,
      srcX + data.border,
      data.border, data.w - 2, data.h - 2, this.position.x, this.position.y, data.w - 2, data.h - 2)

    this.drawnFrames++;
    if(this.drawnFrames > data.rate) {
      this.currentFrame++;
      this.drawnFrames = 0;
    }



    this.position.x += this.velocity

  }

  update(c: CanvasRenderingContext2D,) {



    this.draw(c)
  }
}
