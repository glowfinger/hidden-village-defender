import type DebugBox from '$lib/classes/debug/DebugBox';
import drawDebugBox from '$lib/classes/debug/DrawDebugBox';

export function drawPlatformBox (ctx: CanvasRenderingContext2D, box: DebugBox) {
  if (!box) {
    return
  }

  const colour = 'red'
  const name = 'Platform'

  drawDebugBox(ctx, box, colour, name)
}
