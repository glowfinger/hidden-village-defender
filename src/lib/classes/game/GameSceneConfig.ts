import GameScene from '../scenes/GameScene';
import GameUIScene from '../scenes/GameUIScene';
import SplashScene from '../scenes/SplashScene';
import StartScene from '../scenes/StartScene';

export default function gameSceneConfig(game: Phaser.Game) {
  game.scene.add('SplashScreen', SplashScene);
  game.scene.add('StartScene', StartScene);
  game.scene.add('GameScene', GameScene);
  game.scene.add('GameUIScene', GameUIScene);
  game.scene.start('GameScene');
  game.scene.start('GameUIScene');
}
