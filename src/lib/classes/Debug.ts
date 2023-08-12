import stateHelper from "$lib/StateHelper";

export default class Debug {

  debug: boolean

  constructor(debug = false) {
    this.debug = debug;
  }

  update(ctx: CanvasRenderingContext2D) {
    if (!this.debug) {
      return;
    }

    this.draw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#000';
    ctx.font = "10px monospace";

    const x = 5;
    const buttons: string[] = stateHelper.buttons.map(b => b.toFixed(1))
    const axes: string[] = stateHelper.axes.map(b => b.toFixed(1))

    ctx.fillText(`State: ${stateHelper.state}`, x, 10)
    ctx.fillText(`Sent: ${stateHelper.sent}`, x, 20)
    ctx.fillText(`State: ${stateHelper.keys.join('|')}`, x, 30)
    ctx.fillText(`Controllers: ${stateHelper.controllers.join('|')}`, x, 40)
    ctx.fillText(`Buttons: ${buttons.join('|')}`, 5, 50)
    ctx.fillText(`Axes: ${axes.join('|')}`, 5, 60)
  }
}
