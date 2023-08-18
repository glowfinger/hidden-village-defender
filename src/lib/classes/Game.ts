import Input from "$lib/classes/input/Input";
import Player from "$lib/classes/player/Player";

export default class Game {

  private w: number;
  private h: number;
  focused = true;
  private input: Input;
  private player: Player;


  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.input = new Input(this);
    this.player = new Player();

    addEventListener("focus", () => {
      this.focused = true;
    });

    addEventListener("blur", () => {
      this.focused = false;
    });
  }


  update() {
    this.input.update();
    this.player.update();
  }

  render(ctx: CanvasRenderingContext2D, deltaTime: number): void {



    this.player.render(ctx)
    
  }
}
