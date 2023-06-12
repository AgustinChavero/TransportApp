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
exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const connection_1 = require("../../../connection/connection");
const passport_local_1 = require("passport-local");
const bcrypt_1 = require("bcrypt");
const http_errors_1 = __importDefault(require("http-errors"));
const userStretegy = new passport_local_1.Strategy({ usernameField: "email" }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersRef = connection_1.db.collection("users");
        const snapshot = yield usersRef.where("email", "==", email).get();
        if (snapshot.empty) {
            return done(null, false, { message: "Invalid credentials" });
        }
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        const passwordIsValid = (0, bcrypt_1.compareSync)(password, user.password);
        if (!passwordIsValid) {
            return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.use("userStretegy", userStretegy);
passport_1.default.serializeUser((User, done) => {
    done(null, User.email);
});
passport_1.default.deserializeUser((email, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersRef = connection_1.db.collection("users");
        const snapshot = yield usersRef.where("email", "==", email).get();
        if (snapshot.empty) {
            return done(null, false);
        }
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
})); //todo esto despues se hara un middlware de auth de passport
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("userStretegy", (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            throw (0, http_errors_1.default)(404, err);
        }
        if (!user) {
            throw (0, http_errors_1.default)(404, "Usuario no encontrado");
        }
        try {
            const userSnapshot = yield connection_1.db.collection("users").where("email", "==", user.email).get();
            if (userSnapshot.empty) {
                throw (0, http_errors_1.default)(404, "Usuario no encontrado");
            }
            const userData = userSnapshot.docs[0].data();
            const userId = userSnapshot.docs[0].id;
            const jwt = jsonwebtoken_1.default;
            const secretKey = "mySecretKey"; // Cambiar por una clave secreta segura y única
            const token = jwt.sign({ email: user.email }, secretKey);
            return res.json({ token, user: Object.assign(Object.assign({}, userData), { id: userId }) });
        }
        catch (error) {
            next(error);
        }
    }))(req, res);
});
exports.loginUser = loginUser;
