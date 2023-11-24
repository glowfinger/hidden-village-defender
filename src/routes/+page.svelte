<script lang="ts">
  import { onMount } from 'svelte';
  import renderCanvas from '$lib/RenderCanvas';
  import playerSpriteData from '$lib/classes/player/PlayerSpriteData';

  let canvas: HTMLCanvasElement;

  function addImageProcess(data) {
    return new Promise((resolve, reject) => {
      data.image = new Image();
      data.image.onload = () => resolve(data.image.height);
      data.image.onerror = reject;
      data.image.src = data.src;
    });
  }

  onMount(async () => {
    await Promise.all(playerSpriteData.map(addImageProcess));
    renderCanvas(canvas);
  });
</script>

<div class="flex h-screen justify-center">
  <canvas bind:this={canvas} class="aspect-video object-fill p-4" />
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.black);
  }
</style>
