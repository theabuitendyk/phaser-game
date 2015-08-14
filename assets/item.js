function createGroups() {
  items = game.add.group();
  hearts = game.add.group();
  speeds = game.add.group();

  // Parameters: (game, parent, name, addToStage, enableBody, physicsBodyType)
  ballsOfYarn = game.add.group(undefined, 'yarn', undefined, true);
  mice = game.add.group(undefined, 'mouse', undefined, true);
  zeds = game.add.group(undefined, 'zed', undefined, true);
  plusSigns = game.add.group(undefined, 'plus', undefined, true);
  minusSigns = game.add.group(undefined, 'minus', undefined, true);
  lives = game.add.group(undefined, 'life', undefined, true);
  deaths = game.add.group(undefined, 'death', undefined, true);

  // Nested groups to randomize which type of sprite is created
  // See addSprite
  items.add(ballsOfYarn);
  items.add(mice);
  items.add(zeds);

  speeds.add(plusSigns);
  speeds.add(minusSigns);

  hearts.add(lives);
  hearts.add(deaths);
}

function addSprite() {

  num = Math.random();

  if (num < 0.1) {
    type = lives;
  }
  else if (num < 0.4) {
    type = deaths;
  }
  else if (num < 0.8) {
    type = Phaser.Math.getRandom(items.children);
  }
  else {
    type = Phaser.Math.getRandom(speeds.children);
  }

  sprite = type.create(rand_interval(), 600, type.name);

  sprite.body.velocity.y = spriteSpeed;

  sprite.events.onOutOfBounds.add(destroySprite, this);
}

function rand_interval() {
  // Get random x coordinate in multiples of 50 for evenly spaced sprites
  // Math.round((Math.random()*(max-min)+min)/multiple)*multiple
  return Math.round((Math.random()*(775-25)+25)/50)*50;
}

function destroySprite(sprite) {
  sprite.destroy();
}

function collectItem(player, item) {

  // Check item group name to determine points
  if (item.parent.name == 'yarn') {
    addToScore(100);
  } else if (item.parent.name == 'mouse') {
    addToScore(200);
  } else {
    addToScore(500);
  }

  item.destroy();
}

function addToScore(points) {
  score += points;
  scoreText.text = 'Score: ' + score;
}

function changePlayerSpeed(player, speed) {

  // Check playerSpeed maxes at 100
  if (speed.parent.name == 'plus' & playerSpeed < 100) { 
    playerSpeed += 10;    
  } else if (playerSpeed > 10) {
    playerSpeed -= 10;
  }

  speed.destroy();
}

function updateLives(player, heart) {

  if (heart.parent.name == 'life' & playerLives < 9) {
    playerLives += 1;
  } else if (playerLives > 0) {
    playerLives -= 1;
  }

  playerLivesText.text = 'Lives: ' + playerLives;
  heart.destroy();
}