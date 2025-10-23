import { Strategy as localStrategy } from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { User } from "../model/user";
import { Role } from "../types/role";
import { JWT_SECRET_KEY } from "../config";
import { PassportStatic } from "passport";
import { Types } from "mongoose";
//This verifies that the token sent by the user is valid



module.exports = function(passport:PassportStatic) {
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: JWT_SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          const { user_id } = token;
          const user = await User.findById(user_id);
          if (!user) return done(null, false, "User not found");
          //Pass the user details to the next middleware
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "signUp",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
    
          
          const user = await User.findOne({ email: email.toLowerCase() });
          if (user) {
            return done(null, false, { message: "Email is already taken" });
          }

          // create the user
          const newUser = await User.create({
            email,
            password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role:Types.ObjectId("6448d330febc8c2878fec0b1")
         
          });

         
            await newUser.save()
    
        
          return done(null, newUser);

        } catch (error) {
          done(error);
        }
      }
    )
  );

  
 passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user, { message: "Logged in successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

};
