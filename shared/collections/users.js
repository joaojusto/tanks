UserSchema = new SimpleSchema({
  username: {
    type: String,
    label: "User name",
    max: 200
  },
  firstName: {
    type: String,
    label: "First Name",
    max: 200
  },
  lastName: {
    type: String,
    label: "Last Name",
    max: 200
  },
  password: {
    type: String,
    label: "Password"
  },
  email: {
    type: String,
    label: "Email"
  }
});
