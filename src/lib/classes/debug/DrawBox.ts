import type DebugBox from '$lib/classes/debug/DebugBox';

export default function drawBox(ctx: CanvasRenderingContext2D, box: DebugBox, colour: string) {
  ctx.strokeStyle = colour;
  ctx.strokeRect(box.x, box.y, box.w, box.h);
}
