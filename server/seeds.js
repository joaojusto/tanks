if (!Meteor.users.find().fetch().length) {
  Accounts.createUser({
    username: 'justo',
    password: '12345678',
    email: 'jpjustonunes@gmail.com',
    profile: {}
  });

  Accounts.createUser({
    username: 'gabriel',
    password: '12345678',
    email: 'gabriel@gmail.com',
    profile: {}
  });
}
