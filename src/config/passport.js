import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/user.model.js'; 
import { SECRET_KEY } from '../config/config.js';

const options = {
  jwtFromRequest: (req) => req.cookies.jwt, 
  secretOrKey: SECRET_KEY, 
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    console.log("JWT Payload:", jwt_payload);
    try {
      const user = await User.findById(jwt_payload.id); 
      if (user) {
        return done(null, user); 
      } else {
        return done(null, false); 
      }
    } catch (error) {
      return done(error, false); 
    }
  })
);

const isAuthenticated = passport.authenticate('jwt', { session: false });

export default isAuthenticated;