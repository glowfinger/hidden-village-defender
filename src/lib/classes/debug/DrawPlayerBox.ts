import drawDebugBox from './DrawDebugBox.js';
import type DebugBox from '$lib/classes/debug/DebugBox';

const COLOUR = 'purple';
const NAME = 'Player';

export default function drawPlayerBox(ctx: CanvasRenderingContext2D, box: DebugBox) {
  if (!box) {
    return;
  }
  drawDebugBox(ctx, box, COLOUR, NAME);
}
