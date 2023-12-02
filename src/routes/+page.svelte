<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Game } from 'phaser';
  import GameConfig from '$lib/classes/game/GameConfig';
  import gameSceneConfig from '$lib/classes/game/GameSceneConfig';

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
