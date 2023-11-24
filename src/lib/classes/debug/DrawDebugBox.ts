import type DebugBox from '$lib/classes/debug/DebugBox';
import drawBoxText from '$lib/classes/debug/DrawBoxText';
import drawBox from '$lib/classes/debug/DrawBox';

export default function drawDebugBox(ctx: CanvasRenderingContext2D, box: DebugBox, colour: string, name: string) {
  drawBoxText(ctx, box, colour, name);
  drawBox(ctx, box, colour);
}
