import InputHandler from "$lib/classes/InputHandler";

export default class Game {

  private input: InputHandler;




  constructor() {




    addEventListener("focus", (event) => {
      console.log(event.type);
    });

    addEventListener("blur", (event) => {
      console.log(event.type);
    });

    this.input = new InputHandler();

  }

  update(ctx: CanvasRenderingContext2D) {


    this.input.update();

    this.draw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D): void {

  }
}
