import { AUTO } from 'phaser';
import PhysicsConfig from '$lib/phaser/game/PhysicsConfig';

const GameConfig: Phaser.Types.Core.GameConfig = {
  banner: false,
  parent: 'game-holder',
  type: AUTO,
  width: 640,
  height: 360,
  zoom: 2,
  physics: PhysicsConfig,
  input: {
    gamepad: true,
  },
};

export default GameConfig;
