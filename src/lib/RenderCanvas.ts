import playerConfigModel from "./PlayerConfigModel";
import playerVelocityManager from "$lib/PlayerVelocityManager";
import directions from "$lib/classes/DirectionModel";
import gamepadListener from "$lib/listeners/GamepadListener";
import Game from "$lib/classes/Game";
import Debug from "$lib/classes/Debug";

export default function renderCanvas(
  canvas: HTMLCanvasElement
): void {


  const game = new Game()
  const debug: Debug = new Debug(true);
  const player = playerConfigModel.one

  let controllerIndex: number | null;
  if (canvas === null) {
    return;
  }

  canvas.width = 640;
  canvas.height = 360;

  const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = false;


  animate(canvas, ctx)


  function animate(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {

    ctx.fillStyle = '#ffffff';
    const {x, y} = {x: 0, y: 0};
    const {w, h} = {w: canvas.width, h: canvas.height};

    ctx.fillRect(x, y, w, h);


    if (controllerIndex !== null && controllerIndex > -1) {
      gamepadListener(navigator.getGamepads()[controllerIndex])
    }

    playerVelocityManager(player, directions)
    player.update(ctx);

    game.update(ctx);
    debug.update(ctx)

    window.requestAnimationFrame(() => animate(canvas, ctx))
  }
}
