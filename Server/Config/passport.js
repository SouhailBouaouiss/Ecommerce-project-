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
      Users.findOne({ email })
        .then((data) => {
          if (!data) {
            Customers.findOne({ email }).then((data) => {
              if (!data) {
                done(null, false, { message: "Not found", status: 401 });
                return;
              } else {
                Customers.findOne({ email, pwd }).then((data) => {
                  if (!data) {
                    done(null, false, {
                      message: "Wrong password",
                      status: 401,
                    });
                  } else {
                    if (data?.active == false) {
                      done(null, false, {
                        message: "Banned Account",
                        stataus: 401,
                      });
                      return;
                    } else {
                      done(null, data);
                    }
                  }
                });
              }
            });
            return;
          }
          console.log("Customer ", data);
          Users.findOne({ email, pwd }).then((data) => {
            if (!data) {
              done(null, false, {
                message: "Wrong password",
                status: 401,
              });
            } else {
              if (data?.active == false) {
                done(null, false, {
                  message: "Banned Account",
                  stataus: 401,
                });
                return;
              } else {
                done(null, data);
              }
            }
          });
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
