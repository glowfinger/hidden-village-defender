import directions from "$lib/classes/DirectionModel";

export default function gamepadListener(gamepad: Readonly<Gamepad> | null): void {

  if(gamepad === null) {
    return;
  }

  const leftHA: number = gamepad.axes[0]

  const slowBoundary = 0.05
  const fastBoundary = 0.5;

  if (leftHA > -slowBoundary && leftHA < slowBoundary) {
    directions.left = false;
    directions.right = false;
    directions.slow = false;
  } else if (leftHA <= -slowBoundary && leftHA > -fastBoundary) {
    directions.left = true;
    directions.right = false;
    directions.slow = true;
  } else if (leftHA <= -fastBoundary && leftHA >= -1.0) {
    directions.left = true;
    directions.right = false;
    directions.slow = false;
  } else if (leftHA >= slowBoundary && leftHA < fastBoundary) {
    directions.left = false;
    directions.right = true;
    directions.slow = true;
  } else if (leftHA >= fastBoundary && leftHA <= 1.0) {
    directions.left = false;
    directions.right = true;
    directions.slow = false;
  }

}
