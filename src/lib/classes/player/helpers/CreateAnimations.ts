function createAnimation(sprite: Phaser.Physics.Arcade.Sprite) {
  sprite.anims.create({
    key: 'idle',
    frames: sprite.anims.generateFrameNumbers('sprite', {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  sprite.anims.create({
    key: 'walking',
    frames: sprite.anims.generateFrameNumbers('sprite-walking', {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });

  sprite.anims.create({
    key: 'running',
    frames: sprite.anims.generateFrameNumbers('sprite-walking', {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });

  sprite.anims.create({
    key: 'falling',
    frames: sprite.anims.generateFrameNumbers('sprite-falling', {
      start: 0,
      end: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });

  sprite.anims.create({
    key: 'jumping',
    frames: sprite.anims.generateFrameNumbers('sprite-jumping', {
      start: 0,
      end: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
}

export default createAnimation;
