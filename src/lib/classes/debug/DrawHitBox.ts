import drawDebugBox from '$lib/classes/debug/DrawDebugBox';
import type DebugBox from '$lib/classes/debug/DebugBox';

export default function drawHitBox(ctx: CanvasRenderingContext2D, box: DebugBox) {
  if (!box) {
    return;
  }
  const colour = 'yellow';
  const name = 'Hit';

  drawDebugBox(ctx, box, colour, name);
}
