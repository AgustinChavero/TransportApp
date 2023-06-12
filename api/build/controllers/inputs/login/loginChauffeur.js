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
exports.loginChauffeur = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const connection_1 = require("../../../connection/connection");
const passport_local_1 = require("passport-local");
const bcrypt_1 = require("bcrypt");
const localChauffeur = new passport_local_1.Strategy({ usernameField: "email" }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chauffeurRef = connection_1.db.collection("chauffeur");
        const snapshot = yield chauffeurRef.where("email", "==", email).get();
        if (snapshot.empty) {
            return done(null, false, { message: "Credenciales invalidas" });
        }
        const chauffeurDoc = snapshot.docs[0];
        const chauffeur = chauffeurDoc.data();
        const passwordIsValid = (0, bcrypt_1.compareSync)(password, chauffeur.password);
        if (!passwordIsValid) {
            return done(null, false, { message: "Credenciales invalidas" });
        }
        return done(null, chauffeur);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.use("localChauffeur", localChauffeur);
passport_1.default.serializeUser((Chauffeur, done) => {
    done(null, Chauffeur.email);
});
passport_1.default.deserializeUser((email, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chauffeurRef = connection_1.db.collection("chauffeur");
        const snapshot = yield chauffeurRef.where("email", "==", email).get();
        if (snapshot.empty) {
            return done(null, false);
        }
        const chauffeurDoc = snapshot.docs[0];
        const chauffeur = chauffeurDoc.data();
        return done(null, chauffeur);
    }
    catch (error) {
        return done(error);
    }
})); //todo esto despues se hara un middlware de auth de passport
const loginChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("localChauffeur", (err, chauffeur) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!chauffeur) {
            return res.status(401).json({ message: "Credenciales invalidas" });
        }
        req.logIn(chauffeur, (err) => {
            if (err) {
                return res.status(500).json(err);
            }
            const jwt = jsonwebtoken_1.default;
            const secretKey = "mySecretKey"; // despues se cambiara por otra secrekey bien elaborada y especial para user
            const token = jwt.sign({ email: chauffeur.email }, secretKey);
            return res.json({ token });
        });
    })(req, res);
});
exports.loginChauffeur = loginChauffeur;
