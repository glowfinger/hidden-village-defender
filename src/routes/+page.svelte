<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Game } from 'phaser';
  import GameConfig from '$lib/phaser/game/GameConfig';
  import gameSceneConfig from '$lib/phaser/game/GameSceneConfig';

  let game: Game;

  onMount(() => {
    game = new Game(GameConfig);
    gameSceneConfig(game);
  });
  onDestroy(() => {
    game.destroy(true, false);
  });
</script>

<div id="game-holder" class="flex justify-center bg-slate-500" />
