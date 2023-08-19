import Game from '$lib/classes/Game';
import Debug from '$lib/classes/Debug';

export default function renderCanvas(canvas: HTMLCanvasElement): void {
  if (canvas === null) {
    return;
  }
  canvasInit(canvas);

  const game = new Game(canvas.width, canvas.height);
  const debug: Debug = new Debug(true);

  const ctx: CanvasRenderingContext2D = canvas.getContext(
    '2d',
  ) as unknown as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = false;

  let lastTime = 0;

  animate(0);

  function animate(timestamp: number) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.fillStyle = '#ffffff';
    const { x, y } = { x: 0, y: 0 };
    const { w, h } = { w: canvas.width, h: canvas.height };

    ctx.fillRect(x, y, w, h);

    game.update();
    game.render(ctx, deltaTime);

    debug.update(game);
    debug.draw(ctx);

    window.requestAnimationFrame(animate);
  }
}

function canvasInit(canvas: HTMLCanvasElement) {
  canvas.width = 640;
  canvas.height = 360;
}
