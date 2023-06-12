"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginUser_1 = require("../../controllers/inputs/login/loginUser");
const loginChauffeur_1 = require("../../controllers/inputs/login/loginChauffeur");
const loginDelivery_1 = require("../../controllers/inputs/login/loginDelivery");
const loginLocal_1 = require("../../controllers/inputs/login/loginLocal");
const connection_1 = require("../../connection/connection");
const loginGoogle_1 = __importDefault(require("../../controllers/inputs/login/loginGoogle"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_microsoft_1 = require("passport-microsoft");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Autenticación realizada");
});
router.post("/user", loginUser_1.loginUser);
router.post("/chauffeur", loginChauffeur_1.loginChauffeur);
router.post("/dealer", loginDelivery_1.loginDelivery);
router.post("/local", loginLocal_1.loginLocal);
router.use("/auth/google", loginGoogle_1.default);
// auth de facebook
passport_1.default.use(new passport_facebook_1.default({
    clientID: "1965817520430450",
    clientSecret: "eb27ee0a9ce5843d7ecc15b1ae0d2e93",
    callbackURL: `${process.env.BACK_URL}/login/oauth2/redirect/facebook`,
    profileFields: ["id", "displayName", "email"],
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield connection_1.db.collection("authWithFacebook").doc(profile.id).get(); // esto busca el user en "authWithFacebook"
            if (!user.exists) {
                user = { email: profile.emails[0].value, name: profile.displayName };
                yield connection_1.db.collection("authWithFacebook").doc(profile.id).set(user);
            }
            else {
                user = {
                    name: user._fieldsProto.name.stringValue,
                    email: user._fieldsProto.email.stringValue,
                };
            }
            cb(null, user);
        }
        catch (error) {
            console.log(error);
            return cb(error);
        }
    });
}));
router.get("/auth/facebook", passport_1.default.authenticate("facebook"));
router.get("/oauth2/redirect/facebook", passport_1.default.authenticate("facebook", { failureRedirect: "/login", failureMessage: true }), (req, res) => {
    const { user } = req;
    const token = jsonwebtoken_1.default.sign(user, "clavemegasecreta");
    // !!IMPORTANTE: en la url aparece un "#_=_"  al final que no es del token
    res.redirect(`${process.env.FRONT_URL}/login}?token=${token}`);
});
//Auth de Microsoft
passport_1.default.use(new passport_microsoft_1.Strategy({
    //Hay que registrar la app en Microsoft Azure para obtener los datos
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: `${process.env.BACK_URL}/auth/microsoft/callback`,
    scope: ["user.read", "mail.read", "offline_access"],
    authorizationURL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile);
}
/*
function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ userId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
*/
));
router.get("/microsoft", passport_1.default.authenticate("auth-microsoft", {
    prompt: "select_account",
    session: false,
}));
router.get("/microsoft/callback", passport_1.default.authenticate("auth-microsoft", {
    failureRedirect: "/auth/microsoft",
    session: false,
}), (req, res) => {
    res.json(req.user);
});
exports.default = router;
