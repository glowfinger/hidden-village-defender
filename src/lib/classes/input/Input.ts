import stateHelper from '$lib/StateHelper';
import type Game from '$lib/classes/Game';
import directions from '$lib/classes/input/DirectionModel';
import type InputDirections from '$lib/interfaces/InputDirections';

export default class Input {
  private keys: string[] = [];
  private watchedKeys: string[] = ['Enter', 'Shift', 'j', 'k', 'l', 'i', ' ', 'a', 's', 'd', 'w'];
  private controllers: number[] = [];
  private buttons: number[] = [];
  private axes: number[] = [];

  private game: Game;

  constructor(game: Game) {
    this.game = game;

    this.watchedKeys = this.watchedKeys.map((s) => s.toLowerCase());

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      const key: string = e.key.toLowerCase();
      if (this.watchedKeys.includes(key) && !this.keys.includes(key)) {
        this.keys.push(key);
      }
      stateHelper.keys = this.keys;
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      const key: string = e.key.toLowerCase();
      if (this.watchedKeys.includes(key) && this.keys.includes(key)) {
        const index = this.keys.indexOf(key);
        this.keys.splice(index);
      }
      stateHelper.keys = this.keys;
    });

    window.addEventListener('gamepadconnected', (e: GamepadEvent): void => {
      const index: number = e.gamepad.index;
      if (!this.controllers.includes(index)) {
        this.controllers[index] = index;
      }

      stateHelper.controllers = this.controllers;
    });

    window.addEventListener('gamepaddisconnected', (e: GamepadEvent): void => {
      const index = e.gamepad.index;
      if (this.controllers.includes(index)) {
        delete this.controllers[index];
      }

      stateHelper.controllers = this.controllers;
    });
  }

  update() {
    // TODO multiple controllers will break this
    this.controllers.forEach((index) => {
      const gamepad = navigator.getGamepads()[index];
      if (gamepad === null) {
        return;
      }

      gamepad.buttons.forEach(
        (button: GamepadButton, i: number) => (this.buttons[i] = button.value),
      );
      gamepad.axes.forEach((value: number, i: number) => (this.axes[i] = value));
    });

    directions[0] = updateDirectionButtons(this.axes[0], this.axes[1]);
    directions[0] = updateDirectionButtonsKeys(directions[0], this.keys);

    stateHelper.buttons = this.buttons;
    stateHelper.axes = this.axes;
  }
}

function updateDirectionButtons(horizontal: number, vertical: number) {
  const boundary = 0.25;

  return {
    left: horizontal < -boundary,
    right: horizontal > boundary,
    down: vertical > boundary,
    up: vertical < -boundary,
  };
}

function updateDirectionButtonsKeys(directions: InputDirections, keys: string[]) {

  if(keys.includes('a')) {
    directions.left  =  !directions.left
  }

  if(keys.includes('s')) {
    directions.down  =  !directions.down
  }

  if(keys.includes('d')) {
    directions.right  =  !directions.right
  }

  if(keys.includes('w')) {
    directions.up  =  !directions.up
  }

  return directions;
}
