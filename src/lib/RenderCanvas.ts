import Player from "$lib/classes/Player";
import playerVelocityManager from "$lib/PlayerVelocityManager";

import keyDownListener from "$lib/listeners/keyboard/KeyDownListener";
import keyUpListener from "$lib/listeners/keyboard/KeyUpListener";
import directions from "$lib/classes/DirectionModel";
import gamepadListener from "$lib/listeners/GamepadListener";

const player: Player = new Player();

export default function renderCanvas(
  canvas: HTMLCanvasElement
): void {


  let controllerIndex: number | null;
  if (canvas === null) {
    console.log('canvas not loaded')
    return;
  }

  const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = false;


  window.addEventListener("gamepadconnected", (e) => {
    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index,
      e.gamepad.id,
      e.gamepad.buttons.length,
      e.gamepad.axes.length,
    );

    controllerIndex = e.gamepad.index;
  });


  window.addEventListener("gamepaddisconnected", (e) => {
    console.log(
      "Gamepad disconnected from index %d: %s",
      e.gamepad.index,
      e.gamepad.id,
    );

    controllerIndex = null;
  });


  canvas.width = 640;
  canvas.height = 360;

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

    window.requestAnimationFrame(() => animate(canvas, ctx))
  }

  window.addEventListener('keydown', keyDownListener)

  window.addEventListener('keyup', keyUpListener)

}
