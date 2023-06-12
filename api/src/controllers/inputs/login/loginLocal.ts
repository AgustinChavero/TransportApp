import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import passport from "passport";
import { db } from "../../../connection/connection";
import { Strategy } from "passport-local";
import { compareSync } from "bcrypt";
import { Local } from "../../../schema/local";

const localStrategy = new Strategy({ usernameField: "email" }, async (email, password, done) => {
  try {
    const localsRef = db.collection("locals");
    const snapshot = await localsRef.where("email", "==", email).get();
    if (snapshot.empty) {
      return done(null, false, { message: "Invalid credentials" });
    }
    const localDoc = snapshot.docs[0];
    const local = localDoc.data();
    const passwordIsValid = compareSync(password, local.password);
    if (!passwordIsValid) {
      return done(null, false, { message: "Invalid credentials" });
    }
    return done(null, local);
  } catch (error) {
    return done(error);
  }
});
passport.use("localStrategy", localStrategy);

passport.serializeUser((Local: Local, done) => {
  done(null, Local.email);
});

passport.deserializeUser(async (email: string, done) => {
  try {
    const localsRef = db.collection("locals");
    const snapshot = await localsRef.where("email", "==", email).get();
    if (snapshot.empty) {
      return done(null, false);
    }
    const localDoc = snapshot.docs[0];
    const local = localDoc.data();
    return done(null, local);
  } catch (error) {
    return done(error);
  }
}); //todo esto despues se hara un middlware de auth de passport

export const loginLocal = async (req: Request, res: Response): Promise<void> => {
  passport.authenticate("localStrategy", (err: Error, local: Local) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!local) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.logIn(local, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      const jwt = jsonwebtoken;
      const secretKey = "mySecretKey"; // despues se cambiara por otra secrekey bien elaborada y especial para local
      const token = jwt.sign({ email: local.email }, secretKey);
      return res.status(200).json({ token });
    });
  })(req, res);
};
