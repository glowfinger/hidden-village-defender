const frameRate = 12;

function createAnimation(sprite: Phaser.Physics.Arcade.Sprite) {
  sprite.anims.create({
    key: 'idle',
    frames: sprite.anims.generateFrameNumbers('sprite'),
    frameRate: frameRate,
    repeat: -1,
  });

  sprite.anims.create({
    key: 'walking',
    frames: sprite.anims.generateFrameNumbers('sprite-walking'),
    frameRate: frameRate,
    repeat: -1,
  });

  sprite.anims.create({
    key: 'running',
    frames: sprite.anims.generateFrameNumbers('sprite-running'),
    frameRate: frameRate,
    repeat: -1,
  });

  sprite.anims.create({
    key: 'falling',
    frames: sprite.anims.generateFrameNumbers('sprite-falling'),
    frameRate: frameRate,
    repeat: -1,
  });

  sprite.anims.create({
    key: 'jumping',
    frames: sprite.anims.generateFrameNumbers('sprite-jumping'),
    frameRate: frameRate,
    repeat: -1,
  });

  sprite.anims.create({
    key: 'crouching',
    frames: sprite.anims.generateFrameNumbers('sprite-crouching'),
    repeat: 0,
  });

  sprite.anims.create({
    key: 'casting',
    frames: sprite.anims.generateFrameNumbers('sprite-casting'),
    frameRate: frameRate,
    repeat: -1,
  });

  sprite.anims.create({
    key: 'technique',
    frames: sprite.anims.generateFrameNumbers('sprite-technique'),
    frameRate: frameRate,
    repeat: 0,
  });
}

export default createAnimation;
