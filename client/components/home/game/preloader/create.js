Tanks = {};

Tanks.create = function() {
  var game = Tanks.game;
  Tanks.objects = {};

  game.physics.startSystem(Phaser.Physics.P2JS);

  var cursors = game.input.keyboard.createCursorKeys();
  Tanks.objects.cursors = cursors;

  startPeer();
}

function startPeer() {
  Tanks.peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    Tanks.username = Meteor.user().username;
    var userProfile = {
      username: Tanks.username,
      peerId: id
    }

    if (Loby.find().count() < 1) {
      Tanks.host = true;
      Tanks.peer.on('connection', onConnection);
    } else {
      connectToHost()
    }

    Meteor.call('clearLoby', Meteor.user().username, function() {
      lobyId = Loby.insert(userProfile);
    });
  });
}

function onConnection(conn) {
  console.log('connection open host');
  Tanks.conn = conn;

  conn.on('data', updateEnemyInformation);

  startGame();
}

function connectToHost() {
  Loby.find().fetch().forEach(function (user) {
    if (user.username === Meteor.user().username)
      return;

    Tanks.conn = Tanks.peer.connect(user.peerId);

    Tanks.conn.on('open', onConnectionOpenToHost);
  });
}

function onConnectionOpenToHost() {
  console.log('connection open client');

  Tanks.conn.on('data', updateEnemyInformation);

  startGame();
}

function startGame() {
  var game = Tanks.game;

  var player = game.add.sprite(50, 0, 'tankBase');
  game.physics.p2.enable(player);
  Tanks.objects.player = player;

  var enemy = game.add.sprite(300, 0, 'tankBase');
  game.physics.p2.enable(enemy);
  Tanks.objects.enemy = enemy;
}

function updateEnemyInformation(data) {
  if (data.type)
    Tanks.objects.enemy.body[data.type](data.val);
  else {
    Tanks.objects.enemy.body.data.position[0] = data.position.x;
    Tanks.objects.enemy.body.data.position[1] = data.position.y;

    Tanks.objects.enemy.body.data.velocity[0] = data.velocity.x;
    Tanks.objects.enemy.body.data.velocity[1] = data.velocity.y;
  }
}
