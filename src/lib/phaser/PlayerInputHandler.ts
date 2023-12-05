export class PlayerInpuHandler {
  private up: boolean = false;
  private down: boolean = false;
  private left: boolean = false;
  private right: boolean = false;
  private jump: boolean = false;

  constructor(
    gamePad: Phaser.Types.Input.Gamepad.Pad | undefined,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined,
  ) {}

  public update() {}
}
