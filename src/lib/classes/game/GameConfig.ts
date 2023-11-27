import { AUTO } from 'phaser';
import PhysicsConfig from './PhysicsConfig';
import GameScene from '../scenes/GameScene';
import SplashScene from '../scenes/SplashScene';
import StartScene from '../scenes/StartScene';

const GameConfig: Phaser.Types.Core.GameConfig = {
  banner: false,
  parent: 'game-holder',
  mode: Phaser.Scale.FIT,
  type: AUTO,
  width: 640,
  height: 360,
  zoom: 2,
  physics: PhysicsConfig,
  input: {
    gamepad: true,
  },
  scene: [SplashScene, StartScene, GameScene],
};

export default GameConfig;
