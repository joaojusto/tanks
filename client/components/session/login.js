Template.login.events = {
  'click .login': function(e, tpl) {
    var username = tpl.$('#username').val();
    var password = tpl.$('#password').val();

    Meteor.loginWithPassword(username, password, function(error) {
      if (!error) {
        Router.go('home');
        Materialize.toast('Welcome ' + username, 2000)
      }
      else
        Materialize.toast(error.reason, 2000)
    });
  }
}
