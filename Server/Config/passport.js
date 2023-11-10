import passport from "passport";
import local from "passport-local";
import { Users } from "../Models/User.js";

const localStrategy = local.Strategy;

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "pwd",
    },
    (email, pwd, done) => {
      Users.findOne({ email, pwd })
        .then((data) => {
          if (!data) {
            Customers.findOne({ email, pwd }).then((data) => {
              if (!data) {
                done(null, false, { message: "Not found", stataus: 401 });
                return;
              }
              console.log(data);
              done(null, data);
            });
            return;
          }
          console.log("Customer ", data);
          done(null, data);
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
