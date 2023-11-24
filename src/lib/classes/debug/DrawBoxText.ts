import type DebugBox from '$lib/classes/debug/DebugBox';

const FONT = 'monospace'
const FONT_SIZE = 10
const FONT_OFFSET = 2

export default function drawBoxText (ctx: CanvasRenderingContext2D, box: DebugBox, colour: string, name: string) {
  const text = `x: ${box.x}, y:  ${box.y}, w:  ${box.w}, h:  ${box.h}`
  ctx.fillStyle = colour
  ctx.font = `${FONT_SIZE}px ${FONT}`

  ctx.fillText(name, box.x + FONT_OFFSET, box.y + FONT_SIZE + FONT_OFFSET)
  ctx.fillText(text, box.x + FONT_OFFSET, box.y + FONT_SIZE + FONT_SIZE + FONT_OFFSET)
}
