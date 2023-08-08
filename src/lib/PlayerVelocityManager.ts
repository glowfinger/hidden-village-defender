import type Player from "$lib/classes/Player";
import type Directions from "$lib/interfaces/Directions";

export default function playerVelocityManager(player: Player, directions: Directions): void {


  let velocity = 10

  const decreaseVelocity = 2;


  if (directions.slow) {
    velocity = 2
  }

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
