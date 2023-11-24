import type DebugBox from '$lib/classes/debug/DebugBox';
import drawDebugBox from '$lib/classes/debug/DrawDebugBox';

export default function drawFrameBox (ctx: CanvasRenderingContext2D, box: DebugBox) {
  if (!box) {
    return
  }

  const colour = 'blue'
  const name = 'Frame'

  drawDebugBox(ctx, box, colour, name)
}

