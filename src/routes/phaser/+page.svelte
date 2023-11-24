<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Scene, Game, AUTO } from 'phaser';

  let game: Game;

  const config: Phaser.Types.Core.GameConfig = {
    banner: false,
    parent: 'game-holder',
    mode: Phaser.Scale.FIT,
    type: AUTO,
    width: 640,
    height: 360,
    zoom: 2,
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 100 },
      },
    },
  };

  function update(this: Scene) {}

  function preload(this: Scene) {
    this.load.setBaseURL('https://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  function create(this: Scene) {
    this.add.image(400, 300, 'sky');

    const particles = this.add.particles(0, 0, 'red', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    });

    const logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    particles.startFollow(logo);
  }

  onMount(() => {
    game = new Game(config);
  });
  onDestroy(() => {
    game.destroy(true, false);
  });
</script>

<div id="game-holder" class="flex justify-center bg-slate-500" />
