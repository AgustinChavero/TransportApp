import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import passport from "passport";
import { db } from "../../../connection/connection";
import { Strategy } from "passport-local";
import { compareSync } from "bcrypt";
import { Chauffeur } from "../../../schema/chauffeur";

const localChauffeur = new Strategy({ usernameField: "email" }, async (email, password, done) => {
  try {
    const chauffeurRef = db.collection("chauffeur");
    const snapshot = await chauffeurRef.where("email", "==", email).get();
    if (snapshot.empty) {
      return done(null, false, { message: "Credenciales invalidas" });
    }
    const chauffeurDoc = snapshot.docs[0];
    const chauffeur = chauffeurDoc.data();
    const passwordIsValid = compareSync(password, chauffeur.password);
    if (!passwordIsValid) {
      return done(null, false, { message: "Credenciales invalidas" });
    }
    return done(null, chauffeur);
  } catch (error) {
    return done(error);
  }
});

passport.use("localChauffeur", localChauffeur);

passport.serializeUser((Chauffeur: Chauffeur, done) => {
  done(null, Chauffeur.email);
});

passport.deserializeUser(async (email: string, done) => {
  try {
    const chauffeurRef = db.collection("chauffeur");
    const snapshot = await chauffeurRef.where("email", "==", email).get();
    if (snapshot.empty) {
      return done(null, false);
    }
    const chauffeurDoc = snapshot.docs[0];
    const chauffeur = chauffeurDoc.data();
    return done(null, chauffeur);
  } catch (error) {
    return done(error);
  }
}); //todo esto despues se hara un middlware de auth de passport

export const loginChauffeur = async (req: Request, res: Response): Promise<void> => {
  passport.authenticate("localChauffeur", (err: Error, chauffeur: Chauffeur) => {
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
      const jwt = jsonwebtoken;
      const secretKey = "mySecretKey"; // despues se cambiara por otra secrekey bien elaborada y especial para user
      const token = jwt.sign({ email: chauffeur.email }, secretKey);
      return res.json({ token });
    });
  })(req, res);
};
