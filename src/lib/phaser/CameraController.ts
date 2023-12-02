export default class CameraController {
  camera?: Phaser.Cameras.Scene2D.Camera;
  sprite?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(
    camera: Phaser.Cameras.Scene2D.Camera,
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  ) {
    this.camera = camera;
    this.camera.setBounds(0, 0, 3240, 360);
    this.camera.fadeIn(600);
    this.camera.startFollow(sprite, true, 1, 1, 0, 0);
  }
}
