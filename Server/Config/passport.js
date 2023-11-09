import passport from "passport";
import local from "passport-local";
import User from "../Models/User";

const localStrategy = local.Strategy;

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "pwd",
    },
    (email, pwd, done) => {
      User.findOne({ email, pwd })
        .then((data) => {
          if (!data) {
            done(null, false);
            return;
          }
          console.log(data);
          done(null, data);
        })
        .catch((err) => {
          done(null, false);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
