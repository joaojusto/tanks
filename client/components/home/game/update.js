Tanks.update = function() {
  var game = Tanks.game;
  var player = Tanks.objects.player;
  var cursors = Tanks.objects.cursors;

  if (player && cursors)
    updatePlayer();
}

function updatePlayer() {
  var player = Tanks.objects.player;
  var cursors = Tanks.objects.cursors;

  if (cursors.left.isDown) {
    player.body.rotateLeft(100);
    Tanks.conn.send({type: 'rotateLeft', val: 100});
  } else if (cursors.right.isDown) {
    player.body.rotateRight(100);
    Tanks.conn.send({type: 'rotateRight', val: 100});
  } else {
    player.body.setZeroRotation();
    Tanks.conn.send({type: 'setZeroRotation'});
  }

  if (cursors.up.isDown) {
    player.body.thrust(400);
    Tanks.conn.send({type: 'thrust', val: 400});
  } else if (cursors.down.isDown) {
    player.body.thrust(400);
    Tanks.conn.send({type: 'reverse', val: 400});
    player.body.reverse(400);
  }

  Tanks.conn.send({
    position: {
      x: player.body.data.position[0],
      y: player.body.data.position[1]
    },
    velocity: {
      x: player.body.data.velocity[0],
      y: player.body.data.velocity[0]
    }
  });
}
