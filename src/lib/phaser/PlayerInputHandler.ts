import Phaser from 'phaser';

export class PlayerInpuHandler {
  private up: boolean = false;
  private down: boolean = false;
  private left: boolean = false;
  private right: boolean = false;
  private jump: boolean = false;

  constructor() {}

  public update() {
    if (this.scene.input.gamepad.gamepads.length > 0) {
      this.pad = this.scene.input.gamepad.gamepads[0];
    }

    const rightTriggerPressed = this.pad ? this.pad.R2 > 0.1 : false; // adjust the threshold as needed
    const rightClickPressed = this.scene.input.activePointer.rightButtonDown();

    if (this.cursors.left.isDown || (this.pad && this.pad.left)) {
      // handle left
    } else if (this.cursors.right.isDown || (this.pad && this.pad.right)) {
      // handle right
    } else if (this.cursors.up.isDown || this.spaceBar.isDown || (this.pad && this.pad.up)) {
      // handle up
    } else if (this.cursors.down.isDown || (this.pad && this.pad.down)) {
      // handle down
    } else if (this.shiftKey.isDown || rightTriggerPressed || rightClickPressed) {
      // handle shooting
    }
  }
}
