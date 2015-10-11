Tanks = Tanks || {};
var lobyId;
var profile = new ReactiveVar();
var gameRunning = false;

Template.home.onCreated(function() {
  var peer = new Peer({key: 'lwjd5qra8257b9'});
  Tanks.peer = peer;
  Tanks.host = false;
})

Template.home.onRendered(function() {
  setTimeout(function() {
    Tanks.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', {
     preload: Tanks.preloader, create: Tanks.create, update: Tanks.update
    });
  }, 500)
});

Template.home.onDestroyed(function() {
  console.log('remove');
  Loby.remove(lobyId);
})
