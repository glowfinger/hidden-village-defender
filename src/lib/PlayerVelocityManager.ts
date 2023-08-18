import type Player from "$lib/classes/player/Player";
import type InputDirections from "$lib/classes/input/InputDirections";

export default function playerVelocityManager(player: Player, directions: InputDirections): void {


  let velocity = 10

  const decreaseVelocity = 2;



  if (directions.left) {
    if (player.velocity <= 0 && player.velocity > -velocity) {
      player.velocity = player.velocity - decreaseVelocity
    }
    if (player.velocity > 0) {
      player.velocity = player.velocity - decreaseVelocity
    }

  } else if (directions.right) {
    if (player.velocity >= 0 && player.velocity < velocity) {
      player.velocity = player.velocity + decreaseVelocity
    }
    if (player.velocity < 0) {
      player.velocity = player.velocity + decreaseVelocity
    }

  } else {
    if (player.velocity > 0) {
      player.velocity = player.velocity - decreaseVelocity
    }
    if (player.velocity < 0) {
      player.velocity = player.velocity + decreaseVelocity
    }
  }


}
