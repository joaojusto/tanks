Loby = new Mongo.Collection('loby');

Meteor.methods({
  'clearLoby': function(username) {
    Loby.remove({username: username})
  }
});
