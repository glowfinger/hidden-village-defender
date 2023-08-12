import playerConfigModel from "./PlayerConfigModel";
import playerVelocityManager from "$lib/PlayerVelocityManager";
import keyDownListener from "$lib/listeners/keyboard/KeyDownListener";
import keyUpListener from "$lib/listeners/keyboard/KeyUpListener";
import directions from "$lib/classes/DirectionModel";
import gamepadListener from "$lib/listeners/GamepadListener";
import stateHelper from "$lib/StateHelper";
export default function renderCanvas(
  canvas: HTMLCanvasElement
): void {


  const player = playerConfigModel.one

  let controllerIndex: number | null;
  if (canvas === null) {
    console.log('canvas not loaded')
    return;
  }

  canvas.width = 640;
  canvas.height = 360;

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

    ctx.fillStyle = '#000';
    ctx.font = "20px serif";
    ctx.fillText(`State: ${stateHelper.state}`, 5, 25)
    ctx.fillText(`Sent: ${stateHelper.sent}`, 5, 55)

    window.requestAnimationFrame(() => animate(canvas, ctx))
  }

  window.addEventListener('keydown', keyDownListener)

  window.addEventListener('keyup', keyUpListener)

}
