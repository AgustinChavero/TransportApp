import { Router } from "express";
import { db } from "../../../connection/connection";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: "413100398306-qhc30n7vdf81seedk3o8bckqrlisu86d.apps.googleusercontent.com",
      clientSecret: "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",
      // callbackURL: `https://api-urban.onrender.com/login/auth/google`,
      callbackURL: `http://localhost:3000/login/auth/google`,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user: any = await db.collection("users").doc(profile.id).get();
        if (!user.exists) {
          user = await db
            .collection("users")
            .doc(profile.id)
            .set({
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              name: profile.displayName,
              img: profile.photos[0].value,
              payments: {
                cardNumber: "",
                expirationDate: "",
                securityCode: "",
              },
              history: {
                orders: [],
                travels: [],
              },
              cc: "",
              address: {
                number: "",
                street: "",
                postalCode: "",
                location: "",
                state: "",
                department: "",
              },
              nationality: "",
              phone: {
                number: "",
                areaCode: "",
                displayPhone: "",
              },
              deleted: false,
            });
        }
        const payload = {
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          name: profile.displayName,
          img: profile.photos[0].value,
          id: profile.id,
        };
        done(null, payload);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/", (req, res) => {
  const { user } = req;
  const token = jwt.sign(user, "clavemegasecreta");
  res.redirect(`http://localhost:3001/home?token=${token}`);
  // res.redirect(`https://urban-movi.vercel.app/home?token=${token}`);
});

export default router;
