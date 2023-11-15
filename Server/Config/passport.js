import passport from "passport";
import local from "passport-local";
import { Users } from "../Models/User.js";
import { Customers } from "../Models/Customer.js";

const localStrategy = local.Strategy;

// - Passport has many strategies
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "pwd",
    },
    // req.body.email
    // req.body.pwd
    (email, pwd, done) => {
      Users.findOne({ email })
        .then((data) => {
          if (!data) {
            // User not found
            // Let's see the customers list
            Customers.findOne({ email }).then((data) => {
              if (!data) {
                // Customer not found
                done(null, false, { message: "Not found", status: 401 });
                return;
              } else {
                if (pwd !== data.pwd) {
                  done(null, false, {
                    message: "Wrong password",
                    status: 401,
                  });
                  return;
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
              }
            });
            return;
          }

          // User found
          if (pwd !== data.pwd) {
            done(null, false, {
              message: "Wrong password",
              status: 401,
            });
            return;
          }

          // email & pwd are valid
          if (data?.active == false) {
            // Banned Account
            done(null, false, {
              message: "Banned Account",
              status: 401,
            });
            return;
          } else {
            // Active account
            done(null, data);
          }
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
