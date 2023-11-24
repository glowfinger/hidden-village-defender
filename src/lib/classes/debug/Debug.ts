import drawFrameBox from './DrawFrameBox.js'
import drawPlayerBox from './DrawPlayerBox.js'
import drawHitBox from './DrawHitBox.js'
import { drawPlatformBox } from './DrawPlatformBox.js'
import type DebugBox from '$lib/classes/debug/DebugBox';

export default class Debug {
  set frameBox(value: DebugBox) {
    this._frameBox = value;
  }
  set hitBox(value: DebugBox) {
    this._hitBox = value;
  }
  set playerBox(box: DebugBox) {
    this._playerBox = box;
  }

  platforms: DebugBox[] = [];
  private _playerBox: DebugBox;
  private _hitBox: DebugBox
  private _frameBox: DebugBox;
  private showDebug: boolean;

  constructor(showDebug = false) {
    this.showDebug = showDebug;
  }


  update() {}
  draw(c: CanvasRenderingContext2D) {
    if(this.showDebug) {
      drawFrameBox(c, this._frameBox)
      drawHitBox(c, this._hitBox)
      drawPlayerBox(c, this._playerBox)
      this.platforms.forEach(platform =>  drawPlatformBox(c, platform))
    }
  }
}

