Accounts.validateLoginAttempt(function(options) {
  var user = Meteor.users.find(options.user._id);

  Loby.remove({username: user.username});

  return true;
});
