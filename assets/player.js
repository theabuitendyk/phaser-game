function createPlayer() {
  player = game.add.sprite(370, 50, 'cat');

  game.physics.arcade.enable(player);

  player.body.collideWorldBounds = true;

  player.animations.add('left');
  player.animations.add('right');

  cursors = game.input.keyboard.createCursorKeys();
}

function playerMovement() {
  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    player.body.velocity.x = (-200 - playerSpeed);

    player.animations.play('left');
  } else if (cursors.right.isDown) {
    player.body.velocity.x = (200 + playerSpeed);

    player.animations.play('right');
  } else {
    player.animations.stop();
  }
}