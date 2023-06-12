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
exports.loginDelivery = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const connection_1 = require("../../../connection/connection");
const passport_local_1 = require("passport-local");
const bcrypt_1 = require("bcrypt");
const localDelivery = new passport_local_1.Strategy({ usernameField: "email" }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const distributorsRef = connection_1.db.collection("distributors");
        const snapshot = yield distributorsRef.where("email", "==", email).get();
        if (snapshot.empty) {
            return done(null, false, { message: "Invalid credentials" });
        }
        const distributorDoc = snapshot.docs[0];
        const distributor = distributorDoc.data();
        const passwordMatch = (0, bcrypt_1.compareSync)(password, distributor.password);
        if (!passwordMatch) {
            return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, distributor);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.use("localDelivery", localDelivery);
passport_1.default.serializeUser((distributor, done) => {
    done(null, distributor.email);
});
passport_1.default.deserializeUser((email, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const distributorsRef = connection_1.db.collection("distributors");
        const snapshot = yield distributorsRef.where("email", "==", email).get();
        if (snapshot.empty) {
            return done(null, false);
        }
        const distributorDoc = snapshot.docs[0];
        const distributor = distributorDoc.data();
        return done(null, distributor);
    }
    catch (error) {
        return done(error);
    }
}));
const loginDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("localDelivery", (err, distributor) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        if (!distributor) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        req.logIn(distributor, (err) => {
            if (err) {
                return res.status(500).json(err);
            }
            const jwt = jsonwebtoken_1.default;
            const secretKey = "mySecretKey";
            const token = jwt.sign({ email: distributor.email }, secretKey);
            return res.json({ token });
        });
    })(req, res);
});
exports.loginDelivery = loginDelivery;
