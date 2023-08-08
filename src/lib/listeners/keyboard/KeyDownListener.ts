import directions from "$lib/classes/DirectionModel";
export default function keyDownListener(event: KeyboardEvent) {

    switch (event.key) {
      case 'a':
        directions.left = true
        break
      case 'd':
        directions.right = true
        break
      case 'w':
        directions.up = true
        break
      case 's':
        directions.down = true
        break
      case 'Shift':
        directions.slow = true
        break
    }
}
