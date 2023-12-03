import GameScene from '$lib/phaser/scenes/GameScene';
import GameUIScene from '$lib/phaser/scenes/GameUIScene';
import LoadingScene from '$lib/phaser/scenes/LoadingScene';
import SplashScene from '$lib/phaser/scenes/SplashScene';
import StartScene from '$lib/phaser/scenes/StartScene';

export default function gameSceneConfig(game: Phaser.Game) {
  game.scene.add('LoadingScene', LoadingScene);
  game.scene.add('SplashScene', SplashScene);
  game.scene.add('StartScene', StartScene);
  game.scene.add('GameScene', GameScene);
  game.scene.add('GameUIScene', GameUIScene);
  game.scene.start('GameScene');
  game.scene.start('GameUIScene');
  // game.scene.start('LoadingScene');
}
