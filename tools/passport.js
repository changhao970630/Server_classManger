//用于passport验证token的一些配置
const { keys } = require("./config");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const userModal = mongoose.model("user");
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_playload, done) => {
            console.log(jwt_playload);
            userModal.findById(jwt_playload.id).then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
    );
};

