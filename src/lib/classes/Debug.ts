import stateHelper from '$lib/StateHelper';
import type Game from '$lib/classes/Game';
import directions from '$lib/classes/DirectionModel';

export default class Debug {
  debug: boolean;

  constructor(debug = false) {
    this.debug = debug;
  }

  update(game: Game): void {
    if (!this.debug) {
      return;
    }

    stateHelper.gameFocus = game.focused;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.debug) {
      return;
    }

    ctx.fillStyle = '#000';
    ctx.font = '10px monospace';

    const x = 5;
    const buttons: string[] = stateHelper.buttons.map((b) => b.toFixed(1));
    const axes: string[] = stateHelper.axes.map((b) => b.toFixed(1));
    const directionsString: string = JSON.stringify(directions);

    ctx.fillText(`State: ${stateHelper.state}`, x, 10);
    ctx.fillText(`Sent: ${stateHelper.sent}`, x, 20);
    ctx.fillText(`State: ${stateHelper.keys.join('|')}`, x, 30);
    ctx.fillText(`Controllers: ${stateHelper.controllers.join('|')}`, x, 40);
    ctx.fillText(`Buttons: ${buttons.join('|')}`, 5, 50);
    ctx.fillText(`Axes: ${axes.join('|')}`, 5, 60);
    ctx.fillText(`Game focused: ${stateHelper.gameFocus}`, 5, 70);
    ctx.fillText(`Directions: ${directionsString}`, 5, 80);
  }
}
