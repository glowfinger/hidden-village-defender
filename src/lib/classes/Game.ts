import InputHandler from "$lib/classes/InputHandler";

export default class Game {
  private input: InputHandler;

  constructor() {


    addEventListener("focus", (event) => {
      console.log('YES');
      });

    addEventListener("blur", (event) => {
      console.log('NO');
    });

    this.input = new InputHandler();

  }

}
