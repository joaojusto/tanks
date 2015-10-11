var configs = {
  layoutTemplate: 'mainLayout'
};

var beforeHooks = {
  isLoggedIn: isLoggedIn
};

Router.configure(configs);
Router.onBeforeAction(beforeHooks.isLoggedIn, { except: ['login'] });

function isLoggedIn() {
  if (!Meteor.userId())
    this.render('login');
  else
    this.next();
}

Router.map(function setUpRoutes() {
  this.route('login', {
    path: '/login'
  });

  this.route('logout', {
    action: function() {
      Meteor.logout(function(error) {
        if (!error)
          Router.go('login');
      });
    }
  });

  this.route('home', {
    path: '/',
  });
});
