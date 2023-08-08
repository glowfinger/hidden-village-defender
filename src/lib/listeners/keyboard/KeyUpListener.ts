import directions from "$lib/classes/DirectionModel";

export default function keyUpListener(event: KeyboardEvent) {
  switch (event.key) {
    case 'a':
      directions.left = false
      break
    case 'd':
      directions.right = false
      break
    case 'w':
      directions.up = false
      break
    case 's':
      directions.down = false
      break
    case 'Shift':
      directions.slow = false
      break
  }
}
