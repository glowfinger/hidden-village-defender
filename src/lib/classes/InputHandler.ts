import keyDownListener from "$lib/listeners/keyboard/KeyDownListener";
import keyUpListener from "$lib/listeners/keyboard/KeyUpListener";


export default class InputHandler {


  private keys: string[];

  constructor() {

    window.addEventListener('keydown', (e) => {
      console.log(e.type, e.key)
    });

    window.addEventListener('keyup', (e) => {
      console.log(e.type, e.key)
    });

    window.addEventListener("gamepadconnected", (e) => {
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length,
      );

    });


    window.addEventListener("gamepaddisconnected", (e) => {
      console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id,
      );

    });
  }

}
